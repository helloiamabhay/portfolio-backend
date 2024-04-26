import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorHandler.js";
import { skill } from "../model/addSkill.js";
export const addSkill = catchAsyncError(async (req, res, next) => {
  const { skillImgUrl, skillName, skillPercentage } = req.body;
  if (!skillImgUrl || !skillName || !skillPercentage)
    return next(new ErrorHandler("Please fill-up all fields.", 400));
  await skill.create({
    skillImgUrl,
    skillName,
    skillPercentage,
  });
  let skills = await skill.find({});

  res.status(201).json({
    success: true,
    message: "Skill Added Successfully Abhay.",
    skills,
  });
});
export const allSkills = catchAsyncError(async (req, res, next) => {
  const getSkills = await skill.find({});
  if (!getSkills) return next(ErrorHandler("No Skills Found."));

  res.status(201).json({
    success: true,
    getSkills,
  });
});
