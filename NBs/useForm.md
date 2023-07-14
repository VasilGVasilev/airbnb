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