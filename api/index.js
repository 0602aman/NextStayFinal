require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/Users');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const imageDownloader = require('image-downloader');
const nodemailer = require('nodemailer');
const axios = require("axios");
const CryptoJS = require("crypto-js");
const sha256 = require('sha256');
const crypto = require('crypto');


const authController = require('./controllers/authController');
const placeController = require('./controllers/placeController');
const bookingController = require('./controllers/bookingController');
const aiController = require('./controllers/aiController');
const userController = require('./controllers/userController');
const deleteController = require('./controllers/deleteController');

const app = express();
app.use(express.json());
app.use('/uploads', express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: 'https://next-stay-final-frontend.vercel.app/',
}));

const mongoURI = process.env.MONGO_URL;

if (!mongoURI) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.post('/register', authController.register);
app.post('/login', authController.login);
app.get('/profile', authController.profile);
app.post('/logout', authController.logout);


app.post("/upload-by-link", async (req, res) => {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
        url: link,
        dest: __dirname + "\\uploads\\" + newName,
    });
    res.json(__dirname + "\\uploads\\" + newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath);
    }
    res.json(uploadedFiles);
});

app.post("/places", placeController.createPlace);
app.get("/user-places", placeController.getUserPlaces);
app.get("/places/:id", placeController.getPlaceById);
app.put("/places", placeController.updatePlace);
app.get("/places", placeController.getAllPlaces);
app.delete("/places/:id", deleteController.deletePlace); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const sendThankYouEmail = (to, name, bookingDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Thank you for booking!',
        text: `Dear ${name},\n\nThank you for booking with us. Here are your booking details:\n${bookingDetails}\n\nBest regards,\nYour Company`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
    //console.log("Auth user request:", req);
    const userId = req.header('user-id');
    //console.log("userId:", userId);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};


app.post("/bookings", authenticateUser, async (req, res) => {
    try {
        const booking = await bookingController.createBooking(req.body);
        console.log("bookingData:", booking);
        sendThankYouEmail(req.user.email, req.user.name, JSON.stringify(req.body));
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



app.get("/bookings", bookingController.getBookings);

app.post('/api/ai', aiController.generateContent);

app.put("/users/toggleFavorite/:placeId", userController.toggleFavorite);
app.get('/user/favorites', userController.getUserFavorites);





app.post('/api/pay', async (req, res) => {
    try{
    console.log("aman");
    console.log("saxena");
    const { transactionid, payload } = req.body;
    console.log("payload from ui:", payload);
    console.log("transactionid:", transactionid);
  
    const dataPayload = JSON.stringify(payload);
    console.log("dataPayload:", dataPayload);
    const dataBase64 = Buffer.from(dataPayload).toString("base64");
    console.log("dataBase64:", dataBase64);
    const key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"
    const keyIndex = 1
  
    const fullURL = dataBase64 + "/pg/v1/pay" + key;
    console.log("fullURL:", fullURL);
    const dataSha256 = crypto.createHash('sha256').update(fullURL).digest('hex');
    console.log("dataSha256:", dataSha256);
  
    const checksum = dataSha256 + "###" + keyIndex;
    console.log("checksum:", checksum);
  
    const UAT_PAY_API_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
      
  
    
      const option = {
        method: "POST",
        url: UAT_PAY_API_URL,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
          },
          data: {
            request: dataBase64
          }
        };
        axios.request(option).then(function(response) {
            return res.status(200).json(response.data.data.instrumentResponse.redirectInfo.url);
        }).catch(function (error) {
            console.error(error)
        })
    }catch(error) {
        
        res.status(500).send({ message: error.message, success: false });
    }
            
    });

    app.post("/api/status",(req,res)=>{
        console.log("status request:", req.body);
        res.status(200).send({ message: "Payment successful", success: true }); 
    })




app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
