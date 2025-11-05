# Go Bazar - E-commerce Platform

A modern e-commerce platform with OTP-based authentication, built with Next.js and Node.js.

## Features

- 🔐 OTP-based authentication
- 🛍️ Product catalog
- 🛒 Shopping cart
- 💳 Secure checkout
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: JWT, OTP

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/go-bazar.git
   cd go-bazar
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd gobazar-backend
   npm install
   
   # Install frontend dependencies
   cd ../blinkit-clone
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `gobazar-backend` and `blinkit-clone` directories
   - Update the variables with your configuration

4. Start the development servers:
   ```bash
   # Start backend (from gobazar-backend directory)
   npm run dev
   
   # Start frontend (from blinkit-clone directory)
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
go-bazar/
├── gobazar-backend/     # Backend server (Node.js/Express)
├── blinkit-clone/       # Frontend application (Next.js)
└── README.md            # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/yourusername/go-bazar](https://github.com/yourusername/go-bazar)
