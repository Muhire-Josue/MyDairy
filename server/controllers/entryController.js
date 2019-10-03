import Entry from '../models/entries';
import entrySchema from '../validations/entryValidation';

class entryController {
  static addEntry(req, res) {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const entry = req.body;
    entry.id = Entry.length + 1;

    const validateEntry = entrySchema.validate({
      id: entry.id, title: entry.title, description: entry.description,
    });
    if (validateEntry.error) {
      return res.status(400).json({ status: 400, error: validateEntry.error.details[0].message });
    }
    Entry.push(entry);
    const data = entry;
    data.createdOn = `${date} ${time}`;
    return res.status(201).json({
      status: 201,
      message: 'Entry successfully created',
      data,
    });
  }
}
export default entryController;
