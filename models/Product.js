const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    margin: {
        type: Number,
        required: true
    },
    sales: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    campaign: {
        type: String,
        required: true
    },
    low: { type: Date, default: null }
}, { timestamps: true });

productSchema.index({
    name: 'text'
});

module.exports = mongoose.model('Product', productSchema);