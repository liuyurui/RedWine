// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var data = {}
  await db.collection('product_types_banner').get()
  .then(res => {
    data.banners = res.data;
    return res.data
  })

  await db.collection('product_types').get()
  .then(res => {
    data.classifies = res.data
    return res.data
  })

  return data;
}