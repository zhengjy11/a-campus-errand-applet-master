
const cloud = require('wx-server-sdk')
 
cloud.init({
  env:'cloud1-3gi0hfhm972a1771'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const orderId = event.outTradeNo
  const openid = event.userInfo.openId
  const returnCode = event.returnCode
  if(returnCode == 'SUCCESS'){
    //更新云数据库的订单状态
    db.collection('publish').where({
        _id:orderId,
        _openid:openid
    }).update({
      data:{
        pay_status:true,
      }
    })
    const res = {errcode:0,errmsg:'支付成功'}//需要返回的字段，不返回该字段则一直回调
    return res
  }
}
