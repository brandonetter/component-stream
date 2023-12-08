This is an experiment in sending a stream of components and data back from a NextJS App Router application using a server action that supports a psuedo-streaming methodology. This is inspired by Jack Herrington's generic-streamer, but with several key differences.

## Usage
### Server Action:
```js
export const infiniteStream = async () =>{
  /*
  createComponentStream() returns a `stream` and a `write` function
  invoking and returning `stream()` will send the promises
  and `write` will push a promise into the 'stream'.
  */
  const { stream, write } = createComponentStream();
    for(let i = 0; i < 3; i++){
    write(<Suspense fallback={<Loader />}>
        <UserCard index={i}/>
      </Suspense>);
    }

  return stream();
}
```

`write` takes either a ReactNode, or a Promise that resolves into a ReactNode.

```js
write(<b>Hello!</b>);

write(<SomeComponent />);

write(new Promise(resolve=>{
  // some logic
  resolve(<ReturnedComponent />);
}))
```

You can pass client components or server components.

### The Client-Side:

```js
"use client";

import { useStream } from "../component-stream/client";

export default function ClientComponent({
  serverAction,
}: {
  serverAction: (...args:any) => Promise<any>;
}) {
  const {data,refetch,clear} = useStream(serverAction, arguments);
  ...
}
```
`useStream` takes the serverAction (passed down from a server component), and optionally takes the arguments to be sent to the server action.

It returns and array of `data` that contains the components sent in the stream as they load.
`refetch` will run the server action again, adding more entries to the `data` array.
`clear` empties the array of `data`.

Included are examples of pagination and infinite loading.

This really only forms and sends promises- and includes a helper to resolve and refetch these promises. This isn't an actual 'stream'- and as such all `write` functions must be called before the `stream()` is returned.
