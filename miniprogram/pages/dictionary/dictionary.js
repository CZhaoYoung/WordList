// miniprogram/pages/dictionary/dictionary.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMask: 1,
    type: 0,
    tabIndex: 0,
    newWordsList: [],
    oldWordsList: [],
    unstudyWordsList: [],
    studiedWordsList: [],
    studingWordsList: [],
    easyWordsList: [],
    currentWordsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      type : 1
    })
    var currentWordsList
    if(that.data.type){
      var task = wx.getStorageSync('task');
      that.setData({
        newWordsList: task.newWords,
        oldWordsList: task.oldWords,
      })
      this.setCurrentList(4)
    }
    else{
      var dictionary = wx.getStorageSync('newWordsProgress')
      that.setData({
        unstudyWordsList: dictionary.unstudyWords,
        studiedWordsList: dictionary.studiedWords,
        studingWordsList: dictionary.studingWords,
        easyWordsList: dictionary.easyWords,
      })
      this.setCurrentList(0)
    }
  },

  changeList: function(e){
    var index = parseInt(e.currentTarget.dataset.index)
    if(!that.data.type){
      switch (index) {
        case 0:
          this.setCurrentList(0)
          break;
        case 1:
          this.setCurrentList(1)
          break;
        case 2:
          this.setCurrentList(2)
          break;
        case 3:
          that.setCurrentList(3)
          break;
        default:
          break;
      }
    }
    else{
      if(!index){
        that.setCurrentList(4)
      }
      else{
        that.setCurrentList(5)
      }
    }
    that.setData({
      tabIndex: index
    })
  },

  setCurrentList: function(i){
    var currentWordsList = []
    switch (i) {
      case 0:
        currentWordsList = that.data.unstudyWordsList
        break;
      case 1:
        currentWordsList = that.data.studingWordsList
        break;
      case 2:
        currentWordsList = that.data.studiedWordsList
        break;
      case 3:
        currentWordsList = that.data.easyWordsList
        break;
      case 4:
        currentWordsList = that.data.newWordsList
        break;
      case 5:
        currentWordsList = that.data.oldWordsList
        break;
      default:
        break;
    }
    for (let i of currentWordsList){
      i.mask = true
    }
    that.setData({
      currentWordsList: currentWordsList
    })
  },
  wordMask: function(e){
    var currentWordsList = that.data.currentWordsList
    currentWordsList[e.currentTarget.dataset.index].mask = !currentWordsList[e.currentTarget.dataset.index].mask
    that.setData({
      currentWordsList: currentWordsList
    })
  },

  maskSwitchChange: function(e){
    var currentWordsList = that.data.currentWordsList
    var mask = e.detail.value
    for( let i of currentWordsList){
      i.mask = mask
    }
    that.setData({
      isMask: mask,
      currentWordsList: currentWordsList
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

  }
})