import React from 'react';
import { Mail, Phone } from 'lucide-react';

const ContactSupportSection = () => {
    return (
        <section className="relative overflow-hidden -mt-3 sm:mt-0 mx-auto" style={{ maxWidth: '1808px' }}>
            <div className="container relative z-10 py-12 my-8">
                <h1 className="text-4xl md:text-5xl font-bold pt-8 pb-2 mb-1">Besoin d’aide ?</h1>
                <p className="pb-2 lg:pb-3 mb-4 text-gray-600">Notre équipe est là pour vous accompagner</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 pb-2">
                    {/* Carte Email */}
                    <div className="sm:col-span-1 lg:col-span-1 xl:col-span-1">
                        <div className="h-full bg-white rounded-lg shadow-sm border p-4 md:p-6 flex flex-col">
                            <div className="flex-1">
                                <div className="mb-4">
                                    <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <Mail className="w-8 h-8 text-yellow-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold pb-2 mb-1">Écrivez-nous</h3>
                                <p className="text-gray-600 mb-0">
                                    Contactez-nous si vous rencontrez des difficultés avec notre service.
                                </p>
                            </div>
                            <div className="pt-4 md:pt-6">
                                <a
                                    className="w-full bg-[#D46328] text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-gray-800 transition-colors duration-200 block"
                                    href="mailto:support@ndc-travels.com"
                                >
                                    support@ndc-travels.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Carte Téléphone */}
                    <div className="sm:col-span-1 lg:col-span-1 xl:col-span-1">
                        <div className="h-full bg-white rounded-lg shadow-sm border p-4 md:p-6 flex flex-col">
                            <div className="flex-1">
                                <div className="mb-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Phone className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold pb-2 mb-1">Appelez-nous</h3>
                                <p className="text-gray-600 mb-0">
                                    Nous sommes disponibles pour répondre à toutes vos questions et besoins concernant nos services.
                                </p>
                            </div>
                            <div className="pt-4 md:pt-6">
                                <a
                                    className="w-full bg-[#024686] text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-gray-800 transition-colors duration-200 block"
                                    href="tel:4065550120"
                                >
                                    (406) 555-0120
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image de fond - Cachée sur mobile, visible sur grands écrans */}
            <div className="absolute top-0 right-0 h-full bg-gray-100 rounded-lg overflow-hidden hidden lg:block mr-4" style={{ width: '49%' }}>
                <img
                    src={"/contact-us.jpg"}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    alt="Équipe de support"
                />
            </div>
        </section>
    );
};

export default ContactSupportSection;
