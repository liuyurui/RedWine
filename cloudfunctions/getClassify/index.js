// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const _ = db.command
  return db.collection('product_detail').where({
    product_type: _.eq(event.productType)
  })
  .get()
  .then(res => {
    console.log(res)
    var x
    for (x in res.data) {
      res.data[x].buy_num = 0
    }
    return res
  })
}