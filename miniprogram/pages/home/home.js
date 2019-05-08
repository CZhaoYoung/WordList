// miniprogram/pages/home/home.js
var that
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchText: "",
    signedNum: 0,
    newWordsNum: 0,
    oldWordsNum: 0,
    unstudyWordsNum: 0,
    bookInfo:{},
    progressType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },

  setTaskInfo: function(){
    var newWordsProgress = wx.getStorageSync('newWordsProgress')
    var oldWordsProgress = wx.getStorageSync('oldWordsProgress')
    var newWordsNum = newWordsProgress.totalNum
    var oldWordsNum = oldWordsProgress.totalNum
    var newWordsUnstudyNum = newWordsProgress.unstudyWords.length + newWordsProgress.studingWords.length  
    var oldWordsUnstudyNum =  oldWordsProgress.studingWords.length + oldWordsProgress.unstudyWords.length
    var unstudyWordsNum = newWordsUnstudyNum + oldWordsUnstudyNum
    var type
    if(newWordsUnstudyNum > 0){
      type = 0
    }
    else if(oldWordsUnstudyNum > 0){
      type = 1
    }
    else{
      type = 2
    }
    that.setData({
      newWordsNum: newWordsNum,
      oldWordsNum: oldWordsNum,
      unstudyWordsNum: unstudyWordsNum,
      type: type
    })
  },

  setSignedNum: function(){
    var signedNum = 12
    that.setData({
      signedNum : signedNum
    })
  },

  setBookInfo: function(){
    var bookInfo = {
      totalNum: 2340,
      studiedNum: 242,
      name : "六级考纲词汇(2019版)",
      percentage: 12
    }
    that.setData({
      bookInfo: bookInfo
    })
  },

  searchInput: function(e){
    this.setData({
      searchText: e.detail.value
    })
  },

  search: function(){
    console.log(this.data.searchText)
    this.setData({
      searchText: ""
    })
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
    this.setTaskInfo()
    this.setSignedNum()
    this.setBookInfo()
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

  startMain: function() {
    wx.navigateTo({
      url: '../main/main'
    })
  },

  toCalendarPage: function(){
    wx.navigateTo({
      url: '../calendar/calendar',
    })
  },

  toDictionary: function(){
    wx.navigateTo({
      url: '../dictionary/dictionary',
    })
  }
})