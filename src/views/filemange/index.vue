<template>
    <div class="filemange_container" v-loading="subloading" :element-loading-text="loadingText">
        <div><span style="color:red;">古村，扫街，美女</span>这几个目录以及目录下的文件为演示用，不能做相关操作，比如删除，重命名创建目录的一些列操作。 如需做相关操作可在<span style="color:red;">文件管理</span>目录下创建新目录进行相关操作。</div>
        <div class="use_button">
            <el-button type="primary" icon="el-icon-edit" @click="dirbox = true">创建目录</el-button>
            <el-button type="primary" @click="getFileData" icon="el-icon-refresh-right">刷新</el-button>
            <!-- <el-button type="primary" icon="el-icon-edit" @click="rmdirm">删除目录</el-button>
            <el-button type="primary" icon="el-icon-edit">重命名</el-button> -->
        </div>
        <div v-on:click="fileTableMClick">
            
            <!-- 子目录数据列表 如果不需要显示空数据提示，可以用css隐藏-->
            <el-table
                :data="dirdata"
                empty-text="暂无文件夹数据"
                :row-style="{'background-color':'#fffdfa'}"   
                style="width: 100%" class="filesmd verleft">
                <!-- <el-table-column
                align="center"
                prop="date"
                label="时间"
                width="auto">
                </el-table-column> -->
                <el-table-column
                align="left"
                prop="name"
                label="名称" min-width="25%">
                </el-table-column>
                <el-table-column
                align="left"
                label="类型"
                min-width="30%">
                    <template slot-scope="scope">
                        <div class="type_file_click">
                            <el-tooltip content="点击进入子文件夹" placement="bottom-start" effect="light">
                                <a :href="'#/filemange/subfile?id='+scope.row.id">
                            <!-- <el-button type="warning" icon="el-icon-notebook-1">{{scope.row.name}}</el-button> -->
                                    <!-- <img src="../../common/img/file.png" alt="图片"/> -->
                                    <svg class="fileicon" style="width: 5.15234375em;height: 5em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1180 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4701"><path d="M1099.433546 289.842983h-1.08787v-99.462424a128.679511 128.679511 0 0 0-93.246023-126.65918v-3.263611A60.454505 60.454505 0 0 0 944.023508 0.003264H729.246837A60.454505 60.454505 0 0 0 668.326102 59.836128H122.526051A126.65918 126.65918 0 0 0 0.062941 190.380559V890.502778a12.277393 12.277393 0 0 0 2.331151 6.216401v1.243281c0 72.110257 46.623011 126.03754 113.760147 126.03754H969.821575c67.603366 0 105.212595-68.225006 122.463109-130.544431L1174.652004 419.610365c18.182974-75.063048-7.459682-129.767381-75.218458-129.767382z m-897.337556 0a160.072339 160.072339 0 0 0-132.253942 78.637479v-124.32803a73.198128 73.198128 0 0 1 46.623011-54.859743H668.326102a60.609915 60.609915 0 0 1 60.454505-59.988274h215.242901a60.609915 60.609915 0 0 1 60.454505 60.609914v3.108201a126.50377 126.50377 0 0 1 90.604052 97.908324z" fill="#FFE680" p-id="4702"></path></svg>
                                    
                                </a>
                            </el-tooltip>
                            
                        </div>
                    </template>
                    
                </el-table-column>
                <el-table-column
                align="left"
                label="操作"
                min-width="45%">
                    <template slot-scope="scope">
                        <div class="file_caozuo">
                            <el-button size="mini" :filenames="scope.row.name" mark="rename">重命名</el-button>
                            <!-- <el-button size="mini">下载</el-button> -->
                        </div>
                        <div class="file_caozuo2">
                            <el-button size="mini" :realpath="scope.row.frealpath" mark="movefiledir">移动</el-button>
                            <el-button size="mini" mark="dirdelete" :filenames="scope.row.name" type="danger">删除</el-button>
                            
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 创建目录弹框 -->
        <el-dialog title="创建目录" :visible.sync="dirbox">
            <el-form :model="dirform">
                <el-form-item label="目录名称" :label-width="formLabelWidth">
                    <el-input v-model="dirform.dir" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dirbox = false">取 消</el-button>
                <el-button type="primary" @click="mkdirs" :loading="mkdirloadings">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 重新命名弹框 -->
        <el-dialog title="重命名" :visible.sync="renamebox">
            <el-form :model="renamefileform">
                <el-form-item label="新名称" :label-width="formLabelWidth">
                    <el-input v-model="renamefileform.to" autocomplete="off">
                        <template v-if="filesuffix" slot="append">{{filesuffix}}</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="renamebox = false">取 消</el-button>
                <el-button type="primary" @click="renameFileDir" :loading="mkdirloadings">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 移动目录弹框 -->
        <el-dialog title="目录移动弹出框" :visible.sync="movebox">
            <el-form :model="movefileform">
                <el-form-item label="当前位置" :label-width="formLabelWidth">
                    <el-input v-model="movefileform.from" autocomplete="off">
                         
                    </el-input>
                </el-form-item>
                <el-form-item label="目标位置（请参考当前位置的格式填写目标位置，需要带上当前的文件名称）" :label-width="formLabelWidth">
                    <el-input v-model="movefileform.to" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="movebox = false">取 消</el-button>
                <el-button type="primary" @click="moveFileDir" :loading="mkdirloadings">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

