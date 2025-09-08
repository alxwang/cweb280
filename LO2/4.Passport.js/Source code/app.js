const express = require('express');
const jwt = require('jsonwebtoken');
const db = require("./config/db");
const app = express();
const PORT = 5000;
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const SECRET_KEY = "mySecretKey"; 

app.use(express.json());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  // Normally you'd check against DB
  if (jwt_payload.username === "user@gmail.com") {
    return done(null, jwt_payload);
  } else {
    return done(null, false);
  }
}));

   const cabs = [
    { id: 1, type: "Mini", name: "Maruti Suzuki Alto 800", customer_name: "Ravi Kumar", phone: "9876543210", pricePerKm: 10, status:1, image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d" },
    { id: 2, type: "Sedan", name: "Honda City",customer_name: "Amit Sharma", phone: "9876543211", pricePerKm: 12, status:1, image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d" },
    { id: 3, type: "SUV", name: "Hyundai Creta",customer_name: "Ravi", phone: "9876543212", pricePerKm: 15, status:1, image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d" },
    { id: 4, type: "Luxury", name: "Mercedes-Benz E-Class",customer_name: "Amit", phone: "9876543213", pricePerKm: 20, status:1, image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d" },
    { id: 5, type: "Electric", name: "Tata Nexon EV",customer_name: "Sharma", phone: "9876543214", pricePerKm: 8, status:1, image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d" },
    { id: 6, type: "Traveller", name: "Force Traveller",customer_name: "Kumar", phone: "9876543215", pricePerKm: 18, status:1, image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d" }
  ];


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Normally check user from DB
  if (username === 'user@gmail.com' && password === '1234') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});



app.get('/api/cabs', (req, res) => {
    res.json(cabs);
});

// Protected route
app.post(
  '/api/book-cab',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { from, to } = req.body;

    if (!from || !to) {
      return res.status(400).json({ error: "From and To are required" });
    }

    const user = req.user.username; // 👈 from JWT

    // Insert into DB (callback style)
    const sql = "INSERT INTO bookings (user, `from`, `to`) VALUES (?, ?, ?)";
    db.query(sql, [user, from, to], (err, result) => {
      if (err) {
        console.error("Booking error:", err);
        return res.status(500).json({ error: "Server error while booking" });
      }

      res.status(201).json({
        message: "Cab booked successfully",
        bookingId: result.insertId,
        bookedBy: user
      });
    });
  }
);

app.get(
  '/api/my-rides',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user.username; // 👈 from JWT

    const sql = "SELECT id, `from`, `to` FROM bookings WHERE user = ?";
    db.query(sql, [user], (err, results) => {
      if (err) {
        console.error("Fetch rides error:", err);
        return res.status(500).json({ error: "Server error while fetching rides" });
      }

      res.status(200).json({
        rides: results,
        total: results.length
      });
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
