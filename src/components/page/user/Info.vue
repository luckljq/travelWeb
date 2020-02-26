<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="ruleForm.name" style="width: 215px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="ruleForm.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                            <el-radio label="保密"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="用户地区">
                        <location v-on:getValue="getValue" :locationName="locationName"></location>
                    </el-form-item>
                    <el-form-item label="用户邮箱">
                        <el-input v-model="ruleForm.email" style="width: 215px" placeholder="请输入您的邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="用户头像">
                        <el-upload
                                class="avatar-uploader"
                                action="http://localhost:8888/sys/image/upload"
                                :headers="{Authorization:token}"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="'http://localhost' + imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100px">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="更换绑定" name="second">
                <div class="title">
                    <el-steps :active="active" finish-status="success" >
                        <el-step title="身份验证"></el-step>
                        <el-step title="修改绑定手机"></el-step>
                        <el-step title="完成修改"></el-step>
                    </el-steps>
                </div>
                <div class="center2" >
                    <div v-if="this.active == 0">
                        <div style="margin-bottom: 20px; margin-left: 18px">
                            我们将向该手机发送验证码，请在下方输入您看到的验证码
                        </div>
                        <el-form :model="ruleForm2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" >
                            <el-form-item label="原手机号码">
                                <el-input v-model="ruleForm2.phone" placeholder="请输入您的电话" style="width: 215px"></el-input>
                                <el-button icon="el-icon-mobile-phone" @click="send()"
                                           style="width: 150px; margin-left: 10px" type="success"
                                           :disabled="disabled=!show">
                                    <span v-show="show">获取验证码</span>
                                    <span v-show="!show">{{count}} s 后可重新发送</span>
                                </el-button>
                            </el-form-item>
                            <el-form-item label="验证码">
                                <el-input v-model="ruleForm2.code" placeholder="请输入您的验证码" style="width: 215px"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="next()" style="width: 100px">下一步</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="this.active == 1">
                        <el-form :model="ruleForm3" ref="ruleForm3" label-width="100px" class="demo-ruleForm" >
                            <el-form-item label="新手机号">
                                <el-input v-model="ruleForm3.phone" placeholder="请输入您的电话" style="width: 215px"></el-input>
                                <el-button icon="el-icon-mobile-phone" @click="send2()"
                                           style="width: 150px; margin-left: 10px" type="success"
                                           :disabled="disabled=!show2">
                                    <span v-show="show2">获取验证码</span>
                                    <span v-show="!show2">{{count}} s 后可重新发送</span>
                                </el-button>
                            </el-form-item>
                            <el-form-item label="验证码">
                                <el-input v-model="ruleForm3.code" placeholder="请输入您的验证码" style="width: 215px"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="next2()" style="width: 100px">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="this.active == 3" class="cg">
                        修改成功
                        <div>
                            <el-button type="primary" @click="next3()" style="width: 100px">确认</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import location from '../../common/Location'
    import {getCode} from '../../../api/login'
    import {Message} from 'element-ui'
    import {getUserDetail, update, verificationCode, changePhone} from '../../../api/sysApi'

    const TIME_COUNT = 60;
    export default {
        data() {
            return {
                token: "Bearer " + JSON.parse(window.sessionStorage.getItem('UserState')).user.token,
                imageUrl: '',
                locationName: '请选择',
                active: 3,
                key: "",
                phone: "",
                show: true,
                show2: true,
                timer3: null,
                timer4: null,
                count: '',
                    activeName: 'first',
                ruleForm3: {
                    phone: "",
                    code: ""
                },
                ruleForm2: {
                    phone: "",
                    code: ""
                },
                ruleForm: {
                    name: '',
                    email: '',
                    sex: '保密',
                    locationCode: null,
                    phone:""
                },
                rules: {
                    name: [
                        {required: true, message: '请输入您的昵称', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ]
                }
            }
        },
        created(){
            getUserDetail(
                this.$store.getters.getUser.id
            ).then(res => {
                let data = res.data;
                this.ruleForm.name = data.userName;
                this.ruleForm.email = data.email;
                this.ruleForm.sex = data.sex;
                this.ruleForm.phone = data.phone;
                this.imageUrl = data.headImage;
                this.locationName = data.locationName;
            })
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = res.data;
                console.log(res.data)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            next3(){
                this.activeName = "first";
                this.active = 0;
                this.ruleForm2 ={
                    phone: "",
                    code: ""
                };
                this.ruleForm3 ={
                    phone: "",
                    code: ""
                };
            },
            next2() {
                if(this.ruleForm3.phone == this.phone) {
                    changePhone({
                        key: this.key,
                        code: this.ruleForm3.code,
                        phone: this.ruleForm3.phone,
                        id: this.$store.getters.getUser.id
                    }).then(res => {
                        this.active = 3;
                    })
                } else {
                Message.warning("电话号码不一致")
            }
            },
            next() {
                if(this.ruleForm2.phone == this.phone) {
                    verificationCode({
                        key: this.key,
                        code: this.ruleForm2.code,
                        phone: this.ruleForm2.phone,
                        id: this.$store.getters.getUser.id
                    }).then(res => {
                        this.active = 1;
                    });
                } else {
                    Message.warning("请重新获取验证码")
                }
            },
            //发送验证码
            send() {
                if (this.ruleForm2.phone != "") {
                    getCode(this.ruleForm2.phone).then(res => {
                        Message.success({
                            message: "发送验证码成功"
                        });
                        this.key = res.data.key;
                        this.phone = res.data.phone;
                    });
                    if (!this.timer3) {
                        this.count = TIME_COUNT;
                        this.show = false;
                        this.timer3 = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.show = true;
                                // 清除定时器
                                clearInterval(this.timer3);
                                this.timer3 = null;
                            }
                        }, 1000)
                    }
                } else {
                    Message.warning({
                        message: "请您先输入电话号码",
                    });
                }
            },
            //发送验证码2
            send2() {
                if (this.ruleForm3.phone != "") {
                    getCode(this.ruleForm3.phone).then(res => {
                        Message.success({
                            message: "发送验证码成功"
                        });
                        this.key = res.data.key;
                        this.phone = res.data.phone;
                    });
                    if (!this.timer4) {
                        this.count = TIME_COUNT;
                        this.show2 = false;
                        this.timer4 = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.show2 = true;
                                // 清除定时器
                                clearInterval(this.timer4);
                                this.timer4 = null;
                            }
                        }, 1000)
                    }
                } else {
                    Message.warning({
                        message: "请您先输入电话号码",
                    });
                }
            },
            handleClick(tab, event) {

            },
            open() {
                this.$router.push({
                    path: '/change'
                })
            },
            //修改信息
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        update({
                            userId: this.$store.getters.getUser.id,
                            userName: this.ruleForm.name,
                            sex: this.ruleForm.sex,
                            email: this.ruleForm.email,
                            locationCode :this.ruleForm.locationCode,
                            phone: this.ruleForm.phone,
                            headImage: this.imageUrl
                        }).then(res => {
                            Message.success("保存成功");
                            //给用户重新赋值
                            this.$store.dispatch('asyncUpdateUser', {
                                id: this.$store.getters.getUser.id,
                                username: this.ruleForm.name,
                                token: this.$store.getters.getUser.token
                            });
                            sessionStorage.setItem('UserState', JSON.stringify(this.$store.state.user));
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //获取地址
            getValue(locationCode) {
                this.ruleForm.locationCode = locationCode[2];
            },
        },
        components: {
            location
        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        width: 215px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 215px;
        height: 178px;
        display: block;
    }
    .cg {
        margin: 0 auto;
        width: 400px;
        text-align: center;
        font-size: 30px;
    }
    .center2 {
        padding-top: 20px;
        /*padding-left: 100px;*/
    }

    .title {
        margin-top: 20px;
        padding-bottom:20px;
    }


</style>
