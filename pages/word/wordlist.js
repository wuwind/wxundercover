// pages/vote/votelist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    votes: null
  },

  add: function (option) {
    wx.navigateTo({
      url: './word_add/word_add',
    })
  },
  getVotes:function() {
    let data = {
      userId:app.globalData.userId
    }
    app.wxRequest('GET', 'getAllVotes', data, res => {
      if (res.data.code == 1) {
        this.setData({
          votes: res.data.data
        })
      }
      console.log(res.data)
    });
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  voteDetail: function (e) {
    console.log(e.currentTarget.dataset.vote)
    wx.navigateTo({
      url: './word_detail/word_detail?voteId=' + e.currentTarget.dataset.vote.id,
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
    this.getVotes()
    console.log(app.globalData.permission)
    console.log(app.globalData.permission.indexOf('add_vote'))
    this.setData({
      add_vote_permission:app.globalData.permission.indexOf('add_vote')>-1
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
    this.getVotes()
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