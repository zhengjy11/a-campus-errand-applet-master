// pages/publish/publish.js


var amapFile = require('../../libs/amap-wx.130');//如：..­/..­/libs/amap-wx.js
var config = require('../../libs/config');      //引用我们的配置文件


var app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
      type:0,   //订单类型
      campus:'',
      pass:false,  //是否可以接单

      list:[],
      nomore:false,
      page:0,

      button_disabled:false, //接单按钮是否开启，这个值主要是用于防止多次点击“立即接单”而造成bug

      markers: [], //地图
      latitude: '',
      longitude: '',
      textData: {},

      loadingTime1:'',
      loadingTime2:'',

      end31:0,
      end32:0,
      end33:0,
      end34:0,
      end35:0
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function () {
      var that = this;
      var key = config.Config.key;
      var myAmapFun = new amapFile.AMapWX({ key: key });
      myAmapFun.getRegeo({
        iconPath: "",
        iconWidth: 22,
        iconHeight: 32,
        success: function (data) {
          console.log(data);
          var marker = [{
            id: data[0].id,
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            iconPath: data[0].iconPath,
            width: data[0].width,
            height: data[0].height
          }]
          that.setData({
            markers: marker
          });
          that.setData({
            latitude: data[0].latitude
          });
          that.setData({
            longitude: data[0].longitude
          });
          that.setData({
            textData: {
              name: data[0].name,
              desc: data[0].desc
            }
          })
        },
        fail: function (info) {
           wx.showModal({title:info.errMsg})
        }
      })
      
  },
   
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //自动跳转到路线页面
    //console.log(app.globalData.count1);
    if(app.globalData.count1==0){
        //console.log("判断过了1");
     this.setData({
        loadingTime1 : setTimeout(this.reminder,4000)
     });   
     //clearTimeout(this.data.loadingTime1);  加了clear计时器无效
     app.globalData.count1 = 1;
    }
    //console.log(app.globalData.count1);
    
    // console.log(app.globalData.count2);
    // if(app.globalData.count2==0){
    //     //console.log("判断过了2");
    //  this.setData({
    //     loadingTime2 : setTimeout(this.reminder,5000)
    //  });   
    //  //clearTimeout(this.data.loadingTime2);
    //  app.globalData.count2 = 1;
    // }
    // console.log(app.globalData.count2);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
     this.get_list()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


   //抢单成功提示框,实现页面跳转
   reminder(){
    wx.showToast({
      title: '恭喜！抢单成功',
      duration:2000
    })
    wx.navigateTo({
      url: '../navigation_ride/navigation',
    })
  },


     //取货成功提示框
  reminder1(){
    wx.showToast({
      title: '取货成功',
    }),
    wx.navigateTo({
      url: '../phone/phone',
    })
  },
  reminder2(){
    wx.showToast({
      title: '已送达！',
    })
    wx.navigateTo({
        url: '../phone2/phone',
      })
  },

  //点击结束订单后不显示当前订单信息
  reminder31(){
    wx.showToast({
      title: '恭喜！结束订单',
    })
    this.setData({
        end31:1
    })

  },
  reminder32(){
    wx.showToast({
      title: '恭喜！结束订单',
    })
    this.setData({
        end32:1
    })
  },
  reminder33(){
    wx.showToast({
      title: '恭喜！结束订单',
    })
    this.setData({
        end33:1
    })
  },
  reminder34(){
    wx.showToast({
      title: '恭喜！结束订单',
    })
    this.setData({
        end34:1
    })
  },
  reminder35(){
    wx.showToast({
      title: '恭喜！结束订单',
    })
    this.setData({
        end35:1
    })
  }
})