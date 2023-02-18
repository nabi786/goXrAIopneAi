const userMOdel = require("../models/user");
const bcrypt = require("bcryptjs");
const varifyEmail = require("../varifyEmail/varifyEmail");

//
//
//
//
//
//
//
const forgetPasswordOTPSend = async (req, res) => {
  try {
    // typeEmail here
    var randomNUmber = Math.floor(100000 + Math.random() * 900000);
    console.log("random Number", randomNUmber);
    var subject = "subject";
    var emailTo = req.body.email;
    var message = `<h1>Forget Password</h1><br><p> this is OTP to forget Password <b>${randomNUmber}</b></p>`;

    await varifyEmail(subject, emailTo, message);

    var user = await userMOdel.findOne({ email: req.body.email });
    // console.log("this is user", user);
    if (user) {
      await userMOdel.findOneAndUpdate(
        { email: req.body.email },
        { otp: randomNUmber }
      );

      res.status(200).json({
        success: true,
        msg: "Check Your Email, We have sent you an OTP to change the password",
      });
    } else {
      res.status(404).json({ success: false, msg: "invalid Email" });
    }
  } catch (err) {
    console.log("this si erro", err);
    res.status(500).json({ success: false, msg: "somethign went wrong" });
  }
};

const completOTP = async (req, res) => {
  try {
    var user = await userMOdel.findOne({
      email: req.params.email,
      otp: req.body.otp,
    });

    // console.log("this is User", user);
    if (user) {
      res.status(200).json({ success: true, msg: "OTP Varified Successfully" });
    } else {
      res.status(404).json({ success: false, msg: "invalid OTP" });
    }
    // console.log("param", req.body.otp);
  } catch (err) {
    console.log("this si erro", err);
    res.status(500).json({ success: false, msg: "somethign went wrong" });
  }
};

// reset Password
const resetPassword = async (req, res) => {
  try {
    var password = bcrypt.hashSync(req.body.password, 8);
    // var password = req.body.password;
    console.log("newPassword", req.body);
    var user = await userMOdel.findOne({
      email: req.body.email,
      otp: req.body.otp,
    });

    if (user) {
      var randomNUmber = Math.floor(100000 + Math.random() * 900000);
      await userMOdel.findOneAndUpdate(
        {
          email: req.body.email,
          otp: req.body.otp,
        },
        { password: password, otp: randomNUmber }
      );
      res
        .status(200)
        .json({ success: true, msg: "password Changed Successfully" });
    } else {
      res
        .status(404)
        .json({ success: true, msg: "invalid OPT, Plz Varify Again" });
    }
  } catch (err) {
    console.log("this si erro", err);
    res.status(500).json({ success: false, msg: "somethign went wrong" });
  }
};

var objetct = {
  forgetPasswordOTPSend,
  completOTP,
  resetPassword,
};
module.exports = objetct;
