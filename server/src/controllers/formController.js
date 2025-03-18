const { saveForm, getSavedForms } = require("./dbController");

function handleFormSubmit(req, response) {
    const data = req.body;

    console.log(data);

    if(!data.name) {
        return response.status(400).json({ success: false, error: "Name is required" });
    } else {
        data.name = data.name.trim();
        if(data.name.length < 4) {
            return response.status(400).json({ success: false, error: "Name must be at least 4 characters long" });
        }
        if(data.length > 40) {
            return response.status(400).json({ success: false, error: "Name must be at most 40 characters long" });
        }
    }

    if(!data.email) {
        return response.status(400).json({ success: false, error: "Email is required" });
    } else {
        data.email = data.email.trim();
        if(data.email.length < 6) { 
            return response.status(400).json({ success: false, error: "Email must be at least 6 characters long" });
        }
        if(data.email.length > 30) {
            return response.status(400).json({ success: false, error: "Email must be at most 30 characters long" });
        }
        const isValidEmail = data.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(!isValidEmail) {
            return response.status(400).json({ success: false, error: "Invalid email" });
        }
    }

    if(!data.phone) {
        return response.status(400).json({ success: false, error: "Phone number is required" });
    } else {
        data.phone = data.phone.trim();
        if(data.phone.match(/[^0-9]/)) {
            return response.status(400).json({ success: false, error: "Phone number must be numeric" });
        }
        if(data.phone.length !== 10) {
            return response.status(400).json({ success: false, error: "Phone number must be 10 digits long" });
        }
    }

    if(!data.address) {
        return response.status(400).json({ success: false, error: "Address is required" });
    } else {
        data.address = data.address.trim();
        if(data.address.length < 5) {
            return response.status(400).json({ success: false, error: "Address must be at least 5 characters long" });
        }
        if(data.address.length > 50) {
            return response.status(400).json({ success: false, error: "Address must be at most 50 characters long" });
        }
    }

    if(!data.age) {
        return response.status(400).json({ success: false, error: "Age is required" });
    } else {
        data.age = data.age.trim();
        if(data.age.match(/[^0-9]/)) {
            return response.status(400).json({ success: false, error: "Age must be numeric" });
        }
        if(parseInt(data.age) < 12 || data.age > 100) {
            return response.status(400).json({ success: false, error: "Age must be less than or equal to 100 and greater than or equal to 12" });
        }
    }

    if(!data.gender) {
        return response.status(400).json({ success: false, error: "Gender is required" });
    } else {
        data.gender = data.gender.trim();
        if(data.gender !== "male" && data.gender !== "female" && data.gender !== "other") {
            return response.status(400).json({ success: false, error: "Gender must be at most 20 characters long" });
        }
    }

    const result = saveForm(data);

    if (result.error) {
        console.log("Failed saving form data: " + result.error);
        return response.status(400).json({ success: false, error: result.error });
    }

    if (result.success) {
        response.status(200).json({ success: true, message: "Form submitted successfully", data: result.data });
    }
}

function getAllForms(req, res) {
    console.log("Getting all forms");

    const data = getSavedForms();

    res.status(200).json({ success: true, data });
}

module.exports = {
    handleFormSubmit,
    getAllForms,
};
