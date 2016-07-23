var draggable = document.getElementById('draggable');

var initialDraggableLocation;
var initialTouch;

document.addEventListener('touchstart', function(event) {
  initialTouch = event.targetTouches[0];
  initialDraggableLocation = draggable.getBoundingClientRect();
});

document.addEventListener('touchmove', function(event) {
  var touch = event.targetTouches[0];

  // Place element where the finger is
  draggable.style.left = initialDraggableLocation.left + (touch.pageX - initialTouch.pageX) + 'px';
  draggable.style.top = initialDraggableLocation.top + (touch.pageY - initialTouch.pageY) + 'px';
  event.preventDefault();
}, false);
