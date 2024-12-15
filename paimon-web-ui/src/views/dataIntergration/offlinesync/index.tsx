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

import {defineComponent, KeepAlive, ref, watch} from 'vue';



import styles from './index.module.scss'
import MenuTree from "@/views/metadata/components/menu-tree";
import Breadcrumb from "@/views/metadata/components/breadcrumb";
import Tabs from "@/views/metadata/components/metadata-tabs";
import {useCatalogStore} from "@/store/catalog";
import List from "@/views/dataIntergration/components/list";
import type {TableColumns} from "naive-ui/es/data-table/src/interface";
import type {UserDTO} from "@/api/models/user/types";
import dayjs from "dayjs";
import {EditOutlined} from "@vicons/antd";
import UserDelete from "@/views/system/user/components/user-delete";
import {getUserList} from "@/api/models/user";



export default defineComponent({
  name: 'OfflineSyncPage',
  setup() {
      const catalogStore = useCatalogStore()
      const catalogStoreRef = storeToRefs(catalogStore)
      // const showSubmitCdcJobModalRef = ref(false)



  },
  // render() {
  //   return (
  //       <div  class={styles.container}>
  //       <div  class={styles.containerdiv1} > div 1</div>
  //         <div class={styles.containerdiv2}>
  //
  //           <div class={styles.containerdiv2_1}> div2-1 </div>
  //           <div class={styles.containerdiv2_2}> div2-2 </div>
  //         </div>
  //
  //       </div>
  //
  //       // <div class={styles.container}>
  //       //     <div class={styles.de}>
  //       //         div_content
  //       //         <div>div_1</div>
  //       //     </div>
  //       // </div>
  //
  //
  //   )
  // },

    render() {
        return (
            <div class={styles.container}>
                <n-split direction="horizontal" max={0.35} min={0.12} resize-trigger-size={0} default-size={0.240}>
                    {{
                        '1': () => (
                            <MenuTree />
                        ),
                        '2': () => (
                            <div class={styles.content}>
                                {this.currentTable
                                    ? (
                                        <>
                                            <Breadcrumb />
                                            <Tabs />
                                        </>
                                    )
                                    : (
                                        <div class={styles.button}>
                                            <a-button type="primary">新建任务</a-button>
                                            <a-tabs>
                                                <a-tab-pane key="1" tab="任务管理">
                                                    <List>sss</List>
                                                </a-tab-pane>

                                                <a-tab-pane key="2" tab="上线任务" force-render>Content of Tab Pane 2
                                                </a-tab-pane>
                                            </a-tabs>
                                        </div>
                                    )}
                            </div>
                        ),
                        'resize-trigger': () => (
                            <div class={styles.split}/>
                        ),
                    }}
                </n-split>
            </div>
        )
    },
})
