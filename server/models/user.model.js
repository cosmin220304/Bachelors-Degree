const { model, Schema } = require("mongoose");

const user = new Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  // projects: [
  //   { type: Schema.Types.ObjectId, ref: 'projects' }
  // ]
});

module.exports = model("user", user, "user");