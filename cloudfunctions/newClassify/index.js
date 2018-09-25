// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  var order = 0
  await db.collection('product_types')
  .orderBy('order', 'desc')
  .limit(1)
  .get()
  .then(res => {
    if (res.data.length > 0) {
      order = res.data[0].order
    }
  })
  .catch(err => {
    order = 10000
  })
  order += 100
  return await db.collection('product_types').add({
    data: {
      name: event.name,
      desc: event.desc,
      img: event.img,
      show: event.show,
      order: order,
    }
  })
}