// pages/vote/vote_detail/vote_detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vote: null,
    select:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  select: function (options) {
    console.log(options);
    this.setData({
      select: options.currentTarget.dataset.index
    })
  },
  add: function (options) {
    console.log(this.data.vote.votes[this.data.select]);
    if (!this.data.userId) {
      wx.showToast({
        title: '请先登录'
      })
      if(!this.data.canIUse) {
//直接登录
      }
      return;
    }

    let data = {
      userId: this.data.userId,
      voteId: this.data.vote.id,
      idx: this.data.select
    };
    app.wxRequest('POST', 'vote', data, res => {
      console.log(res)
      if (res.data.code != 1) {
        wx.showToast({
          title: res.data.msg
        })
        if(res.data.code == -1) {
          this.setData({
            userId: null
          })
        }
      } else {
        wx.showToast({
          title: "投票完成"
        })
        this.data.vote.votes[this.data.select].count = Number(this.data.vote.votes[this.data.select].count) + 1
        console.log(this.data.vote);
        this.setData({
          vote: this.data.vote
        });
      }
    })

  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey
        console.log(res.code)
        if(res.code){
          let data = {
            wxCode: res.code,
            wxPhoto: e.detail.userInfo.avatarUrl,
            wxName: e.detail.userInfo.nickName
          };
          app.wxRequest('GET', 'addWxUsers', data, (res) => {
            console.log(res.data)
            if(res.data.code == 0) {
              wx.showToast({
                title: res.data.msg,
                icon: 'fail',
                duration: 2000
              })
              return
            }
            console.log(res.data.data)
            this.setData({
              userId: res.data.data
            })
            wx.setStorage({
              data: res.data.data,
              key: 'userId',
            })
            wx.showToast({
              title: "登录成功",
              duration: 2000
            })
          }, (res) => {
            wx.showToast({
              title: '检查网络',
              icon: 'fail',
              duration: 2000
            })
          })
        }else{
          wx.showToast({
            title: '登陆失败',
          })
          console.log("登陆失败");
        }
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
      success (res) {
       
        that.setData({
          userId: res.data
        })
      }
    })
    if (options.share && wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
    let voteId =  options.voteId
    if(voteId == null)
      voteId = 15
    let data = {
      voteId: voteId
    };
    app.wxRequest('POST', 'getVoteById', data, (res) => {
      if(res.data.code == 0) {
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
    return {
      title: '投票',
      path: 'pages/vote/vote_detail/vote_detail?share=1&voteId='+this.data.vote.id
    }
  }
})