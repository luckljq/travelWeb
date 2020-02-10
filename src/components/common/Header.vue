<template>
    <div>
        <div class="header">
            <el-row>
                <el-col :span="6">
                    <div class="logo">
                        旅行信息分享平台
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-menu class="el-menu-demo"
                             background-color="#3C3C3C"
                             :default-active="onRoutes"
                             mode="horizontal"
                             text-color="#EEEEEE"
                             active-text-color="#EEBE00"
                             @select="handleSelect" router>
                        <el-menu-item index="dashboard" style="font-size: 18px">首页</el-menu-item>
                        <el-menu-item index="destination" style="font-size: 18px">目的地</el-menu-item>
                        <el-menu-item index="rankingList" style="font-size: 18px">排行榜</el-menu-item>
                        <el-menu-item index="diary" style="font-size: 18px">旅行日记</el-menu-item>
                        <el-menu-item index="questions" style="font-size: 18px">问答</el-menu-item>
                        <el-menu-item index="6" style="font-size: 18px"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="6">
                    <div class="header-user-con" v-if="isLogin">
                        <!-- 用户头像 -->
                        <div class="user-avator"><img src="../../assets/img/img.jpg"></div>
                        <!-- 用户名下拉菜单 -->
                        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{username}} <i class="el-icon-caret-bottom"></i>
                        </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="header-user-con" v-else>
                        <!-- 登录气泡-->
                        <el-popover
                                v-model="loginVisible"
                                popper-class="b"
                                placement="left"
                                width="350"
                                trigger="click">
                            <div class="ms-login">
                                <div class="ms-title">用户登录</div>
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                                    <el-form-item prop="username">
                                        <el-input v-model="ruleForm.username" placeholder="请输入您的电话" size="large">
                                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="password">
                                        <el-input type="password" size="large" placeholder="登录密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-button size="medium" type="text" style="color: #8c939d; float: right"
                                               @click="openReset">忘记密码</el-button>
                                    <div class="login-btn">
                                        <el-button type="warning" size="medium" @click="submitForm('ruleForm')" style="font-size: 20px">登录</el-button>
                                    </div>
                                </el-form>
                            </div>
                        <el-button slot="reference" size="medium" type="text" style="color:#EEBE00;"
                                   >登录</el-button>
                        </el-popover>
                        <el-divider direction="vertical"></el-divider>
                        <!-- 注册气泡-->
                        <el-popover
                                v-model="register"
                                popper-class="b"
                                placement="left"
                                width="350"
                                trigger="click">
                        <el-button slot="reference" size="medium" type="text" style="color:#EEBE00;">注册</el-button>
                            <div class="ms-login">
                                <div class="ms-title">用户注册</div>
                                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="0px" class="ms-content">
                                    <el-form-item prop="phone">
                                        <el-input v-model="ruleForm2.phone" placeholder="请输入您的电话" size="large">
                                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button icon="el-icon-mobile-phone" @click="send" style="width: 100%" type="success" :disabled="disabled=!show" >
                                            <span v-show="show">获取验证码</span>
                                            <span v-show="!show" class="count">{{count}} s 后可重新发送</span>
                                        </el-button>
                                    </el-form-item>
                                    <el-form-item prop="code">
                                        <el-input v-model="ruleForm2.code" placeholder="请输入验证码" size="large">
                                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="password">
                                        <el-input type="password" size="large" placeholder="登录密码" v-model="ruleForm2.password" @keyup.enter.native="submitForm('ruleForm')">
                                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="password2">
                                        <el-input type="password" size="large" placeholder="再次输入密码" v-model="ruleForm2.password2" @keyup.enter.native="submitForm('ruleForm')">
                                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <div class="login-btn">
                                        <el-button type="warning" size="medium" @click="submitForm2('ruleForm2')" style="font-size: 20px">注册</el-button>
                                    </div>
                                </el-form>
                            </div>
                        </el-popover>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--重置密码弹窗-->
        <el-dialog
                custom-class="a"
                :lock-scroll="false"
                :visible.sync="resetVisible"
                width="30%">
            重置密码
        </el-dialog>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import {login, register, getCode} from '../../api/login'
    const TIME_COUNT = 60;
    export default {
        data() {
            //两次密码验证
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                //验证码
                timer:null,
                count:'',
                show:true,
                key:'',
                phone: '',
                //显示隐藏
                loginVisible:false,
                register:false,
                resetVisible:false,
                //是否登录
                isLogin: false,
                activeIndex: 'dashboard',
                name: this.$store.getters.getUser.name,
                items: [],
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                ruleForm2: {
                    phone: '',
                    password: '',
                    password2: '',
                    code:''
                },
                rules2: {
                    phone: [
                        { required: true, message: '请输入电话号码', trigger: 'blur'}
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                    ,
                    password2: [
                        {validator: validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            username() {
                return this.$store.getters.getUser.username;
            },
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods: {
            //发送验证码
            send() {
                if (this.ruleForm2.phone == "") {
                    Message.warning({
                        message: "请您先输入电话号码",
                    });
                } else {
                    getCode(this.ruleForm2.phone).then(res => {
                        Message.success({
                            message: "发送验证码成功"
                        });
                        this.key = res.data.key;
                        this.phone = res.data.phone;
                    });
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.show = false;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.show = true;
                                // 清除定时器
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    }
                }
            },
            //注册按钮
            submitForm2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.phone == this.ruleForm2.phone) {
                            register({
                                phone: this.ruleForm2.phone,
                                password: this.ruleForm2.password,
                                key: this.key,
                                code: this.ruleForm2.code
                            }).then(res => {
                                this.items = res.data;
                                this.loginStatus();
                                Message.success("注册成功")
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            //登录按钮
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login(formName);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            //赋值登录状态
            loginStatus() {
                sessionStorage.setItem('state','已登陆');
                sessionStorage.setItem('token',this.items.token);
                sessionStorage.setItem('privileges',JSON.stringify(this.items.user.privileges));
                this.$store.dispatch('asyncUpdateUser', {
                    id:this.items.user.userId,
                    username:this.items.user.userName,
                    token:this.items.token
                });
                sessionStorage.setItem('UserState', JSON.stringify(this.$store.state.user));
                window.location.reload();
                this.loginVisible = true;
                this.isLogin = true;
            },
            //登录
            login(formName) {
                login({
                    username: this.ruleForm.username,
                    password: this.ruleForm.password,
                    type:2
                }).then(res => {
                    if (res.data !== null) {
                        //赋值登录状态
                        this.items = res.data;
                        this.loginStatus();
                    }
                })
            },
            //打开重置密码
            openReset() {
                this.resetVisible = true;
                this.loginVisible = false;
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command === 'loginout') {
                    sessionStorage.clear();
                    // this.isLogin = false;
                    window.location.reload()
                }
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        created() {
            if(this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null) {
                this.isLogin = true;
            }
        },
        mounted() {
        }
    }
</script>
<style >
    .b{
        background-color: #fafafa;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        background-color: #fafafa;
        margin-left: 7%;
        width:300px;
    }
    .ms-content{
        padding-top: 30px;
    }
    .login-btn{
        margin-top: 50px;
        text-align: center;

    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .a{
        background-color: #fafafa;
        width: 450px !important;
        height: 400px;
    }
    .el-menu-demo {
        padding-top: 4px;
        border-bottom: 0 !important;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
    }

    .header .logo {
        color: #EEBE00;
        float: right;
        padding-right: 50px;
        line-height: 70px;
    }

    .header-right {
        float: right;
        padding-right: 50px;
    }

    .header-user-con {
        float: right;
        padding-right: 50px;
        display: flex;
        height: 70px;
        align-items: center;
    }

    .btn-bell .el-icon-bell {
        color: #fff;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-avator {
        margin-left: 20px;
    }

    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-link {
        color: white;
        cursor: pointer;
    }
</style>
