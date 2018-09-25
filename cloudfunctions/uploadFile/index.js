// 云函数入口文件
const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const fileStream = fs.createReadStream(event.filePath)
  console.log(fileStream)
  return await cloud.uploadFile({
    cloudPath: event.cloudPath,
    fileContent: fileStream, 
  })
}