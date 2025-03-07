import { Schema, model, models } from 'mongoose';

const trackerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Tracker', required: true },
  title: { type: String, required: [true, 'title is required'] }
},
{ timestamps: true }
)

// if model is already exist then use model otherwise create a new model
const Tracker = models.trackers || model("trackers", trackerSchema);

export default Tracker;