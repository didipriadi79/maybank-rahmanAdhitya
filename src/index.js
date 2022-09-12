const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express()

dotenv.config()
const PORT = process.env.PORT || 2003
const { sequelize } = require("./lib/sequelize");
sequelize.sync({ alter: true });

app.use(cors())
app.use(express.json())

const {transactionRoutes, authRoutes, billsRoutes, categoryRoutes} = require("./routes")

app.use("/auth", authRoutes)
app.use("/bills", billsRoutes)
app.use("/transaction", transactionRoutes)
app.use("/category", categoryRoutes)

app.listen(PORT,()=>{
    console.log("listening in port " + PORT )
})
