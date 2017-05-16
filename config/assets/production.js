'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/angular-material/angular-material.min.css',
        'public/lib/font-awesome/css/font-awesome.min.css',
        'public/lib/angular-tooltips/dist/angular-tooltips.min.css',
        'public/lib/angular-loading-bar/build/loading-bar.min.css'
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/angular/angular.min.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/angular-messages/angular-messages.min.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        'public/lib/ng-file-upload/ng-file-upload.min.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/angular-tooltips/dist/angular-tooltips.min.js',
        'public/lib/angular-aria/angular-aria.min.js',
        'public/lib/angular-material/angular-material.min.js',
        'public/lib/lodash/lodash.js',
        'public/lib/angular-loading-bar/build/loading-bar.min.js',
        'public/lib/angularUtils-pagination/dirPagination.js',
        'public/lib/angular-sanitize/angular-sanitize.min.js'
        // endbower
      ]
    },
    css: 'public/dist/application*.min.css',
    js: 'public/dist/application*.min.js'
  }
};
