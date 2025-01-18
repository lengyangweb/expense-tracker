import { Schema, model, models } from 'mongoose';

const utilitiesSchema = new Schema({
  util_name: { type: String, required: [true, 'util_name is required'] },
  util_collection: { type: Array, required: [true, 'util_collection is required'] }
},
{ timestamps: true }
)

utilitiesSchema.methods.verifyAccessCode = function(accessCode) {
  return this.util_collection.includes(accessCode);
}

// if model is already exist then use model otherwise create a new model
const Utilities = models.utilities || model("utilities", utilitiesSchema);

export default Utilities;