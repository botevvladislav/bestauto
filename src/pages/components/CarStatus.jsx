import React from 'react'


const CarStatus = ({  status }) => {
  let textColor = ''
  let styles = 'relative bg-black bg-opacity-60 font-bold text-center py-1'
  let text = ''
  let padding = ''

  switch (status) {
    case "Продаден":
      textColor = 'text-[#B8B8B8]'
      text = 'ПРОДАДЕН'
      padding = 'px-[80px]'
      break;
    case "Очакван внос":
      textColor = 'text-[#007FFF]'
      text = 'OЧАКВАН ВНОС'
      padding = 'px-[25.5%]'
      break;
    case "Капариран":
      textColor = 'text-[#F9E076]'
      text = 'КАПАРИРАН'
      padding = 'px-[80px]'
      break;
    case "С поръчка":
      textColor = 'text-[#E39002]'
      text = 'С ПОРЪЧКА'
      padding = 'px-[80px]'
      break;
    case "В наличност":
      textColor = 'hidden'
      text = ''
      break;
    default:
      textColor = 'hidden'
      text = ''
      padding = 'px-[80px]'
      break;
  }

  return (
    <div className={`text-center relative h-0 bottom-[46px] left-20 ${padding}`}>
        <div className={`${textColor} ${styles}`}>
            { text }
        </div>
    </div>
  )
}

export default CarStatus