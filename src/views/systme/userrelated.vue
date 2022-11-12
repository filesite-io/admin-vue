<template>
    <!-- <div class="change_pass">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="">
                <el-checkbox v-model="checked">是否需要用户登入才能访问</el-checkbox>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="input" placeholder="授权登入密码设置"></el-input>
            </el-form-item>
        </el-form>
    </div> -->
    <div class="app-container">
    暂未开放
  </div>
</template>

<style lang="scss" scoped>

    .pass_form{padding:66px 46px;}
</style>

<script>


export default {
     data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    }
}
</script>
