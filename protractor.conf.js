'use strict';

// Protractor configuration
var config = {
  specs: ['modules/*/tests/e2e/*.js'],
  onPrepare: function() {
    browser.driver.manage().window().setSize(1920, 1080);
    var disableCssAnimate = function() {
        angular
            .module('disableCssAnimate', [])
            .run(function() {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = '* {' +
                    '-webkit-transition: 0.01s !important;' +
                    '-moz-transition: 0.01s !important;' +
                    '-o-transition: 0.01s !important;' +
                    '-ms-transition: 0.01s !important;' +
                    'transition: 0.01s !important;' +
                    '}';
                document.getElementsByTagName('head')[0].appendChild(style);
            });
    };
    browser.addMockModule('disableCssAnimate', disableCssAnimate);
  }
};

exports.config = config;
