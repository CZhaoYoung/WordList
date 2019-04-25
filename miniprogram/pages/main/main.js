// miniprogram/pages/main/main.js
var utils = require("../../utils/utils");
var that;
var isFirst = true;
var progress = {};
var summaryCount = 0;
var type;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pattern: 1,
    wordInfo: [],
    queryWordInfo: [],
    isUnknown: false,
    isEasy: false,
    isReviewing: false,
    isMask: true,
    isQuery: false,
    summaryList: [],
    nwn1: 0,
    nwn2: 0,
    own1: 0,
    own2: 0,
    timeStart: 0,
    time: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    type = 0;
    var date = new Date()
    this.data.timeStart = date.getTime()/1000;
    this.initProgress(); 
    this.initWordInfo();
  },

  onUnload: function (){
    if(!type){
      wx.setStorageSync('newWordsProgress', progress);
    }
    else{
      wx.setStorageSync('oldWordsProgress', progress);
    }
  },

  changePattern: function() {
    var pattern = that.data.pattern;
    if(pattern == 0){
      pattern = 1;
      that.setData({
        pattern: pattern
      })
      return
    }
    else if(pattern == 1){
      if(progress.globalTimeCount%7==0||(progress.studingWords.length==0&&progress.unstudyWords.length==0)){
        this.createSummaryList()
        pattern = 2;
        that.setData({
          pattern: pattern
        })
      }
      else{
        pattern = 0;
        that.setData({
          pattern: pattern
        })
      }
    }
    else if(pattern == 2){
      if(progress.globalTimeCount % 7 != 0){
        console.log("背完了")
      }
      pattern = 0;
      that.setData({
        pattern: pattern
      })
    }

  },

  selectWord: function(e) {
    var wordInfo = this.data.wordInfo;
    // wordInfo.magicSentence[e.currentTarget.dataset.index].selected = !wordInfo.magicSentence[e.currentTarget.dataset.index].selected;
    var word;
    for(var i=0; i<wordInfo.magicSentence.length; i++){
      if(i != e.currentTarget.dataset.index){
        wordInfo.magicSentence[i].selected = false;
      }
      else{
        if(wordInfo.magicSentence[i].selected != true){
          wordInfo.magicSentence[i].selected = true;
          word = wordInfo.magicSentence[i].word;
        }
        else{
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

  exitQuery: function(e){
    var wordInfo = this.data.wordInfo;
    for(var i=0; i<wordInfo.magicSentence.length; i++){
      wordInfo.magicSentence[i].selected = false
    }
    that.setData({
      wordInfo: wordInfo,
      isQuery: false
    })
  },

  initProgress: function(){
    var progerss1 = wx.getStorageSync('newWordsProgress');
    var progress2 = wx.getStorageSync('oldWordsProgress');
    if(!type){
      progress = progerss1;
      this.updateTopBar(1, progress2.totalNum)
    }
    else{
      progress = progress2;
      this.updateTopBar(1, progress1.totalNum);
    }
  },

  updateTopBar: function(first, nP){
    if(first){
      if(!type){
        var own1 = 0;
        var own2 = nP;
        that.setData({
          own1: own1,
          own2: own2
        })
      }
      else{
        that.setData({
          nwn1: nP,
          nwn2: nP
        })
      }
    }
    var n1 = progress.studiedWords.length + progress.easyWords.length
    var n2 = progress.totalNum
    if(!type){
      that.setData({
        nwn1: n1,
        nwn2: n2
      })
    }
    else{
      that.setData({
        own1: n1,
        own2: n2
      })
    }
    var date = new Date()
    that.setData({
      time: parseInt((date.getTime()/1000 - that.data.timeStart)/60)
    })
  },

  progressForward: function(first) {
    //write back
    if(!first)
    if(!that.data.isEasy){
      if(that.data.isReviewing){
        if(that.data.isUnknown){
          progress.studingWords.push(progress.studingWords.shift())
        }
        else{
          progress.studiedWords.push(progress.studingWords.shift())
        }
      }
      else{
        if(that.data.isUnknown){
          progress.studingWords.push(progress.unstudyWords.shift())
        }
        else{
          progress.studiedWords.push(progress.unstudyWords.shift())
        }
      }
    }
    else{
      if(that.data.isReviewing){
        progress.easyWords.push(progress.studingWords.shift())
      }
      else{
        progress.easyWords.push(progress.unstudyWords.shift())
      }
      that.setData({
        isEasy: false
      })
    }
    //
    var nextWord;
    progress.globalTimeCount += 1;
    if(progress.studingWords.length!=0 && progress.globalTimeCount - progress.studingWords[0].timeCount > 7){
      nextWord = progress.studingWords[0];
      progress.studingWords[0].timeCount = progress.globalTimeCount
      that.setData({
        isReviewing: true,
        wordInfo: nextWord
      })
    }
    else if(progress.unstudyWords.length != 0){
      nextWord = progress.unstudyWords[0];
      progress.unstudyWords[0].timeCount = progress.globalTimeCount
      // progress.unstudyWords.shift();
      that.setData({
        isReviewing: false,
        wordInfo: nextWord
      })
    }
    else if(progress.studingWords.length!=0 ){
      nextWord = progress.studingWords[0];
      progress.studingWords[0].timeCount = progress.globalTimeCount
      that.setData({
        isReviewing: true,
        wordInfo: nextWord
      }) 
    }
    that.setData({
      isUnknown: false
    })
    return;
  },
  
  initWordInfo: function() {
    this.progressForward(1)
    this.initMagicSentence()
  },

  updateWordInfo: function() {
    this.progressForward();
    this.initMagicSentence();
  },

  initMagicSentence: function(){
    var wordInfo = this.data.wordInfo
    wordInfo.magicSentence = utils.parseSentence(this.data.wordInfo.sentence, this.data.wordInfo.name) 
    this.setData({
      wordInfo : wordInfo
    })
  },

  knownHandle: function() {
    if(!that.data.isUnknown){
      that.setData({
        isUnknown: false
      })
    }
    this.changePattern();
  },

  unknownHandle: function(e) {
    if(that.data.isReviewing || that.data.isUnknown){
      that.setData({
        isUnknown: true
      })
      that.changePattern();
    }
    else{
      that.setData({
        isUnknown: true
      })
    }
  },

  easymark: function(e){
    that.setData({
      isEasy: true
    })
    that.changePattern();
  },

  uneasymark: function(e){
    that.setData({
      isEasy: false
    })
  },

  nextHandle: function(e) {
    that.updateWordInfo()
    that.changePattern()
    that.updateTopBar()
  },

  createSummaryList: function(){
    var num = progress.globalTimeCount%7==0?7:progress.globalTimeCount%7;
    var summaryList = []
    var i1 = progress.studingWords.length - 1;
    var i2 = progress.studiedWords.length - 1;
    var i3 = progress.easyWords.length - 1;
    //may error
    while(num--){
      if(i1<0 && i2<0){
        continue
      }
      if(i1 < 0){
        summaryList.unshift(progress.studiedWords[i2]);
        i2--;
      }
      else if(i2 < 0){
        summaryList.unshift(progress.studingWords[i1]);
        i1--;
      }
      else{
        if(progress.studingWords[i1].timeCount > progress.studiedWords[i2].timeCount){
          summaryList.unshift(progress.studingWords[i1]);
          i1--;
        }
        else{
          summaryList.unshift(progress.studiedWords[i2]);
          i2--;
        }
      }
      summaryList[0].mask = that.data.isMask
    }
    that.setData({
      summaryList: summaryList
    })
  },
  
  wordMask: function(e){
    var summaryList = that.data.summaryList
    summaryList[e.currentTarget.dataset.index].mask = !summaryList[e.currentTarget.dataset.index].mask
    that.setData({
      summaryList: summaryList
    })
  },

  maskSwitchChange: function(e){
    var summaryList = that.data.summaryList
    var mask = e.detail.value
    for( let i of summaryList){
      i.mask = mask
    }
    that.setData({
      isMask: mask,
      summaryList: summaryList
    })
  }
})