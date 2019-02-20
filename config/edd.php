<?php
/**
 * EDD configuration file
 *
 * @link italystrap.com
 * @since 4.0.0
 *
 * @package ItalyStrap
 */

namespace ItalyStrap;

$item_name = 'ItalyStrap Child Theme';

return [
	'config'	=> [
		'item_name'      => $item_name, // Name of theme
		'theme_slug'     => strtolower( get_stylesheet() ), // Theme slug
		'version'        => '1.0', // The current version of this theme
		'author'         => wp_get_theme( get_stylesheet() )->display( 'Author' ), // The author of this theme
		'beta'           => false, // Optional, set to true to opt into beta versions
	],
	'strings'	=> [
		'theme-license'             => sprintf(
			__( '%s License', 'italystrap' ),
			$item_name
		),
	],
];
