<?php
/**
 * ItalyStrap child theme for bootstrapping your web app.
 *
 * Set up the Child Theme for ItalyStrap
 *
 * This theme is meant to provides a new layout for ItalyStrap Framework.
 *
 * Normally you can modify the parent core functionality with actions and filters hooks.
 * Do it in a OOP design patern instead of procedural design pattern.
 *
 * Remember that this file is included before the ItalyStrap theme's file.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * For more information on hooks, actions, and filters,
 * @link https://codex.wordpress.org/Plugin_API
 *
 * @package ItalyStrap
 * @since 1.0.0
 */

namespace Vendor;

if ( ! defined( 'ABSPATH' ) or ! ABSPATH ) {
	die();
}

/**
 * Don't use this file to add your functionality, use the bootstrap.php instead
 * because you can get a better file structure for your web app.
 */
require( STYLESHEETPATH . '/lib/bootstrap.php' );

/* Stop, keep this file clean. */
