const mongoose = require('mongoose');
const { Schema } = mongoose;

const DynamicFormSchema = new mongoose.Schema(
  {
    value: {
      type: JSON,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

const DynamicForm = mongoose.model('DynamicForm', DynamicFormSchema);

module.exports = DynamicForm;
