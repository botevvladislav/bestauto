import React, { useState, useEffect } from 'react'
import { collection, doc, getDocs, setDoc, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { db, storage } from '../../firebase-config';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import { arrayMove } from 'react-sortable-hoc';
import Multiselect from 'multiselect-react-dropdown';

const AddCar = ({ onClose }) => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [engine, setEngine] = useState('Газ');
    const [status, setStatus] = useState('В наличност');
    const [mileage, setMileage] = useState('');
    const [price, setPrice] = useState('');
    const [extras, setExtras] = useState([]);
    const [newExtra, setNewExtra] = useState('');
    const [type, setType] = useState('Седан');
    const [imageUrls, setImageUrls] = useState([]);
    const [availableExtras, setAvailableExtras] = useState([]);

    const handleAddExtra = () => {
        setExtras(prevExtras => [...prevExtras, newExtra]);
        setNewExtra('');
      };

    const handleTypeChange = (event) => {
        setType(event.target.value);
      };

    const handleEngineChange = (event) => {
        setEngine(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSelectExtra = (selectedList, selectedItem) => {
        setExtras([...extras, selectedItem]);
      };
    
    const handleRemoveExtra = (selectedList, removedItem) => {
        setExtras(extras.filter(extra => extra.key !== removedItem.key));
      };
    
    const fetchExtras = async () => {
        const extrasCollection = collection(db, 'extras');
        const extrasQuery = query(extrasCollection);
        const extrasSnapshot = await getDocs(extrasQuery);
    
        const fetchedExtras = extrasSnapshot.docs.map(doc => {
            return { key: doc.data().key, id: doc.id };
        });
    
        console.log('Fetched Extras:', fetchedExtras);
        setAvailableExtras(fetchedExtras);
    };
    
      useEffect(() => {
        fetchExtras();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let downloadURLs = [];

        if (imageUrls && imageUrls.length > 0) {
            const storageRef = ref(storage, "car-images");
            try {

              downloadURLs = await Promise.all(
                imageUrls.map(async (item) => {
                  const imageRef = ref(storageRef, item.file.name);
                  const snapshot = await uploadBytes(imageRef, item.file);
                  return await getDownloadURL(snapshot.ref);
                })
              );
            } catch (error) {
              console.error("Error uploading images:", error);
              return;
            }
        }
            const carsCollection = collection(db, "cars");
            const newCarDoc = doc(carsCollection);

            try {
              await setDoc(newCarDoc, { make: make, model: model, year: year, mileage: mileage, price: price, extras: extras, type: type, imageUrls: downloadURLs.length > 0 ? downloadURLs : imageUrls, engine: engine, status: status });
              console.log("New car added successfully!");
              onClose();
            } catch (error) {
              console.error("Error adding new car:", error);
            }
          };

    const handleImageUpload = (e) => {
        const filesArray = Array.from(e.target.files);
        const filesWithUrls = filesArray.map((file) => ({
            file: file,
            url: URL.createObjectURL(file),
        }));
        setImageUrls((prevImageUrls) => [...prevImageUrls, ...filesWithUrls]);
    };
    
    const DragHandle = sortableHandle(() => (
            <span className="cursor-move text-white"></span>
          ));

    const removeImage = (index) => {
        setImageUrls((prevImageUrls) => prevImageUrls.filter((_, i) => i !== index));
        };
    
        const SortableItem = SortableElement(({ item, removeImage }) => (
            <div className="w-1/4 px-2 py-1">
              <div className="border rounded-md p-0.5 relative">
                <DragHandle />
                <button
                  onClick={removeImage}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 -mt-1 -mr-1 text-xs flex items-center justify-center"
                >
                  x
                </button>
                <img
                  src={item.url}
                  className="w-full h-full rounded-md"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          ));

          const SortableList = SortableContainer(({ imageUrls, removeImage }) => {
            return (
              <div className="flex flex-wrap -mx-2 mt-4 overflow-hidden">
                {imageUrls.map((item, index) => (
                  <SortableItem
                    key={`item-${index}`}
                    index={index}
                    item={item}
                    removeImage={() => removeImage(index)}
                  />
                ))}
              </div>
            );
          });
          

    return (
        <div class="fixed inset-0 flex justify-center items-center bg-[#191919] bg-opacity-90 z-50">
            <div class="relative p-4 w-full max-w-2xl h-full md:h-full overflow-x-hidden overflow-y-auto">
                <div class="relative p-4 rounded-lg shadow bg-[#222222] sm:p-5 mx-5 my-5">
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-[#E39002]">
                        <h3 class="text-lg font-semibold text-white">
                            Добави автомобил
                        </h3>
                        <button onClick={onClose} type="button" class="text-red-500 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label for="make" class="block mb-2 text-sm font-medium text-white">Марка</label>
                                <input onChange={(event) => setMake(event.target.value)} type="text" name="make" id="make" className="text-sm rounded-lg focus:ring-primary-600 focus:border focus:border-[#E39002] block w-full p-2.5 bg-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Hyundai" required></input>
                            </div>
                            <div>
                                <label for="model" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Модел</label>
                                <input onChange={(event) => setModel(event.target.value)} type="text" name="model" id="model" className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Sonata" required></input>
                            </div>
                            <div>
                                <label for="year" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Година</label>
                                <input onChange={(event) => setYear(event.target.value)} type="text" name="year" id="year" className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Ноември 2020" required></input>
                            </div>
                            <div>
                                <label for="mileage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Километри</label>
                                <input onChange={(event) => setMileage(event.target.value)} type="text" name="mileage" id="mileage" className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="75000" required></input>
                            </div>
                            <div>
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена</label>
                                <input onChange={(event) => setPrice(event.target.value)} type="text" name="price" id="price" className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="25,000 лв" required></input>
                            </div>
                            <div>
                                <label htmlFor="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Купе</label>
                                <select defaultValue="Седан" value={type} onChange={handleTypeChange} id="type" className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500">
                                    <option disabled selected="">Избери купе</option>
                                    <option value="Седан">Седан</option>
                                    <option value="Джип">Джип</option>
                                    <option value="SUB">SUV</option>
                                    <option value="Хечбек">Хечбек</option>
                                    <option value="Комби">Комби</option>
                                    <option value="Купе">Купе</option>
                                    <option value="Пикап">Пикап</option>
                                    <option value="Ван">Ван</option>
                                </select>
                            </div>
                            <div>
                                <label for="engine" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Двигател</label>
                                <select defaultValue="Газ" value={engine} onChange={handleEngineChange} id="engine" className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500">
                                    <option disabled selected="">Избери двигател</option>
                                    <option value="Газ">Газ</option>
                                    <option value="Бензин">Бензин</option>
                                    <option value="Газ/Бензин">Газ/Бензин</option>
                                    <option value="Метан/Бензин">Метан/Бензин</option>
                                    <option value="Дизел">Дизел</option>
                                    <option value="Електрически">Електрически</option>
                                    <option value="Хибрид">Хибрид</option>
                                </select>
                            </div>
                            <div>
                                <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Статус</label>
                                <select defaultValue="В наличност" value={status} onChange={handleStatusChange} id="status" className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500">
                                    <option disabled selected="">Избери статус</option>
                                    <option value="В наличност">В наличност</option>
                                    <option value="eОчакван внос">Очакван внос</option>
                                    <option value="Капариран">Капариран</option>
                                    <option value="Продаден">Продаден</option>
                                    <option value="С поръчка">С поръчка</option>
                                </select>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Екстри</label>
                                <div className="flex items-center w-full">
                                <Multiselect
                                    style={{
                                        chips: {
                                        color: "white",
                                        background: "rgb(55, 63, 73)",
                                        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                                        },
                                    }}
                                    displayValue="key"
                                    onRemove={handleRemoveExtra}
                                    onSelect={handleSelectExtra}
                                    options={availableExtras}
                                    showCheckbox
                                    placeholder="Избери"
                                    avoidHighlightFirstOption={true}
                                    className="h-full text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-gray-600 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                            </div>
                            </div>
                        <div class="w-full">
                            <label
                                class="flex justify-center w-full h-20 px-4 transition bg-gray-600 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                <span class="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span class="font-medium text-white">
                                        Пусни файловете тук, или <span></span>
                                        <span class="text-blue-600 underline">избери</span>
                                    </span>
                                </span>
                                <input
                                    type="file"
                                    name="images"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    class="hidden"
                                ></input>
                            </label>
                            <div className="flex flex-wrap mx-2 mt-4">
                                <SortableList
                                    imageUrls={imageUrls}
                                    removeImage={removeImage}
                                    onSortEnd={({ oldIndex, newIndex }) => {
                                        setImageUrls(arrayMove(imageUrls, oldIndex, newIndex));
                                    }}
                                    axis="xy"
                                    helperClass="sortable-helper"
                                />
                            </div>
                        </div>
                        <button type="submit" className="mt-5 text-[#E39002] font-bold inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Добави
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCar