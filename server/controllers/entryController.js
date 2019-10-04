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

  static getEntry(req, res) {
    const id = parseInt(req.params.entryId);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid id',
      });
    }
    const entry = helperFunction.findById(id);
    if (!entry) {
      return res.status(404).json({
        status: 404,
        error: 'Entry not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: entry,
    });
  }

  static modify(req, res) {
    const id = parseInt(req.params.entryId);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid id',
      });
    }
    const entryIndex = helperFunction.findEntryIndex(id);
    if (!Entry[entryIndex]) {
      return res.status(404).json({
        status: 404,
        error: 'Entry not found',
      });
    }
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
      data: Entry[entryIndex],
    });
  }
}

export default entryController;
