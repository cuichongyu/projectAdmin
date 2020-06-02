

if (!document.getElementsByClassName) {
  document.getElementsByClassName = function (className, element) {
    var children = (element || document).getElementsByTagName('*');
    var elements = [];
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var classNames = child.className.split(' ');
      for (var j = 0; j < classNames.length; j++) {
        if (classNames[j] == className) {
          elements.push(child);
          break;
        }
      }
    }
    return elements;
  }
}
function applicationLoad(e) {
  var BusinessLi = document.getElementsByClassName('BusinessLi')
  var urlList = document.getElementsByClassName('urlList')
  var count
  console.log(typeof BusinessLi)
  for (var i = 0; i < BusinessLi.length; i++) {
    BusinessLi[i].index = i;
    (function (i) {
      count = i
      BusinessLi[i].onmouseover = function () {
        for (var j = 0; j < BusinessLi.length; j++) {
          urlList[j].style.display = 'none'
          BusinessLi[j].style.background = '#fff'
        }
        urlList[this.index].style.display = 'block'
        BusinessLi[this.index].style.background = '#F4F9FF'
      }
      BusinessLi[i].onmouseout = function () {
        for (var j = 0; j < BusinessLi.length; j++) {
          urlList[j].style.display = 'none'
          BusinessLi[j].style.background = '#fff'
        }
      }
    })(i)
  }
}
applicationLoad()

// 左上角开关
var flag = true
var user = document.getElementById('user')
var handleMouse = function (e) {
  if (flag) {
    user.style.display = 'block'
    flag = false
  } else {
    user.style.display = 'none'
    flag = true
  }

}
// 打开录入信息
var handleOpenDialog = function () {
  user.style.display = 'none'
  flag = true
}
// 关闭更多页面
var handleCloseMoreList = function (foo) {
  var morePage = document.getElementById('dialog');
  if (foo) {
    morePage.style.display = 'block'
  } else {
    morePage.style.display = 'none'
  }
}
var handleCloseListInfo = function (flag, index) {
  console.log(index)
  var morePage = document.getElementById('dialogInfo');
  if (flag) {
    morePage.style.display = 'block'
  } else {
    morePage.style.display = 'none'
  }
}
// 获取List 列表
var getListInfo = function () {
  var arrList = document.getElementsByClassName('entryInfo_contents')
  for (var i = 0; i < arrList.length; i++) {
    (function (i) {
      arrList[i].onclick = function () {
        handleCloseListInfo('true', i)
      }
    })(i)
  }
}
// 执行
getListInfo()

// 补零方法
function p(s) {
  return s < 10 ? '0' + s : s;
}
// 获取当前时间
function getDayTime(type) {
  var date = new Date()
  // 初始化年
  var years = date.getFullYear(date)
  // 初始化月
  var month = date.getMonth(date) + 1
  // 初始化日
  var day = date.getDate()
  // 初始化时
  var hours = date.getHours()
  // 初始化分
  var minutes = date.getMinutes()
  // 初始化秒
  var seconds = date.getSeconds()
  if (type === '1') {
    var ValidDayTime = years + "-" + p(month) + "-" + p(day) + p(hours) + ":" + minutes + ":" + seconds
    return ValidDayTime
  } else {
    var a = ['日', '一', '二', '三', '四', '五', '六']
    var week = new Date().getDay()
    var ValidDay = years + "-" + p(month) + "-" + p(day) + '星期' + a[week]
    return ValidDay
  }
}
var setDateTime = function () {
  $('#dataTime').html(getDayTime())
}
setDateTime()
// 日历的当前年月
var nyr = function () {
  var left = getYearMonthDay(new Date());
  console.log(left)
  $('#left').html(left.year + '/' + p(left.month + 1))
}
nyr()
// 日期向左
var time, timeDay
var left = getYearMonthDay(new Date());
var d = getDate(left.year, left.month, left.day)
timeDay = getYearMonthDay(d)
var prevMonth = function () {
  time = d
  d.setMonth(d.getMonth() - 1)
  timeDay = getYearMonthDay(d)
  $('#left').html(timeDay.year + '/' + p(timeDay.month + 1))
  handleDateInit(time, timeDay)
  ClickEveryToday(time)
}
// 日期向右
nextMonth = function () {
  time = d
  d.setMonth(d.getMonth() + 1)
  timeDay = getYearMonthDay(d)
  $('#left').html(timeDay.year + '/' + p(timeDay.month + 1))
  handleDateInit(time, timeDay)
  ClickEveryToday(time)
}
// dataList 
function dataList (time) {
  var ObjDate = getYearMonthDay(time)
  var year = ObjDate.year
  var month = ObjDate.month
  var currentFirstDat = getDate(year, month, 1)
  var week = currentFirstDat.getDay()
  var startDay = currentFirstDat - week * 60 * 60 * 1000 * 24
  var arr = []
  for (var i = 0; i < 42; i++) {
    (function (i) {
      arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
    })(i)
  }
  return arr
}
// 初始化当月日期
var handleDateInit = function (time) {
  var arr = dataList(time)
  var str = ''
  for (var k = 1; k < 7; k++) {
    for (var j = 1; j < 8; j++) {
      if (!isCurrentMonth(arr[(k - 1) * 7 + (j - 1)])) {
        str += '<span class="cell notCurrenrMonth">' + arr[(k - 1) * 7 + (j - 1)].getDate() + '</span>'
      } else {
        if (isToday(arr[(k - 1) * 7 + (j - 1)])) {
          str += '<span class="cell todays">' + arr[(k - 1) * 7 + (j - 1)].getDate() + '</span>'
        } else {
          str += '<span class="cell">' + arr[(k - 1) * 7 + (j - 1)].getDate() + '</span>'
        }
      }
      console.log(arr[(k - 1) * 7 + (j - 1)].getDate())
    }
  }
  // console.log(str)
  console.log(arr[0].getDate())
  $('#calendar-days').html(str)
}
handleDateInit(d, timeDay)
function isCurrentMonth(val) {
  var obj = getYearMonthDay(getDate(timeDay.year, timeDay.month, 1))
  var obj1 = getYearMonthDay(val)
  return obj.year === obj1.year && obj.month === obj1.month
}
function isToday(val) {
  var obj = getYearMonthDay(new Date())
  var obj1 = getYearMonthDay(val)
  console.log(obj.year === obj1.year && obj.month === obj1.month && obj.day === obj1.day)
  return obj.year === obj1.year && obj.month === obj1.month && obj.day === obj1.day
}
// 点击当前的日期天
var num
function ClickEveryToday (d) {
 var cells = document.getElementsByClassName('cell')
  for (var i = 0; i < cells.length; i ++) {
    (function(i){
      var list = dataList(d)
      cells[i].onclick = function () {
        console.log(i)
        if (!num) {
          cells[i].className = ' cell Select'
          num = i
        } else {
          if (isToday(list[i])) {
            cells[num].className = 'cell'
            cells[i].className = ' cell todays'
            num = i
          } else {
            cells[num].className = 'cell'
            cells[i].className = ' cell Select'
            num = i
          }
        }
      }
    })(i)
  }
}
ClickEveryToday(d)