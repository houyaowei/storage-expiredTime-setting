/**
 * local存储返回的状态
 */
export default {
  SUCCESS: 0,
  FAILURE: 1, // 如果set时有异常，会返回 QuotaExceededError；如果get时有异常也返回failure
  EXPIRED: 2,
  UNKNOWN: 3 //未知异常，比如说value值被手动修改
}
