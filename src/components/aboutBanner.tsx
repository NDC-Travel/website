import React from 'react';
import { Star } from 'lucide-react';

const AboutHeroSection: React.FC = () => {
    return (
        <section className="container pt-8 sm:pt-12  mt-4 lg:mt-8 xl:mt-12">
            <div className="flex flex-col md:flex-row items-center justify-center">

                {/* Image */}
                <div className="w-3/4 sm:w-7/12 md:w-5/12 pb-4 sm:pb-0 mt-4 sm:mt-0 md:mb-0">
                    <div className="relative">
                        {/* Decorative search icon overlay */}
                        <img
                            src={'/logo.jpg'}
                            className="absolute z-10 text-blue-600 rounded-full"
                            style={{ top: '30.3%', right: '29%', width: '25.25%', height: '23.32%' }}
                            />

                        {/* Main image with aspect ratio container */}
                        <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '526/556' }}>
                            <img
                                src="/about.png"
                                alt="Équipe Finder en croissance"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="md:w-7/12 xl:w-1/2 xl:ml-16 text-center md:text-left">
                    <div className="md:pl-6 lg:pl-8 xl:pl-0">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold pb-2 md:pb-4 lg:pb-6 xl:pb-8 leading-tight">
                            NDC Travels
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-600 pb-4 lg:pb-6 xl:pb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
                            Une agence de voyages et de services internationaux qui met au cœur de son activité la fiabilité, la proximité et la satisfaction de ses clients.
                        </p>

                        {/* Google Rating */}
                        <div className="flex items-center justify-center">
                            {/* Google Logo */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                fill="none"
                                className="mr-2"
                                viewBox="0 0 28 28"
                            >
                                <path
                                    d="M25.176 14.273c0-.79-.064-1.585-.201-2.362h-10.97v4.479h6.281c-.129.715-.401 1.397-.8 2.005a5.38 5.38 0 0 1-1.524 1.529v2.905h3.747c2.202-2.024 3.465-5.017 3.465-8.555h.001z"
                                    fill="#4285f4"
                                />
                                <path
                                    d="M14.008 25.636c3.136 0 5.782-1.029 7.709-2.807l-3.748-2.906c-1.043.709-2.388 1.111-3.957 1.111-3.033 0-5.607-2.046-6.53-4.799H3.614v2.996a11.63 11.63 0 0 0 10.394 6.405z"
                                    fill="#34a853"
                                />
                                <path
                                    d="M7.476 16.235c-.487-1.444-.487-3.009 0-4.453V8.785H3.612a11.64 11.64 0 0 0 0 10.445l3.864-2.996v.001z"
                                    fill="#fbbc04"
                                />
                                <path
                                    d="M14.008 6.979a6.32 6.32 0 0 1 4.461 1.743l3.32-3.32a11.18 11.18 0 0 0-7.782-3.025A11.63 11.63 0 0 0 3.614 8.785l3.864 2.998c.918-2.757 3.495-4.804 6.53-4.804z"
                                    fill="#ea4335"
                                />
                            </svg>

                            <div className="text-sm font-semibold text-gray-900 mr-6">
                                Google
                            </div>

                            {/* Star Rating */}
                            <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                            <div className="text-sm font-semibold text-gray-900">
                                4,9
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHeroSection;