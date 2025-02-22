import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ele5 from '../assets/element5.png';

const TechCommunity = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 }); // Trigger animation when in view

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.3 },
        },
    };

    const elementVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeInOut" } },
    };

    const slideFromLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeInOut" } },
    };

    const slideFromRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeInOut" } },
    };

    // Floating bubbles animation variants
    const bubbleVariants = {
        hidden: { opacity: 0, y: 50, scale: 0 },
        visible: {
            opacity: 0.4,
            y: -200,
            scale: 1,
            transition: {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
            },
        },
    };

    return (
        <motion.div
            ref={ref} // Attach the ref to the container
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-20 px-8 shadow-2xl rounded-lg overflow-hidden relative"
            initial="hidden"
            animate={inView ? "visible" : "hidden"} // Animate only when in view
            variants={containerVariants}
        >

            {/* Floating Bubbles */}
            {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                    key={index}
                    className="absolute bg-white rounded-full opacity-70 blur-xl"
                    style={{
                        width: `${Math.random() * 60 + 20}px`, // Random width between 20px and 80px
                        height: `${Math.random() * 60 + 20}px`, // Random height between 20px and 80px
                        top: `${Math.random() * 100}%`, // Random top position
                        left: `${Math.random() * 100}%`, // Random left position
                    }}
                    initial="hidden"
                    animate="visible"
                    variants={bubbleVariants}
                />
            ))}


            <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                {/* Text Section */}
                <div className="justify-items-center text-center flex-1 md:text-left">
                    <motion.h2
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Discover Technical Insights
                    </motion.h2>
                    <p className="text-lg md:text-xl mb-8 leading-relaxed text-center">
                        Dive into a world of interview preparation and technical blogs tailored for top tech companies. Share your knowledge and gain insights from experts.
                    </p>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <button
                            className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-full shadow hover:bg-purple-600 hover:text-white transition"
                            onClick={() => console.log("Navigate to posts")}
                        >
                            Read Blogs
                        </button>
                        <button
                            className="bg-transparent border border-white text-white font-semibold py-3 px-6 rounded-full shadow hover:bg-white hover:text-purple-600 transition"
                            onClick={() => console.log("Navigate to write")}
                        >
                            Write a Post
                        </button>
                    </div>
                </div>

                {/* Empty Placeholder for Left Space */}
                <div className="flex-1 hidden md:flex items-center justify-center">
                    <motion.div
                        className="flex justify-center relative w-full max-w-md h-auto"
                        variants={slideFromRight}
                    >
                        <img
                            src={ele5}
                            alt="Technical Blogging"
                            className="w-full max-w-sm md:max-w-md h-115 object-contain"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>

    );
};

export default TechCommunity;


