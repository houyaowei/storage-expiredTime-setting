import types from "./types/returnTypes";
import {utils} from "./utils/utils";
import prefix from "./config/prefix";

const _store = sessionStorage || window.sessionStorage
const sessionStore = {
  get: function (key,cb) {
    let result = {}
    let _status = types.SUCCESS
    let _value = '' // ’value|-TS-|session‘结构的数据
    let resValue = '' //返回的值
    const _key = utils.getKey(key) // 返回sl-key的形式
    try {
      _value = _store.getItem(_key)
    } catch (e) {
      return {
        value: null,
        status: types.FAILURE
      }
    }
    
    if (_value && _value.split('|').length === 3) {
      let arr = _value.split('|')
      // let reg = /^(\w+|){2}\w+$/gi
      let time = arr[2] //过期时间
      resValue = arr[0]
    } else {
      resValue = null
      _status = types.UNKNOWN
    }
    result = {
      value: resValue,
      status: _status
    }
    cb && cb(this, result)
    return result
  },
  set: function(key, value,cb) {
    //time为2022-01-09 14:57:28格式
    let _key = utils.getKey(key)
    try {
      _store.setItem(_key, value + prefix.TIME_SIGNATURE+ 'session')
    }catch (e) {
      cb && cb(this,{value: null,status: types.FAILURE })
    }
  },
  deleteItem: function (key) {
    let _key = utils.getKey(key)
    _store.removeItem(_key)
  },
  clear: function() {
    _store.clear()
  }
}
export {
  sessionStore
}
