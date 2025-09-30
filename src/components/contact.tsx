'use client'

import React, { useState, ChangeEvent } from 'react';
import Link from "next/link";
import Image from "next/image";

interface FormData {
    fullName: string;
    email: string;
    message: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    message?: string;
}

const ContactFormSection: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Veuillez entrer votre nom complet !';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Veuillez fournir une adresse email valide !';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Veuillez fournir une adresse email valide !';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Veuillez écrire votre message !';
        }

        return newErrors;
    };

    const handleSubmit = (): void => {
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            // Form is valid, handle submission
            console.log('Formulaire soumis:', formData);
            setIsSubmitted(true);
            // Reset form after successful submission
            setTimeout(() => {
                setFormData({ fullName: '', email: '', message: '' });
                setIsSubmitted(false);
            }, 3000);
        } else {
            setErrors(newErrors);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent): void => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit();
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py">
            {/* Introduction + Téléphone */}
            <div className="md:col-span-5 lg:col-span-6 mb-12 md:mb-0">
                <Link href="/" className="navbar-brand py-1 py-md-2 py-xl-1 me-2 me-sm-n4 me-md-n5 me-lg-0 flex items-center mb-10">
                    <Image alt={"NDC Travels"} width={100} height={100} src={"/appIcon.png"} className={'w-[50px] h-auto'} />
                    <Image alt={"NDC Travels"} width={100} height={100} src={"/ndc.png"} className={'w-[70px] h-auto'} />
                </Link>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Contactez-nous
                </h1>
                <p className="text-gray-600 pb-6 md:pb-0 mb-8 md:mb-12 max-w-md leading-relaxed">
                    Écrivez-nous si vous rencontrez des difficultés dans l&#39;utilisation du service.
                    Nous sommes ouverts à la communication et souhaitons en savoir plus sur ceux qui nous font confiance.
                </p>

                {/* Téléphone */}
                <div className="flex items-center">
                    <div className="relative flex-shrink-0 bg-gray-100 rounded-full" style={{ width: '90px', height: '90px' }}>
                        <img
                            src="/conatcts.jpg"
                            className="rounded-full p-1"
                            alt="Avatar support"
                            style={{ width: '90px', height: '90px' }}
                        />
                        {/* Border overlay */}
                        <span className="absolute top-0 left-0 w-full h-full border-4 border-white rounded-full"></span>

                        {/* Online status indicator */}
                        <div className="absolute flex items-center justify-center z-10" style={{ right: '0px', bottom: '0px', width: '16px', height: '16px', margin: '0 9px 3px 0' }}>
                            <span className="absolute top-0 left-0 w-full h-full bg-white rounded-full"></span>
                            <span className="relative z-10 bg-success rounded-full" style={{ width: '12px', height: '12px' }}></span>
                        </div>
                    </div>
                    <div className="pl-6">
                        <h5 className="text-lg font-semibold mb-2">Des questions ?</h5>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                            <span>Appelez-nous dès maintenant</span>
                            <a
                                className="text-blue-600 hover:text-blue-800 font-semibold border-b border-transparent hover:border-blue-600 transition-colors duration-200"
                                href="tel:+33753368798"
                                aria-label="Numéro de téléphone"
                            >
                                +(33) 753 368 798
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulaire de contact */}
            <div className="md:col-span-7 lg:col-span-6">
                <div className="relative bg-white rounded-3xl p-1">
                    <div className="relative z-10 p-8 lg:p-12">
                        <h2 className="text-xl font-semibold mb-8">Restons en contact !</h2>

                        {isSubmitted && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800" role="alert">
                                Merci ! Votre message a été envoyé avec succès.
                            </div>
                        )}

                        <div onKeyDown={handleKeyPress}>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-4 text-lg border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors duration-200 ${
                                        errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-300'
                                    }`}
                                    placeholder="Nom complet *"
                                    aria-label="Nom complet"
                                    aria-required="true"
                                    aria-invalid={!!errors.fullName}
                                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                                />
                                {errors.fullName && (
                                    <div id="fullName-error" className="mt-2 text-red-600 text-sm" role="alert">
                                        {errors.fullName}
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-4 text-lg border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors duration-200 ${
                                        errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
                                    }`}
                                    placeholder="Email *"
                                    aria-label="Adresse email"
                                    aria-required="true"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                />
                                {errors.email && (
                                    <div id="email-error" className="mt-2 text-red-600 text-sm" role="alert">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="mb-8">
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-4 text-lg border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none resize-vertical transition-colors duration-200 ${
                        errors.message ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Votre message *"
                    aria-label="Votre message"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                />
                                {errors.message && (
                                    <div id="message-error" className="mt-2 text-red-600 text-sm" role="alert">
                                        {errors.message}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-[#024686] rounded-3 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors duration-200 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitted}
                                aria-label={isSubmitted ? 'Message envoyé' : 'Envoyer le formulaire de contact'}
                            >
                                {isSubmitted ? 'Envoyé !' : 'Envoyer le formulaire'}
                            </button>
                        </div>
                    </div>

                    {/* Decorative border */}
                    <span className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-3xl opacity-50 pointer-events-none"></span>
                </div>
            </div>
        </div>
    );
};

export default ContactFormSection;