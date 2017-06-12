<?php
// Stores the data from the hidden form
$image = $_POST["image"];

// Gets the time in milliseconds
$timeparts = explode(" ",microtime());
$currenttime = bcadd(($timeparts[0]*1000),bcmul($timeparts[1],1000));

// Gathers the time with current date and puts it into the file name
$filename = "temp/" . date("ymd" . $currenttime) . ".php";

global $filename;
$handle = fopen($filename, "w") or die("Cannot open file: ".$filename);
ob_start();
include_once("template.php");
$filecontent = ob_get_clean();
fwrite($handle, $filecontent);
fclose($handle);

echo $filename;
?>
