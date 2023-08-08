the hook caches functions between re-renders:
it does not store state, but you can cache the state setter to apply later in code in a cleaner fashion rather then repeat yourself: toggle functionality is a great example

Why useCallback instead of storing function in a variable:
- useCallback is a React hook used for optimizing the performance of functional components, particularly when dealing with child components and re-rendering behavior. It's often used in conjunction with the React.memo higher-order component (HOC) to avoid unnecessary re-renders.

- When you store a function in a variable outside the component, the function is recreated every time the component renders. This can lead to unnecessary re-renders of child components that depend on this function as a prop, even if the function's logic and output remain the same.

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