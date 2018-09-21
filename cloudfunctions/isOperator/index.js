// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var openid = event.userInfo.openId
  const _ = db.command
  return db.collection('operator').where({
    openid: _.eq(openid)
  }).get()
  .then(res => {
    return res.data.length
  })
}