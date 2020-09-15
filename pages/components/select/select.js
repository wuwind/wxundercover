Component({
  properties: {
    options: {
      type: Array,
      value: []
    },
    defaultOption: {
      type: Object,
      value: {
        id: '0',
        name: '房间'
      }
    },
    key: {
      type: String,
      value: 'id'
    },
    text: {
      type: String,
      value: 'name'
    }
  },
  data: {
    result: [],
    isShow: false,
    current: {}
  },
  methods: {
    optionTap(e) {
      let dataset = e.target.dataset
      this.setData({
        current: dataset,
        isShow: false
      });
      // 调用父组件方法，并传参
      this.triggerEvent("change", {
        ...dataset
      })
    },
    openClose() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    // 此方法供父组件调用
    close() {
      this.setData({
        isShow: false
      })
    }
  },
  lifetimes: {
    attached() {

    }
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  observers: {
    'options': function (options) {
      let result = []
      console.log("options------")
      if (this.data.key !== 'id' || this.data.text !== 'name') {
        console.log(this.data)
        console.log(this.data.key)
        for (let item of this.data.options) {
          console.log(item)
          let {
            [this.data.key]: id, [this.data.text]: name
          } = item
          result.push({
            id,
            name
          })
        }
      } else {
        result = this.data.options
      }
      this.setData({
        current: Object.assign({}, this.data.defaultOption),
        result: result
      })
    },
    // 'defaultOption': function (defaultOption) {
    //   console.log("defaultOption------")
    //   console.log(defaultOption)
    // }
  }

})