// postcss.config.js
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            // 项目中设计稿是750px 所以应该设置为750/10=75
            // 但是vant建议设置为37.5（vant是基于375写的）
            // 所以必须设置为37.5，缺点就是设计稿的尺寸都必须要除以2
            // 解决方法：使用函数动态处理返回
            // rootValue: 37.5,
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            propList: ['*']
        }
    }
}
