import request from '@/utils/request'

export function getStoreInfo(num) {
  return request({
    url: '/api/v1/store/page/' + num,
    method: 'get'
    // params: { num }
  })
}
