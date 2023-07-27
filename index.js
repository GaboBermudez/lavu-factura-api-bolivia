import app from './app.js'
import { config } from 'dotenv'

const PORT = 8080

config()

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
