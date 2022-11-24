module.exports = (sequelize,DataTypes) =>{
    let Receipt = sequelize.define('receipt',{
        category : {type:DataTypes.STRING,notNull:true},
        title: {type:DataTypes.STRING,notNull:true},
        cost:{type:DataTypes.INTEGER,notNull:true},
    })

    return Receipt
}