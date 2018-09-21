// miniprogram/pages/my/my.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    manager: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof(app.globalData.userInfo) != "undefined") {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      })
    }

    var that = this
    wx.cloud.callFunction({
      name: 'isOperator',
      success: res => {
        if (typeof(res.result) != "undefined") {
          that.setData({
            manager: res.result
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

  goAddrManage: function() {
    wx.navigateTo({
      url: '/pages/manageAddr/manageAddr',
    })
  },

  goBuyHistory: function() {
    wx.chooseAddress({
      complete: res => {
        
      }
    })
  },

  goManageClassify: function() {
    wx.navigateTo({
      url: '/pages/manageClassify/manageClassify',
    })
  }
})