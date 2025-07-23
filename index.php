<?php

use chums\ui\CSSOptions;
use chums\ui\WebUI2;

/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

require_once("autoload.inc.php");

$ui = new WebUI2([
    'requireLogin' => false,
    'bodyClassName' => 'container-fluid',
    'title' => 'Image Repository',
    'contentFile' => 'body.inc.php',
]);
$ui->addCSS('public/styles.css', CSSOptions::parse(['useTimestampVersion' => true]))
    ->addViteManifest()
    ->render();
