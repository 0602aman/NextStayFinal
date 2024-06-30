const User = require('../models/Users');
const { getUserDataFromReq } = require('./authController');

async function toggleFavorite(req, res) {
    const placeId = req.params.placeId;
    const userData = await getUserDataFromReq(req);

    try {
        const user = await User.findById(userData.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const index = user.favorites.indexOf(placeId);
        if (index === -1) {
            user.favorites.push(placeId);
            console.log("Added to favorites");
        } else {
            user.favorites.splice(index, 1);
            console.log("Removed from favorites");
        }

        await user.save();
        res.json(user);
    } catch (error) {
        console.error("Error toggling favorite:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getUserFavorites(req, res) {
    const userData = await getUserDataFromReq(req);

    try {
        const user = await User.findById(userData.id).populate('favorites');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user favorites:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    toggleFavorite,
    getUserFavorites,
};
