// miniprogram/pages/newClassify/newClassify.js
var filePath
var fileId
var classifyName
var classifyDesc
var show = false

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showItems: [
      {name: 'show', value:'在首页显示'}
    ]
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

  onNameInput: function (options) {
    classifyName = options.detail.value
  },

  onNameFocus: function () {
    this.setData({
      nameFocused: true
    })
  },

  onNameBlur: function () {
    this.setData({
      nameFocused: false
    })
  },

  onDescInput: function (options) {
    classifyDesc = options.detail.value
    this.setData({
      desc: classifyDesc
    })
  },

  onDescFocus: function () {
    this.setData({
      descFocused: true
    })
  },

  onDescBlur: function () {
    this.setData({
      descFocused: false
    })
  },

  showChange: function(options) {
    show = options.detail.value.length > 0
  },

  selectImage: function() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function(res) {
        filePath = res.tempFilePaths[0]
        fileId = ''
        that.setData({
          imageId: filePath,
        })
      },
      fail: function(e) {
        wx.showToast({
          title: '选择图片失败，请重试',
        })
      }
    })
  },

  newClassify: function() {
    if (typeof(classifyName) == "undefined") {
      wx.showToast({
        title: '请输入商品分类名称',
      })
      return
    }

    if (typeof(classifyDesc) == "undefined") {
      wx.showToast({
        title: '请输入商品分类描述',
      })
      return
    }

    if (typeof(filePath) == "undefined") {
      wx.showToast({
        title: '请选择商品分类图片',
      })
      return
    }

    if (fileId == '') {
      // 上传图片
      var date = new Date()
      const cloudPath = 'classify/' + date.getTime() + filePath.match(/\.[^.]+?$/)[0]
      wx.showLoading({
        title: '数据提交中',
      })
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          fileId = res.fileID
          //新增商品分类
          this.doNewClassify()
        },
        fail: e => {
          wx.showToast({
            icon: 'none',
            title: '新增商品分类失败，请稍后重试',
          })
          wx.hideLoading()
        }
      })
    } else {
      wx.showLoading({
        title: '数据提交中',
      })
      this.doNewClassify()
    }
  },

  doNewClassify: function() {
    wx.cloud.callFunction({
      name: 'newClassify',
      data: {
        name: classifyName,
        desc: classifyDesc,
        img: fileId,
        show: show,
      },
      success: res => {
        wx.navigateBack({
          delta: 1
        })
      }, 
      fail: e => {
        wx.showToast({
          title: '联网失败，请稍后重试',
        })
      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  }
})