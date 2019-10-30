/**
   * @description handles delete response message
   * @param {object} response
   * @param {number} status
   * @param {string} error
   *
   * @returns {object} response
   */
const deleteResponse = (response, message) => (
  response.status(200)
    .json({
      status: 204,
      message,
    })
);
export default deleteResponse;
