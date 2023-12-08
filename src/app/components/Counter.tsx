"use client"

import {useState} from "react";

export default function Counter({initialCount}:{initialCount:number}) {
    const [count, setCount] = useState(initialCount);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
        </div>
    );
}
