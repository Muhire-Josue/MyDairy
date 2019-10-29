/* eslint-disable radix */
import Entry from '../models/entries';
import helperFunction from '../helpers/helperFunction';
import entrySchema from '../validations/entryValidation';

class entryController {
  static addEntry(req, res) {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const entry = req.body;
    entry.id = Entry.length + 1;
    entry.userId = parseInt(req.user.id);

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
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        createdOn: data.createdOn,
      },
    });
  }

  static allEntries(req, res) {
    const myentries = Entry.filter(entry => entry.userId === parseInt(req.user.id));
    return res.status(200).json({ status: 200, data: myentries });
  }

  static getEntry(req, res) {
    const id = parseInt(req.params.entryId);
    const entry = helperFunction.findById(id);
    return res.status(200).json({ status: 200, data: entry });
  }

  static modifyEntry(req, res) {
    const id = parseInt(req.params.entryId);
    const entryIndex = helperFunction.findEntryIndex(id);
    const validateEntry = entrySchema.validate({
      id: Entry[entryIndex].id, title: req.body.title, description: req.body.description,
    });
    if (validateEntry.error) {
      return res.status(400).json({ status: 400, error: validateEntry.error.details[0].message });
    }
    Entry[entryIndex].title = req.body.title;
    Entry[entryIndex].description = req.body.description;
    return res.status(200).json({
      status: 200,
      message: 'Entry successfully edited!',
      data: {
        id: Entry[entryIndex].id,
        title: Entry[entryIndex].title,
        description: Entry[entryIndex].description,
        createdOn: Entry[entryIndex].createdOn,
      },
    });
  }

  static deleteEntry(req, res) {
    const id = parseInt(req.params.entryId);
    helperFunction.deleteEntryById(id);
    return res.status(200).json({
      status: 204,
      message: 'Entry successfully deleted!',
    });
  }
}

export default entryController;
