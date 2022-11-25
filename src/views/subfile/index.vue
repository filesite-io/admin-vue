<template>
  <div class="subfile_main" v-loading="subloading" :element-loading-text="loadingText">
		<div>
			<!-- 目录数据列表 -->
            <!-- <div class="folder_bottom">
				
                <a v-for="data in dirdata" :key="data.id" :href="'#/filemange/subfile?id='+data.id"><el-button type="warning" icon="el-icon-notebook-1">{{data.directory}}</el-button></a>
            </div> -->
            <div><span style="color:red;">古村，扫街，美女</span>这几个目录以及目录下的文件为演示用，不能做相关操作，比如删除，重命名创建目录的一些列操作。 如需做相关操作可在<span style="color:red;">文件管理</span>目录下创建新目录进行相关操作。</div>
            <div class="use_button textright">
                <el-button type="primary" icon="el-icon-edit" @click="dirbox = true">创建目录</el-button>
				<!-- <el-button type="primary" icon="el-icon-edit" @click="rmdirm">删除目录</el-button>
                <el-button type="primary" icon="el-icon-edit">重命名</el-button> -->
                <el-button type="primary" @click="uploadDrawer = true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                <el-button type="primary" @click="getFileData" icon="el-icon-refresh-right">刷新</el-button>
            </div>

            <div v-on:click.stop="fileTableMClick">
                <!-- 子目录数据列表 如果不需要显示空数据提示，可以用css隐藏-->
                <el-table
                    :data="dirdata"
                    empty-text="无文件夹数据" 
                    :row-style="{'background-color':'#fffdfa'}"            
                    style="width:100%;" class="filesmd">
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
                                <a title="点击进入子文件夹" :href="'#/filemange/subfile?id='+scope.row.id">
                                <!-- <el-button type="warning" icon="el-icon-notebook-1">{{scope.row.name}}</el-button> -->
                                    <!-- <img src="../../common/img/file.png" alt="图片"/> -->
                                    <svg class="fileicon" style="width: 5.15234375em;height: 5em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1180 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4701"><path d="M1099.433546 289.842983h-1.08787v-99.462424a128.679511 128.679511 0 0 0-93.246023-126.65918v-3.263611A60.454505 60.454505 0 0 0 944.023508 0.003264H729.246837A60.454505 60.454505 0 0 0 668.326102 59.836128H122.526051A126.65918 126.65918 0 0 0 0.062941 190.380559V890.502778a12.277393 12.277393 0 0 0 2.331151 6.216401v1.243281c0 72.110257 46.623011 126.03754 113.760147 126.03754H969.821575c67.603366 0 105.212595-68.225006 122.463109-130.544431L1174.652004 419.610365c18.182974-75.063048-7.459682-129.767381-75.218458-129.767382z m-897.337556 0a160.072339 160.072339 0 0 0-132.253942 78.637479v-124.32803a73.198128 73.198128 0 0 1 46.623011-54.859743H668.326102a60.609915 60.609915 0 0 1 60.454505-59.988274h215.242901a60.609915 60.609915 0 0 1 60.454505 60.609914v3.108201a126.50377 126.50377 0 0 1 90.604052 97.908324z" fill="#FFE680" p-id="4702"></path></svg>
                                </a>
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
                            <div class="file_caozuo">
                                <el-button size="mini" :realpath="scope.row.frealpath" mark="movefiledir">移动</el-button>
                                <el-button size="mini" mark="dirdelete" :filenames="scope.row.name" type="danger">删除</el-button>
                                
                            </div>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 文件数据列表 -->
                <el-table
                    :show-header="false"
                    :empty-text="emptyText"
                    :data="tableData"
                    style="width:100%;">
                    
                    <!-- <el-table-column
                    align="center"
                    prop="date"
                    label="时间"
                    width="auto">
                    </el-table-column> -->
                    <el-table-column
                    align="left"
                    prop="name"
                    label="名称" min-width="20%">
                    </el-table-column>
                    <el-table-column
                    align="left"
                    label="图片"
                    min-width="30%">
                        <template slot-scope="scope">
                            <div class="file_show">
                                <a title="点击查看原文件" :href="scope.row.image" target="_blank">
                                    <!-- {{scope.row.suffix}} -->
                                    <img v-if="['jpg', 'jpeg', 'png', 'gif', 'webp'].indexOf(scope.row.suffix) != -1" :src="scope.row.image" alt="图片"/>
                                    <div v-else-if="scope.row.suffix == 'mp4'"><svg class="icon" style="width:7em;height:7em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2375"><path d="M898.71 706.68c-31.08 0-56.5-25.43-56.5-56.5V401.21c0-31.08 25.43-56.5 56.5-56.5 31.08 0 56.5 25.43 56.5 56.5v248.97c0 31.08-25.42 56.5-56.5 56.5z" fill="#F7B52C" p-id="2376"></path><path d="M691.58 886.72H217.32c-82.84 0-150.63-67.78-150.63-150.63V301.24c0-82.84 67.78-150.63 150.63-150.63h474.27c82.84 0 150.63 67.78 150.63 150.63V736.1c-0.01 82.84-67.79 150.62-150.64 150.62z" fill="#F7B52C" p-id="2377"></path><path d="M430.71 664.86l128.62-128.62c13.93-13.93 13.93-36.52 0-50.45L430.71 357.17c-22.47-22.47-60.9-6.56-60.9 25.22v257.24c0 31.79 38.42 47.71 60.9 25.23z" fill="#FFFFFF" p-id="2378"></path></svg></div>
                                    <div v-else-if="scope.row.suffix == 'mp3'"><svg class="icon" style="width: 7em;height: 7em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11396"><path d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z" p-id="11397"></path></svg></div>
                                    <div v-else-if="scope.row.suffix == 'url'"><svg class="icon" style="width:6em;height:6em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9877"><path d="M62.296463 576.23471l64.234709-64.23471 85.676565 85.646279-42.853425 42.853425a121.140424 121.140424 0 0 0 0 171.292559l42.853425 42.853425a121.140424 121.140424 0 0 0 171.292559 0l214.145983-214.145984a121.140424 121.140424 0 0 0 0-171.322844l-42.823139-42.823139a120.080445 120.080445 0 0 0-24.440081-18.413345l88.705075-88.67479 85.64628 85.64628a211.995741 211.995741 0 0 1 0 299.822548l-256.969124 256.969123a211.995741 211.995741 0 0 1-299.822548 0l-85.646279-85.646279a211.995741 211.995741 0 0 1 0-299.822548z" fill="#E13455" p-id="9878"></path><path d="M961.703537 447.76529l-64.234709 64.23471-85.676565-85.646279 42.853425-42.853425a121.140424 121.140424 0 0 0 0-171.292559l-42.853425-42.853425a121.140424 121.140424 0 0 0-171.292559 0l-214.145983 214.145984a121.140424 121.140424 0 0 0 0 171.322844l42.823139 42.823139a120.080445 120.080445 0 0 0 24.440081 18.413345L404.911866 704.734414l-85.64628-85.64628a211.995741 211.995741 0 0 1 0-299.822548l256.969124-256.969123a211.995741 211.995741 0 0 1 299.822548 0l85.646279 85.646279a211.995741 211.995741 0 0 1 0 299.822548z" fill="#F3ADBA" p-id="9879"></path></svg></div>
                                    <div v-else-if="scope.row.suffix == 'txt'"><svg class="icon" style="width:6em;height:6em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10371"><path d="M247.0912 996.1472 100.5568 996.1472c-39.936 0-72.4992-32.5632-72.4992-72.4992L28.0576 81.92c0-39.936 32.5632-72.4992 72.4992-72.4992l766.0544 0c39.936 0 72.4992 32.5632 72.4992 72.4992l0 210.5344c0 12.3904-10.0352 22.528-22.528 22.528s-22.528-10.0352-22.528-22.528L894.0544 81.92c0-15.1552-12.288-27.5456-27.5456-27.5456L100.5568 54.3744c-15.1552 0-27.5456 12.288-27.5456 27.5456L73.0112 923.648c0 15.1552 12.288 27.5456 27.5456 27.5456l146.5344 0c12.3904 0 22.528 10.0352 22.528 22.528S259.4816 996.1472 247.0912 996.1472zM745.2672 192.1024 174.6944 192.1024c-12.3904 0-22.528-10.0352-22.528-22.528s10.0352-22.528 22.528-22.528l570.5728 0c12.3904 0 22.528 10.0352 22.528 22.528S757.6576 192.1024 745.2672 192.1024zM437.6576 429.6704 174.6944 429.6704c-12.3904 0-22.528-10.0352-22.528-22.528s10.0352-22.528 22.528-22.528l262.9632 0c12.3904 0 22.528 10.0352 22.528 22.528S450.1504 429.6704 437.6576 429.6704zM620.6464 310.8864 174.6944 310.8864c-12.3904 0-22.528-10.0352-22.528-22.528s10.0352-22.528 22.528-22.528l445.952 0c12.3904 0 22.528 10.0352 22.528 22.528S633.1392 310.8864 620.6464 310.8864zM399.6672 1009.8688c-6.2464 0-12.288-2.56-16.5888-7.2704-5.2224-5.7344-7.168-13.7216-5.12-21.2992l40.8576-146.6368c1.024-3.6864 3.072-7.168 5.7344-9.8304l408.9856-408.9856c14.1312-14.0288 36.9664-14.0288 51.0976 0l97.792 97.792c6.8608 6.8608 10.5472 15.872 10.5472 25.4976s-3.7888 18.7392-10.5472 25.4976L928.8704 618.496c-4.1984 4.1984-9.9328 6.5536-15.872 6.5536s-11.6736-2.3552-15.872-6.5536l-66.048-66.048c-8.8064-8.8064-8.8064-23.04 0-31.8464s23.04-8.8064 31.8464 0l50.176 50.176 31.4368-31.4368L859.136 454.0416 460.6976 852.48 431.104 958.6688 546.7136 936.96l231.7312-231.7312c5.0176-5.4272 50.7904-52.6336 107.2128-56.7296 12.3904-0.9216 23.1424 8.3968 24.064 20.7872 0.9216 12.3904-8.3968 23.1424-20.7872 24.064-40.3456 2.9696-77.4144 42.2912-77.824 42.7008-0.2048 0.2048-0.4096 0.512-0.7168 0.7168L573.5424 973.7216c-3.1744 3.1744-7.2704 5.3248-11.776 6.2464l-158.0032 29.5936C402.432 1009.7664 401.1008 1009.8688 399.6672 1009.8688z" p-id="10372"></path></svg></div>
                                    <!-- 如果没有上面定义的文件后缀则显示惊喜图标 -->
                                    <div v-else><svg class="icon" style="width:6em;height:6em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11115"><path d="M231.036033 687.018697c205.078668-23.06748 401.590888-104.190697 594.129517-173.599557-80.245931 113.118379-66.88021 233.461473-15.791161 361.184095-304.418485 159.253339-508.15542 18.526231-578.338356-187.584538z" fill="#2B2622" p-id="11116"></path><path d="M220.663408 671.588772h0.258025c174.167213-19.661543 342.81268-81.742478 508.05221-142.533286 24.770448-9.134103 49.747316-18.319811 83.290632-30.395404 6.811873-2.42544 18.061785 2.167414 25.234893 10.32102 5.676561 6.553848 7.018294 13.417326 3.870383 17.132893-38.961851 55.062642-55.217457 111.828252-55.527088 170.19362-0.309631 58.468578 15.429925 118.79494 40.303583 180.979086 2.167414 5.418536 0.928892 9.804969-2.73507 11.714357l0.051605 0.051605c-33.749735 17.700549-66.570579 31.737137-98.307715 42.574208-113.63443 38.703825-212.148566 33.69813-292.962153-0.309631-83.858288-35.349494-147.642191-100.37192-189.339112-180.101799-11.301517-21.570932-20.951671-44.225571-28.898856-67.551076-2.32223-6.811873 0.619261-11.404727 6.708663-12.075593zM754.982614 558.625208c-163.226931 60.119942-329.808194 121.478405-502.994911 142.584891 6.553848 17.752154 14.139797 34.988258 22.706244 51.39868 35.504309 67.860707 88.554352 122.716928 157.189135 151.615784 71.679484 30.188984 161.369148 33.852946 267.624049-2.373835 28.589225-9.701759 58.520183-22.396613 89.689664-38.445799-24.254397-62.493776-39.374691-123.387794-39.065061-182.578844 0.258026-44.844832 9.288918-88.605957 29.930958-131.386585l-25.080078 9.185708z" fill="#2B2622" p-id="11117"></path><path d="M488.700297 935.548859c10.52744-77.665676 85.354835-165.342741 193.415915-109.609233-13.881772-10.579046-32.562818-16.410422-55.939928-17.494129 66.98342-72.195535 149.912816-9.546944 178.140805 61.152044-124.471501 65.074031-227.06244 85.09681-315.616792 65.951318z" fill="#D22220" p-id="11118"></path><path d="M469.038754 940.502948c2.477045-18.061785 8.308421-36.536411 17.081288-53.617699 12.230409-23.686741 30.601824-45.257673 54.23696-60.429572 23.583531-15.068689 50.160157-24.615633 78.904198-26.060575 11.146702-9.443733 23.325505-16.616842 36.329991-21.828958 29.105276-11.662753 55.011037-12.74646 77.098019-6.244217 17.597339 5.108905 34.110971 15.429925 48.560399 28.795646 18.371416 17.029683 33.440105 39.374691 42.677418 62.493776 0.774077 2.012599-2.52865 5.005695-8.153606 7.740765-66.88021 34.885048-128.90954 57.952527-187.120092 69.873306l-1.702969 0.30963c-57.075241 11.559542-108.422315 11.869173-155.073325 1.754574-2.32223-0.464446-3.199516-1.496548-2.838281-2.786676z m56.043139-62.23575c-8.308421 16.152396-13.881772 33.440105-16.410422 50.211762 40.148768 8.205211 82.46495 8.050396 127.722623-1.083707l1.032102-0.258026c43.81273-9.030893 92.269919-26.937862 146.145643-54.44338-9.134103-21.622537-23.37711-42.264577-40.613214-58.262158-13.572141-12.591644-29.002066-22.241798-45.154462-26.989468-11.611148-3.405937-21.209696-4.438039-27.144283-2.012598-6.295822 2.52865-13.520536 7.534345-21.570932 15.533135 9.546944 0.928892 18.319811 2.580255 26.215391 5.057299 9.856574 3.096306 18.474626 7.431134 25.80255 13.004486 2.889886 2.167414-2.219019 6.708663-11.869173 10.475835-10.166205 3.973593-21.570932 5.573351-25.441314 3.560752-16.978078-8.721262-32.820844-13.778562-47.528297-15.739556-18.784256-2.580255-33.956156 1.032102-45.464094 8.308421-19.093887 12.282014-34.678627 31.221086-45.722118 52.637203z" fill="#2B2622" p-id="11119"></path><path d="M489.061533 190.83566c-33.233684 131.593005-319.95162 221.643905-348.128005 145.784408 50.469788-224.998236 177.108703-312.830116 348.128005-145.784408z" fill="#050509" p-id="11120"></path><path d="M176.592652 331.924003c-1.444943 6.708663-18.629441 14.243008-38.290984 16.823263s-34.472207-0.774077-33.027264-7.482739c12.74646-56.714005 30.343799-105.016379 52.327572-142.791312 24.099582-41.4905 54.907826-71.679484 91.857078-88.502747 51.759915-23.480321 105.429219-26.576627 159.511364-6.192612 35.865545 13.520536 74.156529 39.219876 114.356901 78.439752 5.470141 5.418536-5.418536 13.623746-24.357607 18.371416-18.939072 4.747669-38.75543 4.231618-44.22557-1.135312C416.453157 161.936804 380.794033 137.785617 348.231215 125.555208c-23.37711-8.824472-40.251978-10.372625-50.882629-5.521745-88.193116 40.045558-97.069193 106.254901-120.755934 211.89054z" fill="#2B2622" p-id="11121"></path><path d="M872.126191 163.226931c-41.851736 87.367434-247.033614 105.73885-254.619564 48.044349 67.344656-150.325656 165.084715-192.280603 254.619564-48.044349z" fill="#050509" p-id="11122"></path><path d="M642.070655 213.490299c-1.960994 4.489644-14.552638 7.121504-28.12478 5.831376-13.572141-1.238522-22.96427-5.934587-21.003276-10.42423 16.978078-37.878143 35.91715-69.047624 56.301165-92.218314 22.293403-25.389709 47.425087-41.800131 74.620974-47.837928 38.084564-8.411631 74.517764-2.219019 107.648239 20.590435 21.983773 15.120294 43.761125 39.168271 64.816006 73.072822 2.838281 4.592854-5.676561 8.721262-19.042282 9.082498-13.365721 0.361236-26.525021-3.096306-29.414907-7.740765-20.074384-32.356398-40.303583-54.907826-60.223152-68.583178-14.346218-9.908179-25.389709-13.623746-33.233685-11.869173-18.681046 4.128408-38.136169 17.90697-57.539686 39.993952-19.609938 22.396613-38.084564 52.895228-54.804616 90.102505z" fill="#2B2622" p-id="11123"></path><path d="M246.414353 239.138034c46.599405-62.493776 135.102152-75.395051 197.595928-28.744041 62.493776 46.599405 75.395051 135.050547 28.795646 197.595928-46.599405 62.493776-135.102152 75.395051-197.595929 28.795646-62.493776-46.65101-75.395051-135.153757-28.795645-197.647533zM698.88787 177.521544c38.342589-51.39868 111.10578-61.977725 162.50446-23.635136 51.39868 38.342589 62.02933 111.10578 23.686741 162.50446-38.342589 51.39868-111.10578 61.977725-162.556065 23.686741-51.39868-38.394194-62.02933-111.157385-23.635136-162.556065z" fill="#FFFFFF" p-id="11124"></path><path d="M235.990122 231.345663h0.051606c25.492919-34.110971 62.338961-54.649801 101.352416-60.377967 39.013456-5.676561 80.14272 3.560752 114.305297 28.950462v-0.051606l0.051605 0.051606h0.051605l-0.051605 0.051605c34.162576 25.492919 54.753011 62.390566 60.429572 101.352416 5.676561 39.013456-3.509147 80.194325-28.950461 114.305297h0.051605l-0.051605 0.051605h-0.10321c-25.441314 34.110971-62.338961 54.649801-101.352417 60.377967v0.051605c-38.961851 5.676561-80.194325-3.560752-114.305297-29.002066l-0.051605 0.051605-0.051605-0.051605h-0.051605l0.051605-0.051605C233.255052 421.613667 212.664617 384.767626 206.988056 345.75417l0.051605-0.051605c-5.676561-38.961851 3.509147-80.194325 28.950461-114.305296l-0.051605-0.051606h0.051605z m20.848461 15.48153l0.051605 0.051606v0.051605l-0.051605 0.051605-0.051605-0.051605c-21.106486 28.3312-28.744041 62.648591-24.047977 95.108199l0.051605-0.051605c4.747669 32.562818 21.828957 63.216248 50.108552 84.322733h0.103211l0.051605 0.051605-0.051605 0.051606c28.3312 21.106486 62.545381 28.744041 95.056594 23.996371h0.051605c32.459608-4.747669 63.113037-21.777352 84.271128-50.160157l-0.051605-0.051605h0.051605l0.051605-0.051605h0.051606c21.054881-28.279595 28.692436-62.493776 23.944766-95.004989-4.696064-32.511213-21.828957-63.216248-50.160157-84.322734v0.051605l-0.051605-0.051605 0.051605-0.051605c-28.382805-21.158091-62.648591-28.795646-95.1082-24.047977-32.511213 4.696064-63.216248 21.880562-84.322733 50.108552zM690.321423 171.122512l0.051605-0.051605 0.051605 0.051605c20.951671-28.073174 51.243864-44.999647 83.342237-49.644107 32.046767-4.696064 65.899713 2.889886 93.972887 23.789952l0.051605-0.051606 0.051605 0.051606h0.051605l-0.051605 0.051605c28.073174 20.951671 44.999647 51.347075 49.695712 83.393841 4.696064 32.046767-2.889886 65.951318-23.841557 94.024493l0.051606 0.051605-0.051606 0.051605h-0.051605c-20.951671 28.021569-51.295469 44.948042-83.393841 49.695711-32.046767 4.644459-65.951318-2.941491-94.024493-23.841556l-0.051605-0.051605h-0.051605l0.051605-0.051605c-28.073174-20.951671-44.999647-51.295469-49.695711-83.342237l0.051605-0.051605c-4.644459-32.046767 2.889886-65.899713 23.789951-94.024492h-0.051605l0.051605-0.051605z m17.132893 12.746459l-0.051605 0.103211 0.051605-0.103211c-17.442524 23.325505-23.686741 51.553495-19.816358 78.233332h0.051605c3.870383 26.731442 17.958575 51.966336 41.232475 69.357255h0.10321l-0.051605 0.051605c23.2739 17.339314 51.450285 23.635136 78.181727 19.764753h0.051605c26.679837-3.870383 51.914731-17.958575 69.305649-41.232475l-0.051605-0.051605 0.051605-0.051605c17.339314-23.2739 23.583531-51.450285 19.713148-78.130122-3.870383-26.731442-17.958575-52.017941-41.232475-69.408859H854.838482l0.051605-0.051605c-23.2739-17.339314-51.50189-23.583531-78.181726-19.713149-26.628232 3.870383-51.914731 17.958575-69.254045 41.232475z" fill="#2B2622" p-id="11125"></path><path d="M324.699289 276.345311c20.280804-14.965479 48.818425-15.68795 70.028121 0.154815 26.060576 19.351913 31.375901 56.249559 12.023988 82.206924-19.403518 26.00897-56.197954 31.375901-82.258529 11.972384-2.115809-1.599758-4.128408-3.302726-5.986192-5.108905 4.489644-3.354332 8.618052-7.327924 12.178804-12.127199 17.700549-23.841556 14.655848-56.817215-5.986192-77.098019z m53.153253 32.253187c5.676561-7.637555 16.462027-9.185708 24.099582-3.509147 7.637555 5.676561 9.185708 16.513632 3.509147 24.099582-5.676561 7.637555-16.513632 9.185708-24.099582 3.509147-7.637555-5.676561-9.237313-16.513632-3.509147-24.099582zM763.23943 208.071763c16.668447-12.282014 40.148768-12.901275 57.591291 0.103211 21.416117 15.945976 25.80255 46.289775 9.908179 67.654286-15.945976 21.364511-46.23817 25.80255-67.654286 9.804969-1.754573-1.290128-3.405937-2.683465-4.902484-4.231619 3.715567-2.73507 7.121504-6.037797 10.011389-9.959784 14.552638-19.558333 12.075593-46.702616-4.954089-63.371063z m43.761124 26.576627c4.644459-6.295822 13.572141-7.58595 19.816359-2.889886 6.295822 4.644459 7.58595 13.572141 2.889885 19.816359-4.696064 6.295822-13.572141 7.58595-19.867963 2.889885-6.244217-4.644459-7.534345-13.572141-2.838281-19.816358z" fill="#2B2622" p-id="11126"></path><path d="M270.77196 762.104117c164.775084-61.668095 336.104017-116.111475 507.845789-152.235045 9.030893-32.717633 8.979287-59.810311 31.427506-91.444237-192.487023 69.40886-366.344605 145.526382-571.423272 168.542257 9.288918 27.247493 18.319811 50.779418 32.149977 75.137025z m519.921383 78.491357c-104.448722 42.522602-209.310286 72.918006-319.280754 90.773371 91.702263 25.131684 197.699138 15.223505 330.37585-54.185355-4.902485-12.282014-6.966689-24.460817-11.095096-36.588016z" fill="#FFFFFF" p-id="11127"></path><path d="M286.717936 748.635186c78.594567-29.156882 158.634078-56.610795 239.447664-81.226427 78.233332-23.841556 157.292345-44.948042 236.557779-62.390566 2.786675-12.023988 4.850879-23.583531 7.843975-34.781838 3.044701-11.456332 7.069899-22.861059 13.726956-34.781837-26.112181 9.495338-50.366578 18.526231-74.414554 27.505518-147.02293 54.856221-288.059668 107.441818-447.416217 130.096457 2.993096 8.308421 6.037797 16.307212 9.288918 24.099582 4.334828 10.579046 9.237313 21.003276 14.965479 31.479111z m231.345663-63.216247c-83.445447 25.389709-165.962002 53.875724-246.878798 84.116313-9.134103 3.663962-17.287709 4.283223-18.990677 1.238522-6.966689-12.282014-12.74646-24.306002-17.90697-36.691226-5.212115-12.488434-9.753364-25.131684-14.397823-38.600615-0.670866-1.599758 0.309631-3.973593 3.251122-6.760268 5.986192-5.831376 17.80376-11.249912 26.370206-12.178804 164.82669-18.526231 310.146651-72.763191 462.175276-129.373985 34.007761-12.694855 68.428363-25.59613 99.855868-36.846042 1.806179-0.670866 3.663962-1.238522 5.470141-1.651363 9.753364-2.270624 14.501033 0.258026 10.733861 5.676561-10.579046 14.862269-15.842766 28.795646-19.609938 42.987048-3.973593 14.913874-6.141007 29.569722-10.682256 46.13496h-0.051605c-0.20642 0.825682-0.722471 1.806179-1.548153 2.889885-4.334828 5.470141-15.533135 11.559542-25.028474 13.572142-84.529154 17.648944-169.058308 39.993953-252.76178 65.486872z m255.754876 169.522753c-48.250769 19.042282-96.656352 35.555914-145.577987 49.540896-33.336895 9.495338-66.931815 17.855365-100.991181 24.976869 32.769239 4.95409 67.18984 5.315325 103.881066-0.10321 45.618908-6.708663 95.21141-22.448219 149.861211-49.489291-1.806179-5.26372-3.199516-10.42423-4.541249-15.533136-0.877287-3.147911-1.702968-6.295822-2.63186-9.392128z m-135.773018 31.014665c51.140654-14.655848 101.610442-32.201582 151.925414-52.688807 9.753364-3.973593 18.268205-4.489644 19.506728-1.032102 1.909389 5.624956 3.302726 10.733861 4.644459 15.842766 1.857784 6.863478 3.715567 13.830167 6.295822 20.384014 1.702968 2.993096-3.663962 8.772867-12.798064 13.572142-72.092325 37.723328-136.959935 59.29426-196.305801 68.015522-57.333266 8.411631-108.835156 4.541249-156.208638-8.463237l0.051605-0.051605c-3.354332-0.928892-3.663962-3.767172-0.154815-7.58595 5.16051-5.624956 16.720052-11.456332 25.750945-12.901275 53.462884-8.669657 105.687245-20.332409 157.292345-35.091468z" fill="#2B2622" p-id="11128"></path></svg></div>                                    
                                </a>
                            </div>
                            <!-- <img :src="'http://192.168.0.100/'+scope.row.image" alt="图片"/> -->
                            
                        </template>
                        
                    </el-table-column>
                    
                    <el-table-column
                    align="left"
                    label="操作" min-width="45%">
                    <template slot-scope="scope">
                        <div class="file_caozuo">
                            <el-button size="mini" :filenames="scope.row.name" :suffixs="'.'+scope.row.suffix" mark="rename">重命名</el-button>
                            <el-button size="mini" class="link_copy" :link="scope.row.image" mark="copyLink">复制链接</el-button>
                            <!-- <el-button size="mini">下载</el-button> -->
                        </div>
                        <div class="file_caozuo">
                            <el-button size="mini" :realpath="scope.row.frealpath" mark="movefiledir">移动</el-button>
                            <el-button size="mini" mark="filedelete" :filenames="scope.row.name" type="danger">删除</el-button>
                        </div>
                     </template>
                    </el-table-column>
                </el-table>
            </div>
			
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
		<el-drawer
			title="上传图片"
			:visible.sync="uploadDrawer"
            ref="drawerref"
			:direction="direction"
            :before-close="drawerClose"
			size="100%"
			>

			<el-upload
				action=""
				:limit="maxUploadFileNumbe"
				list-type="picture-card"
				:on-remove="handleRemove"
				:on-exceed="fileexceed"
				:multiple="true"
                ref="uploadref"
				:on-change="filechange"
				:on-preview="handlePictureCardPreview"
                :disabled="false"
                :file-list="uploadFilelist"
                :http-request="UploadRequests"
				:accept="supportedFileTypes"
				:auto-upload="false">
					<i slot="default" class="el-icon-plus"></i>
					<span class="addimgtext">添加照片</span>
				</el-upload>
				<div class="request_main">
					<el-button type="success" :loading="uploadLoad" @click="handleRequest()">开始上传<i class="el-icon-upload el-icon--right"></i></el-button>
				</div>
				 <div class="el-upload__tip">目前只能上传{{supportedFileTypes}}文件，且单个文件不超过{{maxUploadFileSize/1024/1024}}MB</div>
				<el-dialog :modal="false" :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="图片">
				</el-dialog>
		</el-drawer>
  </div>
