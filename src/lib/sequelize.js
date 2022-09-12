const {Sequelize, DataTypes} = require("sequelize")

const sequelize = new Sequelize({
    username: process.env.USERNAME_SQL,
    password: process.env.PASSWORD_SQL,
    database: process.env.DB_NAME,
    // host: process.env.HOST_SQL,
    port: 3306,
    dialect: "mysql",
    logging: false
})

const user = sequelize.define("User",  {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance_account :{
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

const bills = sequelize.define("Bills",{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    },
})

const merchant = sequelize.define("Merchant", {
    merchant_name:{
        type : DataTypes.STRING,
        allowNull:false
    }
})

const transaction = sequelize.define("Transaction",{
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    transaction_detail:{
        type : DataTypes.STRING,
        allowNull:false,
    },
    customer_id:{
        type : DataTypes.STRING,
        allowNull : false
    }
})

const category = sequelize.define("Category",{
    category_name :{
        type : DataTypes.STRING,
        allowNull:false
    }
})

transaction.belongsTo(user, {foreignKey: "user_id"})
user.hasMany(transaction, {foreignKey : "user_id"})

transaction.belongsTo(bills,{foreignKey : "bill_id"})
bills.hasMany(transaction,{foreignKey : "bill_id"})

bills.belongsTo(category, {foreignKey: "category_id"})
category.hasMany(bills, {foreignKey:"category_id"})

bills.belongsTo(merchant, {foreignKey:"merchant_id"})
merchant.hasMany(bills, {foreignKey:"merchant_id"})

module.exports = {
    user,
    bills,
    transaction,
    category,
    merchant,
    sequelize
}