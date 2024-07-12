import { Schema, model, models } from "mongoose";

const historySchema = new Schema({
  trackerId: {
    type: Schema.Types.ObjectId,
    ref: 'Tracker',
    required: [true, "trackerId is required"]
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
  },
  createdAt: {
    type: Date,
    required: [true, "created stamp is required"],
  },
  type: {
    type: String,
    required: [true, "type is required"],
  },
});

// if model is already exist then use model otherwise create a new model
const historyModel = models.histories || model("histories", historySchema);
// get model
export default historyModel;
