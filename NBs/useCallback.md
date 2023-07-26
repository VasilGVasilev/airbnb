the hook caches functions between re-renders:
it does not store state, but you can cache the state setter to apply later in code in a cleaner fashion rather then repeat yourself: toggle functionality is a great example

Why useCallback instead of storing function in a variable:
- useCallback is a React hook used for optimizing the performance of functional components, particularly when dealing with child components and re-rendering behavior. It's often used in conjunction with the React.memo higher-order component (HOC) to avoid unnecessary re-renders.

- When you store a function in a variable outside the component, the function is recreated every time the component renders. This can lead to unnecessary re-renders of child components that depend on this function as a prop, even if the function's logic and output remain the same.

**Where is the function stored?**
When using the useCallback hook in React, the function is indeed stored outside of the render cycle. The purpose of useCallback is to return a memoized version of the function, meaning that it retains the **same memory reference across renders** unless one of the variables in its dependency array changes. 