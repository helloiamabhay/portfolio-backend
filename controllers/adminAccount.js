import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorHandler.js";
import { sendToken } from "../middleware/sendToken.js";
import { sendEmail, sendsms } from "../middleware/sendEmail.js";
import crypto from "crypto";
import { User } from "../model/admin_model.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already exist!", 409));

  user = await User.create({
    name,
    email,
    password,
  });

  sendToken(res, user, "Registered Successfully Abhay", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password ", 401));
  req.user = user;

  sendToken(res, user, `Welcome back, ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please enter all fields.", 400));
  const user = await User.findById(req.user._id).select("+password");
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) return next(new ErrorHandler("Incorrect old password.", 400));
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

export const forgetpassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!email)
    return next(new ErrorHandler("Please enter your email Abhay.", 400));
  if (!user) return next(new ErrorHandler("you are not exist.", 400));
  const resetToken = await user.getResetToken();

  await user.save();
  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  const message = `Click on the link to reset password dear abhay, ${url}.`;
  await sendEmail(user.email, "admin reset password", message);

  res.status(200).json({
    success: true,
    message: `Reset Token has been sent to ${user.email}`,
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  if (!password || !confirmPassword)
    return next(new ErrorHandler("Please enter all fields."));
  if (password !== confirmPassword)
    return next(new ErrorHandler("Password does not matched."));
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(new ErrorHandler("Token is invalid or has been expired", 401));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

export const sendSMS = catchAsyncError(async (req, res, next) => {
  const { name, email, sms } = req.body;
  if (!name || !email || !sms)
    return next(new ErrorHandler("Please enter all fields.", 400));

  await sendsms("vishwakarmaabhay283@gmail.com", name, ` By ${email} is ${sms}`);
  res.status(200).json({
    success: true,
    message: "Your message sent successfully.",
  });
});

