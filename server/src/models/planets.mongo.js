
const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true
    },
    // keplerId: {
    //     type: String,
    //     required: true
    // },
    // koiName: {
    //     type: String,
    //     required: true
    // },
    // koiDispostion: {
    //     type: String,
    //     required: true
    // },
    // koiInsol: {
    //     type: Number,
    //     required: true
    // },
    // koiPrad: {
    //     type: Number,
    //     required: true
    // },
    // koiSrad: {
    //     type: Number,
    //     required: true
    // },
    // keplerMag: {
    //     type: Number,
    //     required: true
    // },
    // koiPeriod: {
    //     type: Number,
    //     required: true
    // }
});

const Planets = mongoose.model('Planet', planetsSchema);

module.exports = Planets