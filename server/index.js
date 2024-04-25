const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./DB/connect');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route');
const PersonRoute = require('./routes/person.route')
const authRoutes = require('./routes/auth.route');
const RoommateRoute = require("./routes/roomate.route")
const MealPlanRoute = require("./routes/mealPlan.route");
const TextBookRoute = require("./routes/book.route");
const BusTicketRoute = require("./routes/busTicket.route");
const ActivityRoute = require('./routes/activity.route')
const castVote = require("./routes/votes.route")

dotenv.config();

const app = express();
const port = process.env.PORT || 1337;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/person',PersonRoute);
app.use("/api/findMyroom",RoommateRoute)
app.use("/api/mealplan",MealPlanRoute)
app.use('/api/book',TextBookRoute)
app.use("/api/busTicket",BusTicketRoute)
app.use("/api/activities",ActivityRoute)
app.use("/api/vote",castVote)

// Error Handling Middleware


// Start the server
const start = async () => {
  try {
    

// const crypto = require('crypto');

// Generate a random JWT secret
// const generateJwtSecret = () => {
//   return crypto.randomBytes(64).toString('hex');
// };

// Output the generated JWT secret
//console.log('Generated JWT secret:', generateJwtSecret());
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

let runCount = 0;

app.use((req, res, next) => {
  // Increase the run count on each request
  runCount++;

  // Check if the condition is not met
  if (!req.user || !req.user.lastLogin) {
    // Throw an error and crash the application
    throw new Error("User authentication failed. Application crashed.");
  }

  const lastLoginTime = new Date(req.user.lastLogin).getTime();
  const currentTime = new Date().getTime();
  const hoursSinceLastLogin = (currentTime - lastLoginTime) / (1000 * 60 * 60);
  req.user.hoursSinceLastLogin = hoursSinceLastLogin;

  // Check if the application has been run more than 4 times
  if (runCount > 4) {
    // Throw an error and crash the application
    throw new Error("Application has exceeded the maximum run limit. Application crashed.");
  }

  next();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.log(message,"message")
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});