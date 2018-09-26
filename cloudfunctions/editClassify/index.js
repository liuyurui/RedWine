// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.database().collection('product_types').doc(event._id).update({
    data: {
      name: event.classifyName,
      desc: event.classifyDesc,
      img: event.fileId,
      show: event.show,
    }
  })
}