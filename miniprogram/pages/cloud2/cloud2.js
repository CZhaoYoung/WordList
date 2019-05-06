var angleX = Math.PI / 200
var angleY = Math.PI / 200
var angleZ = Math.PI / 200
const app = getApp()
const size = 550

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.innit()
  },
  innit() {
    var tagEle = [
      {
        title: '被子',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '咖啡機',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '飛機',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '电脑',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '手机',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '键盘',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '奶飞机',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '桌子',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '板凳',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '杯子',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '被子',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '咖啡機',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '飛機',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '电脑',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '手机',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '键盘',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '奶飞机',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '桌子',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '板凳',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: '杯子',
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      }
    ]
    var words = tagEle
    for (var i = 1; i < words.length; i++) {
      words[i].x = size * Math.random() - (size / 2)
      words[i].y = size * Math.random() - (size / 2)
      words[i].z = size * Math.random() - (size / 2)
      words[i].s = (words[i].z + size) / size
    }
    //动画
    setInterval(() => {
      var cosx = Math.cos(angleX)
      var sinx = Math.sin(angleX)
      var cosy = Math.cos(angleY)
      var siny = Math.sin(angleY)
      var cosz = Math.cos(angleZ)
      var sinz = Math.sin(angleZ)

      for (var i = 1; i < tagEle.length; i++) {
        var y1 = words[i].y * cosx - words[i].z * sinx
        var z1 = words[i].z * cosx + words[i].y * sinx
        words[i].y = y1
        words[i].z = z1

        var x2 = words[i].x * cosy - words[i].z * siny
        var z2 = words[i].z * cosy + words[i].x * siny
        words[i].x = x2
        words[i].z = z2

        var x3 = words[i].x * cosz - words[i].y * sinz
        var y3 = words[i].y * cosz + words[i].x * sinz
        words[i].x = x3
        words[i].y = y3
        words[i].s = (words[i].z + size) / size
        this.setData({
          tagEle: words
        })
      }
    }, 100)
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