import request from '@/utils/request'

export function fetchIndividual(query) {
  return request({
    url: '/stock/individual/list',
    method: 'get',
    params: query
  })
}

export function updateIndividual(data) {
  return request({
    url: '/stock/individual/update',
    method: 'post',
    data
  })
}

export function addIndividual(data) {
  return request({
    url: '/stock/individual/add',
    method: 'post',
    data
  })
}

export function fetchIndustry(query) {
  return request({
    url: '/stock/industry/list',
    method: 'get',
    params: query
  })
}

export function updateIndustry(data) {
  return request({
    url: '/stock/industry/update',
    method: 'post',
    data
  })
}

export function addIndustry(data) {
  return request({
    url: '/stock/industry/add',
    method: 'post',
    data
  })
}