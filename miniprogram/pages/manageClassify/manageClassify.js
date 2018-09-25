// miniprogram/pages/manageClassify/manageClassify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    wx.showNavigationBarLoading()
    var that = this
    db.collection('product_types').orderBy('order', 'desc').get({
      success: res => {
        console.log(res)
        that.setData({
          classifies: res.data
        })
      },
      fail: e => {

      },
      complete: function() {
        wx.hideNavigationBarLoading()
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

  goNewClassify: function() {
    wx.navigateTo({
      url: '/pages/newClassify/newClassify',
    })
  }
})