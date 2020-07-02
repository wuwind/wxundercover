// pages/main/main.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordMap: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.userData)
    console.log(options.index)
    const jsonData = JSON.parse(options.userData)
    this.setData({
      userWords: jsonData.userWords,
      index: options.index
    })
  },
  openTap: function (e) {
    console.log(e.currentTarget.dataset.value)
    console.log(e.currentTarget.dataset)
    let that = this
    wx.showModal({
      title: '提示',
      content: e.currentTarget.dataset.value.userName + ' 你是否要打开?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.setData({
            showModal: true,
            currentWord: e.currentTarget.dataset.value.word,
            currentKey: e.currentTarget.dataset.key
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 弹窗
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
    var userWords = this.data.userWords
    var mUserId = userWords[this.data.currentKey].userId
    userWords.splice(this.data.currentKey, 1)
    // delete userWords[this.data.currentKey]
    let data = {
      userId: mUserId
    };
    app.wxRequest('GET', 'ready', data, (res) => {}, (res) => {

    })
    this.setData({
      userWords
    })
    console.log(userWords)
    if (JSON.stringify(userWords) == JSON.stringify([])) {
      let that = this
      wx.getStorage({
        key: 'user_data',
        success(res) {
          var userData = JSON.parse(res.data)
          userData.splice(that.data.index, 1)
          wx.setStorage({
            data: JSON.stringify(userData),
            key: 'user_data',
          })
        },
        complete() {
          wx.showToast({
            title: '准备开始',
            icon: 'success',
            duration: 2000,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  complete: (res) => {},
                })
              }, 2000);
            }
          })
        }
      })



    }
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