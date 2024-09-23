const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
    // pdf: {
    //     type: String,
    //     required: true
    // },
    
    // title: {
    //     type: String,
    //     required: true
    // },

    // New fields for name, email, and NIC
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    
    nic: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("pdfDetails", pdfSchema);
