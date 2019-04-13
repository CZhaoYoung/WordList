// miniprogram/pages/wordInfo/wordInfo.js
var utils = require("../../utils/utils");
var that

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pattern: 1,
    sentenceString : "The fresh air of the September morning braced him.",
    sentence: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.setData({
      sentence : utils.parseSentence(this.data.sentenceString, "braced")
    })
    console.log(this.data.sentence);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  selectWord: function(e) {
    console.log(e);
    var sentence = this.data.sentence;
    sentence[e.currentTarget.dataset.index].selected = !sentence[e.currentTarget.dataset.index].selected;
    that.setData({
      sentence: sentence
    })
  }
})