//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    num:1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  name1Input:function(e) {
    console.log('name1Input：',e.detail.value);
    this.setData({
      name1Input:e.detail.value
    })
  },
  name2Input:function(e) {
    console.log('name2Input',e.detail.value);
    this.setData({
      name2Input: e.detail.value
    })
  },
  name3Input:function(e) {
    console.log('name3Input',e.detail.value);
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
  startGame: function(e) {
    console.log(this.data.name1Input,this.data.name2Input, this.data.name3Input, this.data.num)
    console.log(e.detail.value.n1)
    let that = this
    if(e.detail.value.rg >= 2 && "" == e.detail.value.n2) {
      wx.showToast({
        title: '请输入昵称2',
        icon: 'none'
      })
      return
    }
    if(e.detail.value.rg >= 3 && "" == e.detail.value.n3) {
      wx.showToast({
        title: '请输入昵称3',
        icon: 'none'
      })
      return
    }
    this.setData({
      name1Input:e.detail.value.n1,name2Input:e.detail.value.n2,name3Input: e.detail.value.n3,num: e.detail.value.rg
    })
    wx.navigateTo({
      url: '../main/main?json='+JSON.stringify(this.data),
      success:function(res) {
        // res.eventChannel.emit("resData",{photo:that.data.userInfo.avatarUrl, name:that.data.userInfo.nickName, name1Input:e.detail.value.n1,name2Input:e.detail.value.n2,name3Input: e.detail.value.n3,num: e.detail.value.rg})
      }
    })
  },
  onLoad: function () {
    let that = this
    wx.login({
      success (res) {
        if (res.code) {
          console.log('res.code  ' + res.code)
          that.setData({
            code:res.code
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
 
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
