Axios vs Fetch API

```sh

const url = 'https://jsonplaceholder.typicode.com/posts'
const data = {
  a: 10,
  b: 20,
};
axios
  .post(url, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
  .then(({data}) => {
    console.log(data);
});
```


Fetch code:
```sh


const url = "https://jsonplaceholder.typicode.com/todos";
const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify({
    a: 10,
    b: 20,
  }),
};
fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```


Notice that:
- To send data, fetch() uses the body property for a post request to send data to the endpoint, while Axios uses the data property

- The data in fetch() is transformed to a string using the JSON.stringify method

- Axios automatically transforms the data returned from the server, but with fetch() you have to call the response.json method to parse the data to a JavaScript object. More info on what the response.json method does can be found here

- With Axios, the data response provided by the server can be accessed with in the data object, while for the fetch() method, the final data can be named any variable


We use axios to send for example a request to '/api/register', thus, we create such a folder using the folder structure of the app router. in this /api/register/route.ts we can finally (since app router) define HTTP METHODS as per:
```sh
export async function POST()
```
MIND that this is the receiving end of an axios or FETCH API request. This route.ts accepts the request put forward via the axios functionality