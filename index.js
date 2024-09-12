import app from './app.js';  
import constants from './constants.js'
import moongose from 'mongoose'

const PORT = process.env.PORT || 3397;


moongose.connect(
    `mongodb+srv://${constants.DB_USER}:${constants.DB_PASS}@${constants.DB_HOST}/`,
    (error) => {
      if (error) throw error;
      app.listen(PORT, () => {
          console.log("**")
          console.log("** API REST **")
          console.log("**")
          console.log(`http://${constants.IP_SERVER}:${PORT}/api/${constants.API_VERSION}`)
      })
    }
)