</template>

<script>

import EventBus from '@/utils/EventBus.js'
import {requesterr, mirlist, mkdir, uploadrequest, rmdirs, deletefile, renamefile, movefiledir} from '@/api/user'
//import defaultSettings from '@/settings.js'

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
    this.uploadCount = 0; //文件上次次数计数 
    console.log(document.domain);
    //console.log(this.imgurl);
  },

    // 实例已经挂载
    // mounted () {
    //     console.log(this.imgurl);
    // },

//   filters: {

//   },
  data() {
    return {
        // 环境变量
        //imgurl:document.domain,
        imgurl:process.env.VUE_APP_IMG_URL,
        //imgurl:'https://demo.jialuoma.cn',

        loadingText: '文件获取中...',
        emptyText: '无文件数据',
        
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

		subloading: false,  //切换目录loading
		mkdirloadings: false, //创建目录loading

		// 图片上传弹出框数据
		uploadDrawer: false,
        direction: 'ttb',
        uploadFilelist: [],

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

    // 计算属性
  computed: {
    maxUploadFileSize() {
        return this.$store.state.settings.configMain.admin_maxUploadFileSize
    },
    supportedFileTypes() {
        return this.$store.state.settings.configMain.admin_supportedFileTypes.toString()
    },

    maxUploadFileNumbe() {
        return this.$store.state.settings.configMain.admin_maxUploadFileNumber
    }
  },

    // 过滤器
  filters: {
    
  },

  methods: {

    // 判断文件类型
    filetype (filetypes) {
        //console.log(filetypes);
        return true;
    },

	// 图片上传相关函数
	handleRemove(file, fileList) {
		//console.log(fileList);
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
		this.$message({showClose:true, message:'当前版本限制上传'+this.maxUploadFileNumbe+'个文件', type:'warning'});
		//this.$message.warning(``);
	},

	filechange(files, fileList) {
		//console.log(files);
        //const isLt2M = files.size / 1024 / 1024 < 5;
        // console.log(files.size);
        // console.log(this.maxUploadFileSize);
        const isLt2M = files.size < this.maxUploadFileSize;
        

        if (!isLt2M) {
          let getfilemb = this.maxUploadFileSize/1024/1024;
          this.$message.error('文件大小不能超过 '+getfilemb+'MB！'+files.name+'已超过，重新选择');
          fileList.splice(-1, 1);  // 移除错误文件
          //window.setTimeout(() => {fileList.splice(-1, 1);}, 3000);
		  
		  //console.log(fileList);
		  return;
        }

        this.uploadFilelist = fileList;
        // console.log(this.uploadFilelist);
        // console.log(files);
		
	},

	// 获取图片base64
	 getBase64(file) {
		let thiss = this;
		return new Promise(function(resolve, reject) {

			if (window.FileReader && file) {
				let reader = new FileReader();
				let imgResult = "";
				reader.readAsDataURL(file);
				reader.onload = function() {
					imgResult = reader.result;
				};
				reader.onerror = function(error) {
					reject(error);
				};
				reader.onloadend = function() {
					resolve(imgResult);
				};
			} else {
				thiss.$message({showClose: true,message: '获取base64出错',type: 'error'});
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

      // 自定义上传
    handleRequest(data) {
        //console.log(data);
        this.$refs.uploadref.submit();
    },

	// 确认上传文件
	UploadRequests(files) {
        let thiss = this;
        this.uploadLoad = true;

        // 获取传给后台的base64图片参数
		this.getBase64(files.file).then(res => {
			//this.dialogImageUrl = 1;
            // let FormDatas = new FormData();
            // FormDatas.append('name', files.file.name);
            // FormDatas.append('file', res);
            // FormDatas.append('parent', this.imgUploadData.parent);
            // this.imgUploadData.name = files.file.name;
			// this.imgUploadData.file = res;
            //console.log(files.file.name);
            // 得到传给后台的参数
            let uploaddata = {}
            uploaddata.name = files.file.name;
            uploaddata.file = res;
            uploaddata.parent = this.imgUploadData.parent;
            //console.log(uploaddata);
            
            //console.log(this.uploadFilelist);
        // 文件上传进度
            let Progress = progressEvent => {
                //progressEvent.loaded:已上传文件大小
                //progressEvent.total:被上传文件的总大小
                //let num = progressEvent.loaded / progressEvent.total * 100 | 0;  //百分比
                let num = Number((progressEvent.loaded / progressEvent.total * 100).toFixed(2))
                //console.log(num);
                files.onProgress({percent: num})  //进度条
            }
            //files.onError()
            //console.log(uploaddata);
            uploadrequest(uploaddata, Progress).then(response => {
                let datamain = response.data;
                if (datamain.code == 1) {
                    //console.log(datamain);
                    //this.$message({showClose: true,message: datamain.msg, type:'success'});
                    files.onSuccess(); //上传成功(打钩的小图标)
                        

                    this.uploadCount++;  //如果全部上传完成则刷新数据
                    console.log(this.uploadCount);
                    console.log(this.uploadFilelist);
                    if (this.uploadCount == this.uploadFilelist.length) {
                        this.uploadDrawer = false;
                        this.uploadFilelist = [];
                        this.uploadCount = 0;
                        this.getFileData();
                        this.loadingText = '新增上传文件中...'

                        this.uploadLoad = false;
                    }
                    
                }
                
            }).catch(error => {
                // this.uploadCount++;
                // console.log(this.uploadCount);
                // console.log(this.uploadFilelist);
                requesterr(this, error);
                this.$message({showClose: true,message: error.message+ '/文件('+files.file.name+')上传失败，请重新上传', type:'error'});
                files.onError(); // 上传失败回调函数，同时删除上传失败的文件
                this.uploadLoad = false;
            });
      		//console.log(res)
		})
		
	},

    //关闭图片上传窗口回调
    drawerClose(done) {
        // this.uploadDrawer = false;
        // this.uploadFilelist = [];
        //confirm('离开该页面将退出照片上传')
        console.log(this.uploadCount);
        if (this.uploadFilelist.length == 0) {
            done();
            return;
        }

        this.$confirm('离开该页面将退出照片上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            if(this.uploadCount > 0) {
                this.getFileData();
                this.loadingText = '新增上传文件中...'
            }
            done();
            this.uploadFilelist = [];
        }).catch(() => {
                        
        });
        
        
    },
    getFileData() {
        let can = {};
		const menusindex = window.location.href
		if (menusindex.indexOf('?id') != -1) {
			//console.log(menusindex.split('?id=')[1]);
			can.id =  menusindex.split('?id=')[1]
		}
		let thiss = this;
        this.subloading = true
        this.loadingText = '获取文件中...'
        this.emptyText = ' ' //空数据提示设置为空
        this.dirdata = []
        this.tableData = []        
		mirlist(can).then(response => {
            
			let datamain = response.data;
			let maindata = datamain.data.dirTree;
			if (datamain.code == 1) {
				//console.log(maindata.directories.length);
				
				if (maindata.directories) {
					this.dirdata = this.forObjectData(maindata.directories);
				}

				if (maindata.files) {
					this.tableData = this.forObjectData(maindata.files);
					
				}
                this.emptyText = '无文件数据'
                //this.haveRealpath = maindata.realpath;
                //console.log(this.haveRealpath);
				this.dirform.parent = maindata.realpath; //获取当前目录的位置
				this.rmdirform.parent = maindata.realpath; //获取当前目录的位置 删除目录
				this.rmfileform.parent = maindata.realpath; //获取当前目录的位置 删除文件
				this.renamefileform.parent = maindata.realpath; //获取当前目录的位置 删除文件
                this.imgUploadData.parent = maindata.realpath; // 上传图片
                this.movefileform.from = maindata.realpath; // 移动目录
                //console.log(this.$el.textContent) // => '未更新'
                this.$nextTick(function () {
                    //console.log(this.$el.textContent) // => '已更新'
                    this.subloading = false;
                })
				
			}
		}).catch(error => {
            //console.log(999);
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
				// suffix:'txt',
				image: objectd[item].path,
				name:  names || objectd[item].directory,
				id: objectd[item].id,
                frealpath: objectd[item].realpath
			}
		
			arrObjs.push(newObject);    
		});
		//console.log(arrObjs);
		return arrObjs;
		
	},

	// 创建目录
	mkdirs() {
		let thiss = this;
		if (!this.dirform.dir) {
			thiss.$message({showClose: true,message: '目录名不能为空',type: 'error'});
			return;
		}
        //console.log(this.dirform);
		this.mkdirloadings = true;
		mkdir(this.dirform).then(response => {
			let datamain = response.data;
			if (datamain.code == 1) {
				
				EventBus.$emit('mkdirSuccess'); //触发菜单栏刷新
                this.loadingText = '创建文件夹中...'
				this.getFileData();

				this.dirform.dir = '';
				thiss.$message({showClose: true,message: datamain.msg,type: 'success'});
				//this.subloading = false;
			} else {
                thiss.$message({showClose: true,message: datamain.err, type: 'error'});
            }
			
			this.mkdirloadings = false;
			this.dirbox = false;
		}).catch(error => {
            this.mkdirloadings = false;
			requesterr(this, error);
		});
	},

    // 删除目录
	rmdirm() {
		let thiss = this;
		this.subloading = true;
        this.loadingText = '删除文件夹中...'
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
			this.subloading = false;
			//this.dirbox = false;
		}).catch(error => {
			requesterr(this, error);
            this.subloading = false;
		});
	},

    // 删除文件
    rmfile() {
		let thiss = this;
        this.loadingText = '文件删除中...'
		this.subloading = true;
        //console.log(this.rmfileform);
		deletefile(this.rmfileform).then(response => {
			let datamain = response.data;
			if (datamain.code == 1) {
                
                this.getFileData();
                thiss.$message({showClose: true,message: datamain.msg,type: 'success'});
				//this.subloading = false;
			} else {
                thiss.$message({showClose: true,message: datamain.err,type: 'error'});
            }

            //this.subloading = false;
			
			//this.dirbox = false;
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
		this.mkdirloadings = true;
        //console.log(this.rmfileform);
		renamefile(this.renamefileform).then(response => {
			let datamain = response.data;
			if (datamain.code == 1) {
				
                EventBus.$emit('mkdirSuccess'); //触发菜单栏刷新
                this.loadingText = '文件重命名中...'
                this.getFileData();
                thiss.$message({showClose: true,message: datamain.msg,type: 'success'});
				//this.subloading = false;
			} else {
                thiss.$message({showClose: true,message: datamain.err,type: 'error'});
            }

			this.mkdirloadings = false;
			this.renamebox = false;
		}).catch(error => {
            this.mkdirloadings = false;
			requesterr(this, error);
		});
	},

    // 移动目录或者文件
    moveFileDir() {
        if (!this.movefileform.to || !this.movefileform.from) {
			this.$message({showClose: true,message: '不能为空',type: 'error'});
			return;
		}
		let thiss = this;
        this.loadingText = '文件移动中...'
		this.subloading = true;
        //console.log(this.rmfileform);
		movefiledir(this.movefileform).then(response => {
			let datamain = response.data;
			if (datamain.code == 1) {
                EventBus.$emit('mkdirSuccess'); //触发菜单栏刷新
                this.getFileData();
                thiss.$message({showClose: true,message: datamain.msg,type: 'success'});
				//this.subloading = false;
			} else {
                thiss.$message({showClose: true,message: datamain.err,type: 'error'});
            }

            this.subloading = false;
			
			this.movebox = false;
		}).catch(error => {
            this.subloading = false;
			requesterr(this, error);
		});
	},

    // 复制处理函数
    copyFun(links, hint) {
        let input = document.createElement("input"); // 创建input对象
        input.setAttribute('readonly', 'readonly'); //禁用input输入，防止ios弹起键盘，延迟复制时间
        input.value = links; // 设置复制内容
        document.body.appendChild(input); // 添加临时实例
        input.select(); // 选择实例内容
        document.execCommand("Copy"); // 执行复制
        document.body.removeChild(input); // 删除临时实例
        this.$message({showClose: true,message: hint,type: 'success'});
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

        // 点击删除文件
        if (objmark == 'filedelete') {
            this.rmfileform.file = getbutton.getAttribute('filenames');
            this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.rmfile();
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

        // 点击复制文件链接
        if (objmark == 'copyLink') {
            //console.log(window.location.protocol+'//' + window.location.host);
            let links = window.location.protocol+'//' + window.location.host + getbutton.getAttribute('link');
            this.copyFun(links, '成功复制文件链接');
            return;
        }
        //console.log(dangQian);
    }
  }
}
</script>

<style lang="scss">

.subfile_main{
    padding:26px 5% 47px 5%;
    .block{margin:0 0 28px 0;}
    .sou_bottom{margin-left:10px;}
    .use_button{margin:15px 0 16px 0;}
	// .use_button>button{margin:0 10px 10px 0;}
    // .file_caozuo{text-align:center;}
    .file_caozuo>button{margin:6px 10px 0 0;}
    .el-table td{padding:9px 0}
	.folder_bottom a{margin:0 6px;}
	.el-table__body-wrapper img{display:block;max-width:68%;max-height:286px;}
	.el-drawer__body{text-align:center;padding:0 10% 20px 10%;}
	.request_main{text-align:center;margin:12px 0;}
	.addimgtext{line-height:25px;display:inline-block;color:#8c939d;vertical-align: middle;}
	.el-upload--picture-card i{vertical-align:middle;}
    .type_file_click img{width:64px;height:48px;}
    .type_file_click a{display:block;}
    // .file_show{position:relative;}
    .file_show a{display:block;min-height:156px;min-width:140px;}
    // .link_copy{position:absolute;top:0;right:0;}
    // .el-table .is-center{text-align:left;}
}
@media (max-width: 990px) {
    .subfile_main .el-table__body-wrapper img{max-width:100%;}
}	
</style>
