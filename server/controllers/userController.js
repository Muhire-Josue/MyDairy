class userController {
  static entryMessage(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'welcome to MyDiary application',
    });
  }
}

export default userController;
