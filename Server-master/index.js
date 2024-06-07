// import express from "express";
// import cors from "cors";
// import initRoutes from "./src/routes";
// require("dotenv").config();
// import passport from "passport";
// require("./db_connection");
// require("./passport");
// const app = express();

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');

//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200); // Respond OK to preflight requests
//   }

//   next();
// });


// app.post('/api/v1/auth/google/callback', (req, res, next) => {
//   passport.authenticate('google-token', (err, user, info) => {
//     if (err) {
//       return res.status(400).json({ message: 'Login failed', error: err });
//     }
//     if (!user) {
//       return res.status(400).json({ message: 'No user found' });
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: '2d',
//     });
//     res.json({ token });
//   })(req, res, next);
// });

// // CRUD
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());
// //
// initRoutes(app);
// const PORT = process.env.PORT || 8888;
// const listener = app.listen(PORT, () => {
//   console.log("Sever running on PORT " + listener.address().port);
// });


import express from "express";
import cors from "cors";
import initRoutes from "./src/routes";
import passport from "passport";
import "./db_connection";
import "./passport";

require("dotenv").config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Your authentication route
app.post('/api/v1/auth/google/callback', (req, res, next) => {
  passport.authenticate('google-token', (err, user, info) => {
    if (err) {
      return res.status(400).json({ message: 'Login failed', error: err });
    }
    if (!user) {
      return res.status(400).json({ message: 'No user found' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    // Send response with CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.json({ token });
  })(req, res, next);
});

// CRUD routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());



// Initialize other routes
initRoutes(app);

const PORT = process.env.PORT || 8888;
const listener = app.listen(PORT, () => {
  console.log("Server running on PORT " + listener.address().port);
});




