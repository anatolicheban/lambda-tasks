import fs from "fs"
import { google } from "googleapis"
import path from 'path'
const googleFolderId = '18Nzi0FCpxTYEuBNevZ8_ok3YfrONavYv'

export async function upload(fileInfo) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'orbital-bee-376312-fb2733c58474.json'),
      scopes: ['https://www.googleapis.com/auth/drive']
    })
    const driveService = google.drive({
      version: 'v3',
      auth
    })
    const fileMetaData = {
      name: fileInfo.imageName,
      parents: [googleFolderId]
    }
    const media = {
      mimeType: `image/${path.extname(fileInfo.path).slice(1)}`,
      body: fs.createReadStream(fileInfo.path)
    }

    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      fields: 'id'
    })
    return response.data.id
  } catch (err) {
    return err
  }
}