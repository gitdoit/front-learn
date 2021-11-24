export default {
  name: 'column',
  data() {
    return {
      a: {},
      lengthall: 0,
      Count: 0
    }
  },
  props: {
    data: {  // 表格内容数据
      type: Array
    },
    header: {}  // 表头数据
  },
  render(h) {  // table渲染
    let _this = this
    return h('el-table', {
      props: {
        data: this.data,
      },
      on: {  // table的事件
        'selection-change': function (val) {
          _this.handleSelectionChange(val)
        }
      },
      style: {
        width: '100%'
      }
    }, [h('el-table-column', {  // 左侧多选，根据需求增加
      props: {
        type: 'selection',
        width: '55',
        align: 'center',
        fixed: 'left',
      }
    }),
      h('el-table-column', {   // 右侧操作
        props: {
          fixed: 'right',
          label: '操作',
          width: '100',
          align: 'center'
        },
        style: {
          fontSize: '12px',
          color: '#409eff'
        },
        scopedSlots: {   // 表头对应的内容， 里面可根据需求自定义
          default: scope => {
            return h('el-button', {
              props: {
                type: 'danger',
                size: 'small'
              },
              class: 'printCla',
              on: {
                click: function (e) {
                  _this.$emit('tablePrint', scope.row)
                }
              }
            }, '操作')
          }
        }
      }),
      ...this.render(h, this.header),
    ]);
  },
  methods: {
    renderv(h, data) {
      return this.render(h, data)
    },
    render(h, data) {  // 重点：渲染表头的核心处理   （根据需求自定义）
      const _this = this
      _this.a = _this.data;
      var column = []
      for (var i in data) {
        var child = []
        let p = i
        if (data[i].child && Object.keys(data[i].child).length > 0) {
          child = _this.render(h, data[i].child)
          column.push(h('el-table-column', {
            props: {
              label: data[i].label + '&' + data[i].remark,
              align: 'center',
              renderHeader: function (row, column) {
                return _this.submitHeader(row, column)
              }
            },
          }, child))
        } else {
          column.push(h('el-table-column', {
            props: {
              label: data[i].label + '&' + data[i].remark,
              align: 'center',
              prop: data[i].prop,
              renderHeader: function (row, column) {
                return _this.submitHeader(row, column)
              }
            },
            scopedSlots: { 
              default: scope => {
                let imgObj = scope.row.photo
                let mkey = scope.column.property
                return h('span', {
                  props: {},
                }, [
                  h('el-popover', {
                    props: {
                      placement: 'top-start',
                      width: '200',
                      trigger: 'hover',
                      disabled: imgObj && Object.keys(imgObj).length > 0 && imgObj[mkey] ? false : true
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: imgObj && Object.keys(imgObj).length > 0 && imgObj[mkey] ? imgObj[mkey] : '',
                      },
                      style: {
                        width: '100%',
                        height: 'auto',
                      }
                    }),
                    h('span', {
                      slot: 'reference',
                      trigger: 'hover',
                      style: {fontSize: '12px', color: '#606266'}
                    }, scope.row[data[p].prop]),
                  ]),
                ], scope.row[data[p].prop])
              }
            }
          }))
        }
      }
      return column
    },
    submitHeader(h, row) {  // 处理table 表头的自定义函数
      let Str = null
      let remark = row.column.label.split('&')
      if (remark[0] && remark[0].indexOf('_') > 0 && remark[0].split('_').length > 1) {
        Str = []
        let arr = remark[0].split('_')
        let ColArr = ['#409EFF', '#F56C6C', '#E6A23C', '#909399']
        for (let item in arr) {
          Str.push(
              h('div', {
                style: {
                  color: ColArr[item],
                  lineHeight: '20px',
                  display: 'block',
                  padding: '0',
                  transform: arr.length - 1 == item ? 'scale(0.9)' : 'scale(1)'
                },
              }, arr[item]),
          )
        }
      } else {
        Str = remark[0]
      }
      return (
          h('span', [
            h('span', {slot: 'reference', trigger: 'hover', style: {fontSize: '12px', color: '#409EFF'}}, Str),
            h('el-popover', {
              props: {
                placement: 'top-start',
                width: '200',
                trigger: 'hover',
                content: remark[1] ? remark[1] : '暂无描述信息',
              }
            }, [
              h('i', {
                slot: 'reference',
                class: 'el-icon-question',
                style: {
                  display: remark[1] ? 'inline-block' : 'none'
                },
              }, '')
            ]),
          ])
      )   
    },
    handleSelectionChange(val) {
      this.$emit('SelectionChange', val)  // 可以根据需求自定义事件  ，引入的vue的界面处理
    },
  }
}
