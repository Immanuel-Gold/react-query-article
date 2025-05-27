import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const CreatePost = () => {
  const [bodyData, setBodyData] = useState({ title: "", body: "" });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["postBlog"],
    mutationFn: async () => {
      try {
        return await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          body
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleChanges = () => {
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
  
  if (isSuccess) return <div>New Post Created!</div>;
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error Found!</div>;
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
          Create new post
        </button>
      </form>
    </main>
  );
};
export default CreatePost;
