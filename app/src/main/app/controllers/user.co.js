const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
  user: User,
  profile: Profile
} = require('models');

exports.createUserWithouPassword = async (ctx) => {
  const {
    name
  } = ctx.request.body

  const DEFAULT_PASSWORD = 'danonedefaultpassword'
  const DEFAULT_EMAIL = 'defaultemaildanone@default.com'
  const DEFAULT_MOBILE = '000000000000'
  const DEFAULT_ADDRESS = 'Jakarta'

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(DEFAULT_PASSWORD, salt);

  const data = {
    name: name,
    password: hash,
    email: DEFAULT_EMAIL,
    mobile: DEFAULT_MOBILE,
    address: DEFAULT_ADDRESS,
    role: 1
  }

  const user = await User.create(data);

  const token = jwt.sign({
    name: user.name,
    id: user.id
  }, process.env[`JWT_SECRET_KEY`]);

  delete user.dataValues.password

  ctx.body = {
    ...user.dataValues,
    token: token
  }
}

exports.createUser = async (ctx) => {
  const {
    name,
    password,
    mobile,
    email,
    address
  } = ctx.request.body

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const data = {
    name: name,
    password: hash,
    email: email,
    mobile: mobile,
    address: address,
    role: 1
  }

  const user = await User.create(data);

  const token = jwt.sign({
    name: user.name,
    id: user.id
  }, process.env[`JWT_SECRET_KEY`]);

  delete user.dataValues.password

  ctx.body = {
    ...user.dataValues,
    token: token
  }
}

exports.login = async (ctx) => {
  const {
    mobile,
    password
  } = ctx.request.body

  let user = await User.findOne({
    where: {
      mobile: mobile
    }
  });

  if (!user) return ctx.throw(400, 'No Handphone or Password Incorrect!')

  const isAuth = await bcrypt.compareSync(password, user.password);

  if (!isAuth) return ctx.throw(400, 'No Handphone or Password Incorrect!')

  delete user.dataValues.password

  const token = jwt.sign({
    name: user.name,
    id: user.id
  }, process.env[`JWT_SECRET_KEY`]);

  ctx.body = {
    ...user.dataValues,
    token: token,
  }
}

exports.createProfile = async (ctx) => {
  const {
    name,
    age,
    height,
    weight,
    gender,
    pregnancy,
    gpa
  } = ctx.request.body

  const data = {
    name: name,
    age: age,
    height: height,
    weight: weight,
    gender: gender,
    pregnancy: pregnancy,
    gpa: gpa,
    userId: ctx.user.id
  }

  const profile = await Profile.create(data);

  ctx.body = profile
}