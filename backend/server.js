require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    //origin: 'http://127.0.0.1:5500/frontend/index.html'  // Replace with your actual frontend URL
}));


// API Proxy Route
app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.API_BASE_URL}/kisaan/companion/v1/products`, {
            params: {
                storeId: 4454,
                categories:"2,3,6",
                channelId: 5,
                pageSize: 1000
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.API_USER}:${process.env.API_PASSWORD}`).toString('base64')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        res.json(response.data); // Send the API response to the frontend
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
