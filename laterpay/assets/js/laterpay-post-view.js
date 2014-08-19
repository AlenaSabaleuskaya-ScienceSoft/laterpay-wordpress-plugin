(function($) { $(document).ready(function() {

        // encapsulate all LaterPay Javascript in function laterPayViewPost
        function laterPayViewPost() {
            var bindPurchaseEvents = function() {
                    // handle clicks on purchase links in test mode
                    $('.lp_purchase-link')
                    .on('mousedown', function() {handlePurchaseInTestMode(this);})
                    .on('click', function(e) {e.preventDefault();});
                },

                bindPostStatisticsEvents = function() {
                    // toggle visibility of post statistics pane
                    $('#lp_toggle-post-statistics-visibility')
                    .on('mousedown', function() {
                        togglePostStatisticsVisibility();
                    })
                    .on('click', function(e) {e.preventDefault();});

                    // toggle plugin preview mode between 'preview as visitor' and 'preview as admin'
                    $('#lp_plugin-preview-mode-form .switch-input')
                    .on('change', function() {
                        togglePluginPreviewMode();
                    });
                },

                renderPostStatisticsPane = function() {
                    var requestVars     = {
                                            action  : 'laterpay_post_statistic_render',
                                            post_id : lpVars.post_id
                                          },
                        data            = $.get(
                                            lpVars.ajaxUrl,
                                            requestVars
                                          ),
                        $placeholder    = $('#lp_post-statistics-placeholder'),
                        $postStatisticsPane;

                    // render post statistics pane in placeholder
                    if (!data || data === 0) {
                        return;
                    }
                    $postStatisticsPane = $placeholder.html(data);

                    // bind events to post statistics pane
                    bindPostStatisticsEvents();

                    // render sparklines within post statistics pane
                    $('.lp_sparkline-bar', $postStatisticsPane).peity('bar', {
                        delimiter   : ';',
                        width       : 182,
                        height      : 42,
                        gap         : 1,
                        fill        : function(value, index, array) {
                                        var date        = new Date(),
                                            daysCount   = array.length,
                                            color       = '#999';
                                        date.setDate(date.getDate() - (daysCount - index));
                                        // highlight the last (current) day
                                        if (index === (daysCount - 1))
                                            color = '#555';
                                        // highlight Saturdays and Sundays
                                        if (date.getDay() === 0 || date.getDay() === 6)
                                            color = '#c1c1c1';
                                        return color;
                                    }
                    });

                    $('.lp_sparkline-background-bar', $postStatisticsPane).peity('bar', {
                        delimiter   : ';',
                        width       : 182,
                        height      : 42,
                        gap         : 1,
                        fill        : function() { return '#ddd'; }
                    });
                },

                togglePostStatisticsVisibility = function() {
                    var $form       = $('#lp_toggle-post-statistics-visibility-form'),
                        $pane       = $('.lp_post-statistics'),
                        $input      = $('#lp_hide-statistics-pane'),
                        is_hidden   = $pane.hasClass('hidden') ? '0' : '1';

                    $input.val(is_hidden);

                    // toggle the visibility
                    $pane.toggleClass('hidden');

                    // save the state
                    $.post(
                        lpVars.ajaxUrl,
                        $form.serializeArray()
                    );
                },

                togglePluginPreviewMode = function() {
                    var $form   = $('#lp_plugin-preview-mode-form'),
                        $toggle = $('.switch-input', $form),
                        $input  = $('input[name=preview_post]', $form);

                    if ($toggle.prop('checked')) {
                        $input.val(1);
                    } else {
                        $input.val(0);
                    }

                    // save the state
                    $.post(
                        lpVars.ajaxUrl,
                        $form.serializeArray()
                    );
                },

                loadPostContent = function() {
                    var $pageCachingAnchor  = $('#lp_post-content-placeholder'),
                        requestVars         = {
                                                action  : 'laterpay_article_script',
                                                post_id : $pageCachingAnchor.attr('data-post-id')
                                              };

                    $.get(
                        lpVars.ajaxUrl,
                        requestVars,
                        function(data) {
                            $pageCachingAnchor.before(data).remove();
                        }
                    );
                },

                handlePurchaseInTestMode = function(trigger) {
                    if ($(trigger).data('preview-as-visitor')) {
                        // show alert instead of loading LaterPay purchase dialogs
                        alert(lpVars.i18nAlert);
                    }
                },

                initializePage = function() {
                    // load post content via Ajax, if plugin is in caching compatible mode
                    // (recognizable by the presence of lp_post-content-placeholder
                    if ($('#lp_post-content-placeholder').length == 1) {
                        loadPostContent();
                    }

                    // render the post statistics pane, if a placeholder exists for it
                    if ($('#lp_post-statistics-placeholder').length == 1) {
                        renderPostStatisticsPane();
                    }

                    bindPurchaseEvents();
                };

            initializePage();
        }

        // initialize page
        laterPayViewPost();

});})(jQuery);


// render LaterPay purchase dialogs using the LaterPay YUI dialog manager library
YUI().use('node', 'laterpay-dialog', 'laterpay-iframe', 'laterpay-easyxdm', function(Y) {
    // render purchase dialogs
    var ppuContext  = {
                        showCloseBtn        : true,
                        canSkipAddToInvoice : false,
                      },
        dm          = new Y.LaterPay.DialogManager();

        dm.attachToLinks('.lp_purchase-link', ppuContext.showCloseBtn);

    // render invoice indicator iframe
    if (lpVars && lpVars.lpBalanceUrl) {
        new Y.LaterPay.IFrame(
            Y.one('#laterpay-invoice-indicator'),
            lpVars.lpBalanceUrl,
            {
                width       : '110',
                height      : '30',
                scrolling   : 'no',
                frameborder : '0',
            }
        );
    }
});
