// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID
  var task2 = {
    newWords: [],
    oldWords: []
  }
  try {
    task2.newWords = (await db.collection('WordInfo').limit(10).get()).data
    task2.oldWords = (await db.collection('WordInfo').skip(10).limit(20).get()).data
  } catch (e) {
    console.error(e)
  }
  return {
    task: task2
  }
}