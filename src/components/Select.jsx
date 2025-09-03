import React from 'react'
import { useId } from 'react'

const Select = ({
    option,
    label,
    className,
    ...props
},ref) => {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select  
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        ref={ref}
        >
            {option?.map((option)=> (
                <option key={option} value={option}>{option}</option>
            ))}



        </select>
      
    </div>
  )
}

export default React.forwardRef(Select)
