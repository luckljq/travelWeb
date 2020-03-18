<template>
    <div >
        <div class="center" >
            <div class="header2">
                <div class="header2-title">{{spot.scenicSpotName}}</div>
                <div class="header2-right">
                    <el-row style="text-align: center">
                    <el-button icon="el-icon-thumb" size="medium" :type="this.type" circle @click="zan">{{ss}}</el-button>
                    </el-row>
                    <el-row style="text-align: center">
                    <div class="span" >{{s}}</div>
                    </el-row>
                </div>

            </div>
            <div class="center-info">
                <div class="center-left">概况</div>
                <div class="center-right">
                    <el-button type="warning" size="medium" @click="showCommentVisible">我要点评</el-button>
                </div>
                <div class="center-mid">{{spot.description}}</div>

            </div>
        </div>
        <div class="center-image">
            <div class="center" v-if="spot.urls" @click="refresh" >
                <a href="https://www.baidu.com/" target="_blank" >
                    <el-row :gutter="5">
                        <el-col :span="16">
                            <el-image :src=" 'http://localhost' + spot.urls[0]"
                                      style="width: 665px; height: 430px" ></el-image>
                        </el-col>
                        <el-col :span="8">
                            <el-row >
                                <el-image :src=" 'http://localhost' + spot.urls[1]"
                                          style="width: 330px; height: 213px" ></el-image>
                            </el-row>
                            <el-row >
                                <el-image :src=" 'http://localhost' + spot.urls[2]"
                                          style="width: 330px; height: 213px" ></el-image>
                            </el-row>
                        </el-col>
                    </el-row>
                </a>
            </div>
        </div>
        <div class="center-bottom">
            <div class="center" v-if="spotType == 2" >
            <div class="info">
                <el-row :gutter="50">
                    <el-col :span="8">
                        <span>电话：</span>
                        <span style="color: #FF9D52">{{spot.scenicSpotPhone}}</span>
                    </el-col>
                    <el-col :span="8">
                        <el-divider direction="vertical"></el-divider>
                        <span>参考用时：</span>
                        <span style="color: #FF9D52">{{spot.useTime}}</span>
                    </el-col>
                    <el-col :span="8">
                        <el-divider direction="vertical"></el-divider>
                        <span>网址：</span>
                        <span style="color: #FF9D52">{{spot.scenicSpotUrl}}</span>
                    </el-col>
                </el-row>
            </div>
            <div class="info">
                <div>
                    <span>交通</span>
                    <div class="info-content">
                        {{spot.traffic}}
                    </div>
                </div>
            </div>
            <div class="info">
                <div>
                    <span>门票</span>
                    <div class="info-content">
                        {{spot.admissionTicket}}
                    </div>
                </div>
            </div>
            <div class="info">
                <div>
                    <span>开放时间</span>
                    <div class="info-content">
                        {{spot.openTime}}
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="center-bottom">
            <div class="center" v-if="spotType == 1">
                <el-row :gutter="150">
                    <el-col :span="12">
                        <div class="strategy">
                            <div class="strategy-title">
                                <i class="el-icon-dessert" style="padding-right: 10px"></i>必吃美食推荐
                            </div>
                            <div class="strategy-info">
                                <el-card class="box-card" v-for="(item,i) in foodStrategy" v-if="i == 0" :key="i">
                                <div class="strategy-info-title">
                                    <el-tag class="strategy-tag" >{{i + 1}}</el-tag>
                                    <a v-bind="{ href: foodUrl + id  + '&f=' + item.id}" target="_blank" style="color: #FF9D52">
                                        {{item.strategyName}}
                                    </a>
                                </div>
                                <div class="strategy-info-image">
                                    <el-image :src="item.imageUrl" style="height: 215px; width: 383px"></el-image>
                                </div>
                                <div class="strategy-info-description">
                                    {{item.description}}
                                </div>
                                </el-card>
                                <el-card class="box-card2" v-for="(item,i) in foodStrategy" v-if="i > 0 && i < 3" :key="i">
                                    <div class="strategy-info-title">
                                        <el-tag class="strategy-tag" >{{i + 1}}</el-tag>
                                        <a v-bind="{ href: foodUrl + id  + '&f=' + item.id}" target="_blank" style="color: #FF9D52">
                                            {{item.strategyName}}
                                        </a>
                                    </div>
                                    <div class="strategy-info-description">
                                        {{item.description}}
                                    </div>
                                </el-card>
                            </div>
                            <div class="strategy-foot">
                                <a v-bind="{ href: foodUrl + id  + '&f=1'}" target="_blank" style="color: #FF9D52">更多美食</a>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="strategy">
                            <div class="strategy-title">
                                <i class="el-icon-school" style="padding-right: 10px"></i>酒店住宿攻略
                            </div>
                            <div class="strategy-info">
                                <el-card class="box-card" v-for="(item, i) in hotelStrategy" v-if="i == 0" :key="i">
                                    <div class="strategy-info-title" >
                                        <el-tag class="strategy-tag">{{i + 1}}</el-tag>
                                        <a v-bind="{ href: hotelUrl + id  + '&h=' + item.id}" target="_blank" style="color: #FF9D52">
                                            {{item.strategyName}}
                                        </a>
                                    </div>
                                    <div class="strategy-info-image">
                                        <el-image :src="item.imageUrl[0]" style="height: 215px"></el-image>
                                    </div>
                                    <div class="strategy-info-description">
                                        {{item.description}}
                                    </div>
                                </el-card>
                                <el-card class="box-card2" v-for="(item, i) in hotelStrategy" v-if="i > 0 && i < 3" :key="i">
                                    <div class="strategy-info-title" >
                                        <el-tag class="strategy-tag">{{i + 1}}</el-tag>
                                        <a v-bind="{ href: hotelUrl + id  + '&h=' + item.id}" target="_blank" style="color: #FF9D52">
                                            {{item.strategyName}}
                                        </a>
                                    </div>
                                    <div class="strategy-info-description">
                                        {{item.description}}
                                    </div>
                                </el-card>
                            </div>
                            <div class="strategy-foot">
                                <a v-bind="{ href: hotelUrl + id  + '&h=1'}" target="_blank" style="color: #FF9D52" >更多住宿</a>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div style="background-color: #fafafa">
            <div class="center">
                <div class="comment">
                    <vComment :data="data" :total="this.total" v-on:getPageNumber="getPageNumber"></vComment>
                </div>
            </div>
        </div>

    <!--新增评论弹出框-->
        <el-dialog
                :lock-scroll="false"
                :visible.sync="commentVisible"
                width="50%">
            <div class="cv">
                <div class="cv-title">{{spot.scenicSpotName}}</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="ms-content">
                    <el-form-item label="总体评价">
                        <el-rate
                                style="margin-top: 6px"
                                v-model="ruleForm.rate"
                                :colors="colors">
                        </el-rate>
                    </el-form-item>
                    <el-form-item prop="description" label="内容">
                        <el-input v-model="ruleForm.description" type="textarea" placeholder="请输入您的评论" size="large">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="上传照片">
                        <el-upload
                                action="http://localhost:8888/spot/user/comment/image"
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
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="submitForm('ruleForm')" size="medium">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import vComment from '../common/comment.vue'
    import {Message} from 'element-ui'
    import {getSpotDetail, spotUserFabulous, getSpotCount, getSpotUserStatus, getSpotComment, deleteFile, addComment
    , getFoodList, getHotelList}
    from '../../api/spot'
    export default {
        name: 'spot',
        data() {
            return {
                foodUrl:"http://" + location.hostname + ":" + location.port + "/foodStrategy?s=",
                hotelUrl:"http://" + location.hostname + ":" + location.port + "/hotelStrategy?s=",
                foodStrategy:[],
                hotelStrategy:[],
                spotType:'',
                dialogVisible:false,
                dialogImageUrl: '',
                file:[],
                fileList:[],
                token: "",
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
                ruleForm: {
                    rate: 0,
                    description: ''
                },
                rules: {
                    description: [
                        {required: true, message: '请输入评价', trigger: 'blur'}
                    ]
                },
                commentVisible:false,
                id:'',
                spot:{},
                s:null,
                ss:'赞',
                type:'',
                //表格初始化
                pageNumber:1,
                total:0,
                data:[]
            }
        },
        components:{
            vComment
        },
        created() {
            this.id = this.$route.query.s;
            this.spotType = this.$route.query.t;
            //获取景点详细信息
            getSpotDetail(this.id).then(res => {
                this.spot = res.data
            });
            //获取景点被点赞总数
            this.getCount();
            let id = this.$store.getters.getUser.id;
            if (id != "") {
                getSpotUserStatus({
                    spotId: this.id,
                    userId: id
                }).then(res => {
                    if (res.data == 1) {
                        this.ss = "取消";
                        this.type = "danger"
                    }
                })
            }
            //获取评论列表
            this.getComment();
            if(this.spotType == 1) {
                this.getFoods();
                this.getHotels();
            }
        },
        methods:{
            getHotels() {
                getHotelList({
                    id: this.id
                }).then(res => {
                    this.hotelStrategy = res.data.list;
                })
            },
            getFoods() {
                getFoodList({
                    id: this.id
                }).then(res => {
                    this.foodStrategy = res.data.list;
                })
            },
            delete(file) {
                deleteFile({
                    file:file
                }).then(res => {
                    Message.success({
                        message:res.message,
                        center:true
                    });
                })
            },
            refresh(){
                this.$router.go(0);
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

            showCommentVisible () {
                if(this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null) {
                    this.commentVisible = true;
                    this.token = "Bearer " + JSON.parse(window.sessionStorage.getItem('UserState')).user.token;
                } else {
                    Message.warning({
                        message: "请您先登录，再进行操作",
                    });
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.rate == 0) {
                            Message.warning({
                                message:"请选择总体评价，最低为一星",
                            });
                        } else {
                            addComment({
                                spotId: this.id,
                                userId: this.$store.getters.getUser.id,
                                rate: this.ruleForm.rate,
                                description: this.ruleForm.description,
                                imageUrls: this.fileList
                            }).then(res => {
                                Message.success({
                                    message:"评论成功",
                                });
                                this.commentVisible = false;
                                this.ruleForm.rate = 0;
                                this.ruleForm.description = "";
                                this.file = [];
                                this.getComment();
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            //获取评论列表
            getComment() {
                getSpotComment({
                    id:this.id,
                    pageNumber: this.pageNumber,
                    pageSize: 5
                }).then(res => {
                    this.data = res.data.list;
                    this.total = res.data.total;
                })
            },
            //翻页
            getPageNumber(pageNumber){
                this.pageNumber = pageNumber;
                this.getComment();
            },
            getCount() {
                getSpotCount(this.id).then(res => {
                    this.s = res.data;
                })
            },
            zan() {
                if(this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null){
                    let id = this.$store.getters.getUser.id;
                    if (this.type == ''){
                        spotUserFabulous({
                            spotId: this.id,
                            userId: id,
                            value: 1
                        });
                        this.s = this.s + 1;
                        this.ss = "取消";
                        this.type = "danger"
                    } else {
                        spotUserFabulous({
                            spotId: this.id,
                            userId: id,
                            value: 0
                        });
                        this.s = this.s-1;
                        this.ss = "赞";
                        this.type = ""
                    }
                } else {
                    Message.warning({
                        message: "请您先登录，再进行操作",
                    });
                }
            }
        }
    }
</script>
<style scoped>
    .strategy-foot {
        padding: 15px;
        text-align: center;
        margin-top: 30px;
        border-top: 1px dashed black;
    }
    .strategy-tag {
        line-height: 26px;
        background-color:#ff9d00;
        color: white;
        font-size: 15px;
    }
    .strategy-info-image{

    }
    .strategy-info-description {
        height: 64px;
        display: -webkit-box;  /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
        -webkit-box-orient: vertical; /*  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
        -webkit-line-clamp: 3; /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
        overflow: hidden;
    }
    .strategy-info-title {
        font-size: 20px;
        padding-bottom: 10px;
    }
    .box-card2 {
        margin-top: 20px;
        height: 150px;

    }
    .box-card {
        margin-top: 20px;
        height: 350px;
    }
    .strategy-info {

    }
    .strategy-title {
        font-size: 30px;

    }
    .strategy {
        margin-top: 20px;
    }
    .cv {
        padding: 1px 66px;
    }
    .cv-title {
        font-size: 25px;
    }
    .comment {
        margin-top: 30px;
    }
    .span {
        color: #FF9D52;
        position: relative;
        font-size: 20px;
        padding-top: 8px;
    }
    .info-content {
        color: #666;
        padding-top: 10px;
    }
    .info {
        padding-top: 30px;
    }
    .header2 {
        padding: 30px 0;
        border-bottom: 1px solid #ddd;
    }
    .header2-right {
        float: right;

    }
    .center-bottom {
        border-bottom: 1px solid #eee;
    }
    .center {
        margin:0 auto;
        width: 1000px;
    }
    .header2-title {
        display: inline;
        font-size: 40px;
        color: #333;
    }
    .center-info {
        padding: 30px 0;
    }
    .center-mid {
        padding-top: 10px;
    }
    .center-left {
        display: inline;
        font-size: 25px;
        color: #FF9D52;
    }
    .center-right {
        float: right;
    }
    .center-image {
        padding-top: 30px;
        padding-bottom: 30px;
        background-color: #fafafa;
        height: 450px;
        border-bottom: 1px solid #eee;
        border-top: 1px solid #eee
    }
</style>
