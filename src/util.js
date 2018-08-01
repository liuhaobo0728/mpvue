/*
* @Author: 56513
* @Date:   2018-07-29 02:38:40
* @Last Modified by:   56513
* @Last Modified time: 2018-07-31 16:58:38
*/
// 工具类

import config from './config'

export function get (url,data) {
  return request(url,'GET',data)
}

export function post (url,data) {
  return request(url,'POST',data)
 
}

function request(url,method,data) {
    return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal('失败',res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModel (title,content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
