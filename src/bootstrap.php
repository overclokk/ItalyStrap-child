<?php
/**
 * This is the bootstrap file for your web app.
 *
 * Use this file to add your theme functionality
 *
 * @link italystrap.com
 * @since 2.0.0
 *
 * @package Vendor
 */

/**
 * ==========================================================
 *
 * Autoload child core files.
 *
 * ==========================================================
 */
$autoload_child_files = [
	'/vendor/autoload.php',
];

foreach ( $autoload_child_files as $file ) {
	require __DIR__ . '/..' . $file;
}

add_filter( 'italystrap_theme_updater', function ( array $edd_config ) {

	$edd_config[] = require CHILDPATH . '/config/edd.php';

	return $edd_config;
} );
