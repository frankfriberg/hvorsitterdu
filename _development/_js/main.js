$(function() {
  var touchzone = $('#touchzone');
  var pin = $('#pin');
  var loupe = $('#loupe');
  var touchX;
  var touchY;
  var touchPercentageX;
  var touchPercentageY;
  var mapX;
  var mapY;

  // Starts listener for touch down
  touchzone.on('touchstart', function(e) {
    // Prevent touch drag and select on touch start
    e.preventDefault();

    // Moves pin out of view and hides it when selecting point
    pin.css({
      'top': -300,
      'left': touchX
    });
    pin.addClass('hidden');
  });

  // Starts listener for touch move
  touchzone.on('touchmove', function(e) {
    // Prevent touch drag and select on touch move
    e.preventDefault();

    // Gets position of touch point inside touch container
    touchX = e.changedTouches[0].pageX - touchzone.offset().left;
    touchY = e.changedTouches[0].pageY - touchzone.offset().top;

    // Calculates percentage for responsive positioning
    touchPercentageX = touchX / touchzone.width() * 100;
    touchPercentageY = touchY / touchzone.height() * 100;

    // Calculates the loupe background position to be correlationg
    // to the position of the touch point
    mapX = Math.round(touchX / touchzone.width() * 500 /* map src width */ - loupe.width() / 2) *-1;
		mapY = Math.round(touchY / touchzone.height() * 918 /* map src height */ - loupe.height() / 2) *-1;

    // Makes the loupe visible
    loupe.removeClass('hidden');

    // Sets the position of the loupe
    loupe.css({
      'top': touchPercentageY + '%',
      'left': touchPercentageX + '%',
      'background-position-x': mapX + 'px',
      'background-position-y': mapY + 'px'
    });
  });

  // Starts listener for touch end
  touchzone.on('touchend', function(e) {
    // Prevent touch drag and select on tounch end
    e.preventDefault();

    // Limits pin position to inside touch container
    if (touchY < 0) {
      touchY = 0;
    } else if (touchY > touchzone.height()) {
      touchY = touchzone.height();
    }

    // Sets the position of the pin
    pin.css({
      'top': touchPercentageY + '%',
      'left': touchPercentageX + '%'
    });

    // Hides the loupe
    loupe.addClass('hidden');

    // Shows the pin
    pin.removeClass('hidden');
  });

  function capture() {
    html2canvas(touchzone, {
      onrendered: function(canvas) {
        var png = canvas.toDataURL();
        $('input[name="image"]').val(png);
      }
    });
  }

  function send() {
    var formData = $('form').serialize();
    if ($('input[name="image"]').val() == "") {
      return setTimeout(send, 100);
    } else {
      $.ajax({
        type : 'POST',
        url : 'createpage.php',
        data : formData,
        dataType : "text"
      }).done(function(response) {
        $('#telegramlink').attr('href', 'https://t.me/share/url?url=http://www.hvorsitterdu.no/' + response)
      });
    }
  }

  $('form').submit(function(event) {
    capture();
    send();
    event.preventDefault();
  });
});
