<template>
  <el-breadcrumb v-if="breadcrumbq" class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
                <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
                <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
  <el-breadcrumb v-else class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item) in levelList2" :key="item.path">
                <!-- <span v-if="" class="no-redirect">{{ item.meta.title }}</span> -->
                <a :href="'#'+item.path">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
    </transition-group>
    
</el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import menusdata from '@/layout/components/Sidebar/leftMenusData.js'

export default {
  data() {
    return {
      levelList: null,
      breadcrumbq:true,

      getcrumbsData: menusdata,
      levelList2: []
    }
  },
  watch: {
    $route() {
      this.ifbreadshow();
    },

    // 监听getcrumbsData对象数据发生变化时候
    getcrumbsData: {
        handler: function(newV, oldv) {
            this.extractChild = this.arrToobj(newV);
            this.ifbreadshow();
            //console.log(extractChild);
            
            
        },
        deep: true
        //immediate:true
      }
  },
  created() {
    //this.ifbreadshow();

    // 面包屑处理
    this.extractChild = null;
    //this.getBread(extractChild);
  },

  computed: {
     
  },

  methods: {
    ifbreadshow() {
        //console.log(menusdata[1]);
        let thisURl = window.location.href;
        let currentid =null;
        let ancestorsDir = null;
        if (thisURl.indexOf('filemange') != -1) {
            for (let key in this.extractChild) {
                if (this.extractChild[key].id == 1) {
                    
                    ancestorsDir = this.extractChild[key];
                    break;
                }
            }

            if (thisURl.indexOf('?id') != -1) {
                currentid = thisURl.split('?id=')[1]
                this.levelList2 = this.getBread(currentid, this.extractChild);
                this.levelList2.reverse(); //数组倒置
                //console.log(this.levelList2);
                
                //levelList2.
            } else {
                this.levelList2 = [];
            }
            this.levelList2.unshift(ancestorsDir)
            //console.log(this.levelList2);
            this.breadcrumbq = false;
            //   console.log(currentid);
            //   console.log(this.extractChild);
            
            //console.log(this.levelList2);
        } else {
            this.breadcrumbq = true;
            this.getBreadcrumb()
        }
    },

    arrToobj (arr) {
        //console.log(arr);
        var obj = {};
        
        var tmp;
        for (var i in arr) {
            if (typeof(arr[i]['children']) != 'undefined') {
                tmp = this.arrToobj(arr[i]['children']);
                obj[arr[i].id] = arr[i];
                for (var j in tmp) {
                    obj[tmp[j].id] = tmp[j];
                }
            }else {
                obj[arr[i].id] = arr[i];
            }
        }

        return obj;
    },

    getBread (id, obj) {
        if (typeof(obj[id]) == 'undefined') {return false;}

        var arr = [];

        arr[arr.length] = obj[id];
        
        //arr[arr.length].unshift(obj[id])

        var pid = typeof (obj[id]['pid']) != 'undefined' ? obj[id]['pid'] : 0;
        while (pid) {
            arr[arr.length] = obj[pid];
            pid = typeof (obj[pid]['pid']) != 'undefined' ? obj[pid]['pid'] : 0;
        }
        //console.log(1111);
        return arr;
        
    },
    
    getBreadcrumb() {
      // only show routes with meta.title
      
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      //console.log(this.$route);
      const first = matched[0]

      if (!this.isDashboard(first)) {
         //matched = [{ path: '/homepage', meta: { title: 'Dashboard' }}].concat(matched)
        matched = [{ path: '/dashboard', meta: { title: '' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      //console.log(this.levelList);
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
