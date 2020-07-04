const Sequelize = require('sequelize')
const EncryptedField = require('sequelize-encrypted')
const crypto = require('crypto')

var sequelize = new Sequelize('postgres://user:pass@exmaple.com:5432/outline');

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

const SECRET_KEY = 'YOUR_SECRET_KEY'
const encryptedFields = EncryptedField(
  Sequelize,
  SECRET_KEY
);

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: { type: Sequelize.STRING },
    username: { type: Sequelize.STRING },
    name: Sequelize.STRING,
    avatarUrl: { type: Sequelize.STRING, allowNull: true },
    isAdmin: Sequelize.BOOLEAN,
    service: { type: Sequelize.STRING, allowNull: true },
    serviceId: { type: Sequelize.STRING, allowNull: true, unique: true },
    slackData: Sequelize.JSONB,
    jwtSecret: encryptedFields.vault("jwtSecret"),
  })
  
User.findAll().then(async users =>{
  for (const user of users) {
    user.jwtSecret = crypto.randomBytes(64).toString('hex');
    await user.save()
  }
})