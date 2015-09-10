<?php
/*
 * Template Name: Blog
 * This is an example of a custom template file for pages
 * Select this in 
 */
get_header(); ?>
<!-- Main Content -->
	<section id="blog">
		<?php do_action( 'content_open' ); ?>
		<div class="container">
			<?php do_action( 'content_container_open' ); ?>
			<div class="row">
				<div class="col-md-8" itemscope itemtype="http://schema.org/CollectionPage">
					<?php
					do_action( 'content_col_open' );

					if ( class_exists('ItalyStrapBreadcrumbs') ) {

						$defaults = array(
							'home'    =>  '<span class="glyphicon glyphicon-home" aria-hidden="true"></span>'
							);

						new ItalyStrapBreadcrumbs( $defaults );

					}

					$paged = ( get_query_var( 'paged' ) ) ? absint( get_query_var( 'paged' ) ) : 1;
					$blog = new WP_Query(
										array( 
												'post_type'		=>	'post',
												'pagination'        => true,
												'paged'             => $paged
												));
					if ( $blog->have_posts() ) : while ( $blog->have_posts() ) : $blog->the_post();

						get_template_part( 'loops/content', 'post' );

					endwhile;

						bootstrap_pagination( $blog );

					else :

						get_template_part( 'loops/content', 'none');

					endif;
						wp_reset_query();
						wp_reset_postdata();


					do_action( 'content_col_closed' ); ?>
				</div><!-- / .col-md-8 -->
				<?php get_sidebar(); ?> 
			</div><!-- / .row -->
			<?php do_action( 'content_container_closed' ); ?>
		</div><!-- / .container -->
		<?php do_action( 'content_closed' ); ?>
	</section><!-- / #blog -->

<?php get_footer(); ?>