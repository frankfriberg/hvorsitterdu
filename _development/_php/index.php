<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hvorsitterdu.no</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="../images/touch-icon.png" type="image/png" />
    <meta name="description" content="Sponset av Skvid Studios!">

    <!-- JavaScript import -->
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/html2canvas.js"></script>
    <script type="text/javascript" src="js/main.js"></script>

    <!-- CSS import -->
    <link rel="stylesheet" href="/css/style.css">

    <!-- OGp -->
    <meta property="og:description" content="Sponset av Skvid Studios!">
    <meta property="og:image" content="<?php echo $image; ?>">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="400">
    <meta property="og:image:height" content="300">
    <meta property="og:title" content="Jeg sitter her!">
    <meta property="og:url" content="http://hvorsitterdu.no">

    <!-- iOS home screen -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="white">
    <link rel="apple-touch-icon" href="img/touch-icon.png">
    <link rel="apple-touch-startup-image" href="img/salen-big.png">

    <script type="text/javascript">

    </script>
  </head>

  <body>
    <img src="images/hvorsitterdu_logo.svg" alt="Hvorsitterdu logo. BILDE.">
    <button type="button" name="button" onclick="capture()">Capture</button>
    <div class="map" id="touchzone">
      <div id="loupe" class="hidden">
        <div id="dot"></div>
      </div>
      <div class="hidden" id="pin"></div>
      <img src="images/salen.svg">
    </div>

    <form id="shareform" action="createpage.php" method="POST">
      <input id="imagevalue" type="hidden" name="image" value="">
      <input type="submit" value="Go">
    </form>

    <a id="telegramlink" href="">Telegram</a>
  </body>
</html>
