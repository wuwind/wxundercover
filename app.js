//app.js
App({
    onLaunch: function () {
      // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }

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
              this.globalData.permission = res.data.data
              getCurrentPages()[0].onShow()
            }
          })
        }
      })
      this.wxRequest('POST', 'getProperties', null, res => {
        if (res.data.code == 1) {
          this.globalData.properties = res.data.data
          getCurrentPages()[0].onShow()
          console.log(res.data.data)
        }
      })
    },
    globalData: {
      URL: 'https://nyxkkkw.icu/undercover/api/',
      // URL: 'http://172.18.0.6:8080/undercover/api/',
      userInfo: null,
      permission: [],
      properties: []
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
    }
  },

)