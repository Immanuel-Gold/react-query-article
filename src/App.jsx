import { useQuery } from "@tanstack/react-query";
import "./App.css";
import axios from "axios";

import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import DeletePost from "./components/DeletePost";
import { useState } from "react";

function App() {
  const [toggleComponent, setToggleComponent] = useState("create-post");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchData"],
    queryFn: async () => {
      try {
        return (await axios.get("https://jsonplaceholder.typicode.com/posts"))
          .data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error Found!</div>;

  console.log(data);
  return (
    <main className="p-[8px]">
      {data?.map((post) => (
        <section className="mb-[20px]" key={post.id}>
          <h3 className="text-[1.5rem] font-bold">{post.title}</h3>
          <p>{post.body}</p>
        </section>
      ))}

      <br />

      <section className="flex gap-4 [&>button]:py-3 [&>button]:px-4 [&>button]:bg-neutral-100 [&>button]:text-[1.1rem] [&>button]:font-bold [&>button]:cursor-pointer">
        <button onClick={() => setToggleComponent("create-post")}>
          Toggle CreatePost
        </button>
        <button onClick={() => setToggleComponent("update-post")}>
          Toggle UpdatePost
        </button>
        <button onClick={() => setToggleComponent("delete-post")}>
          Toggle DeletePost
        </button>
      </section>

      <br />
      {toggleComponent === "create-post" && <CreatePost />}
      <br />
      {toggleComponent === "update-post" && <UpdatePost />}
      <br />
      {toggleComponent === "delete-post" && <DeletePost />}
    </main>
  );
}

export default App;
