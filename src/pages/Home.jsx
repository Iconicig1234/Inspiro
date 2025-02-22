import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JoinCommunity from '../components/JoinCommunity'
import TechCommunity from '../components/TechCommunity'
import BlogInsights from "../components/BlogInsights";
import { useSelector } from 'react-redux'

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (authStatus === false) {
    return (
      <div className="w-full py-30">
        <Container>
          <div className="text-center justify-items-center">
            <h1 className="text-4xl font-bold text-cyan-950 mb-4 animate-pulse">
              Login to Read Posts
            </h1>
            <p className="text-lg text-cyan-950">
              Access exclusive posts and content by logging in!
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative w-full py-12 bg-cyan-950">
      {/* Tagline Section */}
      <div className="relative text-center mb-16">
        <h1
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-lime-600 to-blue-500 animate-gradient-text drop-shadow-lg"
        >
          Empower Ideas For Everyone
        </h1>
        <p
          className="mt-4 text-xl text-gray-200 opacity-90 tracking-wide animate-fade-in-up"
        >
          Share your thoughts, connect with others, and discover amazing content!
        </p>
        <div
          className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-lime-400 rounded-full animate-bounce"
        />
      </div>

      <Container>
        <div>
          <Slider {...settings}>
            {posts.map((post) => (
              <div
                className="relative rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
                key={post.$id}
              >
                <div className="overflow-hidden rounded-t-lg">
                  <PostCard {...post} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>

      <div className="w-full mt-16 flex justify-center">
        <div className="w-full px-5">
          <JoinCommunity />
        </div>
      </div>

      <div className="w-full mt-16 flex justify-center">
        <div className="w-full px-5">
          <TechCommunity />
        </div>
      </div>

      <div className="w-full mt-16 flex justify-center">
        <div className="w-full px-5">
          <BlogInsights />
        </div>
      </div>
    </div>
  );
}

export default Home;


//problem --> edit, name of author on postcard and post.
