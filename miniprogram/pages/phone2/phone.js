var amapFile = require('../../libs/amap-wx.130.js');
var config = require('../../libs/config.js');
var app = getApp();
Page({
  data: {
    markers: [{
      iconPath: "../../images/mapicon_navi_e.png",
      id: 0,
      latitude: 30.170000,
      longitude:120.156900,
      width: 23,
      height: 33
    },{
      iconPath: "../../images/mapicon_navi_s.png",
      id: 1,
      latitude: 30.172757,
      longitude: 120.149795,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: [],
    duration:'',

    message:0,//新订单消息弹框是否出现，默认为0，不出现
    time:15,
    stop:0
  },
  onLoad: function() {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getRidingRoute({
      origin: '120.149795, 30.172757',
      destination: '120.156900,30.170000',
      success: function(data){
        
        var points = [];
        if(data.paths && data.paths[0] && data.paths[0].rides){
          var rides = data.paths[0].rides;
          for(var i = 0; i < rides.length; i++){
            var poLen = rides[i].polyline.split(';');
            for(var j = 0;j < poLen.length; j++){
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            } 
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#2d8cf0",
            width: 8
          }]
        });
        if(data.paths[0] && data.paths[0].distance){
          that.setData({
            distance: data.paths[0].distance/1000 + '公里'
          });
        }
        if(data.paths[0] && data.paths[0].duration){
          that.setData({
            duration: parseInt(data.paths[0].duration/60)+ '分钟'
          });
        }
        //console.log(data.paths)
      },
      fail: function(info){
            console.log(info);
      }
    })
  },
  onShow: function(){
    // setTimeout(this.setMessage,10000)
    //  console.log(this.data.time)
    // var countTime = setInterval(this.timer,1000)
    // setTimeout(function () {
    //     wx.navigateTo({
    //   url: '../navigation_ride2/navigation',
    // })
    // },15000)
  },
  setMessage(){
        this.setData({
            message:1
        })
  },
  timer(){
      if(this.data.time==0&&this.data.stop==0){
          this.setData({
              stop:1
          })
        clearInterval(this.data.countTime)
      }
      else if(this.data.time>0&&this.data.stop==0){
          this.setData({
          time:this.data.time-1
      })
      }
  },

})