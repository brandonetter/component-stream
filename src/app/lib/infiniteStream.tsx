"use server";

import { Suspense } from "react";

import { createComponentStream } from "../component-stream/server";
import UserCard from "../components/UserCard";

const Loader = () => <div className="h-32 bg-white/10 shadow-inner shadow-black ">loading...</div>;

export const infiniteStream = async () =>{
  const { stream, write } = createComponentStream();
    for(let i = 0; i < 3; i++){
    write(<Suspense fallback={<Loader />}>
        <UserCard index={i}/>
      </Suspense>);
    }

  return stream();
}
