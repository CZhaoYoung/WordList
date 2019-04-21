//app.js
var data = require('utils/data.js')
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.initTask();
    this.globalData = {}
  },

  initTask: function() {
    var lastLoginDate;
    // if(lastLoginDate = wx.getStorageSync('lastLoginDate')){
    //   if(this.isToday(lastLoginDate)){
    //     return;
    //   }
    // }
    this.setNewDate();
    this.setNewTask();
  },

  isToday: function(dateCmp){
    var today = new Date();
    if(today.getFullYear() == dateCmp.year){
      if(today.getMonth() == dateCmp.month){
        if(today.getDay() == dateCmp.day){
          return true;
        }
      }
    }
    return false;
  },

  setNewDate: function () {
    var today = new Date();
    var date = {
      year : today.getFullYear(),
      month : today.getMonth(),
      day : today.getDay()
    }
    wx.setStorageSync('lastLoginDate', date);
  },

  setNewTask: function() {
    var task = data.getFakeTask();
    wx.setStorageSync('task', task);
    this.resetProgress(task);
  },

  resetProgress: function(task) {
    var progress = {
      globalTimeCount: 0,
      complete: false,
      totalNum: 0,
      unstudyWords: [],
      studingWords: [],
      studiedWords: [],
      easyWords: []
    }
    progress.totalNum = task.newWords.length;
    progress.unstudyWords = task.newWords;
    wx.setStorageSync('newWordsProgress', progress);
    progress.unstudyWords = task.oldWords;
    wx.setStorageSync('oldWordsProgress', progress);
  }
})
