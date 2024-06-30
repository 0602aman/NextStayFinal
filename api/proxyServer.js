const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.get('/google-userinfo', async (req, res) => {
  const accessToken = req.query.access_token;
  try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});

app.listen(4001, () => {
  console.log('Proxy server is running on port 4001');
});
