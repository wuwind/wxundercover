//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // options: [{
    //   city_id: '001',
    //   city_name: '007'
    // }, {
    //   city_id: '002',
    //   city_name: '008'
    // }, {
    //   city_id: '003',
    //   city_name: '100'
    // }],
    // selected: {},
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
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
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

    this.setData({
      result: [{
        id: '001',
        name: '007'
      }, {
        id: '002',
        name: '008'
      }, {
        id: '003',
        name: '100'
      }]
    })
    
    console.log(this.data.name1Input, this.data.name2Input, this.data.name3Input, this.data.num)
    console.log(e.detail.value.n1)
    console.log(e.detail.value.rg)
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
    this.setData({
      name1Input: e.detail.value.n1,
      name2Input: e.detail.value.n2,
      name3Input: e.detail.value.n3,
      num: e.detail.value.rg
    })

    // wx.navigateTo({
    //   url: '../main/main?json=' + JSON.stringify(this.data),
    //   success: function (res) {
    //     // res.eventChannel.emit("resData",{photo:that.data.userInfo.avatarUrl, name:that.data.userInfo.nickName, name1Input:e.detail.value.n1,name2Input:e.detail.value.n2,name3Input: e.detail.value.n3,num: e.detail.value.rg})
    //   }
    // })
  },
  onLoad: function () {
    // this.setData({
    //   options: [{
    //         city_id: '001',
    //         city_name: '007'
    //       }]
    // })
    app.wxRequest('GET', 'getAllRooms', null, (res) => {
      var array = new Array();
      // for (var i = 0; i < res.data.data.length; i++) {
      //   var map = new Map();
      //   var temp = res.data.data[i]
      //   map.set('city_id', temp.id)
      //   map.set('city_name', temp.name)
      //   array.push(map)
      // }
      this.setData({
        options: [{
              city_id: '001',
              city_name: '007'
            }]
      })

    }, (res) => {
      wx.showToast({
        title: '检查网络',
        icon: 'fail',
        duration: 2000
      })
      this.setData({
        options: [{
              city_id: '001',
              city_name: '007'
            }]
      })
    })
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          console.log('res.code  ' + res.code)
          that.setData({
            code: res.code
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
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})