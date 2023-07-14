**Zustand merges states**

Instead of this:
```sh
# typical useState to require new object referenance due to objects being immutable
set((state) => ({ ...state, count: state.count + 1 }))
```

Do this:
```sh
set((state) => ({ count: state.count + 1 }))
```

NB this is only for one level, nested objects need an explicit merge via spread operator

**Basic example**
```sh
import { create } from 'zustand'

# create a store
const useStore = create((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))

# bind components
function Counter() {
  const { count, inc } = useStore()

  return (
    <div>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  )
}

```