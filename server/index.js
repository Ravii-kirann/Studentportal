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
app.use("/api/activity",ActivityRoute)

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