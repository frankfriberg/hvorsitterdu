<?php
// function resize_image($file, $w, $h, $crop=FALSE) {
//     list($width, $height) = getimagesize($file);
//     $r = $width / $height;
//     if ($crop) {
//         if ($width > $height) {
//             $width = ceil($width-($width*abs($r-$w/$h)));
//         } else {
//             $height = ceil($height-($height*abs($r-$w/$h)));
//         }
//         $newwidth = $w;
//         $newheight = $h;
//     } else {
//         if ($w/$h > $r) {
//             $newwidth = $h*$r;
//             $newheight = $h;
//         } else {
//             $newheight = $w/$r;
//             $newwidth = $w;
//         }
//     }
//     $src = imagecreatefromjpeg($file);
//     $dst = imagecreatetruecolor($newwidth, $newheight);
//     imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
//
//     return $dst;
// }

// Gets the time from form
$currenttime = $_POST["currenttime"];

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

// resize_image( $path . $imagename, 200, 200 );

// Injects the template with data and saves it
// global $htmlname;
// $handle = fopen($path . $htmlname, "w");
// ob_start();
// include_once("template.php");
// $filecontent = ob_get_clean();
// fwrite($handle, $filecontent);
// fclose($handle);

// Returns the name for URL
echo $path . $imagename;
?>
