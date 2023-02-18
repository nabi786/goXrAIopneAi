const express = require("express");
const router = express.Router();
const objetct = require("../controller/forgetPassword");

router.post("/forgetPassword_V1", objetct.forgetPasswordOTPSend);

router.post("/forgetPassword_V2/:email", objetct.completOTP);

// rest Password
router.post("/forgetPassword_V3/resetPassword", objetct.resetPassword);

module.exports = router;
