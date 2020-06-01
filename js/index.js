

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
var handleMouse  = function (e) {
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