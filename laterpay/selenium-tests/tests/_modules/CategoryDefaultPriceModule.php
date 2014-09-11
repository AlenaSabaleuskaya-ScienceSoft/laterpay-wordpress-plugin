<?php

class CategoryDefaultPriceModule extends BaseModule {

    //pricing tab elements
    public static $pricingAddCategoryButton     = '#lp_add-category-link';
    public static $pricingCategorySelect        = '#lp_category-prices .select2-choice';
    public static $pricingCategoryValue         = '#lp_category-prices .lp_category-title';
    public static $pricingSaveLink              = "#lp_category-prices .lp_save-link";
    public static $pricingCancelLink            = "#lp_category-prices .lp_cancel-link";
    public static $pricingChangeLink            = "#lp_category-prices .lp_change-link";
    public static $pricingDeleteLink            = "#lp_category-prices .lp_delete-link";
    public static $pricingPriceInput            = "#lp_category-prices .lp_number-input";

    //messages
    public static $messageCategoryPriceSave     = "All posts in category {category_name} have a default price of {category_price}";
    public static $messageCategoryPriceDeleted  = "The default price for this category was deleted.";
    public static $messageCategoryPriceChanged  = "All posts in category {category_name} have a default price of {category_price}";

    /**
     * P.33
     * Create Category Default Price
     * @param $category_name
     * @param $category_default_price
     * @return $this
     */
    public function createCategoryDefaultPrice($category_name, $category_default_price) {
        $I = $this->BackendTester;

        $I->amGoingTo('Open LaterPay plugin page pricing tab');
        $I->amOnPage(self::$baseUrl);
        $I->click(self::$adminMenuPluginButton);
        $I->click(self::$pluginPricingTab);

        $I->amGoingTo('Add category default price');
        $I->click(self::$pricingAddCategoryButton);
        $I->seeElement(self::$pricingCategorySelect);
        $I->seeElement(self::$pricingSaveLink);
        $I->seeElement(self::$pricingCancelLink);

        $I->amGoingTo('Cancel category default price');
        $I->click(self::$pricingCancelLink);
        $I->seeElement(self::$pricingAddCategoryButton);
        $I->dontSeeElement(self::$pricingCancelLink);
        $I->dontSeeElement(self::$pricingSaveLink);

        $I->amGoingTo('Add category default price');
        $I->click(self::$pricingAddCategoryButton);
        $I->seeElement(self::$pricingCategorySelect);
        $I->seeElement(self::$pricingSaveLink);
        $I->seeElement(self::$pricingCancelLink);

        $messageCategoryPriceSaveText = str_replace(
            array('{category_name}', '{category_price}'), array($category_name, $category_default_price), self::$messageCategoryPriceSave
        );

        $I->amGoingTo('Fill and save category default price');
        $I->click(self::$pricingCategorySelect);
        $I->wait(self::$veryShortTimeout);
        $I->click('.select2-results .select2-result');
        //$I->executeJS("jQuery('#select2-drop li:contains(\"" . $category_name . "\")').trigger('click')");
        $I->fillField(self::$pricingPriceInput, $category_default_price);
        $I->click(self::$pricingSaveLink);
        $I->waitForText($messageCategoryPriceSaveText, self::$shortTimeout, self::$messageArea);
        $I->seeElement(self::$pricingChangeLink);
        $I->seeElement(self::$pricingDeleteLink);
        $I->dontSeeElement(self::$pricingCancelLink);
        $I->dontSeeElement(self::$pricingSaveLink);

        //we can validate price only after category default price was created
        /* enable after input fixed
            $I->amGoingTo('Validate Price');
            BackendModule::of($I)
                ->validatePrice(self::$pricingPriceInput, self::$pricingChangeLink, self::$pricingSaveLink);

            $I->amGoingTo('Restore category default price');
            $I->click(self::$pricingChangeLink);
            $I->fillField(self::$pricingPriceInput, $category_default_price);
            $I->click(self::$pricingSaveLink);
        */

        return $this;
    }

    /**
     * P.37
     * Delete category default price
     * @param $category_name
     * @return $this
     */
    public function deleteCategoryDefaultPrice($category_name) {
        $I = $this->BackendTester;

        $I->amGoingTo('Open LaterPay plugin page pricing tab');
        $I->amOnPage(self::$baseUrl);
        $I->click(self::$adminMenuPluginButton);
        $I->click(self::$pluginPricingTab);

        $I->amGoingTo('Delete category default price');
        //TODO: implement deletion of concrete category
        $I->click(self::$pricingDeleteLink);
        $I->waitForText(self::$messageCategoryPriceDeleted, self::$shortTimeout, self::$messageArea);

        return $this;
    }

    /**
     * P.35
     * Change category default price
     * @param $category_name
     * @param $new_category_default_price
     * @return $this
     */
    public function changeCategoryDefaultPrice($category_name, $new_category_default_price) {
        $I = $this->BackendTester;

        $I->amGoingTo('Open LaterPay plugin page pricing tab');
        $I->amOnPage(self::$baseUrl);
        $I->click(self::$adminMenuPluginButton);
        $I->click(self::$pluginPricingTab);

        $I->amGoingTo('Change category default price');
        //TODO: implement change of concrete category
        $I->click(self::$pricingChangeLink);
        $I->seeElement(self::$pricingCategorySelect);
        $I->seeElement(self::$pricingSaveLink);
        $I->seeElement(self::$pricingCancelLink);

        $I->amGoingTo('Fill and save category default price');
        $I->fillField(self::$pricingPriceInput, $new_category_default_price);
        $I->click(self::$pricingSaveLink);
        $I->seeElement(self::$pricingChangeLink);
        $I->seeElement(self::$pricingDeleteLink);
        $I->dontSeeElement(self::$pricingCancelLink);
        $I->dontSeeElement(self::$pricingSaveLink);
        $messageCategoryPriceChangeText = str_replace(
                array('{category_name}', '{category_price}'), array($category_name, $new_category_default_price), self::$messageCategoryPriceSave
        );
        $I->waitForText($messageCategoryPriceChangeText, self::$shortTimeout, self::$messageArea);

        return $this;
    }

}

