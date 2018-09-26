// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var classifies
  const db = cloud.database()
  const _ = db.command
  await db.collection('product_types')
  .doc(event._id)
  .update({
    data: {
      order: _.inc(10001)
    }
  })

  return await db.collection('product_types').orderBy('order', 'desc').get()
}