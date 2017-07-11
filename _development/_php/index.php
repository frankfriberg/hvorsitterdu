<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hvorsitterdu.no</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Sponset av Skvid Studios!">

    <!-- JavaScript import -->
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/html2canvas.js"></script>
    <script type="text/javascript" src="js/main.js"></script>

    <!-- CSS import -->
    <link rel="stylesheet" href="css/style.css">

    <!-- OGp -->
    <meta property="og:description" content="Hvor sitter du?">
    <meta property="og:title" content="Jeg sitter her!">
    <meta property="og:url" content="http://hvorsitterdu.no">

    <!-- iOS home screen -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="white">
    <link rel="apple-touch-icon" href="images/touch-icon.png">
    <link rel="apple-touch-startup-image" href="images/salen.png">

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

    <!-- Google Analytics tracking -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-53485532-3', 'auto');
      ga('send', 'pageview');
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
        <input class="sharebutton" onclick="ga('send', 'event', 'Sharing', 'click')" type="submit" value="">
      </form>

      <a class="link telegram" id="telegramlink" onclick="ga('send', 'event', 'Telegram', 'click')" href=""><img src="images/telegram.png" alt="Telegram link. BILDE."></a>
      <a class="link whatsapp" id="whatsapplink" onclick="ga('send', 'event', 'WhatsApp', 'click')" data-action="share/whatsapp/share" href=""><img src="images/whatsapp.png" alt="WhatsApp link. BILDE."></a>
      <a class="link message" id="messagelink" onclick="ga('send', 'event', 'SMS', 'click')" href=""><img src="images/sms.png" alt="SMS link. BILDE."></a>
      <!-- <a class="link copy" id="copylink" onclick="copyToClipboard();" href="#" value=""><img src="images/url.png" alt="URL link. BILDE."></a> -->
    </div>
  </body>
</html>
