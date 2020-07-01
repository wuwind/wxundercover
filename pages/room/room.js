// pages/room/room.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  openTap: function (e) {
    wx.navigateTo({
      url: '../main/main?userData='+JSON.stringify(e.currentTarget.dataset.value),
    })
  },
  refresh: function (userData) {
    this.setData({
      listdata: userData
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mUserIds = options.userIds
    var that = this
    wx.getStorage({
      key: 'user_data',
      success(res) {
        console.log("user_data:" + res.data)
        let userData = JSON.parse(res.data)
        that.refresh(userData)
      }
    })

    let data = {
      userIds: mUserIds
    }
    app.wxRequest('GET', 'getGameByUser', data, (res) => {
      console.log(res.data.data)
      wx.setStorage({
        data: JSON.stringify(res.data.data),
        key: 'user_data',
      })
      this.refresh(res.data.data)
    }, (res) => {
      wx.showToast({
        title: '请稍后刷新',
        icon: 'fail',
        duration: 2000
      })
    });
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

  }
})