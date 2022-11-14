<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>


<style lang="scss">
// fix css style bug in open el-dialog
.app-main {
  /*50 = navbar  */
  /* min-height: calc(100vh - 50px); */
  min-height:100%;
  width: 100%;
  position: relative;
  overflow: hidden;
    .el-loading-mask{z-index:100;}
}
.fixed-header+.app-main {
  padding-top: 50px;
}
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}


</style>
