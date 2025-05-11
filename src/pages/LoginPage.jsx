import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config';


const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            navigate('/edit-cars');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
          });
      };

  return (
    <div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 w-screen">
            <a href="#" class="flex items-center mb-6 text-2xl font-black text-[#E39002]">
                BESTAUTO
            </a>
            <div className="w-full bg-[#1C1C1C] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-[#E39002]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Влезте в профила си
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-white">Еmail</label>
                            <input type="email" name="email" id="email" class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-[#222222] border-[#E39002] placeholder-gray-400 text-white" placeholder="name@company.com" required onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#222222] border-[#E39002] placeholder-gray-400 text-white" required onChange={(e)=>setPassword(e.target.value)}></input>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></input>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label for="remember" className="text-gray-500 dark:text-gray-300">Запомни ме</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Забравена парола?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-[#E39002] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center font-bold" onClick={onLogin}>Влизане</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage