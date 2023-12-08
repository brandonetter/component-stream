"use client";

import { useStream } from "../component-stream/client";
import React,{useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion"
export default function Dashboard({
  serverFetch,
}: {
  serverFetch: (...args:any) => Promise<any>;
}) {
  const mounted = React.useRef(false);
  const {data,refetch,clear} = useStream(serverFetch);


  useEffect(() => {
    if (mounted.current) {
      clear();
      refetch();
    } else {
      mounted.current = true;
      const observer = new IntersectionObserver(refetch,
        {
        rootMargin:"10px",
        threshold:1,
        root:null
      });
      observer.observe(document.getElementById("intersection-observer") as HTMLElement);



    }
  }, [clear,refetch]);



  return (
      <div className="flex flex-col max-w-2xl mx-auto gap-y-2">

        <AnimatePresence
        mode="wait"

        >
        {data.map((element) => (
          <motion.div
          exit={{opacity:0,y:100}}
          initial={{opacity:0,y:100}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.3, ease:"easeInOut"}}
          key={element.id}>
            {element.ui}
          </motion.div>
        ))}
        </AnimatePresence>
        <div id="intersection-observer" className="mt-[400px] h-1 w-1 bg-black"></div>
      </div>
  );
}
