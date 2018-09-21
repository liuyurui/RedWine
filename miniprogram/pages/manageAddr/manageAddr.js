// miniprogram/pages/addrManage/addrManage.js
var addrArray
var handling

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
    wx.showNavigationBarLoading()

    var that = this
    var db = wx.cloud.database();
    db.collection('addrs').get({
      success: res => {
        that.setData({
          addrs: res.data
        })
        addrArray = res.data
      },
      fail: function() {

      }, 
      complete: res => {
        wx.hideNavigationBarLoading()
      }
    })
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

  goNewAddr: function() {
    wx.navigateTo({
      url: '/pages/newAddr/newAddr',
    })
  },

  onAddrClick: function(options) {
    if (handling) {
      var addr = options.currentTarget.dataset.src
      wx.navigateTo({
        url: '/pages/editAddr/editAddr' + '?receiver=' + addr.receiver + '&phone=' + addr.phone + '&region=' + addr.region + '&addr=' + addr.addr + '&postal=' + addr.postal + '&_id=' +addr._id,
      })
      handling = false
    }
  },

  onAddrLongClick(options) {
    var id = options.currentTarget.dataset.src._id
    var that = this

    wx.showModal({
      title: '删除提示',
      content: '确认删除该收货地址？',
      showCancel: true,
      success: res => {
        if (res.confirm) {
          wx.cloud.database().collection('addrs').doc(id).remove({
            success: function (res) {
              var index
              for (index in addrArray) {
                if (id == addrArray[index]._id) {
                  addrArray.splice(index, 1)
                  break
                }
              }
              that.setData({
                addrs: addrArray
              })
              console.log(addrArray)
            },
            fail: function () {
              wx.showToast({
                title: '删除失败，请稍后重试',
              })
            },
            complete: function () {
              wx.hideLoading()
            }
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '删除失败，请稍后重试',
        })
      }
    })
    handling = false
  },

  onTouchStart: function() {
    handling = true
  }
})