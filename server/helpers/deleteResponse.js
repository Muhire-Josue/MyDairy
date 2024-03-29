/**
   * @description handles delete response message
   * @param {object} response
   * @param {string} message
   *
   * @returns {object} response
   */
const deleteResponse = (response, message) => (
  response.status(200)
    .json({
      status: 200,
      message,
    })
);
export default deleteResponse;
