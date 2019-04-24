// miniprogram/pages/library/library.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booksList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refresh()
  },

  refresh: function() {
    var cBookInfo = {
      name: "六级考纲词汇",
      plan: {
        new: 200,
        old: 400
      },
      totalNum: 2340,
      studiedNum: 242,
      imgUrl: "../../images/books/book1.png",
      star: true
    }

    var booksList = []
    booksList.push(cBookInfo)
    cBookInfo.name = "四级词汇"
    booksList.push(cBookInfo)
    this.setData({
      booksList: booksList
    })
  },

  star: function(e){
    var booksList = this.data.booksList
    var index = e.currentTarget.dataset.index
    booksList[index].star = !booksList[index].star
    this.setData({
      booksList: booksList
    })
  },

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

  toDictionary: function () {
    wx.navigateTo({
      url: '../dictionary/dictionary',
    })
  },
})