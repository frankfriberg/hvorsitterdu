<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hvor sitter du?</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="En web-app for å sende hvor du sitter til dine venner. Enkelt velg hvor du sitter og del med andre via Telegram, WhatsApp eller SMS.">

    <!-- JavaScript import -->
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/html2canvas.js"></script>
    <script type="text/javascript" src="js/js.cookie.js"></script>
    <script type="text/javascript" src="js/main.js"></script>

    <!-- Import font -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:500" rel="stylesheet">

    <!-- Check for mobile browser, if not redirect -->
    <!-- <script type="text/javascript">
      (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
      if (!jQuery.browser.mobile) {
        window.location.replace("/landing");
      }
    </script> -->

    <!-- CSS import -->
    <link rel="stylesheet" href="css/style.css">

    <!-- OGp -->
    <meta property="og:description" content="En web-app for å sende hvor du sitter til dine venner. Enkelt velg hvor du sitter og del med andre via Telegram, WhatsApp eller SMS.">
    <meta property="og:title" content="Hvor sitter du?">
    <meta property="og:url" content="http://www.hvorsitterdu.no">

    <!-- iOS home screen -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="white">
    <link rel="apple-touch-icon" href="images/touch-icon.png">
    <link rel="apple-touch-startup-image" href="images/salen.png">

    <!-- Favicon -->
    <link rel="shortcut icon" href="images/favicons/favicon.ico">
  	<link rel="icon" sizes="16x16 32x32 64x64" href="images/favicons/favicon.ico">
  	<link rel="icon" type="image/png" sizes="196x196" href="images/favicons/favicon-192.png">
  	<link rel="icon" type="image/png" sizes="160x160" href="images/favicons/favicon-160.png">
  	<link rel="icon" type="image/png" sizes="96x96" href="images/favicons/favicon-96.png">
  	<link rel="icon" type="image/png" sizes="64x64" href="images/favicons/favicon-64.png">
  	<link rel="icon" type="image/png" sizes="32x32" href="images/favicons/favicon-32.png">
  	<link rel="icon" type="image/png" sizes="16x16" href="images/favicons/favicon-16.png">
  	<link rel="apple-touch-icon" href="images/favicons/favicon-57.png">
  	<link rel="apple-touch-icon" sizes="114x114" href="images/favicons/favicon-114.png">
  	<link rel="apple-touch-icon" sizes="72x72" href="images/favicons/favicon-72.png">
  	<link rel="apple-touch-icon" sizes="144x144" href="images/favicons/favicon-144.png">
  	<link rel="apple-touch-icon" sizes="60x60" href="images/favicons/favicon-60.png">
  	<link rel="apple-touch-icon" sizes="120x120" href="images/favicons/favicon-120.png">
  	<link rel="apple-touch-icon" sizes="76x76" href="images/favicons/favicon-76.png">
  	<link rel="apple-touch-icon" sizes="152x152" href="/images/faviconsfavicon-152.png">
  	<link rel="apple-touch-icon" sizes="180x180" href="images/favicons/favicon-180.png">

    <!-- Makes sure there is no cache saved -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">

    <!-- Google Analytics tracking -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-53485532-3"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-53485532-3');
    </script>
  </head>

  <body>
    <div class="container">
      <header class="header">
        <img class="logo active" src="images/hvorsitterdu_logo.svg" alt="Hvorsitterdu logo. BILDE.">
      </header>

      <div class="map" id="touchzone">
        <div class="ad hidden">
        </div>
        <div class="loupe hidden" id="loupe" class="hidden">
          <div class="dot hidden" id="dot"></div>
        </div>
        <div class="pin hidden" id="pin"><img src="images/pin.svg" alt=""></div>
        <img class="salen" id="seatings" src="images/salen.png">
      </div>

      <form id="shareform" action="createpage.php" method="POST">
        <input id="imagevalue" type="hidden" name="image" value="">
        <input id="time" type="hidden" name="currenttime" value="">
        <input class="sharebutton" onclick="ga('send', 'event', 'Sharing', 'click')" type="submit" value="">
      </form>

      <div class="tips start" id="tips">
        <span id="tip">VELG HVOR DU SITTER 👆</span>
      </div>

      <div class="links">
        <a class="link telegram" id="telegramlink" onclick="ga('send', 'event', 'ShareLink', 'Telegram')" href="https://t.me/share/url?url=http://www.hvorsitterdu.no/">
          <img src="images/telegram.png" alt="Telegram link. BILDE.">
        </a>
        <a class="link whatsapp" id="whatsapplink" onclick="ga('send', 'event', 'ShareLink', 'WhatsApp')" data-action="share/whatsapp/share" href="whatsapp://send?text=http://www.hvorsitterdu.no/">
          <img src="images/whatsapp.png" alt="WhatsApp link. BILDE.">
        </a>
        <a class="link message" id="messagelink" onclick="ga('send', 'event', 'ShareLink', 'SMS')" href="sms:&body=http://www.hvorsitterdu.no/">
          <img src="images/sms.png" alt="SMS link. BILDE.">
        </a>
        <!-- <a class="link messenger" id="messengerlink" onclick="ga('send', 'event', 'ShareLink', 'Messenger')" href=”fb-messenger://share/?link=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fsharing%2Freference%2Fsend-dialog&app_id=613528195657240”>
          <img src="images/messenger.png" alt="Messenger link. BILDE.">
        </a> -->
      </div>
    </div>
  </body>
</html>
