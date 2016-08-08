$(document).ready(function() {
  var posX = "0";
  var posY = "0"
  var dragging = false;

  $("body").on("touchstart", function() {
    $(".pin").addClass("dragging");
  });

  $("body").on("touchmove", function(e) {
    posX = e.originalEvent.touches[0].pageX;
    posY = e.originalEvent.touches[0].pageY;
  });

  $("body").on("touchend", function() {
    $(".pin").removeClass("dragging");
    $(".pin").css("top", posY-60);
    $(".pin").css("left", posX + -17);
  });

  $(".map").mlens({
    imgSrc: $(".map").attr("data-big"),     // path of the hi-res version of the image
    imgSrc2x: $(".map").attr("data-big2x"), // path of the hi-res @2x version of the image
    lensShape: "circle",                    // shape of the lens (circle/square)
    lensSize: ["100px","100px"],            // lens dimensions (in px or in % with respect to image dimensions) can be different for X and Y dimension
    borderSize: 3,                          // size of the lens border (in px)
    borderColor: "#1DAFFC",                 // color of the lens border (#hex)
    borderRadius: 0,                        // border radius (optional, only if the shape is square)
    zoomLevel: 0.35,                         // zoom level multiplicator (number)
    responsive: true                        // true if mlens has to be responsive (boolean)
  });

  // Check if iOS
  if(window.navigator.userAgent.indexOf('iPhone') != -1 && !(window.navigator.standalone)){
    $(document.body).load('standalone.html');
  // If not iOS
  } else {

  }

  // Check if added to HomeScreen
  if(window.navigator.standalone){

  // If not added to HomeScreen
  } else {

  }
});
