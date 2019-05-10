// miniprogram/pages/main/main.js
var utils = require("../../utils/utils");
var that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordInfo: [],
    queryWordInfo: [],
    isQuery: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.cloud.callFunction({
      name: 'getWordInfo',
      data: {
        name: options.Wid
      },
      success: res => {
        if(!res.result.valid){
          wx.showToast({
            title: '无该单词信息',
            icon: 'none',
            duration: 2000
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },2000)
        }
        that.setData({
          wordInfo: res.result.wordInfo
        })
        this.initMagicSentence();
      },
      fail: err => {
        wx.showToast({
          title: '获取单词信息失败',
          icon: 'none',
          duration: 2000
        })
      }
    })

  },

  onUnload: function () {
  },

  pronounce: function () {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = that.data.wordInfo.audioUrl
    innerAudioContext.onPlay(() => { })
  },

  selectWord: function (e) {
    var wordInfo = this.data.wordInfo;
    // wordInfo.magicSentence[e.currentTarget.dataset.index].selected = !wordInfo.magicSentence[e.currentTarget.dataset.index].selected;
    var word;
    for (var i = 0; i < wordInfo.magicSentence.length; i++) {
      if (i != e.currentTarget.dataset.index) {
        wordInfo.magicSentence[i].selected = false;
      }
      else {
        if (wordInfo.magicSentence[i].selected != true) {
          wordInfo.magicSentence[i].selected = true;
          word = wordInfo.magicSentence[i].word;
        }
        else {
          return
        }
      }
    }
    // console.log("query="+word)
    //查询单词等待回调
    that.setData({
      queryWordInfo: wordInfo,
      wordInfo: wordInfo,
      isQuery: true
    })
  },

  exitQuery: function (e) {
    var wordInfo = this.data.wordInfo;
    for (var i = 0; i < wordInfo.magicSentence.length; i++) {
      wordInfo.magicSentence[i].selected = false
    }
    that.setData({
      wordInfo: wordInfo,
      isQuery: false
    })
  },

  initMagicSentence: function () {
    var wordInfo = this.data.wordInfo
    wordInfo.magicSentence = utils.parseSentence(this.data.wordInfo.sentence, this.data.wordInfo.name)
    this.setData({
      wordInfo: wordInfo
    })
  },

  nextHandle: function (e) {
    that.updateWordInfo()
    that.changePattern()
    that.updateTopBar()
  }
})