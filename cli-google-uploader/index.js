import inquirer from "inquirer";
import { existsSync } from 'fs'
import path from "path";
import { upload } from "./upload.js";
import { shortUrl } from "./shortUrl.js";

const imageInfo = {
  path: '',
  imageName: ''
}
const extensions = ['jpg', 'png', 'webp']

await inquirer.prompt([
  {
    type: 'input',
    name: 'image',
    message: 'Enter your image path or drag and drop it here',
    validate(input) {
      if (!existsSync(input)) return 'Path is incorrect or this file already doesnt exist'
      if (!extensions.includes(path.extname(input).slice(1))) return 'Invalid extension! (Only .jpg, .png, .webp is supported)'
      return true
    }
  }
]).then(input => {
  imageInfo.path = input.image
  imageInfo.imageName = path.basename(imageInfo.path)
  askForRename()
})

function askForRename() {
  inquirer.prompt([
    {
      type: 'confirm',
      default: true,
      name: 'changeName',
      message: ` You are uploading image with the name "${imageInfo.imageName}" Do you want to rename your image?`
    }
  ]).then(input => {
    if (input.changeName) {
      return rename()
    }
    uploadFile(imageInfo)
  })
}

function rename() {
  inquirer.prompt([
    {
      type: 'input',
      default: imageInfo.imageName,
      name: 'imageName',
      message: 'Enter image name (without extention)',
      validate(input) {
        if (input.length < 4 || input.length > 20) return 'invalid image name'
        return true
      }
    }
  ]).then(input => {
    imageInfo.imageName = input.imageName + path.extname(imageInfo.path)
    uploadFile(imageInfo)
  })
}

async function uploadFile(info) {
  upload(info)
    .then(data => {
      askForTinyUrl(`https://drive.google.com/uc?export=view&id=${data}`)
    })
    .catch(err => console.log(err))

}

function askForTinyUrl(imageUrl) {
  inquirer.prompt([
    {
      type: 'confirm',
      default: true,
      message: `Current image Url is ${imageUrl}. Would you like to use TinyUrl?`,
      name: 'useTiny'
    }
  ]).then(input => {
    if (input.useTiny) {
      shortUrl(imageUrl).then(url => {
        console.log(`Your short url is ${url}`);
      }).catch(err => console.log(err))
    }
  })
}
