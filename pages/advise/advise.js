// pages/advise/advise.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area_value:'',
  },
  bindFormSubmitAdvise(e) {
    let mContent = e.detail.value.textarea
    if (!mContent) {
      wx.showToast({
        title: '填写内容',
        icon: 'fail',
        duration: 1000
      })
      return
    }
    console.log(mContent)
    console.log(this.data.userName)
    let data = {
      content: mContent,
      name: this.data.userName
    };
    app.wxRequest('GET', 'addAdvise', data, (res) => {
      console.log(res.data)
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'fail',
          duration: 2000
        })
        return
      }
      console.log(res.data.data)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        area_value:""
      })
    }, (res) => {
      wx.showToast({
        title: '检查网络',
        icon: 'fail',
        duration: 2000
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var mName = options.userName
    console.log(mName)
    this.setData({
      userName:mName
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

  }
})