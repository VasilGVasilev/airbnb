interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Container

// NB React.FC -> more verbose, also it had implicit definition of children, but not anymore since React 18 type
// instead of: const Container = ({children}: {children: React.ReactNode}) or const Container = ({children}: ContainerProps)
// we do: const Container: React.FC<ContainerProps> = ({children})
// better go with normal function /const Container = ({children}: ContainerProps)/ rather than React.FC<>
// https://stackoverflow.com/questions/59988667/typescript-react-fcprops-confusion
