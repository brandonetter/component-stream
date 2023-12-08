'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type useStream = {
  data: StreamedResponse;
  refetch: () => void;
  clear: () => void;
};
type StreamedResponse = {
  id: number;
  ui: React.ReactNode | Promise<React.ReactNode>;
}[];

export function useStream(
  stream: (...args: any[]) => Promise<{ id: number; ui: Promise<any> }[]>,
  ...args: any[]
): useStream {
  const [data, setData] = useState<any[]>([]);
  const argsRef = useRef<any[]>([]);
  argsRef.current = args;
  const refetch = useCallback(() => {
    const read = async () => {
      const chunks = await stream(...argsRef.current);
      chunks.forEach((chunkObj) => {
        chunkObj.ui
          .then((chunk) =>
            setData((prev) => [...prev, { ...chunkObj, ui: chunk }])
          )
          ?.catch((error) => console.error('Error processing chunk:', error));
      });
    };
    read();
  }, [stream, argsRef]);
  const clear = useCallback(() => {
    setData([]);
  }, []);

  useEffect(refetch, [refetch]);

  return { data, refetch, clear };
}
