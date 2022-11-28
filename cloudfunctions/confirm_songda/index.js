const cloud = require('wx-server-sdk')
const math = require('mathjs'); 
cloud.init({
  env: 'cloud1-3gi0hfhm972a1771'
})
const db = cloud.database({
  throwOnNotFound: false,
});
const _ = db.command
exports.main = async (event) => {
  try {
    const result = await db.runTransaction(async transaction => {
      const publish_Res = await transaction.collection('publish').doc(event.publish_id).get()
      const order_Res = await transaction.collection('order').doc(event.order_id).get()
      const user_Res = await transaction.collection('user').doc(event.user_id).get()
      if (publish_Res.data&&order_Res.data) {
        //改publish订单的状态
        const update1_Res = await transaction.collection('publish').doc(event.publish_id).update({
          data: {
               status:3, //改为已完成
               pei_time:event.pei_time   //配送用时
          }
        })
        //改order订单的状态
        const update2_Res = await transaction.collection('order').doc(event.order_id).update({
          data: {
               status:2,  //改为已完成
               pei_time:event.pei_time,    ////配送用时
          }
        })
        //更新钱包余额
        //计算跑腿总额，并更新
        var yuan_money = user_Res.data.money
        var paotui_price = publish_Res.data.paotui_price
        var a = math.evaluate(yuan_money+paotui_price)
        var new_money = math.round(a,2)
        //开始更新钱包
        const user_add = await db.collection('user').doc(event.user_id).update({
          data:{
              money:new_money,
          }
        })
        // //添加钱包收益记录
        const wxContext = cloud.getWXContext()
        const history_add = await db.collection('history').add({
            data:{
                  _openid:wxContext.OPENID,
                  name:'跑腿收益',
                  stamp:event.creat,
                  num:parseFloat(paotui_price),
                  type:1 //0表示钱包减少，1表示钱包增加
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