/* eslint-disable max-len */
/* eslint-disable radix */
import Entry from '../models/entries';
import helperFunction from '../helpers/helperFunction';
import entrySchema from '../validations/entryValidation';
import successResponse from '../helpers/successResponse';
import failureResponse from '../helpers/failureResponse';
import deleteResponse from '../helpers/deleteResponse';

class entryController {
  /**
   *@description Creates diary entry
   * @param {object} req
   * @param {object} res
   * @param {number} status
   * @param {string} error
   * @param {string} message
   * @returns {object} response
   */
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
      return failureResponse(res, 400, validateEntry.error.details[0].message);
    }
    let data = entry;
    data.createdOn = `${date} ${time}`;
    Entry.push(data);
    data = {
      id: data.id, title: data.title, description: data.description, createdOn: data.createdOn,
    };
    return successResponse(res, 201, 'Entry successfully created', data);
  }

  /**
   *@description Returns all user's entries
   * @param {object} req
   * @param {object} res
   * @param {number} status
   * @returns {Array} response
   */
  static allEntries(req, res) {
    const myentries = Entry.filter(entry => entry.userId === parseInt(req.user.id));
    return successResponse(res, 200, 'All entries', myentries);
  }

  /**
   *@description Returns a diary entry of a user
   * @param {object} req
   * @param {object} res
   * @param {number} status
   * @returns {object} response
   */
  static getEntry(req, res) {
    const id = parseInt(req.params.entryId);
    const entry = helperFunction.findById(id);
    return successResponse(res, 200, 'One entry', entry);
    // return res.status(200).json({ status: 200, data: entry });
  }

  /**
   *@description Modifies a diary entry of a user
   * @param {object} req
   * @param {object} res
   * @param {number} status
   * @param {string} error
   * @param {string} message
   * @returns {object} response
   */
  static modifyEntry(req, res) {
    const id = parseInt(req.params.entryId);
    const entryIndex = helperFunction.findEntryIndex(id);
    const validateEntry = entrySchema.validate({
      id: Entry[entryIndex].id, title: req.body.title, description: req.body.description,
    });
    if (validateEntry.error) {
      return failureResponse(res, 400, validateEntry.error.details[0].message);
    }
    Entry[entryIndex].title = req.body.title;
    Entry[entryIndex].description = req.body.description;
    const entry = {
      id: Entry[entryIndex].id, title: Entry[entryIndex].title, description: Entry[entryIndex].description, createdOn: Entry[entryIndex].createdOn,
    };
    return successResponse(res, 200, 'Entry successfully edited!', entry);
  }

  /**
   *@description Deletes a diary entry of a user
   * @param {object} req
   * @param {object} res
   * @param {number} status
   * @param {string} error
   * @param {string} message
   * @returns {object} response
   */
  static deleteEntry(req, res) {
    const id = parseInt(req.params.entryId);
    helperFunction.deleteEntryById(id);
    deleteResponse(res, 'Entry successfully deleted!');
  }
}

export default entryController;
