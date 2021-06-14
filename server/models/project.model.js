const { Schema, model } = require("mongoose")

const project = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    creationDate: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  }
);

module.exports = new model("project", project, "project")