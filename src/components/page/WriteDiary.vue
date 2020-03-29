<template>
    <div>
        <div style="background-color: #fafafa">
            <div class="center">
                <div class="title">
                    发表新游记
                    <i class="el-icon-s-flag" style="color: #ffa800"></i>
                    <div class="destination">
                        <el-autocomplete
                                v-model="destination"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请在这里输入目的地"
                                @select="handleSelect"
                        ></el-autocomplete>
                    </div>
                    <el-divider></el-divider>
                </div>
                <div class="info">
                    <el-row :gutter="50">
                        <el-col :span="14">
                            <div class="info-title">
                                <el-input v-model="title" placeholder="请在这里输入标题"></el-input>
                            </div>
                            <div class="info-info">
                                <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 25, maxRows: 60}"
                                        placeholder="请在这里输入游记内容"
                                        v-model="description">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <div class="title2">
                                游记图片上传
                            </div>
                            <el-upload
                                    action="http://localhost:8888/active/user/diary/image"
                                    list-type="picture-card"
                                    :headers="{Authorization:token}"
                                    :file-list="file"
                                    :on-preview="handlePictureCardPreview"
                                    :on-success="onSuccess2"
                                    :on-remove="handleRemove"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible" :modal="false">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-col>
                    </el-row>
                    <div style="padding-bottom: 50px">
                        <el-button type="warning" size="medium" @click="addUserDiary()" >发表</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getNames} from '../../api/spot'
    import {Message} from 'element-ui'
    import {addDiary} from '../../api/active'

    export default {
        name: 'writeDiary',
        data() {
            return {
                fullscreenLoading: false,
                spotId:null,
                spotName:"",
                dialogVisible:false,
                dialogImageUrl: '',
                file:[],
                fileList:[],
                token: "Bearer " + JSON.parse(window.sessionStorage.getItem('UserState')).user.token,
                description:'',
                title: '',
                restaurants: [],
                destination:'',
                timeout:  null
            }
        },
        methods: {
            addUserDiary() {
                if (this.spotId == null) {
                    Message.warning({
                        message:"请选择目的地",
                        center:true
                    });
                } else {
                    addDiary({
                        spotId: this.spotId,
                        userId: this.$store.getters.getUser.id,
                        title:this.title,
                        description: this.description,
                        destination:this.spotName,
                        images:this.fileList
                    }).then(res => {
                        Message.success({
                            message:"发表成功，跳转到我的游记",
                            center:true
                        });
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        clearTimeout(this.timeout);
                        this.timeout = setTimeout(() => {
                            loading.close();
                            this.$router.push({
                                path: '/travels'
                            });
                        }, 2000 );
                    })
                }
            },
            //上传图片预览
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSuccess2(res, file, fileList) {
                Message.success({
                    message:res.message,
                    center:true
                });
                this.change(fileList);
            },
            handleRemove(file, fileList) {
                let str = "F:/test/BS/images" + file.response.data.slice(16);
                console.log(str);
                this.delete(str);
                this.change(fileList);
            },
            change(fileList) {
                this.fileList = [];
                fileList.forEach(file => {
                    this.fileList.push(file.response.data)
                });
            },
            querySearchAsync(queryString, cb) {
                var results;
                   getNames({
                       name: queryString
                   }).then(res =>{
                       results = res.data;
                   });
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 2000 );
            },
            handleSelect(item) {
                this.spotId = item.id;
                this.spotName = item.value;
            }
        },
    }
</script>
<style scoped>
    .destination {
        display: inline;
        padding-left: 50px;
    }
    .info-info {
        padding-bottom: 20px;
    }
    .info-title {
        padding-bottom: 20px;
    }
    .info{
        padding-top: 20px;
    }
    .title {
        padding-top: 50px;
        font-size: 20px;
        color: #666;
    }
    .title2 {
        padding-bottom: 27px;
        font-size: 20px;
        color: #666;
    }
    .center-bottom {
        border-bottom: 1px solid #eee;
    }
    .center {
        margin:0 auto;
        width: 1000px;
    }
</style>
