**Rename an object field while destructuring**

Let's break down the object destructuring part:

```sh
({
  icon: Icon,
  label,
  selected,
})
```


This part is an object destructuring assignment. It's part of the function parameters, indicating that the function expects an object with certain properties. The object passed to this function should have properties named icon, label, and selected.

Here's what each line means:

    icon: Icon: This line renames the icon property of the object to Icon. It means that if the passed object has a property named icon, it will be extracted and assigned to a variable named Icon. The : here is not a type annotation in this context; it's just used to define the renaming during object destructuring.

    label: This line does not rename the label property; it directly assigns the value of the label property of the passed object to a variable named label.

    selected: Similarly, this line directly assigns the value of the selected property of the passed object to a variable named selected.

With this object destructuring assignment, you can access the properties of the object directly as separate variables inside the component function without explicitly accessing the object itself. For example, instead of using props.icon, you can use Icon, which is the renamed variable containing the value of props.icon.

Here's an example of how you might use this destructuring inside the component function:

```sh
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  // Use the destructured variables inside the component
  return (
    <div>
      {Icon && <Icon />} {/* Render the Icon component if it's provided */}
      <span>{label}</span> {/* Render the label */}
      <span>{selected ? 'Selected' : 'Not selected'}</span> {/* Render a message based on the selected prop */}
    </div>
  );
};
```


By using object destructuring, the code becomes more readable and allows you to use shorter variable names, making the component logic cleaner and easier to understand.