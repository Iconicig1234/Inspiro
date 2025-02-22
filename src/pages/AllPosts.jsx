import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";

function AllPost() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((post) => {
      if (post) {
        setPost(post.documents);
      }
    });
  }, []);

  if (post.length === 0) {
    return (
      <div className="w-full py-12 bg-gradient-to-b from-blue-100 to-indigo-200 min-h-screen flex items-center justify-center">
        <Container>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in">
              Login to Read Posts
            </h1>
            <p className="text-gray-600 text-lg text-center max-w-lg">
              Join us and unlock access to a world of knowledge and stories
              crafted by our talented authors.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-lime-800 min-h-screen">
      <Container>
        <div className="flex flex-wrap justify-center gap-6">
          {post.map((post) => (
            <div
              className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transform transition-transform duration-300 hover:scale-105"
              key={post.$id}
            >
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
                <PostCard {...post} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
