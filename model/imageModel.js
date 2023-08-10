const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    imageName: String,

});

const Test = mongoose.model('Test', userSchema);

module.exports = {
    Test
}