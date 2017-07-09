$(function() {
  const touchzone = $('#touchzone');
  const seatings = $('#seatings');
  const pin = $('#pin');
  const loupe = $('#loupe');
  const dot = $('#dot');

  // Global variables
  var touchX;
  var touchY;
  var touchPercentageX;
  var touchPercentageY;
  var mapX;
  var mapY;

  // Sets the height of the map image
  const touchHeight = $(window).height() - 20;
  const touchWidth = (touchHeight / 9) * 5;

  seatings.height(touchHeight);
  touchzone.width(touchWidth);

  // Starts listener for touch down
  touchzone.on('touchstart', function(e) {
    // Prevent touch drag and select on touch
    e.preventDefault();

    // Moves pin out of view and hides it on touch
    pin.css({
      'top': -300,
      'left': touchX
    });
    pin.addClass('hidden');

    // Hides the share button, active links and logo on touch
    $('.sharebutton, .link, .logo').removeClass('active');
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
		mapY = Math.round(touchY / touchzone.height() * 900 /* map src height */ - loupe.height() / 2) *-1;

    // Makes the loupe visible
    loupe.removeClass('hidden');
    dot.removeClass('hidden');

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
    dot.addClass('hidden');

    // Shows the pin
    pin.removeClass('hidden');

    // Shows the share button and logo again
    $('.sharebutton, .logo').addClass('active');
  });

  // Creates the ad and positions it relative to where the pin is
  function ad() {
    var target = $('.ad');
    if(touchPercentageY < 50) { target.addClass('bellow'); }
    target.toggleClass('hidden');
  }

  // Takes a screenshot of the map with the pin and saves it as a png
  function capture() {
    // ad();
    html2canvas(touchzone, {
      scale: 2,
      onrendered: function(canvas) {
        var png = canvas.toDataURL();
        $('input[name="image"]').val(png);
      }
    });
    // ad();
    $('.sharebutton').removeClass('active');
  }

  // Sends the form to createpage.php in realtime
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
        // Puts the link into the correlating anchors
        $('#telegramlink').attr('href', 'https://t.me/share/url?url=http://www.hvorsitterdu.no/beta/' + response);
        $('#whatsapplink').attr('href', 'whatsapp://send?text=http://www.hvorsitterdu.no/beta/' + response);
        $('#messagelink').attr('href', 'sms:&body=http://www.hvorsitterdu.no/beta/' + response);
        $('#copylink').val('http://www.hvorsitterdu.no/beta/' + response);
        $('.link').addClass('active');
      });
    }
  }

  // Hijacks the submit function so it doesn't execute default action
  $('form').submit(function(event) {
    capture();
    send();
    event.preventDefault();
  });
});
