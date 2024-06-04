// controllers/eventController.js
import EventModel from "../model/Event.model.js";

/** POST: http://localhost:8080/api/events/create 
 * @param: {
  "name": "Event Name",
  "description": "Event Description",
  "date": "2024-05-01T18:30:00.000Z",
  "location": "Event Location"
}
 */
export async function createEvent(req, res) {
  try {
    const { name, description, date, location } = req.body;
    const userId = req.user.userId;

    const event = new EventModel({
      name,
      description,
      date,
      location,
      createdBy: userId,
    });

    const savedEvent = await event.save();
    res.status(201).send({ msg: "Event created successfully", event: savedEvent });
  } catch (error) {
    res.status(500).send({ error: `Event creation failed: ${error.message}` });
  }
}

/** GET: http://localhost:8080/api/events/ */
export async function getEvents(req, res) {
  try {
    const events = await EventModel.find().populate("createdBy", "username email");
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ error: `Failed to fetch events: ${error.message}` });
  }
}

/** GET: http://localhost:8080/api/events/:id */
export async function getEventById(req, res) {
  try {
    const { id } = req.params;
    const event = await EventModel.findById(id).populate("createdBy", "username email");
    if (!event) return res.status(404).send({ error: "Event not found" });
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send({ error: `Failed to fetch event: ${error.message}` });
  }
}

/** PUT: http://localhost:8080/api/events/update/:id 
 * @param: {
  "name": "Updated Event Name",
  "description": "Updated Event Description",
  "date": "2024-05-02T18:30:00.000Z",
  "location": "Updated Event Location"
}
 */
export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const { name, description, date, location } = req.body;
    const userId = req.user.userId;

    const event = await EventModel.findById(id);
    if (!event) return res.status(404).send({ error: "Event not found" });
    if (event.createdBy.toString() !== userId) return res.status(403).send({ error: "Unauthorized" });

    event.name = name;
    event.description = description;
    event.date = date;
    event.location = location;

    const updatedEvent = await event.save();
    res.status(200).send({ msg: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res.status(500).send({ error: `Event update failed: ${error.message}` });
  }
}

/** DELETE: http://localhost:8080/api/events/delete/:id */
export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const event = await EventModel.findById(id);
    if (!event) return res.status(404).send({ error: "Event not found" });
    if (event.createdBy.toString() !== userId) return res.status(403).send({ error: "Unauthorized" });

    await EventModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Event deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: `Event deletion failed: ${error.message}` });
  }
}
