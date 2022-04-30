let {Sequelize, DataTypes} = require('sequelize')

let env = process.env.NODE_ENV || 'development'
//if app is running at Heroku, Heroku will have set an environmental variable called NODE_ENV
//which will have the value 'production', so the env variable in this code will be 'production'

//if app is running on your compter, then env will be 'development' and app will use SQLite

let config = require(__dirname + '/../config.json')[env]

let db = {}

let sequelize

if (config.use_env_variable) {
    //at heroku, use postgres
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    //running locally, development mode, use SQLite
    sequelize = new Sequelize(config)
}

let studentModel = require('./student')(sequelize, DataTypes)

db[studentModel.name] = studentModel

db.sequelize = sequelize    //information on how to connect to the database
db.Sequelize = Sequelize    //reference to Sequelize library

module.exports = db
