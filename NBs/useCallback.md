the hook caches functions between re-renders:
it does not store state, but you can cache the state setter to apply later in code in a cleaner fashion rather then repeat yourself: toggle functionality is a great example

We use useCallback hook in React instead of simply storing functions inside variables outside of components because useCallback memoizes the function, which means that it only re-runs the function if one of its dependencies changes. This can improve performance by preventing unnecessary re-renders.

For example, let's say we have a function that gets the current time. We could store this function in a variable outside of our component like this:

```sh

const getTime = () => {
  return new Date().toLocaleString();
};
```

Then, we could pass this function as a prop to our component:

```sh
const MyComponent = ({ getTime }) => {
  return <div>The current time is {getTime()}</div>;
};
```

Every time the component re-renders, the getTime function will be re-run, even if the current time hasn't changed. This can be inefficient, especially if the getTime function is expensive to run.

Instead, we can use useCallback to memoize the getTime function. This will ensure that the function is only re-run if one of its dependencies changes, such as the current time. To do this, we would use the useCallback hook like this:

```sh
const MyComponent = () => {
  const [getTime, getTimeRef] = useCallback(() => {
    return new Date().toLocaleString();
  }, []);

  return <div>The current time is {getTime()}</div>;
};
```

The useCallback hook takes two arguments: the function to memoize, and an array of dependencies. The dependencies are the values that the function depends on. If any of the dependencies change, the function will be re-run. In this case, the only dependency is the current time, so the function will only be re-run if the current time changes.

This can significantly improve the performance of our component, especially if the getTime function is expensive to run.

Here are some additional benefits of using useCallback:

- It can help to prevent memory leaks.
- It can make our code more predictable and easier to debug.
- It can improve the performance of our components.

Overall, useCallback is a powerful hook that can be used to improve the performance and maintainability of our React components.

**Where is the function stored?**
When using the useCallback hook in React, the function is stored outside of the render cycle. The purpose of useCallback is to return a memoized version of the function, meaning that it retains the **same memory reference across renders** unless one of the variables in its dependency array changes. 

What is the use of useCallback hook - to cache a function between re-renders. The dependency array plays the vital role to control when is it acceptable to allow re-renders. That would be if a variable that the function depends on changes its value. Thus, we put variables in the dependency array whose value may change between triggering the execution of the function and the calling of those very variables. With other words, useCallback hook reduces the re-renders not entierly but up to the potential times of change of values that are in the dependency array: 

```sh
const onCancel = useCallback((id: string) => {
    // del FE
    setDeletingId(id);
    // del BE
    axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation cancelled');
            // The router variable may change between the time we trigger the cancel function
            // and the time the router.refresh() method is called. To ensure that the
            // onCancel function is re-evaluated, we need to add the router variable to
            // the dependency array of the useCallback hook.
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        });
}, [router]);
```

router may change inbetween triggering onCancel and router.refresh(), thus, it is in the dep array. This means that the onCancel function is not entirely outside of the re-render cycle, but at least its re-rendering is limited to the potential changes of router's value.

why we do not put in id or serDeletingId since it is a changin state -> because the state is changed via the useCallback hook and it cannot change inbetween re-renders of the useCallback hook