// miniprogram/pages/home/home.js
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
      complete: res => {
        console.log(res.result)
        that.setData({
          banners: res.result.banners,
          classifies: res.result.classifies
        })
        wx.hideNavigationBarLoading()
      }
    })

    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
              })
            }
          })
        }
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
    console.log(options)
    this.setData({
      avatarUrl: options.detail.userInfo.avatarUrl,
      nickName: options.detail.userInfo.nickName,
    })
    this.goMy()
  },

  goMy: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
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
  }
})