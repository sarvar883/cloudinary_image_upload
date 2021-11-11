const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = Schema({
  picture: {
    name: String,
    url: String,
    cloudinary_public_id: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);