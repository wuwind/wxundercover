Component({
  properties: {
    options: {
      type: Array,
      value: []
    },
    defaultOption: {
      type: Object,
      value: {
        id: '000',
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
      this.triggerEvent("change", { ...dataset })
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
  observers: {
    'options': function(options) {
      let result = []
      if (this.data.key !== 'id' || this.data.text !== 'name') {  
        console.log(this.data)     
        console.log(this.data.key)     
        for (let item of this.data.options) {
          console.log(item)
          let { [this.data.key]: id, [this.data.text]: name } = item
          result.push({ id, name })
        }
      } else{
        result = this.data.options
      }
      this.setData({
        current: Object.assign({}, this.data.defaultOption),
        result: result
      })
    }
  }
})