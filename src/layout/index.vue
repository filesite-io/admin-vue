<template>
  <div :class="classObj" class="app-wrapper">
    <div class="toptitle clearfix">
        <a class="leftk" href="javascript:;">
            <img src="../common/img/jialuoma.png" alt="图片">
            <em class="erectline"></em>
            <span>嘉洛马 - 文件管理后台</span>
        </a>
        <div class="rightk tpriht">
            <!-- <a class="avatark" href="javascript:;" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <img class="mailtp verMiddle" src="../common/img/jialuoma.png" alt="图片">
                
            </a> -->
            <!-- <em class="erectline"></em> -->
            <!-- <a class="Cache tuichu" href="/admin.php/Cache/index.html">清除缓存</a> -->
            <el-button class="quit" @click.native="logout" id="tuichu" size="mini" round>退出</el-button>
        </div>
    </div>
    <div class="content_main">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <div :class="{'fixed-header':fixedHeader}" class="navbar_main">
                <navbar />
            </div>
            <app-main />
        </div>
    </div>
  </div>
</template>

<script>
//import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    // ...mapGetters([
    //   'avatar'
    // ]),

    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },

    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  @import "~@/styles/publics.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 2001;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

.content_main{padding-top:141px;}

.navbar_main{width:100%;position:fixed;top:91px;z-index:300;}


</style>
