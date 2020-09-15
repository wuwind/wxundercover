//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    num: 1
  },
  change(e) {
    this.setData({
      selected: {
        ...e.detail
      }
    })
    wx.showToast({
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
      icon: 'success',
      duration: 1000
    })
  },
  close() {
    // 关闭select
    this.selectComponent('#select').close()
    console.log('close');
  },
  name1Input: function (e) {
    console.log('name1Input：', e.detail.value);
    this.setData({
      name1Input: e.detail.value
    })
  },
  name2Input: function (e) {
    console.log('name2Input', e.detail.value);
    this.setData({
      name2Input: e.detail.value
    })
  },
  name3Input: function (e) {
    console.log('name3Input', e.detail.value);
    this.setData({
      name3Input: e.detail.value
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const num = e.detail.value
    this.setData({
      num
    })
  },
  startGame: function (e) {
    console.log(this.data.name1Input, this.data.name2Input, this.data.name3Input, this.data.num)
    // console.log(e.detail.value.n1)
    // console.log(e.detail.value.rg)
    if ("" == e.detail.value.n1.trim()) {
      wx.showToast({
        title: '请输入昵称1',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.rg >= 2 && ("" == e.detail.value.n2.trim() || e.detail.value.n1.trim() == e.detail.value.n2.trim())) {
      wx.showToast({
        title: '请输入昵称2,且不重复',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.rg >= 3 && ("" == e.detail.value.n3.trim() ||
        e.detail.value.n3.trim() == e.detail.value.n2.trim() ||
        e.detail.value.n3.trim() == e.detail.value.n1.trim())) {
      wx.showToast({
        title: '请输入昵称3,且不重复',
        icon: 'none'
      })
      return
    }
    if (!this.data.selected) {
      wx.showToast({
        title: '请选择房间',
        icon: 'none'
      })
      return
    }
    if (this.data.selected.id == 1) {
      //进入advise
      var userName = this.data.userInfo.nickName
      wx.navigateTo({
        url: '../advise/advise?userName=' + userName,
      })
      return
    }

    this.setData({
      num: e.detail.value.rg
    })

    var mUsers = e.detail.value.n1
    if (mUsers == '999999') {
      wx.navigateTo({
        url: '../room/room_users/room_users?roomId=' + this.data.selected.id + '&roomName=' + this.data.selected.name
      })
      return
    }
    if (this.data.num > 1) {
      mUsers = mUsers + "," + e.detail.value.n2
    }
    if (this.data.num > 2) {
      mUsers = mUsers + "," + e.detail.value.n3
    }
    let data = {
      wxCode: this.data.code,
      wxPhoto: this.data.userInfo.avatarUrl,
      wxName: this.data.userInfo.nickName,
      users: mUsers,
      num: this.data.num,
      roomId: this.data.selected.id
    };
    app.wxRequest('GET', 'addUsers', data, (res) => {
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
      this.setData({
        users: res.data.data
      })
      wx.setStorage({
        data: res.data.data,
        key: 'userIds',
      })
      this.setData({
        selected: null
      })
      let userIds = this.data.users
      wx.navigateTo({
        url: '../room/room?userIds=' + userIds, // + JSON.stringify(this.data),
        success: function (res) {
          // res.eventChannel.emit("resData",{photo:that.data.userInfo.avatarUrl, name:that.data.userInfo.nickName, name1Input:e.detail.value.n1,name2Input:e.detail.value.n2,name3Input: e.detail.value.n3,num: e.detail.value.rg})
        }
      })
    }, (res) => {
      wx.showToast({
        title: '检查网络',
        icon: 'fail',
        duration: 2000
      })
    })
  },
  getRooms: function () {
    app.wxRequest('GET', 'getAllOpenRooms', null, (res) => {
      var result = []
      for (let item of res.data.data) {
        let {
          'id': id,
          'name': name
        } = item
        result.push({
          id,
          name
        })
      }
      console.log(result)
      this.setData({
        options: result
      })
    }, (res) => {
      wx.showToast({
        title: '检查网络',
        icon: 'fail',
        duration: 2000
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题'
    }
  },
  onLoad: function () {

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
console.log("index onShow")
console.log(app.globalData.userInfo)
    let that = this
    wx.getStorage({
      key: 'userIds',
      success(res) {
        console.log("userIds:" + res.data)
        if (res.data) {
          wx.navigateTo({
            url: '../room/room?userIds=' + res.data,
          })
        } else {
          that.getRooms()
        }
      },
      fail() {
        that.getRooms()
      }
    })
  },
  selectWord: function () {
    wx.navigateTo({
      url: '/pages/word/wordlist',
    })
  }

})