const User = require('../models/user.model');

const errorHandler = require('../utils/error');

const bcrypt = require("bcrypt");

//update user
const test = async (req,res)=>{
  console.log(req.body,"reqqqqqqq")
   res.send({
    success : "it is working fine"
   })
}
const updateUser = async (req, res, next) => {
  console.log(req.body, "update User");
  try {
    // Ensure that the user is updating their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }

    // Check if password field exists and hash it if provided
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Construct update object with provided fields
    const updateFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      email: req.body.email,
      loginName: req.body.loginName,
      password: req.body.password,
    };

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    // Check if user is not found
    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Respond with updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};



// delete user


 const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

}


module.exports = {updateUser,deleteUser,test}