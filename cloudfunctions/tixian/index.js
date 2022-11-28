const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-3gi0hfhm972a1771'
})
const db = cloud.database({
  throwOnNotFound: false,
});
exports.main = async (event) => {
  try {
    const result = await db.runTransaction(async transaction => {
      const userRes = await transaction.collection('user').doc(event.user_id).get()
      
      if (userRes.data) {

        const updateuserRes = await transaction.collection('user').doc(event.user_id).update({
          data: {
             money:0,
          }
        })


        const updatetixianRes = await transaction.collection('tixian').add({
          data: {
               _openid:cloud.getWXContext().OPENID,
               balance:event.balance,
               tixian_time:event.tixian_time,
               code:event.code,
          }
        })
        const updatehistoryRes = await transaction.collection('history').add({
          data: {
               _openid:cloud.getWXContext().OPENID,
               name:event.name,
               stamp:event.stamp,
               num:parseFloat(event.cost),
               type:0, //0表示钱包减少，1表示钱包增加
          }
        })
        return {
          success:true,
        }
      } else {
        await transaction.rollback('失败了')
      }
    })
    return result;
  } catch (e) {
    console.error(`事务报错`, e)
    return {
      success: false,
      error: e
    }
  }
}