var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addmissage: '选的位置',
        // markers	 Array	标记点
        stitle: '故宫',
        latitude: "",
        longitude: "",
        scale: 14,
        markers: [],
        distanceArr: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        //获取当前的地理位置、速度
        wx.getLocation({
            type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            success: function (res) {
                console.log(res);
                //赋值经纬度
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,

                })
                // 发送给朋友、分享朋友圈
                app.onShareAppMessage();
            }
        })



    },
    //导航
    onGuideTap: function (event) {
        var lat = Number(event.currentTarget.dataset.latitude);
        var lon = Number(event.currentTarget.dataset.longitude);
        var bankName = event.currentTarget.dataset.bankname;
        console.log(lat);
        console.log(lon);
        wx.openLocation({
            type: 'gcj02',
            latitude: lat,
            longitude: lon,
            name: bankName,
            scale: 28
        })
    },



})
