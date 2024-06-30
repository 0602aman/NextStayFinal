const Place = require('../models/Place');
const jwt = require('jsonwebtoken');
const { getUserDataFromReq } = require('./authController');
const jwtSecret = process.env.JWT_SECRET;

async function createPlace(req, res) {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, extraInfo, perks, checkIn, checkOut, maxGuest, price } = req.body;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) { throw err; }
            const placeDoc = await Place.create({
                owner: userData.id, title, address, photos: addedPhotos, description, extraInfo, perks, checkIn, checkOut, maxGuest, price
            });
            res.json(placeDoc);
        });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

async function getUserPlaces(req, res) {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                res.status(401).json({ error: "Unauthorized" });
            } else {
                const { id } = userData;
                const places = await Place.find({ owner: id });
                res.json(places);
            }
        });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

async function getPlaceById(req, res) {
    const { id } = req.params;
    res.json(await Place.findById(id));
}

async function updatePlace(req, res) {
    const { token } = req.cookies;
    const { id, title, address, addedPhotos, description, extraInfo, perks, checkIn, checkOut, maxGuest, price } = req.body;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) { throw err; }
            const placeDoc = await Place.findById(id);
            if (placeDoc.owner.toString() === userData.id) {
                placeDoc.set({ title, address, photos: addedPhotos, description, extraInfo, perks, checkIn, checkOut, maxGuest, price });
                await placeDoc.save();
                res.json("Updated Successfully");
            } else {
                res.status(401).json({ error: "Unauthorized" });
            }
        });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

async function getAllPlaces(req, res) {
    res.json(await Place.find());
}

module.exports = {
    createPlace,
    getUserPlaces,
    getPlaceById,
    updatePlace,
    getAllPlaces,
};
