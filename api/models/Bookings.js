const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    place: {type: mongoose.Schema.Types.ObjectId, ref: "Place", required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    guest: {type: Number, required: true},
    name: {type: String, required: true},
    phone: {type: Number, required: true},
    email: {type: String, required: true},
    price: {type: Number, required: true}
})

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;