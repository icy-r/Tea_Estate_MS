import mongoose from "mongoose";

    const Schema = mongoose.Schema;

    const fertilizerSchema = new Schema({
    
//id string pk
 // name string
  //cropStage string
  //type string
 // fertilizers string
  //applicationRate double
  //laborsRequired int

        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        cropStage: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        fertilizers: {
            type: String,
            required: true
        },
        applicationRate: {
            type: Number,
            required: true
        },
        laborsRequired: {
            type: Number,
            required: true
        }
    });

    const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema)

    export { Fertilizer }

   

