**Forms are uncontrolled by default**
According to the search results, React Hook Form is built with uncontrolled inputs in mind and aims to provide the best performance and minimize re-renders. This means that React Hook Form forms are primarily uncontrolled, but it does provide a wrapper component called Controller that allows you to work with external controlled components if needed.

You can emulate controlled forms via *watch* and *setValues*, because *watch* watches and stores each keystroke then re-renders, thus, we know what is the current input much like (state + onChange + e.traget.value in controlled forms)

errors lets you control the FE validation of simple fields such as input:
```sh
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
});

<Input
    id="price"
    label="Price"
    formatPrice
    type="number"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
/>
```
required means some input is required, so if no input is given it will trigger the error mechanism via errors={errors} resulting in a red input field