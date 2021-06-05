const { model, Schema } = require("mongoose");

const user = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  // projects: [
  //   { type: Schema.Types.ObjectId, ref: 'projects' }
  // ]
});

module.exports = model("user", user, "user");