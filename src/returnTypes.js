/**
 * local存储返回的状态
 */
export default types = {
  SUCCESS: 0,
  FAILURE: 1, // 如果set时有异常，会返回 QuotaExceededError；如果get时有异常也返回failure
  EXPIRED: 2
}