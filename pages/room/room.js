// pages/room/room.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show_refresh: 0,
    show_advise: false,
    area_value:'',
    getAdviseCount:0,
    punish:0
  },
  
  openTap: function (e) {
    if (e.currentTarget.dataset.index > 0) {
      wx.showToast({
        title: '点击第1个',
        icon: 'fail',
        duration: 2000
      })
      return
    }
    wx.navigateTo({
      url: '../main/main?userData=' + JSON.stringify(e.currentTarget.dataset.value) + "&index=" + e.currentTarget.dataset.index,
    })
  },
  refresh: function (userData) {
    this.setData({
      listdata: userData
    })

    this.setData({
      show_refresh: (!userData || userData.length < 1),
      show_advise_btn: (!userData || userData.length < 1)
    })
  },
  refreshClick(e) {
    console.log("refreshData")
    this.requestGames()
    this.requestRoom()
  },
  adviseClick(e) {
    console.log("refreshData")
    this.requestAdvise()
  },
  requestAdvise() {
    if(this.data.getAdviseCount >= 3) {
      wx.showToast({
        title: "你没有机会更换了",
        icon: 'fail',
        duration: 2000,
      })
      return
    }
    app.wxRequest('GET', 'getAdviseRandom', null, (res) => {
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'fail',
          duration: 2000,
        })
        return
      }
      console.log(res.data)
      let count = this.data.getAdviseCount+1
      this.setData({
        show_advise:true,
        area_value:res.data.data.content,
        getAdviseCount:count
      })
    })
  },
  requestGames() {
    let data = {
      userIds: this.data.userIds
    }
    app.wxRequest('GET', 'getGameByUser', data, (res) => {
      if (res.data.code == 0) {
        wx.clearStorage({
          complete: (res) => {},
        })
        wx.showToast({
          title: res.data.msg,
          icon: 'fail',
          duration: 2000,
          success: function () {
            setTimeout(() => {
              wx.navigateBack({
                complete: (res) => {},
              })
            }, 2000);
          }
        })
        return
      }
      console.log("getGameByUser")
      // console.log(res.data.data)
      if (!res.data.data || res.data.data.length < 1) {
        wx.showToast({
          title: '请稍后刷新',
          icon: 'fail',
          duration: 2000
        })
      }
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mUserIds = options.userIds
    this.setData({
      userIds: mUserIds
    })
    this.requestGames()
    this.requestRoom()
    wx.setNavigationBarTitle({
      title: '房间'
    })
  },
  requestRoom() {
    let data = {
      userIds: this.data.userIds
    }
    console.log(this.data.userIds)
    app.wxRequest('GET', 'getRoomByUserId', data, (res) => {
      console.log(res.data)
      this.setData({
        punish: res.data.data.punish
      })
      wx.setNavigationBarTitle({
        title: res.data.data.name
      })
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
    var that = this
    wx.getStorage({
      key: 'user_data',
      success(res) {
        if (res.data) {
          console.log("user_data:" + res.data)
          let userData = JSON.parse(res.data)
          that.refresh(userData)
        }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})