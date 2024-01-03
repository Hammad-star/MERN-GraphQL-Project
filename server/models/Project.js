import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  name: {
    type: String,
    // required: [true, "Please provide a name for this project."],
    // maxlength: [20, "Name cannot be more than 60 characters"],
  },
  description: {
    type: String,
    // required: [true, "Please provide a description for this project."],
    // maxlength: [200, "Description cannot be more than 200 characters"],
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: Schema.ObjectId,
    ref: "Client",
  },
  // tasks: [
  //     {
  //         type: mongoose.Schema.ObjectId,
  //         ref: "Task",
  //     },
  // ],
});

export default model("Project", ProjectSchema); // Project is the name of the model, ProjectSchema is the schema we created above
