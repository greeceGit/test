function Slide(container){
var sld={};
var element=container.find(":first");
console.log(element);
var slides=element.find("li");
var width=container.width();
var height=container.height();
element.css({
  width:(slides.length*width)+'px',
  height:height+'px'
});
$.each(slides,function(index){
  var slide=slides.eq(index);
  slide.css({
    width:width+'px',
    height:height+'px'
  });
});
sld.ScrollTo=function(wid,x){
  element.css({
    'transition-timing-function':'linear',
    'transition-duration':x+'ms',
    'transform':'translateX(-'+wid+'px)'

  });
  return this;
};
return sld;
}
