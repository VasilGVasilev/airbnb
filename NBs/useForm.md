useForm is a custom hook for managing forms with ease. 
- It takes one object as optional argument: 
{defaultValues: {

}}

reverses submit args

instead of:
const {handleSubmit} = useForm<FormValues>();
```sh
const onSubmit = (e) => {
    e.preventDefault()
}
```

do this:
```sh
const onSubmit = (data, e) => {
    console.log('data', data)
    console.log('e', e)
}
```

[see for handleSubmit API](https://youtu.be/KzcPKB9SOEk)
[validation](https://dev.to/m0nm/form-validation-with-useform-hook-1p33)

but basically extract handlesubmit to wrap the submit function passed into the Modal (at Modal component level)
```sh
onSubmit={handleSubmit(onSubmit)}
```

extract the register function (at specific Modal component level)
```sh
const {
    register,
    handleSubmit,
    formState: {
        errors,
    }
} = useForm<FieldValues>({
    defaultValues: {
        name: '',
        email: '',
        password: ''
    }
})
```

apply modal to speicifc input tag
```sh
{...register(id, {required} )}
```

[register](https://youtu.be/JFIpCoajYkA)

so
```sh
const { onChange, onBlur, name, ref } = register('firstName'); 
// include type check against field path with the name you have supplied.
        
<input 
  onChange={onChange} // assign onChange event 
  onBlur={onBlur} // assign onBlur event
  name={name} // assign name prop
  ref={ref} // assign ref prop
/>
// same as above
<input {...register('firstName')} />
```