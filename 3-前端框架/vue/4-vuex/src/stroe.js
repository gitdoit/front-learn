const store = new Vuex.Store(
  {
    // 存储数据
    state: {
      msg: 'from store',
      undo: [1,2,3],
      done: [4],
      deleted: []
    },
    // 所有对state的修改只能直接或者间接使用mutations来进行,这相当于对数据的setter
    // mutations中的handle必须都是同步的
    mutations: {
      // 最基本的调用方式：this.$store.commit('add',value)
      add(state,item){
        state.undo.push(item);
      },
      // 开发中大部分情况都是接受一个对象，这里用解构来做
      // this.$stroe.commit('deleteItem',{value})
      deleteItem(state,{ index }){
        let removed = state.undo.splice(index,1);
        state.deleted.push(...removed)
      },
      // 还可以 this.$store.commit({type:'done',index:value})
      done(state,index){
        let removed = state.undo.splice(index,1);
        state.done.push(...removed)
      },
      // 清空待办
      clearUndo(state){
        state.undo = []
      },
      // 清空已完成
      clearFinised(state){
        state.done = []
      },
      // 清空回收站
      clearDeleted(state){
        state.deleted = []
      }
    },
    // mutations只能同步调用，无法异步执行
    // 使用actions可以满足这个操作，但调用方式有所改变
    // 调用方式： store.dispatch('clearFinised')
    actions: {
      clearFinised(contaxt){
        return new Promise((reslove,reject) => {
          setTimeout(() => {
            contaxt.commit('clearFinised');
            reslove();
          }, 1000);
        })
      },
      clearDeleted({commit}){
        return new Promise((reslove,reject) => {
          setTimeout(() => {
            commit('clearDeleted');
            reslove();
          }, 200);
        })
      },
      async clearAll({commit,dispatch}){
        await dispatch('clearDeleted');
        await dispatch('clearFinised');
        commit('clearUndo');
      },
    },
    // 见名知意义
    getters: {
      // 聚合计算
      allListCount(state){
        return state.undo.length + state.done.length + state.deleted.length;
      },
      // 已完成的待办列表
      doneTodoListCount(state) {
        return state.done.length;
      },
      undoListCount(state){
        return state.undo.length;
      }
    },
    // 当项目比较大的时候，全局公用一个store比较臃肿了
    // 可以按照业务模块划分子store，例如用户模块一个，订单模块一个...
    modules: {
      // 用户模块
      userModule: {
        state: () => ({
          count: 0
        }),
        mutations: {
          // 这个state，不再是根state,而是当前模块的
          increment(state){
            state.count++;
          }
        },
        getters: {
          doubleCount(state){
            return state.count * 2;
          }
        },
        actions: {
          incrementIfOddOnRootSum({state,commit,rootState}){
            if((rootState.undo.length + state.count) % 2 === 0){
              commit('increment');
            }
          }
        }
      }
    }
  }
)
export {
  store
}