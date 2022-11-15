module.exports = (sequelize,DataTypes) =>{
    let token = sequelize.define('token',{
        token : {type:DataTypes.TEXT,notNull:true}
    })

    return token
}