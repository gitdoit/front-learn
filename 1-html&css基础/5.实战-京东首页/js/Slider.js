class Slider{
  currentIndex = 1
  constructor({
    sliderId,// 滑动窗口id
    itemSize, // 元素数量
    prevBtnId, // 前一个按钮id
    nextBtnId, // 后一个按钮id
    sliderRadiusId, // 小圆点id
    width = 400, // 元素宽度
    transitionSec = 1, // 过场动画时长，秒
    autoSlider = true, // 是否自动滑动
    periodSec = 2.5, // 滑动周期,
    moveType='ease-in-out'
  } = {}){
    this.slider = document.getElementById(sliderId);
    if(!this.slider){
      throw new Error(`can not find the slider by id ${sliderId}!`);
    }
    this.sliderItems = document.querySelectorAll(`#${sliderId}>ul>li`)
    
    this.itemSize = itemSize;
    this.prevBtnId = prevBtnId;
    this.nextBtnId = nextBtnId;
    this.sliderRadiusId = sliderRadiusId;
    this.windowWidth = width;
    this.isAutoSlider = autoSlider;
    this.transitionSec = transitionSec;
    this.periodSec = periodSec;
    this.moveType = moveType;
    this._limitTimer = null;
    this.init();
  }

  get _currentIndex(){
    return this.currentIndex;
  }
  set _currentIndex(value){
    this.currentIndex = value;
    if(this.sliderRadiusId){
      if(value === 1 || value === this.itemSize + 1){
        this.setClass(this.radiusArray[0]);
      }else if(value === 0 || value == this.itemSize){
        this.setClass(this.radiusArray[this.itemSize - 1]);
      }else{
        this.setClass(this.radiusArray[value - 1]);
      }
    }
  }
  setClass(dom){
    this.radiusArray.forEach(d => {
      d.classList.remove('current-radius');
    })
    dom.classList.add('current-radius');
  }

  // 初始化,绑定事件
  init(){
    // 补充图片
    this.sliderItems = Array.from(this.sliderItems);
    let first = this.sliderItems[0];
    let last = this.sliderItems[this.sliderItems.length - 1];
    // 最后一张放第一
    this.slider.firstElementChild.insertBefore(last.cloneNode(true),first);
    // 第一张放最后
    this.slider.firstElementChild.insertBefore(first.cloneNode(true),null)
    this.slider.style.left = -this.windowWidth + 'px';
    // 前一张按钮
    if(this.prevBtnId){
      let nextBtnDom = document.getElementById(this.prevBtnId);
      nextBtnDom.addEventListener('click',event => {
        this.prevWindow();
        this.autoSlieder();
      })
    }
    // 后一张按钮
    if(this.nextBtnId){
      let nextBtnDom = document.getElementById(this.nextBtnId);
      nextBtnDom.addEventListener('click',event => {
        this.nextWindow();
        this.autoSlieder();
      })
    }
    // 小圆点
    if(this.sliderRadiusId){
      let radius = document.getElementById(this.sliderRadiusId);
      if(radius && radius.hasChildNodes){
        let array = this.radiusArray = Array.from(radius.childNodes).filter(e => e.nodeType === 1);
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          element.addEventListener('click',event => {
            // 2 0 1 2 0
            this.go(index + 1);
            this.autoSlieder();
          })
          element.addEventListener('mouseover',event => {
            this.setClass(event.target)
          })
        }
      }
    }
    // 自动滑动
    this.autoSlieder();
    
  }
  // 自动滑动
  autoSlieder(){
    if(this.isAutoSlider){
      clearInterval(this.intervalId)
      this.intervalId =  setInterval(() => {
        this.nextWindow();
        console.log('一次循环'+Date.now());
      }, this.periodSec * 1000);
    }
  }

  // 下一个窗口
  nextWindow(){
    if(!this.limit()){
      return;
    }
    this._currentIndex++;
    this.slider.style.transition = `all ${this.transitionSec}s ${this.moveType}`;
    this.slider.style.left = (-this._currentIndex * this.windowWidth) + 'px';
    // 如果是最后一张，动画完成后删除动画效果，位置重置到第一张
    if(this._currentIndex === this.itemSize + 1){
      this.resetTimmer = setTimeout(() => {
        this._currentIndex = 1;
        this.slider.style.transition = 'none';
        this.slider.style.left = -this.windowWidth + 'px';
        console.log('切过来了');
      }, this.transitionSec * 1000);
    }
  }
  // 上一个窗口
  prevWindow(){
    if(!this.limit()){ return; }
    this._currentIndex--;
    this.slider.style.transition = `all ${this.transitionSec}s ${this.moveType}`;
    this.slider.style.left = (-this._currentIndex * this.windowWidth) + 'px';
    if(this._currentIndex === 0){
      this.resetTimmer = setTimeout(() => {
        this._currentIndex = this.itemSize;
        this.slider.style.transition = 'none';
        this.slider.style.left = -this.itemSize*this.windowWidth + 'px';
      }, this.transitionSec * 1000);
    }
  }
  // 到指定位置
  go(index) {
    if(!this.limit()){ return; }
    clearTimeout(this.resetTimmer)
    this._currentIndex = index;
    this.slider.style.transition = `all ${this.transitionSec}s ${this.moveType}`;
    this.slider.style.left = (-this._currentIndex * this.windowWidth) + 'px';
  }

  lightRadiu(index){
    if(this.radiusArray){
      let radius = this.radiusArray[index];
    }
  }

  // 限流
  limit() {
    if(this._limitTimer){
      return false;
    }else {
      this._limitTimer = setTimeout(() => {
        this._limitTimer = null;
      },this.transitionSec*1000 - 10);
      return true;
    }
  }
}

export {
  Slider
}
export default Slider