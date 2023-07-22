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

BUT if you want to pass on props in a component such as:
```sh
<Avatar src={currentUser?.image}>
```

you should always define an interface for the props INSIDE THE COMPONENT:

```sh
interface AvatarProps {
  src?: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <div>
      <Image
        className="rounded-full"
        height={30}
        width={30}
        alt="Avatar"
        src={src || "/images/placeholder.jpg"}
      />
    </div>
  )
}

export default Avatar
```
