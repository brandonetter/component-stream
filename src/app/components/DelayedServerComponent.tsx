export default async function DelayedServerComponent({name,price}:{name:string,price:number}) {
    // simulate a delay
    const delay = ~~(Math.random() * 1200)
    await new Promise((resolve) => setTimeout(resolve, delay))

    return <div className="p-2 bg-slate-200 rounded-md">
        <div className="px-2 py-3 bg-slate-500 rounded-md shadow-md shadow-black">{name} ${price}</div>

    </div>
}
