import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import guide from '../assets/guide.jpg';
import guide2 from '../assets/guide2.jpg';
import guide3 from '../assets/guide3.jpg'

const BlogGrowthComponent = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.3 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    };

    return (
        <motion.div
            ref={ref}
            className="bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-400 text-white py-13 px-8 md:px-16 shadow-2xl rounded-lg overflow-hidden relative"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 leading-13">
                Learn how to grow your <br /> blog from the experts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                    className="bg-white text-gray-900 rounded-xl shadow-lg p-6"
                    variants={cardVariants}
                >
                    <img
                        src={guide}
                        alt="Guide to Starting a Blog"
                        className="w-full h-50 rounded-md mb-4"
                    />
                    <h3 className="text-2xl font-semibold mb-2">The ultimate guide to starting a blog</h3>
                    <p className="text-sm text-gray-700">
                        Everything you need to know about launching a successful blog from scratch.
                    </p>
                </motion.div>
                <motion.div
                    className="bg-white text-gray-900 rounded-xl shadow-lg p-6"
                    variants={cardVariants}
                >
                    <img
                        src={guide2}
                        alt="Promoting Your Blog"
                        className="w-full h-50 rounded-md mb-4"
                    />
                    <h3 className="text-2xl font-semibold mb-2">Unique tips for promoting your blog</h3>
                    <p className="text-sm text-gray-700">
                        Discover creative ways to grow your audience and increase engagement.
                    </p>
                </motion.div>
                <motion.div
                    className="bg-white text-gray-900 rounded-xl shadow-lg p-6"
                    variants={cardVariants}
                >
                    <img
                        src={guide3}
                        alt="Monetizing Your Blog"
                        className="w-full h-50 rounded-md mb-4"
                    />
                    <h3 className="text-2xl font-semibold mb-2">Profitable strategies for monetizing your blog</h3>
                    <p className="text-sm text-gray-700">
                        Learn how to turn your blog into a source of income with proven methods.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BlogGrowthComponent;
