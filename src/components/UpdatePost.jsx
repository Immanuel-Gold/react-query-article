import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const UpdatePost = () => {
  const [bodyData, setBodyData] = useState({ title: "", body: "" });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["updateBlog"],
    mutationFn: async () => {
      try {
        return await axios.put(
          "https://jsonplaceholder.typicode.com/posts/1",
          body
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleChanges = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setBodyData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const submitData = (e) => {
    e.preventDefault();
    mutate(bodyData);
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error Found!</div>;
  if (isSuccess) return <div>Post Updated!</div>;
  return (
    <main>
      <form
        className="flex flex-col gap-y-[8px] [&_input]:h-[40px] [&_input]:p-[8px] [&_input]:border-black [&_input]:border-[1.5px]"
        onSubmit={submitData}
      >
        <div>
          <h3>Title</h3>
          <input type="text" onChange={handleChanges} />
        </div>
        <div>
          <div>Body</div>
          <input type="text" onChange={handleChanges} />
        </div>
        <button className="self-start bg-black text-white p-[12px]">
          Update post
        </button>
      </form>
    </main>
  );
};

export default UpdatePost;
