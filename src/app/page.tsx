import { getStream } from "./lib/getStream";
import {infiniteStream} from "./lib/infiniteStream";
import Dashboard from "./components/Dashboard";
import Infinite from "./components/Infinite";

export default function Home() {
  return (
    <main className="mx-auto pt-5 overflow-hidden">
      <Dashboard serverFetch={getStream} />
      <Infinite serverFetch={infiniteStream} />
    </main>
  );
}
