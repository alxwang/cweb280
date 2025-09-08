// --- 1. Import necessary libraries ---
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');

// --- 2. Initialize the Express app ---
const app = express();
const port = 3000;

// --- 3. Configure Middleware ---

// Cookie parser → makes cookies available in req.cookies
app.use(cookieParser());

// Generate a strong random secret for the session
const sessionSecret = crypto.randomBytes(32).toString('hex');

// express-session setup
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true               // safer: not accessible from JS
    }
}));

// Serve static files if needed
app.use(express.static(path.join(__dirname, 'public')));


// Home Page  shows cookie & session status
app.get('/', (req, res) => {
    const username = req.cookies.username;
    const favoriteColor = req.session.favoriteColor;

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cookies & Sessions Demo</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                body { font-family: 'Inter', sans-serif; }
            </style>
        </head>
        <body class="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-6 text-gray-800">
            <div class="bg-white p-8 sm:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-6">
                <h1 class="text-3xl sm:text-4xl font-bold mb-4">Web Data Storage </h1>
                <p class="text-gray-600 mb-8">How websites remember you with cookies and sessions.</p>

                <!-- Cookie Status -->
                <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
                    <p class="font-semibold text-xl mb-2">Cookie Status</p>
                    <p class="text-lg">
                        ${username ? `Welcome back, <span class="text-blue-600 font-bold">${username}</span>! (Cookie)` : ` No cookie found.`}
                    </p>
                </div>

                <!-- Session Status -->
                <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500 mb-6">
                    <p class="font-semibold text-xl mb-2">Session Status</p>
                    <p class="text-lg">
                        ${favoriteColor ? ` Your favorite color is <span class="text-purple-600 font-bold">${favoriteColor}</span>! (Session)` : ` No session variable found.`}
                    </p>
                </div>

                <!-- Buttons -->
                <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-8">
                    <a href="/set-cookie" class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-center">Set Cookie</a>
                    <a href="/set-session" class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-center">Set Session</a>
                    <a href="/clear-all" class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-center">Clear All</a>
                </div>

                <p class="text-sm text-gray-400 mt-4">Tip: Set one, then refresh the page to see how it persists!</p>
            </div>
        </body>
        </html>
    `);
});

// Set Cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'StudentCoder', { maxAge: 900000, httpOnly: true });
    res.redirect('/');
});

// Set Session
app.get('/set-session', (req, res) => {
    req.session.favoriteColor = 'Blue';
    res.redirect('/');
});

// Clear All
app.get('/clear-all', (req, res) => {
    res.clearCookie('username');
    req.session.destroy(err => {
        if (err) return res.status(500).send('Could not clear session');
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(` Server is running at http://localhost:${port}`);
});
