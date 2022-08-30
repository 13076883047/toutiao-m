/**
 * 封装本地数据操作模块
 */
/**
 * 1. 存储数据
 */
export const setItem = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}
/**
 * 2. 获取数据
 */
export const getItem = key => {
    const value = window.localStorage.getItem(key)
    try {
        return JSON.parse(value)
    } catch (error) {
        // 如果不是JSON格式,则原封不动的返回数据
        return value
    }
}
/**
 * 3. 删除数据
 */
export const removeItem = key => {
    window.localStorage.removeItem(key)
}