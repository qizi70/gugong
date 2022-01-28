const map = document.querySelector('.map');
const teacher = document.querySelector('.teacher'); // 老师
const html = document.documentElement;
const itemList = document.querySelector('.item-list'); // ul
const count = itemList.children.length; // 图片的数量
const r = itemList.clientWidth / 2; // 半径


// 让旋转元素平均分布
function dispatch(init){
  // 1. 算出每次旋转的弧度
  const pieceRad = 2 * Math.PI / count;
  for(let i = 0; i < count; i++){
    // 得到每一张图片需要旋转的弧度
    const rad = init + i * pieceRad;
    const x = Math.sin(rad) * r;
    const y = -Math.cos(rad) * r;
    itemList.children[i].style.transform = `translate(${x}px, ${y}px)`;
  }
}

dispatch(0);

// 自动旋转
const step = 0.005; // 每次增加的弧度
let rad = 0;
let timer = null;

function start(){
  if(timer){
    return;
  }
  timer = setInterval(() => {
    rad += step;
    if(rad > 2 * Math.PI){
      rad -= 2 * Math.PI;
    }
    dispatch(rad);
  }, 16);
}

start();

function stop(){
  clearInterval(timer);
  timer = null;
}

itemList.addEventListener('mouseenter', stop)
itemList.addEventListener('mouseleave', start)

// 老师的朝向
map.addEventListener('mousemove', function (e) {
  const bodyHalf = html.clientWidth / 2;
  if(e.clientX < bodyHalf){
    teacher.className = 'teacher';
  }else{
    teacher.className = 'teacher left';
  }
})

