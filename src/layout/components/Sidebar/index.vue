<template>
  <div :class="{'has-logo':showLogo}">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <div class="current_thme">
        <a class="current_thme_main" href="/" target="_blank">
            <svg style="width: 2.2em;height: 2.2em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6885"><path d="M512 519.38651473m-485.95124768 0a485.95124768 485.95124768 0 1 0 971.90249536 0 485.95124768 485.95124768 0 1 0-971.90249536 0Z" fill="#0dd566" p-id="6886"></path><path d="M532.58350642 289.14975575l185.14742539 370.32956157a22.97855183 22.97855183 0 0 1-30.78848264 30.8579042l-164.73747299-81.63980958a23.04797347 23.04797347 0 0 0-20.44466318 0l-164.737473 81.63980958a22.97855183 22.97855183 0 0 1-30.78848259-30.8579042l185.14742535-370.32956157a23.04797347 23.04797347 0 0 1 41.20172366 0z" fill="#FFFFFF" p-id="6887"></path></svg>
            <span class="verMiddle">{{supportedThemes}}</span>
        </a>
    </div>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        @open="handleOpen"
        :default-openeds="openedsindex"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
      <!-- 单独新开窗口跳转 -->
      <div><a href="/" target="_blank" class="router-link-active"><li role="menuitem" tabindex="-1" class="el-menu-item submenu-title-noDropdown" style="padding-left: 20px; color: rgb(191, 203, 217); background-color: rgb(43, 50, 69);"><svg aria-hidden="true" class="svg-icon"><use xlink:href="#icon-link"></use></svg><span>前端展示页面</span></li></a></div>

      <div class="current_version">version：{{versions}}</div>
    </el-scrollbar>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import EventBus from '@/utils/EventBus.js'
//import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import menusdata from './leftMenusData.js'
import {requesterr, mirlist, configMain } from '@/api/user'

//console.log(menusdata);
export default {
  components: { SidebarItem },

  created: function () {
    this.getmunusdata(); //获取文件管理数据
    this.getconfig() //获取配置数据
    
  },

  mounted() {
    EventBus.$on('mkdirSuccess', this.getmunusdata); //刷新菜单栏事件
    //EventBus.$on('menuopemdsc', this.menuopeneds); //展开菜单栏事件
    let winpach = window.location.href;
    if (winpach.indexOf('filemange/index') != -1) {
        this.menuopeneds();
      }
    
    //console.log(this.$root);
  },

  data() {
    return {
        routes:menusdata,
        // 默认展开的菜单index ，这里submen的index值就是当前路径
        openedsindex:[],

        // 版本信息和当前主题

    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },

    // 获取当前激活菜单的index，默认选中的菜单
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      const menusindex = window.location.href
        
      //  因为菜单栏的生成和路由是解耦的，因为动态获取以及添加的菜单都是用的同一个path带不同参数，路由没法获取，所以通过获取地址来选中
      if (menusindex.indexOf('?id') != -1) {
        return menusindex.split('/#')[1]
      }
      
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu  //当前激活的菜单
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    versions() {
        return this.$store.state.settings.configMain.version
    },
    supportedThemes() {
        return this.$store.state.settings.configMain.supportedThemes
    }

  },

  methods: {

    menuopeneds() {
        window.setTimeout(() => {
            this.openedsindex = ['/filemange/index'];     
        }, 400);
       
    },
     SplicingMenuTree(menus) {
        let newMenu = null, arrMenus = [];
        let nuni = 2;
        menus.forEach(item => {
            //console.log(menusdata[0]);
            // if (!this.menusdata.children) {
            //     this.$set(this.menusdata,'children', [])
            //     //menusdata[0].children = []
            // }
            newMenu = {
                path: '/filemange/subfile?id='+item.id,
                meta: { title: item.directory },
                class: 'file',
                id: item.id,
                pid: item.pid,
                children:[]
            }
            if (item.directories && item.directories.length > 0) {
                newMenu.children = this.SplicingMenuTree(item.directories)
            }

            arrMenus.push(newMenu);   
            //nuni++; 
        });
        return arrMenus;
     },

     getconfig() {
        configMain().then(response => {
            let datamain = response.data;
            let datamains = datamain.data
            if (datamain.code == 1) {

                let configdata = {
                    version:datamains.version, //版本信息
                    currentTheme: datamains.currentTheme, //当前皮肤
                    admin_supportedFileTypes: datamains.admin_supportedFileTypes, // 允许上传的文件类型
                    admin_maxUploadFileSize: datamains.admin_maxUploadFileSize, //允许上传的单个文件大小
                    admin_maxUploadFileNumber : datamains.admin_maxUploadFileNumber //一次允许上传的文件数量
                }

                // 根据当前皮肤得到对应的中文皮肤名字
                configdata.currentTheme = Object.getOwnPropertyDescriptor(datamains.supportedThemes, configdata.currentTheme).value
                // 遍历拆分得到正确的文件后缀
                if (datamains.admin_supportedFileTypes) {
                    let jpgs = null;
                   configdata.admin_supportedFileTypes = datamains.admin_supportedFileTypes.map((item, index, ary) => {
                        
                        if (item.indexOf('jpeg') != -1) {
                            //console.log(item);
                            jpgs = '.jpg'
                        }
                        return '.'+item.split('/')[1];
                        
                    })
                    if (jpgs) {
                        configdata.admin_supportedFileTypes.push(jpgs);
                    }
                    
                }
                
                //console.log(configdata.admin_supportedFileTypes);
                
                this.$store.dispatch('settings/configMain', configdata)
            }
            

        }).catch(error => {
            //console.log(999);
			requesterr(this, error);
		});
     },

     getmunusdata() {
        let thiss = this;
        //console.log(1);
        // console.log(this.$store);
        mirlist().then(response => {
            let datamain = response.data;
            this.routes[1].children = [];
            if (datamain.code == 1) {
                this.routes[1].children = this.SplicingMenuTree(datamain.data.menus);
                //console.log();
                // let dirTree = datamain.data.dirTree;
                // if (dirTree.id) {
                //     //this.$router.push({path: '/filemange/subfile?id='+dirTree.id});
                // }
            }
            

        }).catch(error => {
			requesterr(this, error);
		});
     },

     handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
  }
}
</script>

<style>
    .svg-icon{
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
