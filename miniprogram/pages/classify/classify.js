// miniprogram/pages/classify/classify.js
var allProducts

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
    console.log(options)
    
    wx.showNavigationBarLoading()
    var that = this
    //请求类型产品
    wx.cloud.callFunction({
      name: 'getClassify',
      data: {
        productType: options.product_type
      },
      complete: res => {
        console.log(res)
        that.setData({
          products: res.result.data
        })
        allProducts = res.result.data

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  plus: function(options) {
    console.log('plus')
    console.log(options)
    var index = options.currentTarget.dataset.src
    allProducts[index].buy_num = parseInt(allProducts[index].buy_num) + 1
    this.setData({
      products: allProducts
    })
  },

  minus: function(options) {
    console.log("minus")
    console.log(options)
    var index = options.currentTarget.dataset.src
    if (allProducts[index].buy_num > 0) {
      allProducts[index].buy_num = parseInt(allProducts[index].buy_num) - 1
      this.setData({
        products: allProducts
      })
    }
  }
})