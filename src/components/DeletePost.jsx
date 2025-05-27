import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const DeletePost = () => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["deleteBlog"],
    mutationFn: async () => {
      try {
        return await axios.delete(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  const deletePost = () => {
    mutate();
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error Found!</div>;
  if (isSuccess) return <div>Post Deleted!</div>;
  return (
    <main>
      <button
        onClick={deletePost}
        className="bg-black text-white text-[1.2rem] p-[8px] cursor-pointer"
      >
        Delete Post
      </button>
    </main>
  );
};
export default DeletePost;