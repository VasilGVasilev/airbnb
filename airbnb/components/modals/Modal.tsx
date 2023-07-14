'use client'

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io'
import Button from "../Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;

}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel

}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
      setShowModal(isOpen);
  }, [isOpen])

  const handleClose = useCallback(() => {
    if(disabled){
      return;
    }

    setShowModal(false);

    setTimeout(()=>{
      onClose();
    }, 300) // setTimeout due to animation to be added
  }, [disabled, onClose])

  const handleSubmit = useCallback(()=> {
    if(disabled){
      return;
    }

    onSubmit();
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(()=>{
    if (disabled || !secondaryAction){
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction])   

  // isOpen comes from global state, depending on which modal, ex. registerModal.isOpen, if false, nothing is rendered, if true - render registerModal
  if (!isOpen){
    return null;
  }

  return (
    <div
      className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-nonde
        bg-neutral-800/70
      "
    >
      <div
        className="
          relative
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-autp
          h-full
          md:h-auto
          lg:h-auto
        "
      >
        {/* CONTENT */}
        <div
          className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div
            className="
              translate 
              h-full
              md:h-auto
              lg:h-auto
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-white
              outline-none
              focus:outline-none
            "
          >
            {/* HEADER */}
            <div
              className="
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
              "
            >
              <button
                onClick={handleClose}
                className="
                  p-1
                  border-0
                  hover:opacity-70
                  transition 
                  absolute
                  left-9
                "
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">
                {title}
              </div>
            </div>
            {/* BODY */}
            <div className="relative p-6 flex-auto">
              {body}
            </div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-6">
              <div className="
                flex
                flex-row
                items-center
                gap-4
                w-full
              ">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}
 
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Modal

// NB inset-0 
// In this example, the relative class is used on the parent element to create a positioning context for the absolutely positioned child element. 
// The absolute class is used on the child element to position it relative to its nearest positioned ancestor, which in this case is the parent element. 
// Finally, the inset-0 class is used to set the top, right, bottom, and left properties of the child element to 0, CAUSING IT TO FILL THE ENTIRE PARENT ELEMENT.

// NB bg-neutral-800/70 the slash reduces opacity by 70%

// NB duration
// When we set showModal to true and opacity becomes 100%, duration reflects on the change between the previous render configuration of opacity being 0% 
// and the current render configuration of opacity being 100% and makes the transition between the two figures of opacity change for 300 ms
// Thus, the duration class, in this case, relates to the time it takes for the transition to occur when properties change on re-render.