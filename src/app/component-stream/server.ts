import React from 'react';

export type NodeOrPromise = React.ReactNode | Promise<React.ReactNode>;

export function createComponentStream() {
  let controller: ReadableStreamDefaultController | undefined;
  let writeCount = 0;
  let writeStream: { id: string; ui: NodeOrPromise }[] = [];
  const stream = new ReadableStream({
    start(c) {
      controller = c;
    },
  });

  async function promisify(stream: ReadableStream) {
    writeCount = writeStream.length;
    writeStream.forEach((item) => {
      controller?.enqueue(item.ui);
    });
    if (controller) {
      controller.close();
    }
    const reader = stream.getReader();
    let promises = [];

    function createReadPromise(id: string) {
      return {
        id,
        ui: new Promise((resolve) => {
          reader
            .read()
            .then(({ done, value }) => {
              if (!done) {
                resolve(value);
              }
            })
            .catch((e: any) => {
              console.error('Error reading stream:', e);
            });
        }),
      };
    }

    for (let i = 0; i < writeCount; i++) {
      promises.push(createReadPromise(writeStream[i].id));
    }

    return promises;
  }

  return {
    stream: () => promisify(stream),
    write: (data: NodeOrPromise) => {
      if (controller) {
        writeStream.push({ id: generateGUID(), ui: data });
      }
    },
  };
}

const generateGUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString();
  });
