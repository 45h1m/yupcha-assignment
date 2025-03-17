let savedForms = [];
function saveForm(data) {

    if(!data) return;

    if(savedForms.some(form => form.email === data.email)) {
        return {success: false, error: "Email already exists"}
    }
    
    savedForms.push(data);

    return {success: true, message: "Form saved successfully", data};
}

function getSavedForms() {
    return savedForms;
}

module.exports = {saveForm, getSavedForms};