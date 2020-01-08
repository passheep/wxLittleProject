// 请求

const $env = require('env.js')
const REQUEST = require('miniprogram-request')

var header = {
	// 'content-type': 'application/x-www-form-urlencoded',
	'content-type': 'application/json;charset=UTF-8',
	'token': ''
}

function httpRequest(api, params, method, onSuccess, onFailed) {
	let url = $env.currentEnv.httpUrl + api
	console.log('请求url：' + url)
	console.log("请求头：", header)
	console.log("请求params：", params)
	console.log("请求method：", method)

	wx.showLoading({
		title: "正在加载中...",
	})
	wx.request({
		url: url,
		data: params,
		method: method,
		header: header,
		success: function (res) {
			wx.hideLoading();
			console.log('响应：', res.data)
			if (res.data) {
				/** start 根据需求 接口的返回状态码进行处理 */
				if (res.statusCode == 200) {
					onSuccess(res.data);
				} else {
					onFailed(res.data.message)
				}
				/** end 处理结束*/
			}
		},
		fail: function (error) {
			wx.hideLoading();
			onFailed("")
		}
	})
}

function setUserToken(token) {
	header.token = token
}

function get(api, params, onSuccess, onFailed) {
	httpRequest(api, params, "GET", onSuccess, onFailed)
}

function post(api, params, onSuccess, onFailed) {
	httpRequest(api, params, "POST", onSuccess, onFailed)
}

function del(api, params, onSuccess, onFailed) {
	httpRequest(api, params, "DELETE", onSuccess, onFailed)
}

function patch(api, params, onSuccess, onFailed) {
	// 微信自身不支持PATCH
	let url = $env.currentEnv.httpUrl + api

	wx.showLoading({
		title: "正在加载中...",
	})
	REQUEST.patch(url, params, {}, {
		headers: header
	}).then(function (res) {
		wx.hideLoading();
		if (res.data) {
			if (res.statusCode == 200) {
				onSuccess(res.data);
			} else {
				onFailed(res.data.message)
			}
		}
	}).catch(function (error) {
		wx.hideLoading();
		onFailed(error)
	})
}

module.exports = {
	setToken: setUserToken,
	get: get,
	post: post,
	del: del,
	patch: patch
}