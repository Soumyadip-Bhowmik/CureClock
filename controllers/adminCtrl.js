const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
   
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {

    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};

// doctor account status
// Change account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }, { new: true });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;

    if (status === "approved") {
      notification.push({
        type: "doctor-account-request-updated",
        message: "Your Doctor Account Request Has Been Approved",
        onClickPath: "/notification",
      });
      user.isDoctor = true;
    } else if (status === "rejected") {
      notification.push({
        type: "doctor-account-request-updated",
        message: "Your Doctor Account Request Has Been Rejected",
        onClickPath: "/notification",
      });
      user.isDoctor = false;
    }

    await user.save();

    res.status(200).send({
      success: true,
      message: `Account Status Updated to ${status}`,
      data: doctor,
    });
  } catch (error) {
  
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};


// Delete user
const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
  
    res.status(500).send({
      success: false,
      message: "Error while deleting user",
      error,
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
  deleteUserController,
};
