(function () {
  'use strict';

  angular.module('core')
    .directive('pageTitle', pageTitle);

  pageTitle.$inject = ['$rootScope', '$interpolate', '$state'];

  function pageTitle($rootScope, $interpolate, $state) {
    var directive = {
      restrict: 'A',
      scope: {
        kind: '=kind'
      },
      link: link
    };

    return directive;

    function link(scope, element, attribute) {
      $rootScope.$on('$stateChangeSuccess', listener);

      function listener(event, toState) {

        var applicationCoreTitle = 'Home',
          separeteBy = '',
          stateTitle = '';

        switch (attribute.kind) {
          case 'header':
            separeteBy = ' / ';
            break;
          case 'page':
            separeteBy = ' - ';
            break;
          default:
            separeteBy = ' - ';
        }

        _.forEach(toState.name.split('.'), function (value, index) {
          if (attribute.kind === 'header') {
            stateTitle = stateTitle + '<span class="topTitlePart' + index + '">' + _.capitalize(value) + '</span>' + separeteBy;
          } else {
            stateTitle = stateTitle + _.capitalize(value) + separeteBy;
          }
        });
        if (toState.data && toState.data.pageTitle) {
          stateTitle = $interpolate(stateTitle + toState.data.pageTitle + separeteBy)(($state.$current.locals.globals));
        }
        stateTitle = stateTitle.slice(0, -3);
        element.html(stateTitle);

      }
    }
  }
}());
