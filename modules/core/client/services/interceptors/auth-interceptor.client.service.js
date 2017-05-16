(function() {
  'use strict';

  angular
    .module('core')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$q', '$injector'];

  function authInterceptor($q, $injector) {
    var service = {
      responseError: responseError
    };

    return service;

    function responseError(rejection) {
      if (!rejection.config.ignoreAuthModule) {
        switch (rejection.status) {
          case 400:
            $injector.get('$state').go('bad-request', {
              message: rejection.data.message
            });
            break;
          case 401:
            // Deauthenticate the global user
            $injector.get('Authentication').signout();
            $injector.get('$state').transitionTo('authentication.signin');
            break;
          case 403:
            $injector.get('$state').transitionTo('forbidden');
            break;
          case 404:
            $injector.get('$state').go('not-found', {
              message: rejection.data.message
            });
            break;
          case -1: // Handle error if no response from server(Network Lost or Server not responding)
            var $mdToast = $injector.get('$mdToast');
            $mdToast.show(
              $mdToast.simple()
              .textContent('Error processing request ! No response received from server. Please try again later.')
              .position('top right')
              .hideDelay(5000)
            );
            break;
        }
      }
      // otherwise, default behaviour
      return $q.reject(rejection);
    }
  }
}());
