import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
    return (
        <section className="relative overflow-hidden py-12 bg-gradient-to-r bg-cyan-950">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    {/* Logo and Copyright Section */}
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo
                                    className="w-36 md:w-48 lg:w-56 max-w-full h-auto hover:scale-105 transition-transform duration-300"
                                />

                            </div>
                            <div>
                                <p className="text-sm text-white opacity-80">
                                    &copy; Copyright 2023. All Rights Reserved by DevUI.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="w-full p-5 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-white opacity-90">
                                Company
                            </h3>
                            <ul>
                                {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item, index) => (
                                    <li key={index} className="mb-4">
                                        <Link
                                            className="text-base font-medium text-white hover:text-purple-300 transition-all duration-300 hover:pl-2"
                                            to="/"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Support Links */}
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-white opacity-90">
                                Support
                            </h3>
                            <ul>
                                {["Account", "Help", "Contact Us", "Customer Support"].map((item, index) => (
                                    <li key={index} className="mb-4">
                                        <Link
                                            className="text-base font-medium text-white hover:text-purple-300 transition-all duration-300 hover:pl-2"
                                            to="/"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-white opacity-90">
                                Legals
                            </h3>
                            <ul>
                                {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item, index) => (
                                    <li key={index} className="mb-4">
                                        <Link
                                            className="text-base font-medium text-white hover:text-purple-300 transition-all duration-300 hover:pl-2"
                                            to="/"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Decorative Element */}
                {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-blue-400 opacity-30"></div> */}
            </div>
        </section>
    );
}

export default Footer;