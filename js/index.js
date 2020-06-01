

if (!document.getElementsByClassName) {                                                 //如果浏览器不支持document.getElementsByClassName
  document.getElementsByClassName = function (className, element) {                     //我们先将要写的方法封装成一个函数
    var children = (element || document).getElementsByTagName('*');                   //获取html中所有的DOM节点 
    var elements = [];                                                                //用一个空数组存放要获取的class类名
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var classNames = child.className.split(' ');                                    //将所有的class节点保存在一个数组之中
      for (var j = 0; j < classNames.length; j++) {                                 //遍历循环，将满足要求的class存入elements空数组中
        if (classNames[j] == className) {
          elements.push(child);
          break;
        }
      }
    }
    return elements;                                                                    //返回新的数组
  }
}
function applicationLoad() {
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
       }
       urlList[this.index].style.display = 'block'
      }
      BusinessLi[i].onmouseout = function () {
        for (var j = 0; j < BusinessLi.length; j++) {
          urlList[j].style.display = 'none'
         }
      }
    })(i)
  }
}
applicationLoad()