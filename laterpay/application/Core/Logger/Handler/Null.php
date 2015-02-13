<?php

/**
 * Do nothing with log data.
 *
 * Plugin Name: LaterPay
 * Plugin URI: https://laterpay.net/developers/plugins-and-libraries
 * Author URI: https://laterpay.net/
 */
class LaterPay_Core_Logger_Handler_Null extends LaterPay_Core_Logger_Handler_Abstract
{

    /**
     * @param integer $level The minimum logging level at which this handler will be triggered
     */
    public function __construct( $level = LaterPay_Core_Logger::DEBUG ) {
        parent::__construct( $level, false );
    }

    /**
     * To handle record or not to handle
     *
     * @param array record data
     *
     * @return bool
     */
    public function handle( array $record ) {
        if ( $record['level'] < $this->level ) {
            return false;
        }
        return true;
    }

}
