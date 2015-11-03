<?php
/**
 * ItalyStrap theme child functions and definitions
 *
 * Set up the Child Theme for ItalyStrap
 * This theme provides a new layout for ùItalyStrap with some helper functions,
 * which are used in the theme as custom template tags.
 * Others are attached to action and filter hooks in WordPress to change core functionality.
 *
 * When using this child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in this file.
 * This file is included before the ItalyStrap theme's file,
 * so the child theme functions would be used.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * @link https://codex.wordpress.org/Plugin_API
 *
 * @package ItalyStrap\Child-Theme
 * @since 1.0.0
 */

/**
 * Define child path directory if is active child theme
 */
define( 'ITALYSTRAP_CHILD_PATH', get_stylesheet_directory_uri() );
$pathchild = ITALYSTRAP_CHILD_PATH;


/**
 * Custom Post Type.
 * @todo da spostare in un plugin
 */
require locate_template( '/lib/custom-post-type.php' );

/**
 * Custom Meta Box.
 * @todo Implementare CMB2
 */
require locate_template( '/lib/custom_meta_box.php' );
