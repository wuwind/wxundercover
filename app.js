//app.js
App({
  globalData: {
    URL: 'https://nyxkkkw.icu/undercover/api/',
    // URL: 'http://172.18.0.6:8080/undercover/api/',
    userInfo: null,
    permission: [],
    properties: [],
    userId: null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.globalData.userId = wx.getStorageSync('userId'),
      console.log("getStorageSync:" + this.globalData.userId)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)
              if (this.globalData.userId)
                return
              this.addWxUsers(res.userInfo)
            }
          })
        }
      }
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    wx.getStorage({
      key: 'userId',
      complete: res => {
        console.log(res.data)
        let data = {
          userId: res.data ? res.data : 0
        }
        this.wxRequest('POST', 'getPermission', data, res => {
          if (res.data.code == 1) {
            this.globalData.permission = res.data.data,
              getCurrentPages()[0].onShow(),
              wx.setStorage({
                data: this.globalData.permission,
                key: 'getPermission',
              })
          }
        })
      }
    })
    this.wxRequest('POST', 'getProperties', null, res => {
        if (res.data.code == 1) {
          this.globalData.properties = JSON.parse(res.data.data.value),
            getCurrentPages()[0].onShow(),
            wx.setStorage({
              data: this.globalData.properties,
              key: 'getProperties',
            })
        }
      }),
      wx.getStorage({
        key: 'getPermission',
        success: res => {
          this.globalData.permission = res.data,
            getCurrentPages()[0].onShow()
        }
      }),

      wx.getStorage({
        key: 'getProperties',
        success: res => {
          this.globalData.properties = res.data,
            getCurrentPages()[0].onShow()
          console.log(this.globalData.properties)
        }
      })

  },
  addWxUsers: function (userInfo, callback) {
    this.globalData.userInfo = userInfo
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey
        console.log(res.code)
        if (res.code) {
          let data = {
            wxCode: res.code,
            wxPhoto: userInfo.avatarUrl,
            wxName: userInfo.nickName
          };
          this.wxRequest('GET', 'addWxUsers', data, (res) => {
            if (callback && res.data.code == 0) {
              callback(0, res.data.msg)
              return
            }
            console.log("app login userId:" + res.data.data)
            this.globalData.userId = res.data.data
            callback(1, res.data.data)
            wx.setStorage({
              data: res.data.data,
              key: 'userId',
            })
          }, (res) => {
            callback(0, '登陆失败')
            console.log("登陆失败");
          })
        } else {
          callback(0, '登陆失败')
          console.log("登陆失败");
        }
      }
    })
  },
  /**
   * 封装wx.request请求
   * method： 请求方式
   * url: 请求地址
   * data： 要传递的参数
   * callback： 请求成功回调函数
   * errFun： 请求失败回调函数
   **/
  wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: this.globalData.URL + url,
      method: method,
      data: data,
      timeout: 10000,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        callback(res);
      },
      fail: function (res) {
        errFun(res);
      }
    })
  },
  wxClickN(hitArray, callback) {
    hitArray.copyWithin(0, 1);
    hitArray[hitArray.length - 1] = new Date().getTime()
    if (hitArray[0] > hitArray[hitArray.length - 1] - 2000) {
      callback()
    }
  }


}, )