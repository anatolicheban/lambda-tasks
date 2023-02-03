const TINY_URL_API_KEY = 'tr5sNeImHEDqdlXRox3bYkC7BRA7TkochvGSvrSMZk0kkN5ReUtpsSrzU85g'
import axios from "axios"

// export const shortUrl = async (url) => {
//   try {
//     let response = await fetch(`https://api.tinyurl.com/create?api_token=${TINY_URL_API_KEY}`, {
//       method: 'POST',
//       headers: [['accept', 'application/json'], ['Content-Type', 'application/json']],
//       body: JSON.stringify({
//         url,
//         "domain": "tiny.one",
//       })
//     })
//     const data = await response.json()
//     return data.data.tiny_url
//   } catch (err) {
//     return err
//   }

// }

export const shortUrl = async (url) => {
  try {
    let response = await axios.post(`https://api.tinyurl.com/create?api_token=${TINY_URL_API_KEY}`, {
      url,
      "domain": "tiny.one",
    })
    return response.data.data.tiny_url
  } catch (err) {
    return err
  }
}