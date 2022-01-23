const { urlencoded } = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const News = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // it works like forgien key, link user to their notes table
        ref: 'user', //this is the schema name were we want to link this current schema
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    imageUrl: {
        type: String,

        default: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
    },
    newsUrl: {
        type: String,
        default: "www.google.com"
    },
    author: {
        type: String,
        default: "Swati"
    },
    source: {
        type: String,
        default: "Pepcoding"
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('news', News);