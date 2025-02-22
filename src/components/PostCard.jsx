import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";

function PostCard({ $id, title, featuredImage, description }) {
    return (
        <Link to={`/post/${$id}`}>
            <div
                className="w-full h-100 bg-white rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-200"
            >
                {/* Image Section */}
                <div className="shadow-lg px-3 py-2 w-full h-50 flex justify-center items-center overflow-hidden">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt="post-preview"
                        className="h-full w-full object-cover rounded-3xl"
                    />
                </div>

                {/* Content Section */}
                <div className="p-4">
                    <h3 className="text-2xl font-semibold truncate mb-2 ">
                        {title || "Untitled"}
                    </h3>
                    <p className="text-xl text-gray-600 mb-4">
                        {description || "A brief description of the post can be added here."}
                    </p>
                    {/* Action Button */}
                    <button className="w-full py-2 bg-lime-600 text-white font-semibold rounded-lg hover:bg-white hover:text-lime-600 hover:border transition-all duration-300">
                        Read More
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
