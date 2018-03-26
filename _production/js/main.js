$(function() {
  const touchzone = $('#touchzone');
  const seatings = $('#seatings');
  const pin = $('#pin');
  const loupe = $('#loupe');
  const dot = $('#dot');

  // Global variables
  var touchHeight;
  var touchWidth;
  var touchX;
  var touchY;
  var touchPercentageX;
  var touchPercentageY;
  var mapX;
  var mapY;
  var currentTime;

  // Finds the height and width for the map image
  if (($(window).height() - 20) / 9 > ($(window).width() / 5)) {
    touchWidth = $(window).width();
    touchHeight = (touchWidth / 5) * 9;
  } else {
    touchHeight = $(window).height() - 20;
    touchWidth = (touchHeight / 9) * 5;
  }

  // Sets the height of map image and width of touchzone so its correlating
  seatings.height(touchHeight);
  touchzone.width(touchWidth);

  // Checks for cookie and sees if tutorial has been shown before
  if (!getCookie('tutorial')) {
    $('#tipone').toggleClass('active');
  }

  // Starts listener for touch down
  touchzone.on('touchstart', function(event) {
    // Prevent touch drag and select on touch
    event.preventDefault();

    // Checks for cookie and deletes tips if exists
    if (getCookie('tutorial')) {
      $('.tips').remove();
    }

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
  touchzone.on('touchmove', function(event) {
    // Prevent touch drag and select on touch move
    event.preventDefault();

    // Gets position of touch point inside touch container
    touchX = event.changedTouches[0].pageX - touchzone.offset().left;
    touchY = event.changedTouches[0].pageY - touchzone.offset().top;

    // Calculates percentage for responsive positioning
    touchPercentageX = touchX / touchzone.width() * 100;
    touchPercentageY = touchY / touchzone.height() * 100;

    // Calculates the loupe background position to be correlating
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
  touchzone.on('touchend', function(event) {
    // Prevent touch drag and select on tounch end
    event.preventDefault();

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
    $('#tipone, #tiptwo').toggleClass('active');

    // Adds the currenttime to the #time input field
    currentTime = new Date().getTime();
    $('#time').val(currentTime);
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
      windowWidth: '700px',
      onrendered: function(canvas) {
        var png = canvas.toDataURL();
        $('#imagevalue').val(png);
      }
    });
    // ad();
    $('.sharebutton').removeClass('active');
    $('#tiptwo, #tipthree').toggleClass('active');
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
      });
    }
  }

  function createlinks() {
    $('#telegramlink').attr('href', 'https://t.me/share/url?url=http://www.hvorsitterdu.no/temp/' + currentTime + '.png');
    $('#whatsapplink').attr('href', 'whatsapp://send?text=http://www.hvorsitterdu.no/temp/' + currentTime + '.png');
    $('#messagelink').attr('href', 'sms:&body=http://www.hvorsitterdu.no/temp/' + currentTime + '.png');
    // $('#messengerlink').attr('href', 'fb-messenger://share?link=' + encodeURIComponent('http://www.hvorsitterdu.no/temp/') + currentTime + '.png&app_id=' + encodeURIComponent(613528195657240));
    $('.link').addClass('active');
  }

  function createCookie(cname, cvalue, exdays) {
    var date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires' + date.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires;
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // Hijacks the submit function so it doesn't execute default action
  $('form').submit(function(event) {
    capture();
    send();
    createlinks();
    if (!getCookie('tutorial')) {
      createCookie('tutorial', 'true', 60);
    }
    event.preventDefault();
  });
});
