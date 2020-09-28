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
//	$edd_config[] = \ItalyStrap\Config\get_config_file_content('edd');

	return $edd_config;
} );

add_filter( 'italystrap_config_enqueue_style', function ( array $styles ) {
	$styles[] = [
		'handle'	=> 'font-awesome',
		'file'		=> 'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
		'version'	=> '5.7.2',
	];
	return $styles;
} );
