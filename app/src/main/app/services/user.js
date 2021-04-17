const {
  user: User
} = require('models');

exports.getOne = async (id) => {
  const user = await User.findOne({
    where: {
      id: id
    }
  })

  if (user != null) delete user.dataValues.password

  return user || {}
}