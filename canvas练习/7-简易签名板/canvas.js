window.onload = function() {
  const body = document.querySelector('body')
  const btn = document.querySelector('#btn')
  // 获取canvas对象
  const canvas = document.querySelector('#canvas')
  if (canvas.getContext) {
    // 获取画笔
    const ctx = canvas.getContext('2d');

    // 监听鼠标按下事件
    canvas.onmousedown = function(mousedownEvent) {
      // 获取绘制起点，即鼠标点击到canvas元素左上角的距离
      const startX = mousedownEvent.offsetX;
      const startY = mousedownEvent.offsetY;
      ctx.beginPath();
      // 将画笔移动到起点
      ctx.moveTo(startX, startY);

      // 监听鼠标移动事件
      canvas.onmousemove = function(mousemoveEvent) {
        // 跟随鼠标移动来移动画笔
        ctx.lineTo(mousemoveEvent.offsetX, mousemoveEvent.offsetY);
        // 实时绘制
        ctx.stroke();
      }

      // 监听鼠标弹起事件
      canvas.onmouseup = function() {
        canvas.onmousemove = null
        // 闭合路径，使用之后线条起点和终点会自动连起来
        // ctx.closePath();
        // 鼠标弹起时再绘制
        // ctx.stroke();
      }

      // 监听鼠标移出canvas区域事件
      canvas.onmouseout = function() {
        // 鼠标移出时，停止对mousemove事件的监听，否则在移出时鼠标弹起事件监听失效
        canvas.onmousemove = null
      }
    }
  }

  // 按钮点击事件
  btn.onclick = function() {
    // 方法一
    const canvasData = canvas.toDataURL()
    const img = document.createElement('img')
    img.src=canvasData;
    body.appendChild(img)

    // 方法二
    // canvas.toBlob(function(blob) {
    //   var url = URL.createObjectURL(blob);

    //   const img = document.createElement('img')
    //   img.src=url;
    //   // 图片加载成功后清除url，避免占用内存
    //   img.onload = function() {
    //     URL.revokeObjectURL(url)
    //   };
      
    //   body.appendChild(img)
    // })
  }
}
