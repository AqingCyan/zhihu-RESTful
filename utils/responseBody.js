const handleUserResponse = (msg, user) => (
  {
    message: msg,
    _id: user._id,
    name: user.name,
  }
)

module.exports = {
  handleUserResponse,
}