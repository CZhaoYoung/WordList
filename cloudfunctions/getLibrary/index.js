//get MyBook
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID

  var bookinfo = {

  }
  try {
    if (event.Uid == await db.collection('UserBook').doc('Uid').get()) {
      return await db.collection('UserBook').doc('Bid').get()
    }

    if (Bid == await db.collection('BookInfo').doc('Bid').get()) {
      bookinfo = db.collection('BookInfo').get()
    }
  } catch (e) {
    console.error(e)
  }
  return {
    bookinfo: bookinfo
  }
}