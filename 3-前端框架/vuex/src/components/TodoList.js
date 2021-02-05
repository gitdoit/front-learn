import * as MUTATION_TYPE  from '../constans/mutation-type.js';
const add = {
  template: `
    <div class="container">
      <h1>添加待办事项</h1>
      <ul>
        <li v-for="(item,index) in list" :key=index>
          <input type="checkbox" @click="done($event,index)"/>
          {{item}}
          <span @click="deleteItem(index)">X</span>
        </li>
      </ul>
      <input type="text" v-model="data"/>
      <button @click="add">添加</button>
    </div>
  `,
  data(){
    return {
      data:''
    }
  },
  computed: {
    list(){
      return this.$store.state.undo;
    },
  },
  methods: {
    add(){
      // 普通调用方式
      this.$store.commit(MUTATION_TYPE.ADD_TODO,this.data);
      this.data = '';
    },
    done(event,index){
      event.target.checked=false
      // 对象风格调用方式
      this.$store.commit({type:MUTATION_TYPE.FINISH_TODO,index});
    },
    deleteItem(index){
      // paload传对象
      this.$store.commit(MUTATION_TYPE.DELETE_TODO,{index});
    }
  },
  
  
}

const done = {
  computed: {
    list(){
      return this.$store.state.done;
    },
  },
  methods: {
    clear(){
      this.$store.dispatch(MUTATION_TYPE.CLEAR_FINISHED).then(() => {
        alert('清空成功！')
      });
    }
  },
  data(){
    return {
    }
  },
  template: `
    <div class="container">
      <h1>已完成的</h1>
      <ul>
        <li v-for="(item,index) in list" :key=index>
          {{item}}
        </li>
      </ul>
      <div>
        <button @click="clear">清空已完成列表</button>
      </div>
    </div>
  `
}


const deleteList = {
  computed: {
    list(){
      return this.$store.state.deleted;
    },
  },
  methods: {
    clear(){
      this.$store.dispatch(MUTATION_TYPE.CLEAR_DELETED).then(() => {
        alert('回收站已清空！')
      })
    }
  },
  data(){
    return {
      data:''
    }
  },
  template: `
    <div class="container">
      <h1>回收站</h1>
      <ul v-if="list.length > 0">
        <li v-for="(item,index) in list" :key=index>
          {{item}}
        </li>
      </ul>
      <div v-else>空的回收站</div>
      <div>
        <button @click="clear">清空回收站</button>
      </div>
    </div>
  `
}

export {
  add,
  deleteList,
  done
}