[stack overflow discussion](https://stackoverflow.com/questions/59988667/typescript-react-fcprops-confusion)

[React.FC is discouraged](https://github.com/typescript-cheatsheets/react#basic-cheatsheet)

React.FC is explicit about the return type and in my opinion that is overprotective.
I belive ts is a superset of js and one should have custom control over each typisation.

```sh
interface Props {
  name: string;
}

# Generic inspired way
# This is discouraged ,because it sets the type of the whole PrintName:
const PrintName: React.FC<Props> = (props) => {
  return (
    <div>
      <p style={{ fontWeight: props.priority ? "bold" : "normal" }}>
        {props.name}
      </p>
    </div>
  )
}

# Each type custom defined way
# This is preferred, because it sets the type of the params only:
const PrintName2 = (props: Props) => {
  return (
    <div>
      <p style={{ fontWeight: props.priority ? "bold" : "normal" }}>
        {props.name}
      </p>
    </div>
  )
}
# Following along the above example, you can custom set the type of the return type of the component:
const PrintName2 = (props: Props): JSX.Element => {
  return (
    <div>
      <p style={{ fontWeight: props.priority ? "bold" : "normal" }}>
        {props.name}
      </p>
    </div>
  )
}

```