import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  sourseCodeOrVideoLink: {
    type: String,
    required: [true, "Please enter code or video link."],
  },
  projectImgUrl: {
    type: String,
    required: [true, "Please enter project img link."],
  },
  githubCode: {
    type: String,
    required: [true, "Please enter github code link."],
  },
  projecttitle: {
    type: String,
    required: [true, "Please enter project title."],
  },
  discription: {
    type: String,
    required: [true, "Please enter project discription."],
  },
});

export const Project = mongoose.model("Project", projectSchema);
