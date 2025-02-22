import React, { useId } from "react";

const Select = React.forwardRef(
    function Select(
        {
            options,
            label,
            className = "",
            ...props
        },
        ref
    ) {
        const id = useId()
        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className='inline-block mb-1 pl-1'>
                        {label}
                    </label>
                )}
                <select
                    {...props}
                    id={id}
                    className={`${className}`}
                    ref={ref}
                >
                    {
                        options.map((option) => (
                            <option
                                key={option}
                                value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        )
    }
)

export default Select