import mongoose from "mongoose";

// enter skill img URL
// enter skill name
// enter skill percentage

const schema = new mongoose.Schema({
  skillImgUrl: {
    type: String,
    required: [true, "Please Abhay enter your skill img url."],
  },
  skillName: {
    type: String,
    required: [true, "Please Abhay enter Skill Name."],
  },
  skillPercentage: {
    type: Number,
    required: [true, "Please Abhay enter your skill % ."],
  },
});

export const skill = mongoose.model("Skill", schema);
