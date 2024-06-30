// controllers/placeController.js
const Place = require('../models/Place'); // Adjust the path as necessary

async function deletePlace(req, res)  {
    try {

        const { id } = req.params;
        console.log(id);
        await Place.findByIdAndDelete(id);
        res.status(200).json({ message: 'Place deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete place' });
    }
};

module.exports = {
    deletePlace
};