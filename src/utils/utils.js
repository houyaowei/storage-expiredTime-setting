import prefix from "../config/prefix";

/**
 * 工具方法
 * @type {{isNumber: utils.isNumber}}
 */
const utils = {
    isNumber: function (num) {
        return Number(num) ? true : false
    },
    getKey: function (key) {
        return prefix.KEY_PRE_ID + key
    },
}
export {
    utils
}
