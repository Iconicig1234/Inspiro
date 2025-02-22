import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import placeholderImage from "../assets/joinPic.png";
import placeholderImage3 from "../assets/joinPic3.png";
import placeholderImage2 from "../assets/joinPic4.png";

const JoinCommunity = () => {
    const navigate = useNavigate();
    const controls = useAnimation(); // Animation controls

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of image URLs
    const imageUrls = [
        placeholderImage,
        placeholderImage2,
        placeholderImage3
    ];

    // Animation sequence for the images
    useEffect(() => {
        const sequence = async () => {
            while (true) {
                // Slide up and stay for 5 seconds
                await controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
                await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 5 seconds

                // Slide down and disappear
                await controls.start({ opacity: 0, y: 50, transition: { duration: 1 } });
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Short delay before next image

                // Update image index
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
            }
        };

        sequence(); // Start the animation sequence
    }, [controls, imageUrls.length]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <motion.div
            className="bg-gradient-to-r from-green-600 via-blue-600 to-teal-600 text-white py-16 px-8 shadow-xl rounded-lg"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
        >
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <motion.div
                    className="mt-10 flex justify-center"
                    initial="hidden"
                    whileInView="visible"
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 1, ease: "easeOut" },
                        },
                    }}
                    viewport={{ once: true }}
                    animate={controls}
                >
                    <img
                        src={imageUrls[currentImageIndex]} // Dynamically use the current image
                        alt="Join Community"
                        className="w-full max-w-sm md:max-w-md h-auto object-contain"
                    />
                </motion.div>

                {/* Text Section */}
                <div className="flex-1 justify-center text-center justify-items-center">
                    <motion.h2
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        Join Our Blogging Community
                    </motion.h2>
                    <p className="text-lg md:text-xl mb-8 leading-relaxed">
                        Share your thoughts, explore new ideas, and connect with amazing
                        people. Whether you're starting your first post or you're a seasoned
                        writer, you're welcome here.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate("/add-post")}
                            className="bg-white text-green-600 font-semibold py-3 px-6 rounded-full shadow hover:bg-blue-600 hover:text-white transition"
                        >
                            Create Your Blog
                        </button>
                        <button
                            className="bg-transparent border border-white text-white font-semibold py-3 px-6 rounded-full shadow hover:bg-white hover:text-green-600 transition"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default JoinCommunity;
