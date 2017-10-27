<?php
function create_image($url) {
  // Gets the time in milliseconds
  $timeparts = explode(" ",microtime());
  $currenttime = bcadd(($timeparts[0]*1000),bcmul($timeparts[1],1000));

  // Gathers the time with current date and puts it into the file name
  $path = "temp/";
  $htmlname = $currenttime . ".html";
  $imagename =  $currenttime . ".png";

  // Saves the captured image
  $image = $_POST["image"];
  $ifp = fopen( $path . $imagename, 'wb' );
  $data = explode( ',', $image );
  fwrite( $ifp, base64_decode( $data[ 1 ] ) );
  fclose( $ifp );

  // Returns the name for URL
  echo $path . $imagename;
}

// Injects the template with data and saves it
// global $htmlname;
// $handle = fopen($path . $htmlname, "w");
// ob_start();
// include_once("template.php");
// $filecontent = ob_get_clean();
// fwrite($handle, $filecontent);
// fclose($handle);


?>
