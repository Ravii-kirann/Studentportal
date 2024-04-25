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
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
  
    // Check if password field exists and hash it if provided
    if (req.body.formData.password) {
      req.body.formData.password = bcrypt.hashSync(req.body.formData.password, 10);
    }
    console.log("previous user details",req.user)

    // Construct update object with provided fields
    const updateFields = {
      firstName: req.body.formData.firstName || req.user.firstName,
      lastName: req.body.formData.lastName || req.user.lastName,
      address: req.body.formData.address || req.user.address,
      city: req.body.formData.city || req.user.city,
      state: req.body.formData.state || req.user.state,
      zipCode: req.body.formData.zipCode || req.user.zipCode,
      email: req.body.formData.email || req.user.email,
      loginName: req.body.formData.loginName || req.user.loginName,
      password: req.body.password || req.user.password,
    };

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields, // Removed $set
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