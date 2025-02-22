import React, { useId } from 'react'

//here we will learn how the info passed to parent from child component
//here input is child in form component and here is how it gives up to the parent form

//forwardRef hook is used to pass everything to the parent component
const Input = React.forwardRef(
    function Input({
        label,
        type = "text",
        className = "",
        ...props
    },
        ref) {
        const id = useId()
        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className='inline-block mb-1 pl-1'>
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    ref={ref}
                    {...props}
                    id={id}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none
                        focus:bg-gray-50 duration-200 border border-gray-300 w-full ${className}`}
                />
            </div>
        )
    }
)

export default Input