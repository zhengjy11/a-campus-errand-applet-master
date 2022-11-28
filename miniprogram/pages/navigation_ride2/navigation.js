var amapFile = require('../../libs/amap-wx.130.js');
var config = require('../../libs/config.js');

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
      latitude: 30.171215,
      longitude: 120.150896,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: [],
    duration:''
  },
  onLoad: function() {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getRidingRoute({
      origin: ' 120.150896, 30.171215',
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
  goDetail: function(){
    wx.navigateTo({
      url: '../navigation_ride_detail/navigation'
    })
  }
})