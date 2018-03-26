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

    <!-- Google Analytics -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-XXXXX-Y', 'auto');
      ga('send', 'pageview');
    </script>
    <!-- End Google Analytics -->
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

      <?php if (!isset($_COOKIE["tutorial"])) { ?>
        <div class="tips">
          <span class="tip" id="tipone">VELG HVOR DU SITTER 👆</span>
          <span class="tip" id="tiptwo">KLIKK HER FOR Å DELE 👉</span>
          <span class="tip" id="tipthree">VELG SÅ HVOR DU VIL SENDE 👌</span>
        </div>
      <?php } ?>

      <div class="links">
        <a class="link telegram" id="telegramlink" onclick="ga('send', 'event', 'ShareLink', 'Telegram');" href="https://t.me/share/url?url=http://www.hvorsitterdu.no/">
          <img src="images/telegram.png" alt="Telegram link. BILDE.">
        </a>
        <a class="link whatsapp" id="whatsapplink" onclick="ga('send', 'event', 'ShareLink', 'WhatsApp');" data-action="share/whatsapp/share" href="whatsapp://send?text=http://www.hvorsitterdu.no/">
          <img src="images/whatsapp.png" alt="WhatsApp link. BILDE.">
        </a>
        <a class="link message" id="messagelink" onclick="ga('send', 'event', 'ShareLink', 'SMS');" href="sms:&body=http://www.hvorsitterdu.no/">
          <img src="images/sms.png" alt="SMS link. BILDE.">
        </a>
        <!-- <a class="link messenger" id="messengerlink" onclick="ga('send', 'event', 'ShareLink', 'Messenger')" href=”fb-messenger://share/?link=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fsharing%2Freference%2Fsend-dialog&app_id=613528195657240”>
          <img src="images/messenger.png" alt="Messenger link. BILDE.">
        </a> -->
      </div>
    </div>
  </body>
</html>
