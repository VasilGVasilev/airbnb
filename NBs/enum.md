enums are a collection of constant variables (emphasis on contants not being able to change values):

```sh
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

numeric enums increment their value automatically if no such is provided

Given the following code, what will happen if we trigger onNext function when the step value is already 5, relating to PRICE in STEPS enum, will it revert to 0 relating to CATEGORY: 
```sh
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const [step, setStep] = useState(STEPS.CATEGORY);

const onBack = () => {
    setStep((value) => value - 1);
}

const onNext = () => {
    setStep((value) => value + 1);
}
```

If onNext is triggered when the current step is already the last step (when step is 5, relating to PRICE in the STEPS enum):

- It will increase the step value by 1, making it 6, but there is no corresponding step in the STEPS enum with the value 6.
- The STEPS enum only goes up to 5, so there is no valid step value beyond 5.
- The component will stay at the last step, and there will be no error or automatic reversion to step 0.

In our airbnb case we have a 6 segment setup and the idea is that we either have all options filled and next to step 5 is 'Create' button, thus, last element does not overflow via value++, and if we are at 0 the button that turns in 'Create' in the former case will return undefined.