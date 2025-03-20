import React, { useRef, useState } from "react";
import './style.css';

const MultiStepForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const nextButtonRef = useRef(null);
    const backButtonRef = useRef(null);

    async function handleFormSubmit(e) {
        e.preventDefault();

        console.log(formData);

        if (currentStep === 1) {
            setCurrentStep(2);
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const res = await fetch("api/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            console.log(data);

            if (data.success) {
                setSuccess(true);
            } else if(data.error) {
                setError(data.error);
            }
        } catch (error) {
            console.log("Error submitting form:", error);
            setError("Error: "+ error.message);
        } finally {
            setSubmitting(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handlePrevious(e) {
        e.preventDefault();
        setCurrentStep(1);
    }

    return (
        <>
            <div className={`bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md ${submitting ? "animate-pulse" : ""}`}>
                {success ? (
                    <div className="text-center py-8">
                        <div className="text-green-400 text-5xl mb-4">✓</div>
                        <h2 className="text-2xl font-bold mb-4">Submission Successful!</h2>
                        <p className="mb-6">Thank you for your submission.</p>
                        <button
                            onClick={() => {
                                setSuccess(false);
                                setCurrentStep(1);
                                setFormData({
                                    name: "",
                                    age: "",
                                    gender: "",
                                    email: "",
                                    phone: "",
                                    address: "",
                                });
                            }}
                            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition duration-300"
                        >
                            Submit Another Response
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-start items-center mb-6 flex-wrap gap-4">
                            {currentStep === 2 && <h1 className="text-2xl font-bold text-indigo-400 whitespace-nowrap animate-in">Contact Details</h1>}
                            {currentStep === 1 && <h1 className="text-2xl font-bold text-indigo-400 whitespace-nowrap animate-in">Personal Details</h1>}
                            {/* <div className="flex">
                                <div className={`whitespace-nowrap h-min px-2 py-1 rounded-full ${currentStep === 1 ? "bg-indigo-500" : "bg-gray-600"} mr-2`}>Step 1</div>
                                <div className={`w-8 rounded-full ${currentStep === 2 ? "bg-indigo-500" : "bg-gray-600"}`}>Step 2</div>
                            </div> */}
                            <div className="flex items-center w-full max-w-[9rem] ">
                                <span className={`w-5 h-1 bg-gradient-to-r from-transparent to-indigo-600`}></span>
                                <button onClick={()=> backButtonRef.current?.click()} className={`cursor-pointer transition duration-200 z-0 size-7 text-sm active:ring-4 flex justify-center items-center font-semibold rounded-full bg-indigo-500 ${currentStep === 1 ? "ring-4 ring-indigo-400" : ""}`}>1</button>
                                <span className={`transition duration-200 flex-1/3 h-1 ${currentStep === 2 ? "bg-indigo-600" : "bg-gray-700"}`}></span>
                                <button onClick={()=> nextButtonRef.current?.click()} className={`cursor-pointer transition duration-200 size-7 text-sm active:ring-4 flex justify-center items-center font-semibold rounded-full ${currentStep === 2 ? "bg-indigo-500 ring-4 ring-indigo-400" : "bg-gray-600"}`}>2</button>
                            </div>
                        </div>

                        {currentStep === 1 ? (
                            <form id="first-form" onSubmit={handleFormSubmit} className="animate-in">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                            Name
                                        </label>
                                        <input
                                            value={formData.name}
                                            onChange={handleChange}
                                            id="name"
                                            name="name"
                                            type="text"
                                            pattern="^[A-Za-z\s]{4,}$"
                                            title="Name must be at least 4 characters long and at most 30 characters and contain only letters and spaces."
                                            placeholder="Enter your name"
                                            required
                                            maxLength={30}
                                            minLength={4}
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">
                                            Age
                                        </label>
                                        <input
                                            value={formData.age}
                                            onChange={handleChange}
                                            id="age"
                                            name="age"
                                            type="number"
                                            required
                                            placeholder="Enter your age"
                                            max={100}
                                            min={12}
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1">
                                            Gender
                                        </label>
                                        <select
                                            required
                                            id="gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className=" w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                        >
                                            <option className="bg-gray-800" value="">Select gender</option>
                                            <option className="bg-gray-800" value="male">Male</option>
                                            <option className="bg-gray-800" value="female">Female</option>
                                            <option className="bg-gray-800" value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="pt-4">
                                        <button
                                        ref={nextButtonRef}
                                            type="submit"
                                            className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
                                        >
                                            Next Step
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <form id="second-form" onSubmit={handleFormSubmit} >
                                <div className="space-y-4 animate-in">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                            Email
                                        </label>
                                        <input
                                            value={formData.email}
                                            onChange={handleChange}
                                            name="email"
                                            id="email"
                                            type="email"
                                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                            title="Enter a valid email address, at least 6 characters long and at most 30 characters."
                                            required
                                            placeholder="Enter your email"
                                            maxLength={30}
                                            minLength={6}
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                                            Phone
                                        </label>
                                        <input
                                            value={formData.phone}
                                            onChange={handleChange}
                                            name="phone"
                                            id="phone"
                                            type="tel"
                                            pattern="^\d{10}$"
                                            title="Phone number must be 10 digits, without country code or '0'"
                                            required
                                            placeholder="Enter your phone number"
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                                            Address
                                        </label>
                                        <textarea
                                            value={formData.address}
                                            onChange={handleChange}
                                            id="address"
                                            name="address"
                                            required
                                            placeholder="Enter your address"
                                            title="Enter a valid address, minimum 5 characters, maximum 50 characters"
                                            maxLength={50}
                                            minLength={5}
                                            rows={3}
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                                        />
                                    </div>
                                    <div className="pt-4 flex space-x-3">
                                        <button
                                            ref={backButtonRef}
                                            type="button"
                                            onClick={handlePrevious}
                                            className="cursor-pointer flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="cursor-pointer flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
                                            disabled={submitting}
                                        >
                                            {submitting ? (
                                                <svg
                                                    className="animate-spin h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                "Submit"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </>
                )}
                {error && <p className="text-red-200 text-sm mt-3 border border-red-600 bg-red-900/30 py-2 px-4 rounded-md">{error}</p>}
            </div>
        </>
    );
};

export default MultiStepForm;
