import { useState, useEffect } from "react";
import selfPic from '../assets/selfPic.jpeg';
import appwriteService from '../appwrite/config'
import PostCard from '../components/PostCard'
import { useSelector } from "react-redux";

function UserProfile() {
    const [post, setPost] = useState([]);

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        appwriteService.getPosts([]).then((allPosts) => {
            if (allPosts) {
                // Filter posts authored by the current user
                const userPosts = allPosts.documents.filter(
                    (post) => post.userId === userData.$id
                );
                setPost(userPosts);
            }
        });
    }, []);


    return (
        <div className="flex flex-col items-center bg-gradient-to-r bg-cyan-950 min-h-screen text-white p-6">
            {/* User Profile Section */}
            <div className="w-full max-w-3xl bg-cyan-900 rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                        <img
                            src={selfPic}
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{userData?.name}</h1>
                        <p className="text-gray-400">{userData?.email}</p>
                    </div>
                </div>
            </div>

            {/* User Posts Section */}
            <div className="w-full max-w-5xl bg-cyan-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-600 pb-2 text-center">
                    Your Posts
                </h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {post.length > 0 ? (
                        post.map((post) => (
                            <div
                                className="p-4 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 transform transition-transform duration-300 hover:scale-105"
                                key={post.$id}
                            >
                                <div className="bg-white text-black rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
                                    <div className="h-64 w-full">
                                        <PostCard {...post} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 col-span-full">
                            No posts found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