//import { mapGetters } from 'vuex'
import {requesterr, mirlist, mkdir, rmdirs, deletefile, renamefile, movefiledir} from '@/api/user'
import EventBus from '@/utils/EventBus.js'

export default {

    // 实例还没挂载
  created() {
    this.getFileData();
    //console.log(this.imgurl);
  },

data() {
    return {
        // 当前目录子目录数据
		dirdata: [],

        loadingText: '文件夹获取中...',  //加载提示语

        subloading: false,  //切换目录loading
		mkdirloadings: false, //创建目录loading
        // 创建目录弹出框数据
        dirbox: false,
        dirform: {
          dir: '',
          parent: ''
        },
        formLabelWidth: '',

        //删除目录数据
        rmdirform: {
          dir: '',
		  parent: ''
        },

        // 重命名文件数据
        renamebox: false,
        filesuffix:false,
        renamefileform: {
          from: '',
		  to: '',
          parent: ''
        },

        // 移动目录或者文件数据
        movebox: false,
        movefileform: {
          from: '',
		  to: ''
        },
    }
},

methods: {

    getFileData() {

		let thiss = this;
        this.dirdata = []
        this.loadingText = '获取文件夹中...'
		this.subloading = true;
		mirlist().then(response => {
			let datamain = response.data;
            //console.log(maindata);
            
			if (datamain.code == 1) {
                let maindata = datamain.data.menus;
				//console.log(maindata.directories.length);
				if (maindata) {
                    this.dirdata = this.forObjectData(maindata);
				}

				// this.dirform.parent = maindata.realpath; //获取当前目录的位置 创建目录
				// this.rmdirform.parent = maindata.realpath; //获取当前目录的位置 删除目录
				// this.renamefileform.parent = maindata.realpath; //获取当前目录的位置 重命名
                // this.movefileform.from = maindata.realpath; // 移动目录
                //console.log(this.movefileform.from);
			}
            this.$nextTick(function () {
                //console.log(this.$el.textContent) // => '已更新'
                this.subloading = false;
            })
		}).catch(error => {
			requesterr(this, error);
            this.subloading = false;
		});
    },

    forObjectData(objectd) {
		let newObject = null, arrObjs = [];
		
		Object.keys(objectd).forEach(item => {
			let names = null;
            if (objectd[item].filename) {
                names = objectd[item].filename+'.'+objectd[item].extension;
            }
			newObject = {
				suffix:objectd[item].extension || '',
				image: objectd[item].path,
				name:  names || objectd[item].directory,
				id: objectd[item].id,
                frealpath: objectd[item].realpath || objectd[item].directory
			}
		
			arrObjs.push(newObject);    
		});
		
		return arrObjs;
		console.log(arrObjs);
	},

    // 创建目录
	mkdirs() {
		let thiss = this;
		if (!this.dirform.dir) {
			thiss.$message({showClose: true,message: '目录名不能为空',type: 'error'});
			return;
		}
        //console.log(this.dirform);
        this.loadingText = '创建文件夹中...'
		this.mkdirloadings = true;
		mkdir(this.dirform).then(response => {
			let datamain = response.data;
			if (datamain.code == 1) {
				
				EventBus.$emit('mkdirSuccess'); //触发菜单栏刷新
				//EventBus.$emit('menuopemdsc'); //触发菜单栏刷新
				this.getFileData();

				this.dirform.dir = '';
				thiss.$message({showClose: true,message: datamain.msg, type: 'success'});
				//this.subloading = false;
			} else {
                thiss.$message({showClose: true,message: datamain.err, type: 'error'});
            }
			
			this.mkdirloadings = false;
			this.dirbox = false;
		}).catch(error => {
            //console.log(0);
            this.mkdirloadings = false;
			requesterr(this, error);
		});
	},

    // 删除目录
	rmdirm() {
		let thiss = this;
        this.loadingText = '删除文件夹中...'
		this.subloading = true;
        //console.log(this.rmdirform);
		rmdirs(this.rmdirform).then(response => {
			let datamain = response.data;
			let maindata = datamain.data.dirTree;
			if (datamain.code == 1) {
				
                EventBus.$emit('mkdirSuccess'); //触发菜单栏刷新
				this.getFileData();
                thiss.$message({showClose: true,message: datamain.msg,type: 'success'});
				//this.subloading = false;
			} else {
                thiss.$message({showClose: true,message: datamain.err,type: 'error'});
            }
			//this.subloading = false;
			//this.dirbox = false;
		}).catch(error => {
			requesterr(this, error);
            this.subloading = false;
		});
	},

    // 移动目录或者文件
    moveFileDir() {
        if (!this.movefileform.to || !this.movefileform.from) {
			this.$message({showClose: true,message: '不能为空',type: 'error'});
			return;
		}
		let thiss = this;
        this.loadingText = '移动文件夹中...'
		this.subloading = true;
        //console.log(this.rmfileform);
		movefiledir(this.movefileform).then(response => {
			let datamain = response.data;
			if (datamain.code == 1) {
                //console.log(66666);
				EventBus.$emit('mkdirSuccess'); //触发菜单栏刷新
                this.getFileData();
                thiss.$message({showClose: true,message: datamain.msg,type: 'success'});
				//this.subloading = false;
			} else {
                thiss.$message({showClose: true,message: datamain.err,type: 'error'});
            }

            //this.subloading = false;
			
			this.movebox = false;
		}).catch(error => {
            this.subloading = false;
			requesterr(this, error);
		});
	},

    // 重命名文件和目录
    renameFileDir() {
        if (!this.renamefileform.to) {
			this.$message({showClose: true,message: '新名称不能为空',type: 'error'});
			return;
		}

        if (this.filesuffix) {
            this.renamefileform.to += this.filesuffix;
        }
		let thiss = this;
        this.loadingText = '文件夹重命名中...'
		//this.mkdirloadings = true;
		this.subloading = true;
        //console.log(this.rmfileform);
		renamefile(this.renamefileform).then(response => {
			let datamain = response.data;
			if (datamain.code == 1) {
				
                EventBus.$emit('mkdirSuccess'); //触发菜单栏刷新
                this.getFileData();
                thiss.$message({showClose: true,message: datamain.msg,type: 'success'});
				//this.subloading = false;
			} else {
                thiss.$message({showClose: true,message: datamain.err,type: 'error'});
            }

            //this.subloading = false;
			
			this.renamebox = false;
		}).catch(error => {
            this.subloading = false;
			requesterr(this, error);
		});
	},

    // table块事件监听
    fileTableMClick(e) {
        let dangQian = e.target, labelname = dangQian.tagName.toLowerCase(), chufazhe = e.currentTarget; //currentTarget得到调用当前函数的元素
        let getbutton = dangQian, objmark = null;
        if (labelname == 'span') {
            //console.log(dangQian.parentNode);
            getbutton = dangQian.parentNode;
        }

        objmark = getbutton.getAttribute('mark');

        // 点击删除目录
        // 点击删除目录
        if (objmark == 'dirdelete') {
            this.rmdirform.dir = getbutton.getAttribute('filenames');
            this.$confirm('此操作将删除该文件夹, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.rmdirm();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
           
            return;
        }

        // 点击重命名文件和目录
        if (objmark == 'rename') {
            this.renamefileform.from = getbutton.getAttribute('filenames');
            this.filesuffix = getbutton.getAttribute('suffixs');
            this.renamefileform.to = '';
            this.renamebox = true;
            //this.renameFileDir();
            return;
        }

        // 点击移动目录或文件
        if (objmark == 'movefiledir') {
            //this.movefileform.from = getbutton.getAttribute('filenames');
            this.movefileform.from = getbutton.getAttribute('realpath');
            this.movefileform.to = '';
            this.movebox = true;
            //this.renameFileDir();
            return;
        }
        //console.log(dangQian);
    }
}
}
</script>

<style lang="scss">

.filemange_container{
    padding:26px 5% 47px 5%;
    .block{margin:0 0 28px 0;}
    .sou_bottom{margin-left:10px;}
    .use_button{margin:15px 0 16px 0;}
	// .use_button>button{margin:0 10px 10px 0;}
    // .file_caozuo{text-align:center;}
    .file_caozuo2>button{margin:6px 10px 0 0;}
    .el-table td{padding:9px 0}
	.folder_bottom a{margin:0 6px;}
	.el-drawer__body{text-align:center;padding:0 10% 20px 10%;}
	.request_main{text-align:center;margin:12px 0;}
	.addimgtext{line-height:25px;display:inline-block;color:#8c939d;vertical-align: middle;}
	.el-upload--picture-card i{vertical-align:middle;}
    .type_file_click img{width:64px;height:48px;}
    .type_file_click a{display:block;}
    // .el-table .is-center{text-align:left;}
}	
</style>
