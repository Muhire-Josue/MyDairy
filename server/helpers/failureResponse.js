/**
   * @description handles failure response message
   * @param {object} response
   * @param {number} status
   * @param {string} error
   *
   * @returns {object} response
   */
const failureResponse = (response, status, error) => (
  response.status(status)
    .json({
      status,
      error,
    })
);
export default failureResponse;
