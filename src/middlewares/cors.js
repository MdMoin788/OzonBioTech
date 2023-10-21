
import { whiteListedUrl } from "../constants/data.js"

const validateOrigin = (origin, callback) => {
  if (whiteListedUrl.indexOf(origin) !== -1) {
    callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}

export const corsOptions = {
  origin: validateOrigin,
  credentials: true,
  optionsSuccessStatus: 200,
}