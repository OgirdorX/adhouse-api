const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    low: { type: Date, default: null }
}, { timestamps: true });

// userSchema.index({
//     name: 'text'
// });

module.exports = mongoose.model('User', userSchema);