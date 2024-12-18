/* Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License. */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import naive from 'naive-ui'
import mitt from 'mitt'

import App from './App'
import Antd from 'ant-design-vue'
import router from './router'
import i18n from './locales'
import '@/assets/styles/main.scss'
import 'ant-design-vue/dist/reset.css' // 引入 antd 的样式

const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(naive)
app.config.globalProperties.mittBus = mitt()
app.use(Antd)

app.mount('#app')
