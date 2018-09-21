// miniprogram/pages/newAddr/newAddr.js
var receiver
var phone
var region
var addr
var postal

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    regionInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  onReceiverInput: function(options) {
    receiver = options.detail.value
  },

  onReceiverFocus: function () {
    this.setData({
      receiverFocused: true
    })
  },

  onReceiverBlur: function () {
    this.setData({
      receiverFocused: false
    })
  },

  onPhoneInput: function(options) {
    phone = options.detail.value
  },

  onPhoneFocus: function () {
    this.setData({
      phoneFocused: true
    })
  },

  onPhoneBlur: function () {
    this.setData({
      phoneFocused: false
    })
  },

  onAddrInput: function(options) {
    addr = options.detail.value
  },

  onAddrFocus: function () {
    this.setData({
      addrFocused: true
    })
  },

  onAddrBlur: function () {
    this.setData({
      addrFocused: false
    })
  },

  onPostalInput: function(options) {
    postal = options.detail.value
  },

  onPostalFocus: function () {
    this.setData({
      postalFocused: true
    })
  },

  onPostalBlur: function () {
    this.setData({
      postalFocused: false
    })
  },

  checkInput: function() {
    var tips
    if (typeof (receiver) == "undefined") {
      tips = '请输入收货人姓名'
    } else if (receiver.length < 2) {
      tips = '姓名不能少于2个字'
    } else if (typeof (phone) == "undefined") {
      tips = '请输入手机号'
    } else if (phone.length != 11) {
      tips = '请输入11位手机号'
    } else if (typeof(region) == "undefined" || region.length == 0) {
      tips = '请选择地区信息'
    } else if (typeof (addr) == "undefined") {
      tips = '请输入详细地址'
    } else if (addr.length < 4) {
      tips = '详细地址不能少于4个字'
    } else if (typeof (postal) == "undefined") {
      tips = '请输入邮件编码'
    }

    return tips
  },

  submitAddr: function() {
    var tips = this.checkInput()
    if (typeof(tips) != "undefined") {
      wx.showToast({
        title: tips,
      })
      return
    }
    
    var db = wx.cloud.database()
    var date = new Date()
    wx.showLoading({
      title: '数据提交中',
    })
    db.collection('addrs').add({
      data: {
        receiver: receiver,
        phone: phone,
        region: region,
        addr: addr,
        postal: postal,
        create_time: date
      },
      success: function() {
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        })
      },
      fail: function() {
        wx.hideLoading()
        wx.showToast({
          title: '联网失败，请稍后重试',
        })
      }
    })
  },

  onRegionInput: function(options) {
    region = options.detail.value
    this.setData({
      region: region,
      regionInfo: region
    })

  }
})