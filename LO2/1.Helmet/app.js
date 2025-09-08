const express = require('express')
const helmet = require("helmet");
const app = express();
const port = 5000;

 app.use(
 helmet.contentSecurityPolicy({
 directives: {
 defaultSrc: ["'self'"],
 scriptSrc: ["'self'", 'trusted-scripts.com'],
 },
 })
 );


app.get("/", (req, res) => {
    res.send("Hello, your app is more secure with Helmet!");
});

app.listen(port, ()=>{console.log(`Server is running on http://localhost:${port}`);})