'use client'
import {FieldValues, FieldErrors, UseFormRegister} from 'react-hook-form'
import { BiDollar } from 'react-icons/bi';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>; //register is a hook
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    required,
    register,
    errors
}) => {
  return (
    <div className='w-full relative'>
      { formatPrice && (
        <BiDollar
          size={24}
          className='
            text-neutral-700
            absolute
            top-5
            left-2
            '
          />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, {required} )}
        placeholder=' '
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`
          absolute
          text-md 
          duration-150
          transform 
          -translate-y-3
          top-5
          z-10
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  )
}

export default Input

// NB origin - specifying the origin for an element's transformations. https://tailwindcss.com/docs/transform-origin#changing-the-transform-origin
// peer class lets us control what happens to the label (peer is on input, peer-placeholder is on label) on the various actions that happen
// 'peer-placeholder-shown' is the default, while 'peer-focus' is the change that ensues by focusing 
// {...register(id, {required})} 
// <Input {...register(name, options)} />: The spread operator is used here to PASS THE PROPERTIES RETURNED BY THE REGISTER FUNCTION AS PROPS to the <Input> component. 
// For example, if the register function returns an object like { name: "inputName", ref: ..., onChange: ..., onBlur: ... }, then the spread operator would pass these properties as individual props to the <Input> component. 