// pages/vote/vote_detail/vote_detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vote: null,
    select: 0,
    word: '',
    selectWord: '　',
    showCount: 0,
    showModal: false // 显示modal弹窗
  },
  select: function (options) {
    console.log(options);
    this.setData({
      select: options.currentTarget.dataset.index
    })
  },
  add: function (options) {
    // console.log(this.data.vote.votes[this.data.select]);
    if (!this.data.userId) {
      this.setData({
        showModal: true
      })
      return;
    }
    if (this.data.showCount == 0) {
      wx.navigateBack({
        delta: 1,
      })
      return
    }
    let data = {
      userId: this.data.userId,
      voteId: this.data.vote.id,
      idx: this.data.select
    };
    wx.showLoading({
      title: '',
    })
    app.wxRequest('POST', 'vote', data, res => {
      wx.hideLoading({
        success: (res) => {},
      })
      console.log(res)
      if (res.data.code != 1) {
        wx.showToast({
          title: res.data.msg
        })
        if (res.data.code == -1) {
          this.setData({
            userId: null
          })
        }
      } else {
        this.data.vote.votes[this.data.select].count = Number(this.data.vote.votes[this.data.select].count) + 1
        console.log(this.data.vote);
        this.setData({
          vote: this.data.vote
        });
      }
    }, res=>{
      wx.hideLoading({
        success: (res) => {},
      })
    })

  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (!e.detail.userInfo)
      return
    app.addWxUsers(e.detail.userInfo, (code, msg) => {
      if (code == 1) {
        this.setData({
          userId: msg
        })
      } else {
        wx.showToast({
          title: msg,
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userId',
      success(res) {
        that.setData({
          userId: res.data
        })
      }
    })
    // if (options.share && wx.canIUse('hideHomeButton')) {
    //   wx.hideHomeButton()
    // }
    let voteId = options.voteId
    if (voteId == null)
      voteId = 0
    let data = {
      voteId: voteId
    };
    wx.showLoading({
      title: '',
    })
    app.wxRequest('POST', 'getVoteById', data, (res) => {
      wx.hideLoading({
        success: (res) => {},
      })
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'fail',
          duration: 2000
        })
        return
      }
      this.setData({
        vote: res.data.data
      })
      if(res.data.data.properties) {
        const properties = JSON.parse(res.data.data.properties.value)
        this.setData({
          word: properties.word,
          selectWord: properties.selectWord,
          showCount: properties.showCount
        })
      }
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
    // this.setData({
    //   word: app.globalData.properties.word,
    //   selectWord: app.globalData.properties.selectWord,
    //   showCount: app.globalData.properties.showCount,
    //   userId: app.globalData.userId
    // })
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
    return {
      title: this.data.selectWord,
      path: 'pages/word/word_detail/word_detail?share=1&voteId=' + this.data.vote.id
    }
  }
})