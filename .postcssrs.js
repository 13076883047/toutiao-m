// postcss.config.js
// module.exports = {

//     plugins: {
//         // 作用:生成浏览器css样式规则前缀
//         // 'autoprefixer': {
//         //     browsers: ['Android >= 4.0', 'iOS >= 8']
//         // },
//         'postcss-pxtorem': {
//             // 项目中设计稿是750px 所以应该设置为750/10=75
//             // 但是vant建议设置为37.5（vant是基于375写的）
//             // 所以必须设置为37.5，缺点就是设计稿的尺寸都必须要除以2
//             // 解决方法：使用函数动态处理返回
//             // rootValue: 37.5,
//             rootValue ({ file }) {
//                 console.log('file', file)
//                 return file.indexOf('vant') !== -1 ? 37.5 : 75
//             },

//             // 配置要转换的CSS属性,*表示所有
//             propList: ['*']
//         }
//     }
// }
