<?php
/**
 * @package WPSEO\Admin
 * @since      1.5.0
 */

if ( ! defined( 'WPSEO_VERSION' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}

$extensions = array(
	'seo-premium'     => (object) array(
		'url'       => 'https://yoast.com/wordpress/plugins/seo-premium/',
		'title'     => 'Yoast SEO Premium',
		/* translators: %1$s expands to Yoast SEO */
		'desc'      => sprintf( __( 'The premium version of %1$s with more features & support.', 'wordpress-seo' ), 'Yoast SEO' ),
		'installed' => false,
		'image'     => plugins_url( 'images/extensions-premium-ribbon.png', WPSEO_FILE ),
		'benefits'  => array(),
	),
	'video-seo'       => (object) array(
		'url'       => 'https://yoast.com/wordpress/plugins/video-seo/',
		'title'     => 'Video SEO',
		'desc'      => __( 'Optimize your videos to show them off in search results and get more clicks!', 'wordpress-seo' ),
		'installed' => false,
		'image'     => plugins_url( 'images/extensions-video.png', WPSEO_FILE ),
		'benefits'  => array(
			__( 'Show your videos in Google Videos', 'wordpress-seo' ),
			__( 'Enhance the experience of sharing posts with videos', 'wordpress-seo' ),
			__( 'Make videos responsive through enabling fitvids.js', 'wordpress-seo' ),
		),
	),
	'news-seo'        => (object) array(
		'url'       => 'https://yoast.com/wordpress/plugins/news-seo/',
		'title'     => 'News SEO',
		'desc'      => __( 'Are you in Google News? Increase your traffic from Google News by optimizing for it!', 'wordpress-seo' ),
		'installed' => false,
		'image'     => plugins_url( 'images/extensions-news.png', WPSEO_FILE ),
		'benefits'  => array(
			__( 'Optimize your site for Google News', 'wordpress-seo' ),
			__( 'Immediately pings Google on the publication of a new post', 'wordpress-seo' ),
			__( 'Creates XML News Sitemaps', 'wordpress-seo' ),
		),
	),
	'local-seo'       => (object) array(
		'url'       => 'https://yoast.com/wordpress/plugins/local-seo/',
		'title'     => 'Local SEO',
		'desc'      => __( 'Rank better locally and in Google Maps, without breaking a sweat!', 'wordpress-seo' ),
		'installed' => false,
		'image'     => plugins_url( 'images/extensions-local.png', WPSEO_FILE ),
		'benefits'  => array(
			__( 'Get found by potential clients', 'wordpress-seo' ),
			__( 'Easily insert Google Maps, a store locator, opening hours and more', 'wordpress-seo' ),
			__( 'Improve the usability of your contact page', 'wordpress-seo' ),
		),
	),
	'woocommerce-seo' => (object) array(
		'url'       => 'https://yoast.com/wordpress/plugins/yoast-woocommerce-seo/',
		'title'     => 'Yoast WooCommerce SEO',
		/* translators: %1$s expands to Yoast SEO */
		'desc'      => sprintf( __( 'Seamlessly integrate WooCommerce with %1$s and get extra features!', 'wordpress-seo' ), 'Yoast SEO' ),
		'installed' => false,
		'image'     => plugins_url( 'images/extensions-woo.png', WPSEO_FILE ),
		'benefits' => array(
			/* %1$s expands to Pinterest */
			sprintf( __( 'Improve sharing on Pinterest', 'wordpress-seo' ) ),

			/* %1$s expands to Yoast, %2$s expands to WooCommerce */
			sprintf( __( 'Use %1$s breadcrumbs instead of %2$s ones', 'wordpress-seo' ), 'Yoast', 'WooCommerce' ),

			/* %1$s expands to Yoast SEO, %2$s expands to WooCommerce */
			sprintf( __( 'A seamless integration between %1$s and %2$s', 'wordpress-seo' ), 'Yoast SEO', 'WooCommerce' ),
		),
	),
);

if ( class_exists( 'WPSEO_Premium' ) ) {
	$extensions['seo-premium']->installed = true;
}
if ( class_exists( 'wpseo_Video_Sitemap' ) ) {
	$extensions['video-seo']->installed = true;
}
if ( class_exists( 'WPSEO_News' ) ) {
	$extensions['news-seo']->installed = true;
}
if ( defined( 'WPSEO_LOCAL_VERSION' ) ) {
	$extensions['local-seo']->installed = true;
}
if ( ! class_exists( 'Woocommerce' ) ) {
	unset( $extensions['woocommerce-seo'] );
}
elseif ( class_exists( 'Yoast_WooCommerce_SEO' ) ) {
	$extensions['woocommerce-seo']->installed = true;
}

$utm = '#utm_source=wordpress-seo-config&utm_medium=banner&utm_campaign=extension-page-banners';

?>

<div class="wrap wpseo_table_page yoast">

	<h1 id="wpseo-title" class="yoast-h1"><?php
		/* translators: %1$s expands to Yoast SEO */
		printf( __( '%1$s Extensions', 'wordpress-seo' ), 'Yoast SEO' );
		?></h1>

	<h2 class="nav-tab-wrapper" id="wpseo-tabs">
		<a class="nav-tab" id="extensions-tab" href="#top#extensions"><?php _e( 'Extensions', 'wordpress-seo' ); ?></a>
		<a class="nav-tab" id="licenses-tab" href="#top#licenses"><?php _e( 'Licenses', 'wordpress-seo' ); ?></a>
	</h2>

	<div class="tabwrapper">
		<div id="extensions" class="wpseotab">
			<section class="yoast-seo-premium-extension">
				<?php
					$extension = $extensions['seo-premium'];
					$url = $extension->url . $utm;

				?>
				<h2><?php
					/* translators: %1$s expands to Yoast SEO Premium */
					printf( __( 'Keep your site in top SEO shape with %1$s', 'wordpress-seo' ), '<span class="yoast-heading-highlight">' . $extension->title . '</span>' );
					?></h2>

				<img width="342" height="184" class="yoast-seo-premium-banner" alt="" src="<?php echo esc_attr( $extension->image ); ?>" />

				<ul class="yoast-seo-premium-benefits yoast-list--usp">
					<li class="yoast-seo-premium-benefits__item">
						<span class="yoast-seo-premium-benefits__title"><?php _e( 'Redirect manager', 'wordpress-seo' ); ?></span>
						<span class="yoast-seo-premium-benefits__description"><?php _e( 'create and manager redirects from within your WordPress install', 'wordpress-seo' ); ?></span>
					</li>
					<li class="yoast-seo-premium-benefits__item">
						<span class="yoast-seo-premium-benefits__title"><?php _e( 'Multiple focus keywords', 'wordpress-seo' ); ?></span>
						<span class="yoast-seo-premium-benefits__description"><?php _e( 'optimize a single post for up to 5 keywords', 'wordpress-seo' ); ?></span>
					</li>
					<li class="yoast-seo-premium-benefits__item">
						<span class="yoast-seo-premium-benefits__title"><?php _e( 'Social preview', 'wordpress-seo' ); ?></span>
						<span class="yoast-seo-premium-benefits__description"><?php _e( 'check what your Facebook or Twitter post will look like', 'wordpress-seo' ); ?></span>
					</li>
					<li class="yoast-seo-premium-benefits__item">
						<span class="yoast-seo-premium-benefits__title"><?php _e( 'Premium support', 'wordpress-seo' ); ?></span>
						<span class="yoast-seo-premium-benefits__description"><?php _e( 'gives you access to our support team', 'wordpress-seo' ); ?></span>
					</li>
				</ul>

				<p><?php _e( 'Take your optimization to the next level! and get your own license today!', 'wordpress-seo' ); ?></p>

				<a href="<?php echo esc_url( $url ); ?>" class="yoast-button default yoast-button--noarrow yoast-button-go-to"><?php
					/* translators: $1$s expands to Yoast SEO Premium */
					printf( __( 'Buy %1$s', 'wordpress-seo' ), $extension->title );
					?></a>

				<a href="<?php echo esc_url( $url ); ?>" class="yoast-link--more-info"><?php
					/* translators: %1$s expands to Yoast SEO Premium */
					printf( __( 'More about %1$s', 'wordpress-seo' ), $extension->title );
					?></a>

				<p><small class="yoast-money-back-guarantee"><?php _e( 'Stay happy with our 30 day money back guarantee', 'wordpress-seo' ); ?></small></p>
			</section>

			<hr class="yoast-hr" />

			<section class="yoast-promo-extensions">
				<h2><?php
					/* %1$s expands to Yoast SEO */
					$yoast_seo_extensions = sprintf( __( '%1$s extensions', 'wordpress-seo' ), 'Yoast SEO' );

					$yoast_seo_extensions = '<span class="yoast-heading-highlight">' . $yoast_seo_extensions . '</span>';

					/* translators: %1$s expands to Yoast SEO extensions */
					printf( __( '%1$s to optimize your site even further', 'wordpress-seo' ), $yoast_seo_extensions );
					?></h2>

				<?php unset( $extensions['seo-premium'] ); ?>

				<?php foreach ( $extensions as $id => $extension ) : ?>
					<?php $utm = '#utm_source=wordpress-seo-config&utm_medium=banner&utm_campaign=extension-page-banners'; ?>
					<?php $url = $extension->url . $utm; ?>

					<section class="yoast-promoblock secondary yoast-promo-extension">
						<img alt="" width="280" height="147" src="<?php echo esc_attr( $extension->image ); ?>" />
						<h3><?php echo esc_html( $extension->title ); ?></h3>

						<ul class="yoast-list--usp">
							<?php foreach ( $extension->benefits as $benefit ) : ?>
								<li><?php echo esc_html( $benefit ); ?></li>
							<?php endforeach; ?>
						</ul>

						<a target="_blank" class="yoast-button default yoast-button--noarrow academy--secondary yoast-button-go-to" href="<?php echo esc_url( $url ); ?>">
							<?php /* translators: %1$s expands to the product name */ ?>
							<?php printf( __( 'Buy %1$s', 'wordpress-seo' ), $extension->title ); ?>
						</a>

						<a target="_blank" class="yoast-link--more-info" href="<?php echo esc_url( $url ); ?>">
							<?php /* translators: %1$s expands to the product name */ ?>
							<?php printf( __( 'More about %1$s', 'wordpress-seo' ), $extension->title ); ?>
						</a>
					</section>
				<?php endforeach; ?>
			</section>
		</div>

		<div id="licenses" class="wpseotab">
			<?php

			/**
			 * Display license page
			 */
			settings_errors();
			if ( ! has_action( 'wpseo_licenses_forms' ) ) {
				echo '<div class="msg"><p>', __( 'This is where you would enter the license keys for one of our premium plugins, should you activate one.', 'wordpress-seo' ), '</p></div>';
			}
			else {
				do_action( 'wpseo_licenses_forms' );
			}
			?>
		</div>
	</div>

</div>
