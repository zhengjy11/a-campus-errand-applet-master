const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-3gi0hfhm972a1771'
})

exports.main = async (event, context) => {

  try {
  //   //发送订单接单提醒
   if(event.type==1){

    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.publish_openid,
      templateId: "A8DIF6R_T0BS4Uy1fpJjMfbuD4IgbbwbF7NEZWGSm3U",
      data: {
        "character_string1": {
          "value":event.publish_id
        },

        "thing5": {
          "value": '骑手已接单'
        },

      }
    })

   }
   //发送订单送达提醒
   if(event.type==2){

    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.publish_openid,
      templateId: "gzLA4NdrPPwFkTzQ7CVvsDNKUqe-86Z-q8wAfYyc8-U",
      data: {
        "character_string1": {
          "value":event.publish_id
        },     
        "time2": {
          "value": event.time
        },
        "thing3": {
          "value": '详情请登录小程序查看'
        },
      }
    })

   }
  } catch (err) {
    console.log(err)
    return err
  }
}