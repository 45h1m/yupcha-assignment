import React, { useEffect, useState } from "react";
import './style.css'

const FormViewer = () => {
    const [getting, setGetting] = useState(false);
    const [error, setError] = useState(null);
    const [forms, setForms] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    async function fetchForms() {
        try {
            setGetting(true);
            setError(null);

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const res = await fetch("http://localhost:80/api/forms", {
                method: "GET",
            });

            const data = await res.json();

            console.log(data);

            if (data.success) {
                data.data && setForms(data.data);
            } else if (data.error) {
                setError(data.error);
            }
        } catch (error) {
            console.log("Error submitting form:", error);
            setError("Error: " + error.message);
        } finally {
            setGetting(false);
        }
    }

    useEffect(() => {
        fetchForms();
    }, [openForm]);

    if(!openForm) return <button onClick={()=> setOpenForm(true)} className="transition cursor-pointer border-2 border-indigo-600 hover:bg-indigo-600 text-white py-2 px-4 rounded">View Saved Forms</button>;

    return (
        <div className="fixed z-30 top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-sm">
            <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Saved Forms</h2>
                    {getting && (
                        <div className="flex items-center">
                            <div className="size-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin mr-2"></div>
                            <span className="text-blue-200 text-sm">Loading...</span>
                        </div>
                    )}
                </div>

                {error && <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">{error}</div>}

                <div className={`space-y-2 max-h-96 overflow-y-auto pr-2 ${getting && "animate-pulse"}`}>
                    {forms?.length === 0 && !getting ? (
                        <p className="text-gray-400 text-center py-8">No saved forms found</p>
                    ) : (
                        forms?.map((form, index) => (
                            <details
                                key={index}
                                className="z-30 bg-gray-700 rounded-lg overflow-hidden transition-all duration-200 hover:bg-gray-600/70"
                            >
                                <summary className="flex items-center justify-between p-4 cursor-pointer select-none">
                                    <div className="flex items-center">
                                        <span className="font-medium text-white">{form.email}</span>
                                    </div>
                                    <svg className="dropdown-svg w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </summary>
                                <div className="p-4 pt-2 bg-gray-750 border-t border-gray-600">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-gray-400 text-sm">Name</p>
                                            <p className="text-white">{form.name || "—"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-gray-400 text-sm">Age</p>
                                            <p className="text-white">{form.age || "—"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-gray-400 text-sm">Gender</p>
                                            <p className="text-white">{form.gender || "—"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-gray-400 text-sm">Phone</p>
                                            <p className="text-white">{form.phone || "—"}</p>
                                        </div>
                                        <div className="col-span-2 space-y-1">
                                            <p className="text-gray-400 text-sm">Email</p>
                                            <p className="text-white">{form.email || "—"}</p>
                                        </div>
                                        <div className="col-span-2 space-y-1">
                                            <p className="text-gray-400 text-sm">Address</p>
                                            <p className="text-white">{form.address || "—"}</p>
                                        </div>
                                    </div>
                                </div>
                            </details>
                        ))
                    )}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        className="cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200"
                        onClick={() => setOpenForm(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormViewer;
