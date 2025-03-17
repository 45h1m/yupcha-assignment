const express = require('express');
const { getAllForms, handleFormSubmit } = require('../controllers/formController');
const Router = express.Router();

Router.post('/submit-form',handleFormSubmit)
Router.get('/forms', getAllForms)

module.exports = Router;