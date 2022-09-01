<template lang="">
    <div class="my-container">
        <div class="header yes" v-if="user">
            <div class="user-info">
                <div class="info">
                    <div class="left">
                        <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
                        <span class="name">{{ userInfo.name }}</span>
                    </div>
                    <div class="right">
                        <van-button round class="edit-btn" type="primary" size="mini">编辑信息</van-button>
                    </div>
                </div>
                <div class="stats">
                    <div class="stats-item">
                        <span class="count">{{userInfo.art_count}}</span>
                        <span class="text">头条</span>
                    </div>
                    <div class="stats-item">
                        <span class="count">{{userInfo.follow_count}}</span>
                        <span class="text">关注</span>
                    </div>
                    <div class="stats-item">
                        <span class="count">{{userInfo.fans_count}}</span>
                        <span class="text">粉丝</span>
                    </div>
                    <div class="stats-item">
                        <span class="count">{{userInfo.like_count}}</span>
                        <span class="text">获赞</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="header no" v-else>
            <div class="not-login" @click="$router.push('/login')">
                <img class="mobile-img" src="~@/assets/mobile.png">
                <span class="text">登录 / 注册</span>
            </div>
        </div>

        <!-- 宫格grid -->
        <van-grid :column-num="2" class="grid-box" clickable>
            <van-grid-item class="grid-item">
                <i slot="icon" class="toutiao toutiao-shoucang"></i>
                <span slot="text" class="text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-item">
                <i slot="icon" class="toutiao toutiao-lishi"></i>
                <span slot="text" class="text">历史</span>
            </van-grid-item>
        </van-grid>

        <!-- 消息通知、小智同学、退出登录 -->
        <van-cell-group class="cell-container">
            <van-cell center title="消息通知" is-link />
            <van-cell center title="小智同学" is-link class="mb9" />

        </van-cell-group>
        <van-cell v-if="user" title="退出登录" class="logout-cell" @click="logoutFunction" />
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { getUserInfo } from '@/api/user.js'
    export default {
        name: 'MyIndex',
        data() {
            return {
                userInfo: {}
            }
        },
        methods: {
            logoutFunction() {
                this.$dialog.confirm({
                    title: '确认退出登录?'
                }).then(() => {
                    // 点击确认 执行这里的代码
                    this.$store.commit('setUser', null)
                    this.$toast('退出登录!')
                }).catch(() => {
                    // 点击取消 执行这里的代码
                    console.log('取消本次点击')
                })
            },
            async loadUserInfo() {
                try {
                    const { data } = await getUserInfo()
                    this.userInfo = data.data
                    // console.log(this.userInfo)
                } catch (error) {
                    this.$toast('获取用户信息失败,请稍后重试!')
                }
            }
        },
        computed: {
            ...mapState(['user'])
        },
        created() {
            if (this.user) {
                this.loadUserInfo()
            }
        }
    }
</script>
<style lang="less" scoped>
    .my-container {
        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 361px;
            background: url('~@/assets/banner.png');
            background-size: cover;

            .not-login {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .mobile-img {
                    width: 132px;
                    height: 132px;
                    margin-bottom: 15px;
                }

                .text {
                    font-size: 28px;
                    color: #fff;
                }
            }
        }

        .header {
            .user-info {
                width: 100%;
                height: 361px;
                padding: 60px 32px;

                .info {
                    height: 231px;
                    /* background-color: pink; */
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .left {
                        display: flex;
                        align-items: center;

                        .avatar {
                            width: 132px;
                            height: 132px;
                            border: 4px solid #fff;
                            margin-right: 23px;
                        }

                        .name {
                            font-size: 32px;
                            color: #fff;
                        }
                    }

                    .right {
                        .edit-btn {
                            background-color: #fff;
                            color: black;
                        }
                    }
                }

                .stats {
                    display: flex;
                    /* background-color: yellow; */

                    .stats-item {
                        height: 130px;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        text-align: center;

                        .count {
                            font-size: 38px;
                            color: #fff;
                        }

                        .text {
                            font-size: 28px;
                            color: #fff;
                        }
                    }
                }
            }
        }

        .grid-box {
            align-items: center;

            .grid-item {
                height: 140px;

                i.toutiao {
                    font-size: 45px;
                }

                span.text {
                    font-size: 26px;
                    margin-top: 10px;
                }

                .toutiao-shoucang {
                    color: #eb5253;
                }

                .toutiao-lishi {
                    color: #ff9d1d;
                }
            }
        }

        .cell-container {
            .mb9 {
                margin-bottom: 9px;
            }
        }

        .logout-cell {
            text-align: center;
            color: #e28c8c;
        }
    }
</style>