import uuid from 'uuid';
import successResponse from '../helpers/successResponse';
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
    const text = `INSERT INTO
                      entries(id, title, description, "userId")
                      VALUES($1, $2, $3, $4)
                      returning *`;

    const values = [uuid.v1(), title, description, userId];
    const { rows } = await db.query(text, values);

    let data = rows[0];
    data = {
      id: data.id, title: data.title, description: data.description, createdOn: data.createdOn,
    };
    return successResponse(res, 201, 'Entry successfully created', data);
  }

  /**
   *@description Modifies a diary entry of a user
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static async modifyEntry(req, res) {
    const id = req.params.entryId;
    const { title, description } = req.body;
    const modifiedDate = new Date();
    const text = 'UPDATE entries SET title=$1, description=$2, "editedOn"=$3 WHERE id=$4 RETURNING *';
    const values = [title, description, modifiedDate, id];
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

  /**
   *@description Returns a diary entry of a user
   * @param {object} req
   * @param {object} res
   * @returns {object} diary entry
   */
  static async getEntry(req, res) {
    const id = req.params.entryId;
    const { rows } = await db.query('SELECT * FROM entries WHERE id=$1', [id]);
    const entry = rows[0];
    return successResponse(res, 200, 'Diary entry', entry);
  }

  /**
   *@description Returns all user's entries
   * @param {object} req
   * @param {object} res
   * @returns {Array} diary entries
   */
  static async allEntries(req, res) {
    const { rows } = await db.query('SELECT * FROM entries WHERE "userId"=$1', [req.user.id]);
    const myentries = rows;
    return successResponse(res, 200, 'All entries', myentries);
  }
}

export default entryController;
