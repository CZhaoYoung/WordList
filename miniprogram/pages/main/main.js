// miniprogram/pages/main/main.js
var utils = require("../../utils/utils");
var that;
var isFirst = true;
var progress = {};
var progress1;
var progress2;
var summaryCount = 0;
var timeIntv;
var maxSum;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pattern: 0,
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
    time: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    var date = new Date()
    this.initProgress(); 
    this.initWordInfo();
    timeIntv = setInterval(()=>{
      var timeMinute = that.data.time
      var timeMinuteNow = ((new Date()).getTime() - progress.startTime) / 60000
      timeMinuteNow = parseInt(timeMinuteNow)
      if(timeMinuteNow > timeMinute){
        that.setData({
          time: timeMinuteNow
        })
      }
    }, 1000)
  },

  onUnload: function (){
    this.saveProgress();
    clearInterval(timeIntv)
  },

  saveProgress: function(){
    if (progress.type==0) {
      wx.setStorageSync('newWordsProgress', progress);
    }
    else {
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
      that.data.summaryList.push(that.data.wordInfo);
      progress.localTimeCount += 1;
      if(progress.localTimeCount%maxSum==0||(progress.studingWords.length==0&&progress.unstudyWords.length==0)){
        maxSum = (progress.studingWords.length + progress.unstudyWords.length < 7) ? progress.studingWords.length + progress.unstudyWords.length : 7;
        progress.localTimeCount = 0;
        //this.createSummaryList()
        pattern = 2;
        that.setData({
          summaryList: that.data.summaryList,
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
      if(progress.unstudyWords.length==0&&progress.studingWords.length==0){
        progress.complete=true;
        this.saveProgress();
        if(progress.type==0){
          this.initProgress();
          this.initWordInfo();
        }
        else{
          wx.navigateBack({
            delta: 1
          })
        }
      }
      pattern = 0;
      that.setData({
        pattern: pattern,
        summaryList: []
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
    maxSum = 7;
    progress1 = wx.getStorageSync('newWordsProgress');
    progress2 = wx.getStorageSync('oldWordsProgress');
    if (!(progress1.complete)){
      progress = progress1;
      this.updateTopBar()
    }
    else{
      progress = progress2;
      this.updateTopBar()
    }
  },

  updateTopBar: function(){
    var numNew = progress1.totalNum
    var numOld = progress2.totalNum
    if(progress.type==0){
      that.setData({
        own1: 0,
        own2: numOld,
        nwn1: progress.studiedWords.length + progress.easyWords.length,
        nwn2: numNew,
      })
    }else{
      that.setData({
        own1: progress.studiedWords.length + progress.easyWords.length,
        own2: numOld,
        nwn1: numNew,
        nwn2: numNew,
      })
    }
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
          progress.unstudyWords.push(progress.studingWords.shift())
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
  },

  unknownmark: function(e){
    that.setData({
      isUnknown: true
    })
  }
})