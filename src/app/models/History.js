import { Schema, model, models } from "mongoose";

const historySchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  total: {
    type: Number,
    required: [true, "amount is required"],
  },
  createdAt: {
    type: Date,
    required: [true, "created stamp is required"],
  },
  income: {
    type: Boolean,
    required: [true, "income is required"],
  },
});

// if model is already exist then use model otherwise create a new model
const historyModel = models.histories || model("histories", historySchema);
// get model
export default historyModel;
