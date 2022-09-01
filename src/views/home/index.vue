<template lang="text/html">
    <div class="home-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" fixed>
            <van-button class="search-btn" slot="title" type="info" round size="small" icon="search">搜索</van-button>
        </van-nav-bar>
        <!-- ！导航栏 -->
        <!-- 滑动列表 -->
        <van-tabs class="channel-tabs" v-model:active="active" animated swipeable>
            <van-tab v-for="obj in userChannel" :key="obj.id" :title="obj.name">
                <ArticleList :channel="obj"></ArticleList>
            </van-tab>
            <div slot="nav-right" class="placeholder"></div>
            <div slot="nav-right" class="hamburger-btn">
                <i class="toutiao toutiao-gengduo"></i>
            </div>
        </van-tabs>
        <!-- ！滑动列表 -->
    </div>
</template>
<script>
    import { UserChannel } from '@/api/home.js'
    import ArticleList from './components/ArticleList.vue'
    export default {
        name: 'HomeIndex',
        data() {
            return {
                active: 0,
                userChannel: []
            }
        },
        created() {
            this.getUserChannel()
        },
        methods: {
            async getUserChannel() {
                try {
                    const { data: { data: { channels } } } = await UserChannel()
                    // console.log(channels)
                    this.userChannel = channels
                } catch (error) {
                    console.log('获取频道信息失败,请稍后重试!')
                }
            }
        },
        components: {
            ArticleList
        }
    };
</script>
<style lang="less" scoped>
    .home-container {
        padding-bottom: 100px;
        padding-top: 174px;

        :deep .van-tab__pane {
            font-size: 50px;
        }

        :deep .van-nav-bar__title {
            max-width: unset;
        }

        .search-btn {
            width: 555px;
            height: 64px;
            background-color: #5babfb;
            font-size: 28px;
            border: none;

            .van-icon-search {
                font-size: 32px;
            }
        }

        :deep .channel-tabs {
            ;

            .van-tabs__wrap {
                position: fixed;
                top: 92px;
                left: 0;
                right: 0;
                z-index: 1;
                height: 82px;
            }

            .van-tab {
                width: 200px;
                border: 1px solid #edeff3;
                color: #777;
            }

            .van-tab--active {
                color: #333;
            }

            .van-tabs__nav {
                padding-bottom: 0;
            }

            .van-tabs__line {
                bottom: 8px;
                width: 31px !important;
                height: 6px;
                background-color: #3296fa;
            }

            .van-tabs__nav--complete {
                padding: 0;
            }

            .placeholder {
                width: 66px;
                height: 82px;
                flex-shrink: 0;
                /* background-color: pink; */
            }

            .hamburger-btn {
                position: fixed;
                right: 0;
                width: 66px;
                height: 82px;
                line-height: 82px;
                text-align: center;
                background-color: #fff;
                opacity: 0.902;

                i.toutiao {
                    font-size: 33px;
                }

                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    width: 1px;
                    height: 100%;
                    background-image: url(~@/assets/gradient-gray-line.png);
                    background-size: contain;
                }
            }
        }
    }
</style>