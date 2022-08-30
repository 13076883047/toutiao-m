<template lang="">
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录" />
        <!-- /导航栏 -->

        <!-- 登录表单 -->
        <van-form ref="loginForm" @submit="onSubmit">
            <van-field type="number" v-model="user.mobile" name="mobile" placeholder="请输入手机号"
                :rules="userFormRules.mobile" maxlength="11">
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field type="number" v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFormRules.code"
                maxlength="6">
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss 秒后重试"
                        @finish="isCountDownShow=false" />
                    <van-button v-else native-type="button" @click="onSendSms" class="send-sms-btn" round size="small"
                        type="default">发送验证码
                    </van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <!-- /登录表单 -->

    </div>
</template>
<script>
    import { login, sendSms } from '@/api/user.js'
    export default {
        name: 'LoginIndex',
        data() {
            return {
                user: {
                    mobile: '13911111111',
                    code: '246810'
                },
                userFormRules: {
                    mobile: [
                        {
                            required: true,
                            message: '手机号不能为空'
                        },
                        {
                            pattern: /^1[3|5|7|8]\d{9}$/,
                            message: '手机号格式错误'
                        }
                    ],
                    code: [
                        {
                            required: true,
                            message: '验证码不能为空'
                        },
                        {
                            pattern: /^\d{6}$/,
                            message: '验证码长度必须为6位'
                        }
                    ]
                },
                isCountDownShow: false
            }
        },
        methods: {
            async onSubmit() {
                // 1. 获取表单数据
                const user = this.user
                // TODO:2. 验证表单数据
                // 在组件中需使用 this.$toast
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0   // duration持续时间,默认是2000;如果设置为0则一直显示
                })
                // 3. 发送请求验证
                try {
                    const { data } = await login(user)
                    console.log('登录成功', data)
                    this.$store.commit('setUser', data.data)
                    this.$toast.success('登录成功!')
                } catch (err) {
                    if (err.response.status === 400) {
                        this.$toast.fail(err.response.data.message)
                    } else {
                        this.$toast.fail('登录失败,请稍后重试')
                    }
                }
            },
            async onSendSms() {
                // 1. 校验手机号码
                try {
                    await this.$refs.loginForm.validate('mobile')
                } catch (err) {
                    return console.log(err.message)
                }
                // 2. 验证通过，显示倒计时
                this.isCountDownShow = true
                // 3. 请求发送验证码
                try {
                    await sendSms(this.user.mobile)
                    this.$toast.success('发送验证码成功')
                } catch (err) {
                    this.isCountDownShow = false
                    if (err.response.status === 429) {
                        this.$toast('发送太频繁了,请稍后重试')
                    } else {
                        this.$toast('发送失败,请稍后重试')
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .login-container {
        ;

        .toutiao {
            font-size: 37px;
        }

        .send-sms-btn {
            width: 170px;
            height: 46px;
            line-height: 46px;
            background-color: #ededed;
            font-size: 22px;
            color: #666;
        }

        .login-btn-wrap {
            padding: 53px 33px;

            .login-btn {
                background-color: #6db4fb;
                border: none
            }
        }
    }
</style>