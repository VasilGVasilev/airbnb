We don't need to explicitly type the return type of a component, TS does that implicitly.
It may be company policy to do so:

```sh
import React, { useRef } from 'react';

const MyComponent = (): TSX.Element => {
  const divRef = useRef<HTMLDivElement>(null);

  // Accessing the current value of the ref
  console.log(divRef.current);

  return (
    <div ref={divRef}>
      {/* ... */}
    </div>
  );
};
```