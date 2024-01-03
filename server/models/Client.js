import { Schema, model } from "mongoose";

const ClientSchema = new Schema({
  name: {
    type: String,
    // required: [true, "Please provide a name for this client."],
    // maxlength: [20, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    // required: [true, "Please provide an email address for this client."],
    // maxlength: [40, "Email cannot be more than 40 characters"],
  },
  phone: {
    type: String,
    // maxlength: [20, "Phone number cannot be longer than 20 characters"],
  },
  // projects: [
  //     {
  //         type: mongoose.Schema.ObjectId,
  //         ref: "Project",
  //     },
  // ],
});

export default model("Client", ClientSchema); // Client is the name of the model, ClientSchema is the schema we created above
