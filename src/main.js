import { createApp } from 'vue'
import {useStore} from 'vuex'
import store from './store'
import { Button, Table,Icon,Input,Tag,Divider,Pagination,Modal } from 'ant-design-vue';
import App from './App.vue'
import router from "./router"
import 'ant-design-vue/dist/antd.css'
import './index.css'
createApp(App)
  .use(Button)
  .use(Table)
  .use(Icon)
  .use(Input)
  .use(Tag)
  .use(Divider)
  .use(Pagination)
  .use(Modal)
  .use(router)
  .use(useStore)
  .use(store)
  .mount('#app')
