var amapFile = require('../../libs/amap-wx.130.js');
var config = require('../../libs/config.js');

Page({
  data: {
    rides: {}
  },
  onLoad: function() {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getRidingRoute({
      origin: '120.149795, 30.172757',
      destination: '120.156900,30.170000',
      success: function(data){
        console.log(data.paths[0])
        if(data.paths && data.paths[0] && data.paths[0].rides){
          that.setData({
            rides: data.paths[0].rides
          });
        }
          
      },
      fail: function(info){
        console.log(info)

      }
    })
  }
})