// pages/room/room_users/room_users.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var roomId = options.roomId
    var roomName = options.roomName
    console.log(roomId)
    console.log(roomName)
    this.setData({
      roomId:roomId,
      roomName:roomName
    })
    wx.setNavigationBarTitle({
      title: roomName
    })
    this.requestUsers()
  },
  requestUsers() {
    let data = {
      roomId: this.data.roomId
    }
    app.wxRequest('GET', 'getUsersByRoomId', data, (res) => {
      console.log(res.data)
      this.setData({
        users: res.data.data
      })
    })
  },
  handleLongPress(e) {
    let data = {
      userId: e.currentTarget.dataset.value.id
    }
    app.wxRequest('GET', 'delUserById', data, (res) => {
      console.log(res.data)
      this.requestUsers()
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