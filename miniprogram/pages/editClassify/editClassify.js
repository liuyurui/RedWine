// miniprogram/pages/editClassify/editClassify.js
var filePath
var fileId
var classifyName
var classifyDesc
var show
var _id

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showItems: [
      { name: 'show', value: '在首页展示该商品分类' }
    ],
    imagePath: '/images/classify_d.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    _id = options._id
    classifyName = options.name
    classifyDesc = options.desc
    fileId = options.img
    show = options.show
    console.log(show.toString())
    this.setData({
      name: classifyName,
      desc: classifyDesc,
      imagePath: fileId,
      'showItems[0].checked': show ? 'true' : 'false',
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

  showChange: function (options) {
    show = options.detail.value.length > 0
  },

  selectImage: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        filePath = res.tempFilePaths[0]
        fileId = ''
        that.setData({
          imagePath: filePath,
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '选择图片失败',
        })
      }
    })
  },

  editClassify: function () {
    if (typeof (classifyName) == "undefined") {
      wx.showToast({
        title: '请输入商品分类名称',
      })
      return
    }

    if (typeof (classifyDesc) == "undefined") {
      wx.showToast({
        title: '请输入商品分类描述',
      })
      return
    }

    if (typeof (filePath) == "undefined" && fileId == "") {
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
          this.doEditClassify()
        },
        fail: e => {
          wx.showToast({
            icon: 'none',
            title: '新增商品分类失败',
          })
          wx.hideLoading()
        }
      })
    } else {
      wx.showLoading({
        title: '数据提交中',
      })
      this.doEditClassify()
    }
  },

  doEditClassify: function () {
    wx.cloud.callFunction({
      name: 'editClassify',
      data: {
        _id: _id,
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
          title: '联网失败',
        })
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  }
})