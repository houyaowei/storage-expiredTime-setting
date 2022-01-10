/**
 * localStorage处理工具类
 * 返回这样的结构: {status: 'SUCCESS', value:value}
 */
import types from './types/returnTypes'
import prefix from './config/prefix'
import { utils } from "./utils/utils";
const _store = localStorage || window.localStorage
const DEFAULTTIME = 1000*60*60*24*7  // 存储时间默认7天，单位是ms

const localStore = {
    get: function (key,cb) {
        let result = {}
        let _status = types.SUCCESS
        let _value = '' // ’value|-TS-|过期时间‘结构的数据
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
        let arr = _value.split('|')
        if (_value && arr.length === 3) {
            // let reg = /^(\w+|){2}\w+$/gi
            let time = arr[2] //过期时间
            resValue = arr[0]
            let now = new Date().getTime()
            if (Number(time) < now) {
                _status = types.EXPIRED
                resValue = null
                _store.removeItem(_key)
            } else {
              _status = types.SUCCESS
            }
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
    set: function(key, value,time,cb) {
        //time为2022-01-09 14:57:28格式
        let expiredTime = ''
        if (time) {
            if (new Date(time)){
                expiredTime = new Date(time).getTime()
            } else {
                expiredTime = DEFAULTTIME
            }
        } else {
            expiredTime = DEFAULTTIME
        }
        let _key = utils.getKey(key)
        try {
            _store.setItem(_key, value + prefix.TIME_SIGNATURE + expiredTime)
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

export  {
  localStore
}
