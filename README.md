# Token Metadata Service

A simple Express.js service that fetches and displays token metadata and images from the Rugcheck API. This service is particularly useful for developers working with blockchain tokens who need to fetch and display token metadata and images.

## 🚀 Features

-   🔍 Fetch comprehensive token reports from Rugcheck API
-   📝 Extract and display detailed token metadata
-   🖼️ View token images in a responsive browser interface
-   ✨ RESTful API endpoints with proper error handling
-   🔄 Default token support via environment variables

## 📋 Prerequisites

Before you begin, ensure you have installed:

-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   A text editor of your choice (VS Code recommended)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your preferred settings:
   ```env
   DEFAULT_ADDRESS_TO_CHECK=4KMTubLvU8pMRffjr6C7Uy22SxXjxSCjkKXr849Npump
   ```

## 🚀 Quick Start

1. Start the development server:
   ```bash
   npm start
   ```

2. The server will be running at `http://localhost:3000`

3. Test the service:
   ```bash
   curl http://localhost:3000/rugcheck_image
   ```

## 📚 API Documentation

### Addition Test Endpoint

GET /add?number1=<value1>&number2=<value2>
Simple addition endpoint for testing.

### 2. Rugcheck Report

GET /rugcheck/:tokenId
Fetches the full Rugcheck report for a given token.

### 3. Token Metadata

GET /rugcheck_metadata/:tokenId

Fetches and returns the token's metadata.

### 4. Token Image

GET /rugcheck_image/:tokenId?

Displays the token's image in the browser. The `tokenId` is optional - if not provided, uses the `DEFAULT_ADDRESS_TO_CHECK` from `.env`.

## Example Usage

1. View default token image:

http://localhost:3000/rugcheck_image

2. View specific token image:
   http://localhost:3000/rugcheck_image/FE21FcrZxHnQGE3ZPfCmv3Wr2w1EcBP9UMkquZZEoedf

3. Get token metadata:
   http://localhost:3000/rugcheck_metadata/FE21FcrZxHnQGE3ZPfCmv3Wr2w1EcBP9UMkquZZEoedf

## Environment Variables

Create a `.env` file in the root directory with:
env
DEFAULT_ADDRESS_TO_CHECK=<your-default-token-address>

## Project Structure

.
├── src/
│ └── index.js # Main application file
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── package.json # Project dependencies and scripts
└── README.md # This file

## Error Handling

The service includes error handling for:

-   Invalid token addresses
-   Missing metadata
-   Missing images
-   API failures
-   Network issues

Each error response includes:

-   HTTP status code
-   Error message
-   Additional details when available

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-   [Rugcheck API](https://api.rugcheck.xyz/) for providing token data
-   Express.js for the web framework
-   Axios for HTTP requests
