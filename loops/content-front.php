<div class="col-md-3" itemscope itemtype="http://schema.org/Article">
	<?php if ( has_post_thumbnail() ) { ?>
	<a href="<?php the_permalink(); ?>" class="thumbnail" title="<?php the_title_attribute(); ?>">
		<?php
	  		the_post_thumbnail(
	  			'article-thumb-index',
	  			array(
	  				'class' => 'center-block img-responsive',
	  				'alt'   => trim( strip_tags( get_post_meta( get_post_thumbnail_id( $post->ID ), '_wp_attachment_image_alt', true ) ) ),
	  				) );

		?>
	</a>
	<meta  itemprop="image" content="<?php echo italystrap_thumb_url();?>"/>
	<?php } ?>
	<h4 class="item-title"><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute() ?>" rel="bookmark"><?php the_title(); ?></a></h4>
		<footer>
			<ul class="list-inline">
				<li><small><time datetime="<?php the_time('Y-m-d') ?>" itemprop="datePublished"><?php the_time( get_option('date_format') ) ?></time></small></li>
				<li><small><?php _e('Author:', 'ItalyStrap'); ?> <span itemprop="author" itemscope itemtype="http://schema.org/Person"><?php the_author_posts_link(); ?></span></small></li>
			</ul>
		</footer>
		<div itemprop="text"><?php the_excerpt(); ?></div>
		<?php 
			if ( has_post_format('standard') ) {
				/**
				  * For more improvement see http://www.wproots.com/using-wordpress-post-formats-to-their-fullest/
				  * and see http://www.wproots.com/using-wordpress-post-formats-to-their-fullest/#comment-868
				  *
				  */
			}
		?>
</div><!-- / .col-md-3 -->