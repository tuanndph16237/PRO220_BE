require('dotenv').config();
import express from  'express'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
try {
  // connect db atlas ket noi db atlas
  ;(async () => {
    await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE}:${process.env.PASSWORD}@cluster0.utwdlzd.mongodb.net/web_app`
    )
    console.log('connected db ')
  })()
} catch (error) {
  console.log('ket noi that bai')
}
const server = app.listen(process.env.PORT, () => {
  console.log(`connected port ${process.env.PORT}`)
})