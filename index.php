<?php


/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

require_once ("autoload.inc.php");
require_once 'access.inc.php';

$bodyPath = "apps/image-store";
$title = "Image Repository";
$description = "";

$ui = new WebUI($bodyPath, $title, $description, false, 5);
$ui->version = "2020.01.02";
$ui->bodyClassName = 'container-fluid';
$ui->AddCSS("public/styles.css");
$ui->addManifest('public/js/manifest.json');
$ui->Send();
