the hook caches functions between re-renders:
it does not store state, but you can cache the state setter to apply later in code in a cleaner fashion rather then repeat yourself: toggle functionality is a great example