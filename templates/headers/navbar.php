<?php
/**
 * The template part for Navbar
 *
 * This file is for display the HTML for Bootstrap Navbar.
 * This file is only for tests purpose.
 *
 * @see ItalyStrap\Navbar\Navbar in core/class-navbar.php
 *
 * @link www.italystrap.com
 * @since 4.0.0
 *
 * @package ItalyStrap
 *
 * @docs
 * Per visualizzare correttamente i due pulsanti uguali "Dona ora"
 * aggiungere 'hidden-xl-up' come classe al contenitore ul del menu
 * aggiunto tramite codice e 'hidden-lg-down' alla voce di menu nell'editor dei menu
 */

namespace ItalyStrap\Headers;

/**
 * EXPERIMENTAL
 */
use ItalyStrap\Components\Navigations\Navbar;
use ItalyStrap\Config\ConfigInterface;
use function ItalyStrap\HTML\close_tag_e;
use function ItalyStrap\HTML\open_tag_e;

$navbar_config = [
	'navbar_container' => [
		'tag' => '',
		'attr' => [
			'class' => 'navbar navbar-expand-lg navbar-dark text-inverse bg-primary',
		],
	],
	'toggle_button' => [
		'tag' => '',
		'attr' => [
			'class'         => 'navbar-toggler',
			'aria-controls' => 'navbarNav',
			'aria-expanded' => 'false',
			'aria-label'    => 'Toggle navigation',
		],
	],
];

/** @var ConfigInterface $mods */
$mods = $this->get('mods');

/** @var Navbar $navbar */
$navbar = $this->get('navbar');

add_filter( 'italystrap_navbar_container_attr', function ( array $args ) {

//    $args['class'] = 'container-fluid';
	$args['class'] = 'navbar navbar-expand-lg navbar-dark text-inverse bg-primary';
    return $args;
} );

add_filter( 'italystrap_toggle_button_attr', function ( array $attr, $context, $id ) {

    $new_attr = [
        'class'         => 'navbar-toggler',
        'aria-controls' => 'navbarNav',
        'aria-expanded' => 'false',
        'aria-label'    => 'Toggle navigation',
    ];

    return array_merge( $attr, $new_attr );

}, 10, 3 );

add_filter( 'italystrap_toggle_button_content_attr', function ( array $attr, $context, $id ) {

    $new_attr = [
        'class'         => 'navbar-toggler-icon',
    ];

    return array_merge( $attr, $new_attr );

}, 10, 3 );

add_filter( 'italystrap_toggle_button_content_child', function ( $content ) {
    return '';
}, 10, 3 );

add_filter( 'italystrap_pre_navbar_header', '__return_true' );

add_filter( 'italystrap_icon_bar', function ( $content ) {
    return '';
} );

$this->navbar->output();

open_tag_e( 'navbar-wrapper', 'div', [
	'id'	=> 'main-navbar-container-' . $this->get('navbar_id'),
	'class' => sprintf(
		'navbar-wrapper %s mt-3',
		$mods->get('navbar.nav_width')
	),
] );

    open_tag_e( 'navbar_container', 'nav', [
		'class' => sprintf(
			'navbar %s %s',
			$mods->get('navbar.type'),
			$mods->get('navbar.position')
		),
		'itemscope' => true,
		'itemtype' => 'https://schema.org/SiteNavigationElement',
	] );

        open_tag_e( 'last_container', 'div', [
			'id' => 'menus-container-' . $this->get('number'),
			'class' => $mods->get('navbar.menus_width'),
		] );




            open_tag_e( 'collapsable_menu', 'div', [
				'id' => $this->get('navbar_id'),
				'class' => 'navbar-collapse collapse',
			] );

                echo $navbar->get_navbar_brand(
                        ['class' => 'navbar-brand hidden-xs-down']
                );

                /**
                 * Arguments for wp_nav_menu()
                 *
                 * @link https://developer.wordpress.org/reference/functions/wp_nav_menu/
                 * @var array
                 */
                $args = array(
                    'menu_class' => 'navbar-nav',
                    'theme_location' => 'main-menu',
                );

                echo $this->navbar->get_wp_nav_menu( $args );

                if ( has_nav_menu( 'secondary-menu' ) ) :

                    /**
                     * Arguments for wp_nav_menu()
                     *
                     * @link https://developer.wordpress.org/reference/functions/wp_nav_menu/
                     * @var array
                     */
                    $args = array(
                        'menu_class'        => 'navbar-nav navbar-right',
                        'menu_id'           => 'secondary-menu',
                        'theme_location'    => 'secondary-menu',
                    );

                    echo $this->navbar->get_wp_nav_menu( $args );

                endif;

            close_tag_e('collapsable_menu');



        close_tag_e('last_container');

    close_tag_e('navbar_container');

close_tag_e('navbar-wrapper');

?>
<nav class="navbar navbar-expand-lg navbar-light bg-light" itemscope
     itemtype="https://schema.org/SiteNavigationElement">
    <div class="container">
        <?php echo $this->navbar->get_navbar_brand( array('class' => 'navbar-brand hidden-xs-down') ); ?>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">&nbsp;</span>
        </button>
        <div id="navbar-collapse" class="collapse navbar-collapse">

            <?php
            /**
             * Arguments for wp_nav_menu()
             *
             * @link https://developer.wordpress.org/reference/functions/wp_nav_menu/
             * @var array
             */
            $args = array(
                'menu_class' => 'navbar-nav',
                'theme_location' => 'main-menu',
            );

            echo $this->navbar->get_wp_nav_menu( $args );

            if ( has_nav_menu( 'secondary-menu' ) ) :

                /**
                 * Arguments for wp_nav_menu()
                 *
                 * @link https://developer.wordpress.org/reference/functions/wp_nav_menu/
                 * @var array
                 */
                $args = array(
                    'menu_class'        => 'navbar-nav navbar-right',
                    'menu_id'           => 'secondary-menu',
                    'theme_location'    => 'secondary-menu',
                );

                echo $this->navbar->get_wp_nav_menu( $args );

            endif;
            ?>
        </div>
    </div>
</nav>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary" itemscope
     itemtype="https://schema.org/SiteNavigationElement">
<!--<nav class="navbar navbar-default">-->
    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header float-left">
<!--            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">-->
<!--                <span class="sr-only">Toggle navigation</span>-->
<!--                <span class="icon-bar"></span>-->
<!--                <span class="icon-bar"></span>-->
<!--                <span class="icon-bar"></span>-->
<!--            </button>-->
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon">&nbsp;</span>
            </button>
            <a class="navbar-brand" href="#">Brand</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="nav-item active"><a class="nav-link" href="#">Link <span class="sr-only">(current)</span></a></li>
                <li  class="nav-item"><a class="nav-link" href="#">Link</a></li>
                <li class="dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li  class="nav-item"><a class="nav-link" href="#">Action</a></li>
                        <li  class="nav-item"><a class="nav-link" href="#">Another action</a></li>
                        <li  class="nav-item"><a class="nav-link" href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li  class="nav-item"><a class="nav-link" href="#">Separated link</a></li>
                        <li role="separator" class="divider"></li>
                        <li  class="nav-item"><a class="nav-link" href="#">One more separated link</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li  class="nav-item"><a class="nav-link" href="#">Link</a></li>
                <li class="dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li  class="nav-item"><a class="nav-link" href="#">Action</a></li>
                        <li  class="nav-item"><a class="nav-link" href="#">Another action</a></li>
                        <li  class="nav-item"><a class="nav-link" href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li  class="nav-item"><a class="nav-link" href="#">Separated link</a></li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

