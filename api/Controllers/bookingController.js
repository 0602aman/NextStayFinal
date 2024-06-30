const Booking = require('../models/Bookings');
const { getUserDataFromReq } = require('./authController');

// async function createBooking(req, res) {
//      //const userData = await getUserDataFromReq(req);
//     // console.log("userData:", userData);
//     //console.log(req);
//     //console.log("userinside CreateBooking:", req.id);
//     const { place, guest, name, phone, email, checkIn, checkOut, price, user  } = req;
//     console.log("user:", user);
//     try {
//         const doc = await Booking.create({ place, guest, name, phone, email, checkIn, checkOut, price, userId: user });
//         console.log("booking response:", doc);
//         console.log(res);
//         res.json(doc);
//     } catch (error) {
//         console.error('Error creating booking:', error);
//         res.status(500).json({ error: 'Failed to create booking' });
//     }
// }
async function createBooking(req) {
    const { place, guest, name, phone, email, checkIn, checkOut, price, user } = req;
    try {
        const doc = await Booking.create({ place, guest, name, phone, email, checkIn, checkOut, price, userId: user });
        //console.log(doc);
        return doc;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;  // Rethrow the error to be handled by the caller
    }
}

async function getBookings(req, res) {
    try {
        const userData = await getUserDataFromReq(req);
        //console.log("userdata : ",userData);
        const bookings = await Booking.find({ userId: userData.id }).populate("place");
        res.json(bookings);
        //console.log("bookings data : ", bookings.length);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createBooking,
    getBookings,
};
