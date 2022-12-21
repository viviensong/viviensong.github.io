setInterval(function () {
  const show = document.querySelector('span[data-show]')
  const next = show.nextElementSibling || document.querySelector('span:first-child')
  const up = document.querySelector('span[data-up]')
  if (up) {
    up.removeAttribute('data-up')
  }
  show.removeAttribute('data-show')
  show.setAttribute('data-up', '')
  next.setAttribute('data-show', '')
}, 2000)


// 词云
window.onload = function() {
   $(document).ready(function() {
   if( ! $('#wordCloud').tagcanvas({
     textColour : "#fff",
     textFont: "SimHei",
     textHeight: 16,
     maxSpeed : 0.02,
     depth :2.8,
     noSelect : false,
     stretchX: 2,
     wheelZoom : false,
     initial : [0.02, 0.02],
     shuffleTags : 1.4,
     centreFunc: text,
     noMouse: false,
     outlineColour:"#cc54d0",
     outlineRadius:6,
      shadow: '#fff',
      shadowBlur: 0.6,

   })) {
     // TagCanvas failed to load
     $('#wordCloudContainer').hide();
   }
   // your other jQuery stuff here...
   function text(c, w, h, cx, cy) {
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.translate('50%', '50%');
      c.globalAlpha = 1;
      c.fillStyle = '#8fd3e8';
      c.textAlign = 'center';
      c.textBaseline = 'alphabetic';
      c.font = '600 48px Khand';
      c.fillText('B站纪念up主', cx, cy+28);
    }
 });
};
