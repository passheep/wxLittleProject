// login
const app = getApp();
// const $http = require('../../src/js/http.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

	tempClick: function () {
		console.log(app.$http.header)
	}
})