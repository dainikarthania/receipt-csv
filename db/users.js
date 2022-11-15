module.exports = (sequelize,DataTypes) =>{
    let User = sequelize.define('user',{
        email : {type:DataTypes.STRING,notNull:true},
        password: {type:DataTypes.STRING,notNull:true},
        first_name:{type:DataTypes.STRING,notNull:true},
        last_name:{type:DataTypes.STRING,notNull:true}
    })

    User.associate = (model) =>{
    }

    return User
}