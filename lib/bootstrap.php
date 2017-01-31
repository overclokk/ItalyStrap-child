<?php
/**
 * This is the bootstrap file for your web app.
 *
 * Use this file to add your theme functionality
 *
 * @link www.italystrap.com
 * @since 2.0.0
 *
 * @package Vendor
 */

/**
 * Load some static files before parent like the php autoload only if you need them are loaded first.
 *
 * @var array
 */
// $autoload_child_files = array(
// 	'/vendor/autoload.php', // Use this line only with composer php.
// 	'lib/_init-before-setup-theme.php',
// );

// foreach ( $autoload_child_files as $file ) {
// 	require( STYLESHEETPATH . $file );
// }

/**
 * Much better to append your file after the parent is loaded.
 * You can do that by adding the path of the files to the above array.
 */
// add_filter( 'italystrap_require_theme_files_path', function ( array $arg ) {
// 	return array_merge(
// 		$arg,
// 		array(
// 			STYLESHEETPATH . 'lib/_init-after-setup-theme.php',
// 		)
// 	);
// } );
