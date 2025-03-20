import React, { useState } from "react";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm";
import FormViewer from "./components/FormViewer/FormViewer";

const App = () => {
    const [formViewerOpen, setFormViewerOpen] = useState(false);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-4">
            <MultiStepForm />
            <div className="fixed top-0 w-full p-4 flex justify-between items-center max-w-3xl mx-auto border-b border-gray-800">
              <p><strong>Yupcha</strong> <span className="text-gray-300">Assignment</span></p>
                <FormViewer open={formViewerOpen} />
            </div>
        </div>
    );
};

export default App;
