/* eslint-disable max-len */
/* eslint-disable radix */
import uuid from 'uuid';
import Entry from '../models/entries';
import entrySchema from '../validations/entryValidation';
import successResponse from '../helpers/successResponse';
import failureResponse from '../helpers/failureResponse';
import deleteResponse from '../helpers/deleteResponse';
import db from '../models/index';

class entryController {
  /**
   *@description Creates diary entry
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static async addEntry(req, res) {
    const { title, description } = req.body;
    const userId = req.user.id;
    const validateEntry = entrySchema.validate({ title, description });
    if (validateEntry.error) {
      return failureResponse(res, 400, validateEntry.error.details[0].message);
    }
    const text = `INSERT INTO
                      entries(id, title, description, "userId")
                      VALUES($1, $2, $3, $4)
                      returning *`;

    const values = [uuid.v1(), title, description, userId];
    const { rows } = await db.query(text, values);

    let data = rows[0];
    Entry.push(data);
    data = {
      id: data.id, title: data.title, description: data.description, createdOn: data.createdOn,
    };
    return successResponse(res, 201, 'Entry successfully created', data);
  }

  static async modifyEntry(req, res) {
    const id = req.params.entryId;
    const validateEntry = entrySchema.validate({
      title: req.body.title, description: req.body.description,
    });
    if (validateEntry.error) {
      return failureResponse(res, 400, validateEntry.error.details[0].message);
    }

    const { title, description } = req.body;
    const text = 'UPDATE entries SET title=$1, description=$2 WHERE id=$3 RETURNING *';
    const values = [title, description, id];
    const change = await db.query(text, values);
    const data = change.rows;
    return successResponse(res, 200, 'Entry successfully edited!', data);
  }

  /**
   *@description Deletes a diary entry of a user
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static async deleteEntry(req, res) {
    const id = req.params.entryId;
    await db.query('DELETE FROM entries WHERE id=$1', [id]);
    deleteResponse(res, 'Entry successfully deleted!');
  }
}

export default entryController;
