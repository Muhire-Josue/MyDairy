/**
   * @description handles success response message
   * @param {object} response
   * @param {number} status
   * @param {string} error
   *
   * @returns {object} response
   */
const successResponse = (response, status, message, data) => (
  response.status(status)
    .json({
      status,
      message,
      data,
    })
);
export default successResponse;
