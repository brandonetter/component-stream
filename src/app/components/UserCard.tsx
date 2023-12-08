export default async function UserCard({index}:{index:number}){
    // simulate a delay
    const delay = ~~(Math.random() * 200) + 1000*index;
    await new Promise((resolve) => setTimeout(resolve, delay))
    const userFetch = await fetch('https://randomuser.me/api/',{next:{revalidate:0}}).then(res => res.json());
    const user = userFetch.results[0];
    return <div className="p-2 h-32 bg-slate-200 rounded-md">
        <div className="flex items-center flex-col text-black">
            <img className="w-10 h-10 rounded-full" src={user.picture.thumbnail} alt="user"/>
            <div className="ml-2">{user.name.first} {user.name.last}</div>
            <div className="ml-2">{user.email}</div>
            </div>
    </div>
}
