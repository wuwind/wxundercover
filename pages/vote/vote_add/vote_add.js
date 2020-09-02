// pages/vote/vote_add/vote_add.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '内容',
    items: [6, 7, 9]
  },
  del: function (options) {
    console.log(options.currentTarget.dataset.value)
    var temp = this.data.items
    temp.splice(options.currentTarget.dataset.value, 1);
    this.setData({
      items: temp
    })
  },
  bindFormSubmit: function (options) {
    console.log(options)
    console.log(this.data.items)
    console.log(options.detail.value)
    let data = {
      title:options.detail.value.title,
      items:this.data.items
    }
    app.wxRequest('POST','addVoteItems', data, res=>{

    })
  },
  bindinput: function (options) {
    console.log(options)
    let index = options.currentTarget.dataset.index;
    let value = options.detail.value;
    this.data.items[index] = value
    console.log(this.data.items)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})