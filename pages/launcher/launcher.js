// pages/launcher/launcher.js
const app = getApp();
var mHits = new Array(5)
var lancherTimer
Page({

  /**
   * 页面的初始数据
   */
  data: {
    launcher_img: '',
    launcher_text: '欢迎',
    launcher: 0
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

  click: function () {
    app.wxClickN(mHits, () => {
      wx.navigateTo({
        url: '/pages/word/wordlist'
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.launcher = app.globalData.properties.launcher
    if (app.globalData.properties.launcherImg) {
      this.setData({
        launcher_img: app.globalData.URL.substring(0, app.globalData.URL.length - 4) + app.globalData.properties.launcherImg,
        launcher_text: app.globalData.properties.launcherText
      })
    }
    clearTimeout(lancherTimer)
    lancherTimer = setTimeout(() => {
      if (!this.data.launcher || this.data.launcher == 0) {
        console.log("navigateTo index")
        wx.navigateTo({
          url: '/pages/index/index'
        })
      }
    }, 3000);
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