var getYearMonthDay = function (date) {
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDate()
    return {
        year: year,
        month: month,
        day: day
    }
  }
  var getDate = function (year, month, day) {
    return new Date(year, month, day)
  }
  
  // 处理默认选中当前日期
  var getNowTime = function () {
    var now = getYearMonthDay(new Date())
    return now.year + '-' + now.month +'-' + now.day
  }