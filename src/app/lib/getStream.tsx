"use server";

import { Suspense } from "react";

import { createComponentStream } from "../component-stream/server";
import DelayedServerComponent from "../components/DelayedServerComponent";

const Loader = () => <div className="h-16 bg-white/10 shadow-inner shadow-black ">loading...</div>;

export const getStream = async (page:number) =>{
  const { stream, write } = createComponentStream();

  const pageItems = pageData[page as keyof typeof pageData].items;
  for (const item of pageItems) {
    write(<Suspense fallback={<Loader />}>
      <DelayedServerComponent name={item.name} price={item.price} />
      </Suspense>);
  }

  return stream();
}



// demo data

const pageData = {
  1: {
    items:[
      {
        name:"Component 1",
        price: 100
      },
      {
        name:"Component 2",
        price: 200
      },
      {
        name:"Component 3",
        price: 300
      },
      {
        name:"Component 4",
        price: 400
      }
    ]
  },
  2: {
    items:[
      {
        name:"Component 5",
        price: 500
      },
      {
        name:"Component 6",
        price: 600
      },
      {
        name:"Component 7",
        price: 700
      },
      {
        name:"Component 8",
        price: 800
      }
    ]
  },
  3: {
    items:[
      {
        name:"Component 9",
        price: 900
      },
      {
        name:"Component 10",
        price: 1000
      },
      {
        name:"Component 11",
        price: 1100
      },
      {
        name:"Component 12",
        price: 1200
      }
    ]
  },
  4: {
    items:[
      {
        name:"Component 13",
        price: 1300
      },
      {
        name:"Component 14",
        price: 1400
      },
      {
        name:"Component 15",
        price: 1500
      },
      {
        name:"Component 16",
        price: 1600
      }
    ]
  },
}
