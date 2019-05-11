// 收到Wid,返回wordinfo
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var WordInfo2 = {}
  var valid = false;
  if(event.Wid){
    var wid = parseInt(event.Wid)
    try {
      WordInfo2 = (await db.collection('WordInfo').where({
        Wid: wid
      }).get()).data[0]
      if (WordInfo2) {
        valid = true;
      }
    } catch (e) {
      console.error(e)
    }
  }
  if(event.name){
    try {
      WordInfo2 = (await db.collection('WordInfo').where({
        name: event.name
      }).get()).data[0]
      if (WordInfo2) {
        valid = true;
      }
    } catch (e) {
      console.error(e)
    }
  }
  return {
    valid: valid,
    wordInfo: WordInfo2
  }
}