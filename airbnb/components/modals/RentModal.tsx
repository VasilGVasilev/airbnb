'use client'

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import Heading from "../Heading";

import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";

import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";

// the modal constist of the following parts:
// we have the form initialised and 'watch' and 'setValue' necessary for its update
// we have a structure reflecting the steps and the above mentioned update follows this structure:
// first we update the form based on category step, then on location, then info, etc
// that structure is done in such a manner (see const onSubmit) so when we trigger submit, it goes to next enum element, triggering actual axios.post() only if we are on price

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });//values are set here and updated along the way of finishing the rentModal form, all sent finally with the final submit

    const category = watch('category'); //we utilize watch to watch for category input changes (it was first set in defatultValues)
    const location = watch('location')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    } //setValue needs to be a callback since we have a click, thus, custom wrapper -> setCustomValue(setValue)

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    // LIMIT OF BTN NOT OVERFLOWING OR FALLING BELOW ENUM
    const actionLabel = useMemo(()=>{
        // do calculations
        if(step === STEPS.PRICE){
            return 'Create';
        }
        // return calculations
        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(()=>{
        // do calculations
        if(step === STEPS.CATEGORY){
            return undefined;
        }
        // return calculations
        return 'Back';
    }, [step])



    // let because depending on enum we have different contents, the following bodyContent will be default
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Which of these best describes your place?"
                subtitle="Pick a cateogry"
            ></Heading>
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                "
            >
                {categories.map((item)=>(
                    <div
                        key={item.label}
                        className="col-span-1"
                    >
                        <CategoryInput 
                            onClick={(category) => setCustomValue('category', category)}//the first argument which element of DefaultValues we save onto, the second is what value we save onto that element
                            selected={category === item.label}//by the very act of selecting category becomes the item.label, otherwise it has no value
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests fund you!"
                />

                <CountrySelect
                    onChange={(value)=>setCustomValue('location', value)}
                    value={location}
                />
                <Map />
            </div>
        )
    }
    
    
    return (
        <Modal
            title="Airbnb your home!"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} //back btn
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext} //next or submit btn
            body={bodyContent}
        >

        </Modal>
    )
}

export default RentModal
