const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5000;

const SECRET_KEY = "mySecretKey"; 

  app.use(express.json());

  const blogs = [
  { 
    id: 1, 
    title: "Mini Car Spotlight", 
    description: "Exploring the compact and efficient Maruti Suzuki Alto 800, perfect for city drives.", 
    image: "https://via.placeholder.com/300x200?text=Mini+Car",  
    status: 0 
  },
  { 
    id: 2, 
    title: "Sedan Comfort", 
    description: "The Honda City continues to be the benchmark for comfort and performance in sedans.", 
    image: "https://via.placeholder.com/300x200?text=Sedan",  
    status: 1 
  },
  { 
    id: 3, 
    title: "SUV Adventures", 
    description: "Hyundai Creta offers the perfect blend of style, space, and performance for family trips.", 
    image: "https://via.placeholder.com/300x200?text=SUV",  
    status: 1 
  },
  { 
    id: 4, 
    title: "Luxury Redefined", 
    description: "Mercedes-Benz E-Class sets new standards in luxury and comfort.", 
    image: "https://via.placeholder.com/300x200?text=Luxury",  
    status: 0 
  },
  { 
    id: 5, 
    title: "Electric Future", 
    description: "Tata Nexon EV is paving the way for sustainable and eco-friendly driving in India.", 
    image: "https://via.placeholder.com/300x200?text=Electric",  
    status: 1 
  },
  { 
    id: 6, 
    title: "Traveller’s Choice", 
    description: "The Force Traveller is the ideal companion for large groups and long journeys.", 
    image: "https://via.placeholder.com/300x200?text=Traveller",  
    status: 0 
  }
];


app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Normally check user from DB
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/admin/dashboard', verifyToken, (req, res) => {
  res.json(blogs);
});

app.get('/api/posts', (req, res) => {
    const activeBlogs = blogs.filter(blog => blog.status === 1);
    res.json(activeBlogs);
});

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
