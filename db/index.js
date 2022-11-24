const {Sequelize,DataTypes} = require('sequelize')
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename);
const sequelize = new Sequelize(process.env.POSTGRES_DB,process.env.POSTGRES_USERNAME,process.env.POSTGRES_PASSWORD,{
    schema:process.env.POSTGRES_SCHEMA,
    dialect:"postgres",
    port:process.env.POSTGRES_PORT,
    host:process.env.POSTGRES_HOST
})

const db = {}

fs.readdirSync(__dirname)
  .filter(file=>{
    return (file.indexOf(".") !==0 && file !==basename && file.slice(-3) === ".js")
  }).forEach(file=>{
    let model = require("./"+file)(sequelize,DataTypes)
    db[model.name] = model
})

Object.keys(db).forEach(modelName=>{
    if(db[modelName].associate){
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize.authenticate().then(value=>{
    console.log("Database Connect")
})

sequelize.sync()

module.exports = db
