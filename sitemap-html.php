<?php
/**
 * Template Name: Sitemap HTML
 */
get_header(); ?>
<!-- Main Content -->
	<section id="sitemap-html">
		<?php do_action( 'content_open' ); ?>
		<div class="container">
			<?php do_action( 'content_container_open' ); ?>
			<div class="row">
				<div class="col-md-8">
					<?php
					do_action( 'content_col_open' );

					if ( class_exists('ItalyStrapBreadcrumbs') ) {

						$defaults = array(
							'home'    =>  '<span class="glyphicon glyphicon-home" aria-hidden="true"></span>'
							);

						new ItalyStrapBreadcrumbs( $defaults );

					}

					get_template_part( 'loops/content', 'sitemaps-html' );

					do_action( 'content_col_closed' ); ?>
				</div><!-- / .col-md-8 -->
				<?php get_sidebar(); ?> 
			</div><!-- / .row -->
			<?php do_action( 'content_container_closed' ); ?>
		</div><!-- / .container -->
		<?php do_action( 'content_closed' ); ?>
	</section><!-- #content -->
   
<?php get_footer(); ?>