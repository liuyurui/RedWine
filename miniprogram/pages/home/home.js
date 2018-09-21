// miniprogram/pages/home/home.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: false,
    nickName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求数据，通过云函数
    wx.showNavigationBarLoading()
    var that = this
    wx.cloud.callFunction({
      name: 'getClassifies',
      success: res => {
        if (typeof (res.result) != "undefined") {
          that.setData({
            banners: res.result.banners,
            classifies: res.result.classifies
          })
        }
      },
      fail: function() {
        console.log('fail')
      },
      complete: res => {
        wx.hideNavigationBarLoading()
      }
    })

    if (typeof(app.globalData.userInfo) != "undefined") {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      })
    } else {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                that.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName
                })
                app.globalData.userInfo = res.userInfo
              }
            })
          }
        }
      })
    }
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

  goProductType: function(options) {
    wx.navigateTo({
      url: '/pages/classify/classify' + '?product_type=' + options.currentTarget.dataset.src.product_type,
    })
  },

  onGetUserInfo: function(options) {
    this.setData({
      avatarUrl: options.detail.userInfo.avatarUrl,
      nickName: options.detail.userInfo.nickName,
    })
    app.globalData.userInfo = options.detail.userInfo
    this.goMy()
  },

  goMy: function() {
    if (typeof(app.globalData.userInfo) != "undefined") {
      wx.navigateTo({
        url: '/pages/my/my',
      })
    } else {
      wx.showToast({
        title: '请先点击登录',
      })
    }
  }
})