const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const campaignSchema = new Schema({
    intro: {
        type: String,
        required: true
    },
    brief: {
        type: Number,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    low: { type: Date, default: null }
}, { timestamps: true });

// campaignSchema.index({
//     name: 'text'
// });

module.exports = mongoose.model('Campaign', campaignSchema);