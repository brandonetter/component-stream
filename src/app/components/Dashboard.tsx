"use client";

import { useStream } from "../component-stream/client";
import React,{useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion"
export default function Dashboard({
  serverFetch,
}: {
  serverFetch: (...args:any) => Promise<any>;
}) {
  const [page, setPage] = useState(1);
  const mounted = React.useRef(false);
  const [direction, setDirection] = useState<"left"|"right">("right");
  const {data,refetch,clear} = useStream(serverFetch, page);

  const pageClamp = (page:number) => Math.max(1,Math.min(page,4));

  const nextPage = () => {
    setPage(pageClamp(page+1));
    setDirection("left");
  }
  const prevPage = () => {
    setPage(pageClamp(page-1));
    setDirection("right");
  }

  useEffect(() => {
    if (mounted.current) {
      clear();
      refetch();
    } else {
      mounted.current = true;
    }
  }, [page,clear,refetch]);

  return (
      <div className="flex flex-col max-w-2xl mx-auto gap-y-2">
        <section className="flex gap-x-2">
        <button className="border border-white rounded-xl px-4" onClick={prevPage}>Prev</button>
        <button className="border border-white rounded-xl px-4" onClick={nextPage}>Next</button>
        </section>
        <AnimatePresence
        mode="wait"

        >
        {data.map((element) => (
          <motion.div
          exit={{opacity:0,x: direction === "left" ? -300 : 300}}
          initial={{opacity:0,x: direction === "left" ? 300 : -300}}
          animate={{opacity:1,x:0}}
          transition={{duration:0.3, ease:"easeInOut"}}
          key={element.id}>
            {element.ui}
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
  );
}
