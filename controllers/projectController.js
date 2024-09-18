import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorHandler.js";
import { Project } from "../model/addProject.js";

export const projectAdd = catchAsyncError(async (req, res, next) => {
  const {
    sourseCodeOrVideoLink,
    projectImgUrl,
    githubCode,
    projecttitle,
    discription,
  } = req.body;
  if (
    !sourseCodeOrVideoLink ||
    !projectImgUrl ||
    !githubCode ||
    !projecttitle ||
    !discription
  )
    return next(new ErrorHandler("Please fill-up all fields.", 400));
  await Project.create({
    sourseCodeOrVideoLink,
    projectImgUrl,
    githubCode,
    projecttitle,
    discription,
  });
  res.status(201).json({
    success: true,
    message: "Project Added seccessfully Abhay.",
  });
});
export const allProjects = catchAsyncError(async (req, res, next) => {
  const getProjects = await Project.find({}).lean();
  if (!getProjects) return next(ErrorHandler("No Project Found."));

  res.status(201).json({
    getProjects,
  });
});
