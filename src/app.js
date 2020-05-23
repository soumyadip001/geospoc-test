const path = require("path")
const express = require("express")
require("./db/mongoose")
const userRouter = require("./routes/users")
const custRouter = require("./routes/cust")
const cors = require("cors")

const publicDirectoryPath = path.join(__dirname, "../public")

const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(userRouter)
app.use(custRouter)


app.listen(port, () => {
    console.log("Server running on port " + port)
})