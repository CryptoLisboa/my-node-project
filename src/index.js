const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3000;

app.get("/add", (req, res) => {
    const number1 = parseFloat(req.query.number1);
    const number2 = parseFloat(req.query.number2);

    if (isNaN(number1) || isNaN(number2)) {
        return res.status(400).json({
            error: "Please provide valid numbers as query parameters",
        });
    }

    const sum = number1 + number2;
    res.json({ result: sum });
});

app.get("/rugcheck/:tokenId", async (req, res) => {
    try {
        const { tokenId } = req.params;
        const response = await axios.get(`https://api.rugcheck.xyz/v1/tokens/${tokenId}/report`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Failed to fetch rugcheck data",
            message: error.message,
        });
    }
});

app.get("/rugcheck_metadata/:tokenId", async (req, res) => {
    try {
        const { tokenId } = req.params;

        // First fetch the rugcheck report
        const rugcheckResponse = await axios.get(`https://api.rugcheck.xyz/v1/tokens/${tokenId}/report`);

        // Extract the URI from the tokenMeta
        const metadataUri = rugcheckResponse?.data?.tokenMeta?.uri;
        if (!metadataUri) {
            return res.status(404).json({
                error: "Metadata URI not found",
                message: "No metadata URI found in the token metadata",
            });
        }

        // Browser-like headers
        const headers = {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            pragma: "no-cache",
            "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        };

        // Fetch the metadata with browser-like headers
        const metadataResponse = await axios.get(metadataUri, { headers });
        res.json(metadataResponse.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Failed to fetch metadata",
            message: error.message,
            details: error.response?.data,
        });
    }
});

app.get("/rugcheck_image/:tokenId?", async (req, res) => {
    try {
        const tokenId = req.params.tokenId || process.env.DEFAULT_ADDRESS_TO_CHECK;

        console.log("tokenId", tokenId);

        if (!tokenId) {
            return res.status(400).json({
                error: "Token ID required",
                message: "Please provide a token ID in the URL or set DEFAULT_ADDRESS_TO_CHECK in .env",
            });
        }

        // First fetch the rugcheck report
        const rugcheckResponse = await axios.get(`https://api.rugcheck.xyz/v1/tokens/${tokenId}/report`);

        // Extract the URI from the tokenMeta
        const metadataUri = rugcheckResponse?.data?.tokenMeta?.uri;
        if (!metadataUri) {
            return res.status(404).json({
                error: "Metadata URI not found",
                message: "No metadata URI found in the token metadata",
            });
        }

        // Browser-like headers
        const headers = {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            pragma: "no-cache",
            "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        };

        // Fetch the metadata with browser-like headers
        const metadataResponse = await axios.get(metadataUri, { headers });
        const imageUrl = metadataResponse.data.image;

        if (!imageUrl) {
            return res.status(404).json({
                error: "Image not found",
                message: "No image URL found in the metadata",
            });
        }

        // Return HTML with the image
        res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Token Image</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #f0f0f0;
            }
            img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" alt="Token Image">
        </body>
      </html>
    `);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Failed to fetch image",
            message: error.message,
            details: error.response?.data,
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
