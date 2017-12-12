(function (app) {
  'use strict';

  // Start by defining the main module and adding the module dependencies
  angular
    .module(app.applicationModuleName, app.applicationModuleVendorDependencies)
    .constant('_', window._);

  // Setting HTML5 Location Mode
  angular
    .module(app.applicationModuleName)
    .config(bootstrapConfig)
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.loadingBarTemplate = '<div id="loading-bar"><div class="loading-bar bar"><div class="peg"></div></div></div>';
    }])
    .config(function ($mdThemingProvider) {

      $mdThemingProvider.definePalette('roMEANetPalette', {
        '50': '333333',
        '100': '2f2f2f',
        '200': '2a2a2a',
        '300': '222222',
        '400': '1f1f1f',
        '500': '1a1a1a',
        '600': '111111',
        '700': '0f0f0f',
        '800': '0a0a0a',
        '900': '000000',
        'A100': 'e4e4e4',
        'A200': '222222',
        'A400': '0f0f0f',
        'A700': '273e56',
        'contrastDefaultColor': 'light', // whether, by default, text (contrast) on this palette should be dark or light
        'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'], // hues which contrast should be 'dark' by default
        'contrastLightColors': undefined // could also specify this if default was 'dark'
      });

      $mdThemingProvider.definePalette('roMEANetBackgroundPalette', {
        '50': 'f9f9f9',
        '100': 'f4f4f4',
        '200': 'e9e9e9',
        '300': 'e4e4e4',
        '400': 'd9d9d9',
        '500': 'd4d4d4',
        '600': 'c9c9c9',
        '700': 'c4c4c4',
        '800': 'b9b9b9',
        '900': 'b4b4b4',
        'A100': 'e4e4e4',
        'A200': '222222',
        'A400': '0f0f0f',
        'A700': '273e56',
        'SIDENAVLIGHT': '2b333d',
        'SIDENAVDARK': '333c47',
        'TOPNAV': 'ffffff'
      });

      $mdThemingProvider.theme('default')
        .primaryPalette('roMEANetPalette')
        .accentPalette('roMEANetPalette')
        .backgroundPalette('roMEANetBackgroundPalette');

      // $mdThemingProvider.definePalette('roMEANetPalette', {
      //   '50': 'f0f0f0',
      //   '100': 'd0d0d0',
      //   '200': 'c0c0c0',
      //   '300': 'b0b0b0',
      //   '400': 'a0a0a0',
      //   '500': '909090',
      //   '600': '808080',
      //   '700': '707070',
      //   '800': '606060',
      //   '900': '505050',
      //   'A100': '0f0f0f',
      //   'A200': '707070',
      //   'A400': '222222',
      //   'A700': 'b0b0b0',
      //   'contrastDefaultColor': 'light', // whether, by default, text (contrast) on this palette should be dark or light
      //   'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'], // hues which contrast should be 'dark' by default
      //   'contrastLightColors': undefined // could also specify this if default was 'dark'
      // });
      //
      // $mdThemingProvider.definePalette('roMEANetBackgroundPalette', {
      //   '50': '333333',
      //   '100': '2f2f2f',
      //   '200': '2a2a2a',
      //   '300': '222222',
      //   '400': '1f1f1f',
      //   '500': '1a1a1a',
      //   '600': '111111',
      //   '700': '0f0f0f',
      //   '800': '0a0a0a',
      //   '900': '000000',
      //   'A100': '0f0f0f',
      //   'A200': '707070',
      //   'A400': '222222',
      //   'A700': 'b0b0b0',
      //   'SIDENAVLIGHT': '1f1f1f',
      //   'SIDENAVDARK': '1a1a1a',
      //   'TOPNAV': '1a1a1a'
      // });
      //
      // $mdThemingProvider.theme('default')
      //   .dark()
      //   .primaryPalette('roMEANetPalette')
      //   .accentPalette('roMEANetPalette')
      //   .backgroundPalette('roMEANetBackgroundPalette');

    });

  function bootstrapConfig($compileProvider, $locationProvider, $httpProvider, $logProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');

    // Disable debug data for production environment
    // @link https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(app.applicationEnvironment !== 'production');

    $logProvider.debugEnabled(app.applicationEnvironment !== 'production');
  }

  bootstrapConfig.$inject = ['$compileProvider', '$locationProvider', '$httpProvider', '$logProvider'];

  // Then define the init function for starting up the application
  angular.element(document).ready(init);

  function init() {
    // Fixing facebook bug with redirect
    if (window.location.hash && window.location.hash === '#_=_') {
      if (window.history && history.pushState) {
        window.history.pushState('', document.title, window.location.pathname);
      } else {
        // Prevent scrolling by storing the page's current scroll offset
        var scroll = {
          top: document.body.scrollTop,
          left: document.body.scrollLeft
        };
        window.location.hash = '';
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scroll.top;
        document.body.scrollLeft = scroll.left;
      }
    }

    // Then init the app
    angular.bootstrap(document, [app.applicationModuleName]);
  }
}(ApplicationConfiguration));
