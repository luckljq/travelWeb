<template>
    <div>
        <div class="header">
            <el-row>
                <el-col :span="8">
                    <div class="logo">
                        旅行信息分享平台
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-menu class="el-menu-demo"
                             background-color="#3C3C3C"
                             :default-active="onRoutes"
                             mode="horizontal"
                             text-color="#EEEEEE"
                             active-text-color="#EEBE00"
                             @select="handleSelect" router>
<!--                        <el-menu-item index="dashboard" style="font-size: 18px">首页</el-menu-item>-->
                        <el-menu-item index="destination" style="font-size: 18px">目的地</el-menu-item>
                        <el-menu-item index="rankingList" style="font-size: 18px">排行榜</el-menu-item>
                        <el-menu-item index="diary" style="font-size: 18px">旅行游记</el-menu-item>
                        <el-menu-item index="questions" style="font-size: 18px">问答</el-menu-item>
<!--                        <el-menu-item index="info" style="font-size: 18px" v-if="this.$store.getters.getUser.token != ''">个人中心</el-menu-item>-->
                    </el-menu>
                </el-col>
                <el-col :span="8">
                    <div class="header-user-con" v-if="isLogin">
                        <!-- 用户头像 -->
                            <div class="user-avator"><img :src="image"></div>
                        <!-- 用户名下拉菜单 -->
                        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link" >
                                {{username}}
                                <i class="el-icon-caret-bottom"></i>
                                <el-badge is-dot class="item" v-show="showCount"/>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item divided command="user">个人中心</el-dropdown-item>
                                <el-dropdown-item divided command="message">
                                    我的消息<el-badge class="mark" :value="messageCount" />
                                </el-dropdown-item>
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
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px"
                                         class="ms-content">
                                    <el-form-item prop="username">
                                        <el-input v-model="ruleForm.username" placeholder="请输入您的电话" size="large">
                                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="password">
                                        <el-input type="password" size="large" placeholder="登录密码"
                                                  v-model="ruleForm.password"
                                                  @keyup.enter.native="submitForm('ruleForm')">
                                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-button size="medium" type="text" style="color: #8c939d; float: right"
                                               @click="openReset">忘记密码
                                    </el-button>
                                    <div class="login-btn">
                                        <el-button type="warning" size="medium" @click="submitForm('ruleForm')"
                                                   style="font-size: 20px" >登录
                                        </el-button>
                                    </div>
                                </el-form>
                            </div>
                            <el-button slot="reference" size="medium" type="text" style="color:#EEBE00;"
                            >登录
                            </el-button>
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
                                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="0px"
                                         class="ms-content">
                                    <el-form-item prop="phone">
                                        <el-input v-model="ruleForm2.phone" placeholder="请输入您的电话" size="large">
                                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item >
                                        <el-button icon="el-icon-mobile-phone" @click="send" style="width: 100%"
                                                   type="success" :disabled="disabled=!show">
                                            <span v-show="show" class="word">获取验证码</span>
                                            <span v-show="!show" class="word">{{count}} s 后可重新发送</span>
                                        </el-button>
                                    </el-form-item>
                                    <el-form-item prop="code">
                                        <el-input v-model="ruleForm2.code" placeholder="请输入验证码" size="large">
                                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="password">
                                        <el-input type="password" size="large" placeholder="登录密码"
                                                  v-model="ruleForm2.password"
                                                  @keyup.enter.native="submitForm('ruleForm')">
                                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="password2">
                                        <el-input type="password" size="large" placeholder="再次输入密码"
                                                  v-model="ruleForm2.password2"
                                                  @keyup.enter.native="submitForm('ruleForm')">
                                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <div class="login-btn">
                                        <el-button type="warning" size="medium" @click="submitForm2('ruleForm2')"
                                                   style="font-size: 20px">注册
                                        </el-button>
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
            <div class="rs">
                <div class="rs-title">找回密码</div>
                <el-form :model="ruleForm3" :rules="rules3" ref="ruleForm3" label-width="0px" class="ms-content">
                    <el-form-item prop="phone">
                        <el-input v-model="ruleForm3.phone" placeholder="请输入您的电话" size="large">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-mobile-phone" @click="send2" style="width: 100%" type="success"
                                   :disabled="disabled=!show2">
                            <span v-show="show2" class="word">获取验证码</span>
                            <span v-show="!show2" class="word">{{count}} s 后可重新发送</span>
                        </el-button>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input v-model="ruleForm3.code" placeholder="请输入验证码" size="large">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" size="large" placeholder="输入新密码" v-model="ruleForm3.password"
                                  @keyup.enter.native="submitForm('ruleForm')">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password2">
                        <el-input type="password" size="large" placeholder="确认密码" v-model="ruleForm3.password2"
                                  @keyup.enter.native="submitForm('ruleForm')">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="warning" size="medium" @click="submitForm3('ruleForm3')"
                                   style="font-size: 20px">重置密码
                        </el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import {login, register, getCode, reset} from '../../api/login'
    import {getCount} from '../../api/spot'

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
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm3.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                timeout2:null,
                showCount: false,
                messageCount:'',
                noticeCount:'',
                image:sessionStorage.getItem("image"),
                //验证码
                timer: null,
                timer2: null,
                count: '',
                show: true,
                show2: true,
                key: '',
                phone: '',
                //显示隐藏
                loginVisible: false,
                register: false,
                resetVisible: false,
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
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                ruleForm2: {
                    phone: '',
                    password: '',
                    password2: '',
                    code: ''
                },
                rules2: {
                    phone: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                    ,
                    password2: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                },
                ruleForm3: {
                    phone: '',
                    password: '',
                    password2: '',
                    code: ''
                },
                rules3: {
                    phone: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入新密码', trigger: 'blur'}
                    ]
                    ,
                    password2: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {
            username() {
                return this.$store.getters.getUser.username;
            },
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        methods: {
            //发送验证码
            send() {
                let phone = "";
                if (this.resetVisible == true) {
                    phone = this.ruleForm3.phone
                } else {
                    phone = this.ruleForm2.phone
                }
                if (phone != "") {
                    if (phone == "") {
                        Message.warning({
                            message: "请您先输入电话号码",
                        });
                    } else {
                        getCode(phone).then(res => {
                            Message.success({
                                message: "发送验证码成功"
                            });
                            this.key = res.data.key;
                            this.phone = res.data.phone;
                        });
                        if (!this.timer2) {
                            this.count = TIME_COUNT;
                            this.show = false;
                            this.timer2 = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                } else {
                                    this.show = true;
                                    // 清除定时器
                                    clearInterval(this.timer);
                                    this.timer2 = null;
                                }
                            }, 1000)
                        }
                    }
                }
            },
            //发送验证码
            send2() {
                let phone = "";
                if (this.resetVisible == true) {
                    phone = this.ruleForm3.phone
                } else {
                    phone = this.ruleForm2.phone
                }
                if (phone != "") {
                    if (phone == "") {
                        Message.warning({
                            message: "请您先输入电话号码",
                        });
                    } else {
                        getCode(phone).then(res => {
                            Message.success({
                                message: "发送验证码成功"
                            });
                            this.key = res.data.key;
                            this.phone = res.data.phone;
                        });
                        if (!this.timer) {
                            this.count = TIME_COUNT;
                            this.show2 = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                } else {
                                    this.show2 = true;
                                    // 清除定时器
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000)
                        }
                    }
                }
            },
            //找回密码按钮
            submitForm3(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.phone == this.ruleForm3.phone) {
                            reset({
                                phone: this.ruleForm3.phone,
                                password: this.ruleForm3.password,
                                key: this.key,
                                code: this.ruleForm3.code,
                            }).then(res => {
                                Message.success({
                                    message:res.message
                                });
                                this.resetVisible = false;
                                this.ruleForm3 = {};
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
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
                sessionStorage.setItem('state', '已登陆');
                sessionStorage.setItem('image', "http://localhost" + this.items.user.headImage);
                sessionStorage.setItem('token', this.items.token);
                sessionStorage.setItem('privileges', JSON.stringify(this.items.user.privileges));
                this.$store.dispatch('asyncUpdateUser', {
                    id: this.items.user.userId,
                    username: this.items.user.userName,
                    token: this.items.token
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
                    type: 2
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
                    let url = this.$route.path;
                    if (url == "/info" || url == "/travels" ||
                        url == "/userQuestions" || url == "/news" || url == "/notice"){
                        this.$router.push('/destination');
                        clearTimeout(this.timeout);
                        this.timeout2 = setTimeout(() => {
                            window.location.reload();
                        }, 2000 );
                    } else {
                        window.location.reload();
                    }
                }
                if (command === 'user') {
                    this.$router.push('info')
                }
                if (command === 'message') {
                    this.$router.push('news');
                    this.showCount = false;
                    this.messageCount = ''
                }
            },
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            },
            getMessageCount() {
                getCount(this.$store.getters.getUser.id).then(res => {
                    if(res.data > 0) {
                        this.messageCount = res.data;
                        this.showCount = true;
                    }
                })
            }
        },
        created() {
            if (this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null) {
                this.isLogin = true;
                this.getMessageCount()
            }
        },
        mounted() {
        }
    }
</script>
<style>
    .item {

    }
    .word {
        letter-spacing: 1em;
        text-align: center;
    }

    .rs {
        background-color: #fafafa;
        margin-left: 13%;
        width: 300px;
    }

    .rs-title {
        letter-spacing: 1em;
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        border-bottom: 1px solid #ddd;
    }

    .b {
        background-color: #fafafa;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        letter-spacing: 1em;
        background-color: #fafafa;
        margin-left: 7%;
        width: 300px;
    }

    .ms-content {
        padding-top: 30px;
    }

    .login-btn {
        margin-top: 50px;
        text-align: center;

    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .a {
        background-color: #fafafa;
        width: 450px !important;
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
