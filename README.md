# storage-expired-time-setting

### 目的

解决localStorage中存储的值不能及时释放的问题，默认存储时间为7天(day)，以当前时间为准。

### 用法

```javascript
npm install storage-expired-time-setting
or
yarn add storage-expired-time-setting
```



### API 

该npm库和[web storage](html.spec.whatwg.org/multipage/webstorage.html)的api保持相对应，具体的对应规则是setItem->set, getItem-> get, removeItem -> deleteItem, 

clear->clear。具体参数如下：

- set( key, value, time,cb)设置key的失效时间，key：webstorage中对应的key。value：webstorage中对应的value。time表示失效时间,具体的格式为 `2022-01-09 114:57:28`,是一个标准的时间串，否则会使用`new Date`初始化一个当前时间。如果有其他的业务逻辑需要处理，可以在回调中进行
- get(key, cb), 获取已经存的值
- deleteItem(key)，删除某个key
- clear，清除所有的值

localStorage过期时间设置，统一返回的结构，返回的状态如下：

- SUCCESS(0): 表示操作正常
- FAILURE(1): 如果set时有异常，会返回 QuotaExceededError；如果get时有异常也返回failure
- EXPIRED(2): 在get key时，如果设置的值已经失效，则会返回
- UNKNOWN(3): 如果手动修改storage中的数据结构，导致结果规则不匹配，则会返回。

返回的数据结构如下：

1、正常返回

```javascript
{
  value: 222,
  status: 0
}
```

2、set失败或者获得的值数据结果已不准确

```javascript
{
  value: 222,
  status: 1
}
```

3、超时返回

```javascript
{
  value: null,
  status: 2
}
```



### 协议

MIT

