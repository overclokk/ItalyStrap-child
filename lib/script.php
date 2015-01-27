<?php
/**
 * Use this file for loading any scripts and styles
 * If you use child theme copy it in child folder and change $path if necessary
 */
function italystrap_add_style_and_script(){

		/**
		 * @variable $path is path for parent template
		 * @variable $pathchild is for child template
		 */
		global $path;
		global $pathchild;

		/**
		 * Load Bootstrap styles
		 */
		wp_enqueue_style( 'bootstrap',  $path . '/css/bootstrap.min.css', null, null, null);

		/**
		 * Deregister jquery from WP
		 */
		wp_deregister_script('jquery');

		/**
		 * Load jquery from google CDN
		 */
		wp_register_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js', false, null, true);
		
		/**
		 * If CDN is down load from callback
		 */
		add_filter('script_loader_src', 'italystrap_jquery_local_fallback', 10, 2);
		wp_enqueue_script('jquery');

		/**
		 * Load script JS and CSS with conditional tags
		 */
		if ( is_home() || is_front_page() ){

			wp_enqueue_style( 'home',  $pathchild . '/css/home.css', array('bootstrap'), null, null);
			wp_enqueue_script( 'home', $pathchild . '/js/home.min.js', array('jquery'), null,  true );

		}elseif ( is_singular() ) {

			wp_enqueue_style( 'singular',  $pathchild . '/css/singular.css', array('bootstrap'), null, null);
			wp_enqueue_script( 'singular', $pathchild . '/js/singular.min.js', array('jquery'), null,  true );

		}elseif ( is_archive() ) {

			wp_enqueue_style( 'archive',  $pathchild . '/css/archive.css', array('bootstrap'), null, null);
			wp_enqueue_script( 'archive', $pathchild . '/js/archive.min.js', array('jquery'), null,  true );

		}else {

			wp_enqueue_style( 'custom',  $pathchild . '/css/custom.css', array('bootstrap'), null, null);
			wp_enqueue_script( 'custom', $pathchild . '/js/custom.min.js', array('jquery'), null,  true );

		}

		/**
		 * Load comment-reply script
		 */
		if (is_singular() && comments_open() && get_option('thread_comments')) {
    		wp_enqueue_script('comment-reply');
  		}
	}

/**
 * http://wordpress.stackexchange.com/a/12450
 * https://github.com/roots/roots/blob/master/lib/scripts.php
 */
function italystrap_jquery_local_fallback($src, $handle = null){

		global $path;
		static $add_jquery_fallback = false;

		if ($add_jquery_fallback) {
			echo '<script>window.jQuery || document.write(\'<script src="' . $path . '/js/jquery.min.js"><\/script>\')</script>' . "\n";
			$add_jquery_fallback = false;
		}

		if ($handle === 'jquery') {
			$add_jquery_fallback = true;
		}

		return $src;
	}

/**
 * If is not admin load scripts and styles
 */
if ( !is_admin() ){

		add_action( 'wp_enqueue_scripts', 'italystrap_add_style_and_script' ); 
		add_action( 'wp_footer', 'italystrap_jquery_local_fallback' );
	}
?>