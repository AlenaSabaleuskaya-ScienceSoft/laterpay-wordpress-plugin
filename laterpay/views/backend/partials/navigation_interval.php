<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }

$disabled_class = '';
if ( $laterpay[ 'end_timestamp' ] > $laterpay[ 'interval_end' ] ) :
    $disabled_class = "lp_prevLink--disabled";
endif;
?>
<a href="#" id="lp_js_loadPreviousInterval" class="lp_prevNextLink lp_tooltip <?php echo $disabled_class; ?>" data-tooltip="<?php _e( 'Show previous 8 days', 'laterpay' ); ?>">
    <div class="lp_triangle lp_triangle--left"></div>
</a>

<span id="lp_js_displayedInterval" data-interval-end-timestamp="<?php echo $laterpay[ 'end_timestamp' ]; ?>" data-start-timestamp="<?php echo $laterpay[ 'interval_start' ]; ?>">
    <?php echo date( 'd.m.Y.', $laterpay[ 'interval_end' ] ) . ' &ndash; ' . date( 'd.m.Y', $laterpay[ 'interval_start' ] ); ?>
</span>

<a href="#" id="lp_js_loadNextInterval" class="lp_prevNextLink lp_tooltip lp_nextLink--disabled">
    <div class="lp_triangle lp_triangle--right"></div>
</a>