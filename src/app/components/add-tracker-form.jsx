
import { toast } from 'react-toastify';
import { connectDB } from '@/app/lib/db';
import Tracker from '@/app/models/Tracker';
import { revalidatePath } from 'next/cache';
import { Button, Form } from 'react-bootstrap'
import { createTracker } from '@/app/services/tracker';

const AddTrackerForm = () => {

  const addTracker = async (formData) => {
    "use server";
    const title = formData.get('title');
    if (!title) return toast.error(`Title field is required`);
    const result = await Tracker.create({ title });
    // re-render tracker page for new data query
    revalidatePath('/tracker');
  }

  return (
    <Form action={addTracker}>
      <Form.Group>
        <Form.Label htmlFor='title'>Title:</Form.Label>
        <Form.Control 
          id="title"
          name="title" 
          type='text' 
          placeholder='January Tracker' 
          autoComplete='title'
          autoFocus={true}
        />
      </Form.Group>
      <div className="d-flex justify-content-center mt-3">
        <Button variant='success' type='submit'>Save</Button>
      </div>
    </Form>
  )
}

export default AddTrackerForm