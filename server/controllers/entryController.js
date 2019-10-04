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
    const data = entry;
    data.createdOn = `${date} ${time}`;
    Entry.push(data);
    return res.status(201).json({
      status: 201,
      message: 'Entry successfully created',
      data,
    });
  }

  static allEntries(req, res) {
    return res.status(200).json({
      status: 200,
      data: Entry,
    });
  }
}
export default entryController;
