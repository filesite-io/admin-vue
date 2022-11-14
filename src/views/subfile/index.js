import { mirlist, mkdir, uploadrequest, rmdirs, deletefile, renamefile, movefiledir } from '@/api/user'

export default {

    watch: {
        // 点击不同目录请求不同接口
        $route(to, from) {

            this.getFileData();
        }
    },
    //     beforeRouteUpdate(to, from, next) {
    //         alert(0);
    //         next();
    //   },

    // 实例还没挂载
    created() {
        this.getFileData();
    },

    // 实例已经挂载


    filters: {

    },
    data() {
        return {
            // 按日期查询
            // pickerOptions: {
            //   shortcuts: [{
            //     text: '最近一周',
            //     onClick(picker) {
            //       const end = new Date();
            //       const start = new Date();
            //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            //       picker.$emit('pick', [start, end]);
            //     }
            //   }, {
            //     text: '最近一个月',
            //     onClick(picker) {
            //       const end = new Date();
            //       const start = new Date();
            //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            //       picker.$emit('pick', [start, end]);
            //     }
            //   }, {
            //     text: '最近三个月',
            //     onClick(picker) {
            //       const end = new Date();
            //       const start = new Date();
            //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            //       picker.$emit('pick', [start, end]);
            //     }
            //   }]
            // },
            // value2: '',

            //haveRealpath: 0,
            // 当前目录文件数据
            tableData: [],

            // 当前目录子目录数据
            dirdata: [],

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

            // 删除文件数据
            rmfileform: {
                file: '',
                parent: ''
            },

            // 重命名文件数据
            renamebox: false,
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

            subloading: false,  //切换目录loading
            mkdirloadings: false, //创建目录loading

            // 图片上传弹出框数据
            uploadDrawer: false,
            direction: 'ttb',

            // 图片上传相关数据
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            imgUploadData: {
                name: '',
                file: '',
                parent: ''
            },
            uploadLoad: false
        };
    },
    methods: {
        // 图片上传相关函数
        handleRemove(file, fileList) {
            console.log(fileList);
            //this.$refs.upload.clearFiles;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            this.$message({
                showClose: true,
                message: '右键点击或者长按图片自行下载'
            });
        },
        // 超出上传文件个数限制处理函数
        fileexceed(files, fileList) {
            //this.$message({showClose:true, message:`当前版本限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`, type:'warning'});
            this.$message({ showClose: true, message: `当前版本限制上传一个文件`, type: 'warning' });
            //this.$message.warning(``);
        },

        filechange(files, fileList) {
            //console.log(files);
            const isLt2M = files.size / 1024 / 1024 < 5;

            if (!isLt2M) {
                this.$message.error('文件大小不能超过 5MB！' + files.name + '已超过，重新选择');
                fileList.splice(-1, 1);  // 移除错误文件
                //window.setTimeout(() => {fileList.splice(-1, 1);}, 3000);

                //console.log(fileList);
                return;
            }

            // 获取传给后台的图片参数
            this.imgUploadData.name = files.name;
            this.getBase64(files.raw).then(res => {
                //this.dialogImageUrl = 1;
                this.imgUploadData.file = res;
                //console.log(res)
            })
        },

        // 获取图片base64
        getBase64(file) {
            let thiss = this;
            return new Promise(function (resolve, reject) {

                if (window.FileReader && file) {
                    let reader = new FileReader();
                    let imgResult = "";
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        imgResult = reader.result;
                    };
                    reader.onerror = function (error) {
                        reject(error);
                    };
                    reader.onloadend = function () {
                        resolve(imgResult);
                    };
                } else {
                    thiss.$message({ showClose: true, message: '获取base64出错', type: 'error' });
                }

            });
            // if (window.FileReader && file) {
            // 	//调用图片读取方法
            // 	var reader = new FileReader();
            // 	//读取图片
            // 	reader.readAsDataURL(file);
            // 	//监听图片读取进度
            // 	reader.onloadend = function(e) {
            // 		//读取成功，拿到base64编码
            // 		let imgBase64 = e.target.result;
            // 		console.log(imgBase64);
            // 	}
            // }
        },
        // 确认上传文件
        UploadRequest() {
            let thiss = this;
            //console.log(file);
            this.uploadLoad = true;
            uploadrequest(this.imgUploadData).then(response => {
                let datamain = response.data;
                if (datamain.code == 1) {
                    console.log(datamain);
                    this.$message({ showClose: true, message: datamain.msg, type: 'success' });
                    this.uploadDrawer = false;
                    this.getFileData();
                }
                this.uploadLoad = false;
            }).catch(error => {
                if (error.response) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                    this.uploadLoad = false;
                } else if (error.request) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                }
            });
        },
        getFileData() {
            let can = {};
            const menusindex = window.location.href
            if (menusindex.indexOf('?id') != -1) {
                //console.log(menusindex.split('?id=')[1]);
                can.id = menusindex.split('?id=')[1]
            }

            let thiss = this;
            this.subloading = true;
            mirlist(can).then(response => {
                let datamain = response.data;
                let maindata = datamain.data.dirTree;
                if (datamain.code == 1) {
                    //console.log(maindata.directories.length);
                    this.dirdata = []
                    this.tableData = []
                    if (maindata.directories) {
                        this.dirdata = this.forObjectData(maindata.directories);
                    }

                    if (maindata.files) {
                        this.tableData = this.forObjectData(maindata.files);

                    }

                    //this.haveRealpath = maindata.realpath;
                    //console.log(this.haveRealpath);
                    this.dirform.parent = maindata.realpath; //获取当前目录的位置
                    this.rmdirform.parent = maindata.realpath; //获取当前目录的位置 删除目录
                    this.rmfileform.parent = maindata.realpath; //获取当前目录的位置 删除文件
                    this.renamefileform.parent = maindata.realpath; //获取当前目录的位置 删除文件
                    this.imgUploadData.parent = maindata.realpath; // 上传图片
                    this.movefileform.from = maindata.realpath; // 移动目录
                    //console.log(this.movefileform.from);



                    this.subloading = false;


                }
            }).catch(error => {
                if (error.response) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else if (error.request) {
                    thiss.$message({ showClose: true, message: error, type: 'error' });
                } else {
                    thiss.$message({ showClose: true, message: error.message, type: 'error' });
                }

                this.subloading = false;
            });
        },

        forObjectData(objectd) {
            let newObject = null, arrObjs = [];

            Object.keys(objectd).forEach(item => {
                let names = null;
                if (objectd[item].filename) {
                    names = objectd[item].filename + '.' + objectd[item].extension;
                }
                newObject = {
                    date: '2016-05-03',
                    image: objectd[item].path,
                    name: names || objectd[item].directory,
                    id: objectd[item].id,
                    frealpath: objectd[item].realpath
                }

                arrObjs.push(newObject);
            });

            return arrObjs;
            //console.log(arrObjs);
        },

        // 创建目录
        mkdirs() {
            let thiss = this;
            if (!this.dirform.dir) {
                thiss.$message({ showClose: true, message: '目录名不能为空', type: 'error' });
                return;
            }
            //console.log(this.dirform);
            this.mkdirloadings = true;
            mkdir(this.dirform).then(response => {
                let datamain = response.data;
                if (datamain.code == 1) {

                    EventBus.$emit('mkdirSuccess'); //触发菜单栏刷新
                    this.getFileData();

                    this.dirform.dir = '';
                    thiss.$message({ showClose: true, message: datamain.msg, type: 'success' });
                    //this.subloading = false;
                }

                this.mkdirloadings = false;
                this.dirbox = false;
            }).catch(error => {
                if (error.response) {
                    thiss.mkdirloadings = false;
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else if (error.request) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                }
            });
        },

        // 删除目录
        rmdirm() {
            let thiss = this;
            this.subloading = true;
            //console.log(this.rmdirform);
            rmdirs(this.rmdirform).then(response => {
                let datamain = response.data;
                let maindata = datamain.data.dirTree;
                if (datamain.code == 1) {

                    EventBus.$emit('mkdirSuccess'); //触发菜单栏刷新
                    this.getFileData();
                    thiss.$message({ showClose: true, message: datamain.msg, type: 'success' });
                    //this.subloading = false;
                } else {
                    thiss.$message({ showClose: true, message: datamain.err, type: 'error' });
                }
                this.subloading = false;
                //this.dirbox = false;
            }).catch(error => {
                if (error.response) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else if (error.request) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                }
                this.subloading = false;
            });
        },

        // 删除文件
        rmfile() {
            let thiss = this;
            this.subloading = true;
            //console.log(this.rmfileform);
            deletefile(this.rmfileform).then(response => {
                let datamain = response.data;
                if (datamain.code == 1) {

                    this.getFileData();
                    thiss.$message({ showClose: true, message: datamain.msg, type: 'success' });
                    //this.subloading = false;
                } else {
                    thiss.$message({ showClose: true, message: datamain.err, type: 'error' });
                }

                this.subloading = false;

                //this.dirbox = false;
            }).catch(error => {
                this.subloading = false;
                if (error.response) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else if (error.request) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                }
            });
        },

        // 重命名文件和目录
        renameFileDir() {
            if (!this.renamefileform.to) {
                this.$message({ showClose: true, message: '新名称不能为空', type: 'error' });
                return;
            }
            let thiss = this;
            this.subloading = true;
            //console.log(this.rmfileform);
            renamefile(this.renamefileform).then(response => {
                let datamain = response.data;
                if (datamain.code == 1) {

                    this.getFileData();
                    thiss.$message({ showClose: true, message: datamain.msg, type: 'success' });
                    //this.subloading = false;
                } else {
                    thiss.$message({ showClose: true, message: datamain.err, type: 'error' });
                }

                this.subloading = false;

                this.renamebox = false;
            }).catch(error => {
                this.subloading = false;
                if (error.response) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else if (error.request) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                }
            });
        },

        // 移动目录或者文件
        moveFileDir() {
            if (!this.movefileform.to || !this.movefileform.from) {
                this.$message({ showClose: true, message: '不能为空', type: 'error' });
                return;
            }
            let thiss = this;
            this.subloading = true;
            //console.log(this.rmfileform);
            movefiledir(this.movefileform).then(response => {
                let datamain = response.data;
                if (datamain.code == 1) {

                    this.getFileData();
                    thiss.$message({ showClose: true, message: datamain.msg, type: 'success' });
                    //this.subloading = false;
                } else {
                    thiss.$message({ showClose: true, message: datamain.err, type: 'error' });
                }

                this.subloading = false;

                this.movebox = false;
            }).catch(error => {
                this.subloading = false;
                if (error.response) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else if (error.request) {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                } else {
                    thiss.$message({ showClose: true, message: error.response.data.err, type: 'error' });
                }
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
            if (objmark == 'dirdelete') {
                this.rmdirform.dir = getbutton.getAttribute('filenames');
                this.rmdirm();
                return;
            }

            // 点击删除文件
            if (objmark == 'filedelete') {
                this.rmfileform.file = getbutton.getAttribute('filenames');
                this.rmfile();
                return;
            }

            // 点击重命名文件和目录
            if (objmark == 'rename') {
                this.renamefileform.from = getbutton.getAttribute('filenames');
                this.renamefileform.to = '';
                this.renamebox = true;
                //this.renameFileDir();
                return;
            }

            // 点击移动目录或文件
            if (objmark == 'movefiledir') {
                //this.movefileform.from = getbutton.getAttribute('filenames');
                this.movefileform.to = '';
                this.movebox = true;
                //this.renameFileDir();
                return;
            }
            //console.log(dangQian);
        }
    }
}