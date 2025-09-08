const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = require('./router/router');

// redis imports
const { createClient } = require('redis');
const { RedisStore } = require('connect-redis');  

const app = express();
const PORT = process.env.PORT || 3000;

// Redis client
const redisClient = createClient({
  url: 'redis://localhost:6379',
  legacyMode: true
});
redisClient.connect().catch(console.error);

// Redis session store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:sess:"
});

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(session({
  store: redisStore,
  secret: 'my-super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// Views setup (Handlebars)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Routes
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
