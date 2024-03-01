import Tracker from '@/app/models/Tracker';

const getTrackers = async () => {
  const trackers = await Tracker.find();
  return trackers;
}

const createTracker = async (newTracker) => {
  const result = await Tracker.create(newTracker);
  return result;
}

const removeTracker = async (_id) => {
  const updated = await Tracker.findByIdAndDelete(_id);
  return updated;
}

export { 
  getTrackers, 
  removeTracker, 
  createTracker 
};