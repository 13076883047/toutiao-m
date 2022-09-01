<template lang="">
    <div class="article-list">
        <van-pull-refresh v-model="isreFreshLoading" :success-text="refreshText" success-duration="1500"
            @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error"
                error-text="请求失败，点击重新加载" @load="loadArticleList">
                <!-- <van-cell v-for="obj in articleList" :key="obj.art_id" :title="obj.title" /> -->
                <articleItem v-for="(obj,index) in articleList" :key="index" :article="obj"></articleItem>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
    import { getChannelList } from '@/api/home.js'
    import articleItem from '@/components/article-item/index.vue'
    export default {
        name: 'ArticleList',
        components: {
            articleItem
        },
        props: {
            channel: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                loading: false,
                finished: false,
                articleList: [],
                timestamp: null,
                error: false,
                isreFreshLoading: false,
                refreshText: ''
            }
        },
        created() {
            this.loadArticleList()
        },
        methods: {
            async loadArticleList() {
                try {
                    const { data } = await getChannelList({
                        channel_id: this.channel.id,
                        timestamp: this.timestamp || new Date().getTime()
                    })
                    // this.articleList = data.data.results
                    this.articleList.push(...data.data.results)
                    console.log(this.articleList)
                    // 加载完本次数据后要把loading设置为false 表示未完成加载数据
                    this.loading = false

                    // 判断是否加载完全部数据
                    if (data.data.results.length) {
                        // 更新下一页的时间戳
                        this.timestamp = data.data.pre_timestamp
                    } else {
                        // 没有数据了
                        this.finished = true
                    }
                } catch (error) {
                    // console.log('请求文章列表失败,请稍后再试!')
                    // 展示错误信息
                    this.error = error
                    // 请求失败后也要把loading关闭
                    this.loading = false
                }
            },
            async onRefresh() {
                try {
                    // 下拉刷新步骤: 1. 发起请求获取信息 2. 追加到数组头部 3. 重置isreFreshLoading
                    const { data } = await getChannelList({
                        channel_id: this.channel.id,
                        timestamp: new Date().getTime()    // 下拉刷新要拿到最新的数据
                    })
                    // 模拟随机失败
                    // if (Math.random() < 0.5) {
                    //     JSON.parse('afafsfasfag')
                    // }
                    // 追加数据
                    const { results } = data.data
                    this.articleList.unshift(...results)
                    // 重置isreFreshLoading
                    this.isreFreshLoading = false
                    // 显示下拉刷新成功的文本
                    this.refreshText = `刷新成功,共更新了${results.length}条数据`
                } catch (error) {
                    this.isreFreshLoading = false
                    this.refreshText = '刷新失败,请再试一次'
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .article-list {
        /* 目标:记住每个列表的滚动位置 */
        /* 给每个组件设置固定的高度,让内容在高度内滚动,从而记住上次的滚动高度。而不是在body内滚动(无法记录之前的高度) */
        height: 79vh;
        /* 如果内容溢出高度,则提供滚动机制 */
        overflow-y: auto;
    }
</style>