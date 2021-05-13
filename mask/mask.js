const supernav_container = document.getElementsByClassName('supernav_container')
const supernav_container_children = supernav_container[0].children
const supernav_content = document.getElementsByClassName('supernav_content')
supernav_container_children[0].onmouseover = function () {
  console.log('鼠标移入11')
  supernav_content[0].style.opacity = 1
  supernav_content[0].style.pointerEvents = 'auto'
}
supernav_container_children[0].onmouseout = function () {
  console.log('鼠标移出11')
  supernav_content[0].style.opacity = 0
  supernav_content[0].style.pointerEvents = 'none'
}
supernav_content[0].onmouseover = function () {
  console.log('鼠标移入22')
  supernav_content[0].style.opacity = 1
  supernav_content[0].style.pointerEvents = 'auto'
}
supernav_content[0].onmouseout = function () {
  console.log('鼠标移出22')
  supernav_content[0].style.opacity = 0
  supernav_content[0].style.pointerEvents = 'none'
}
// document.getElementById('red-background').onclick = function () {
//   console.log('red-background被点击了')
// }