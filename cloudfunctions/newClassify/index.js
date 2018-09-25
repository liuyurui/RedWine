// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  return await db.collection('product_types').add({
    data: {
      name: event.name,
      desc: event.desc,
      img: event.img,
    }
  })
}