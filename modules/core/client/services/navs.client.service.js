(function () {
  'use strict';

  angular
    .module('core')
    .factory('Navs', Navs);

  function Navs() {
    var shouldRender;
    var service = {
      addNav: addNav,
      addNavItem: addNavItem,
      addSubNavItem: addSubNavItem,
      defaultRoles: ['user', 'admin'],
      getNav: getNav,
      navs: {},
      removeNav: removeNav,
      removeNavItem: removeNavItem,
      removeSubNavItem: removeSubNavItem,
      validateNavExistance: validateNavExistance
    };

    init();

    return service;

    // Add new nav object by nav id
    function addNav(navId, options) {
      options = options || {};

      // Create the new nav
      service.navs[navId] = {
        roles: options.roles || service.defaultRoles,
        items: options.items || [],
        shouldRender: shouldRender
      };

      // Return the nav object
      return service.navs[navId];
    }

    // Add nav item object
    function addNavItem(navId, options) {
      options = options || {};

      // Validate that the nav exists
      service.validateNavExistance(navId);

      // Push new nav item
      service.navs[navId].items.push({
        title: options.title || '',
        icon: options.icon || '',
        state: options.state || '',
        type: options.type || 'item',
        class: options.class,
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? service.defaultRoles : options.roles),
        position: options.position || 0,
        items: [],
        shouldRender: shouldRender
      });

      // Add subnav items
      if (options.items) {
        for (var i in options.items) {
          if (options.items.hasOwnProperty(i)) {
            service.addSubNavItem(navId, options.state, options.items[i]);
          }
        }
      }

      // Return the nav object
      return service.navs[navId];
    }

    // Add subnav item object
    function addSubNavItem(navId, parentItemState, options) {
      options = options || {};

      // Validate that the nav exists
      service.validateNavExistance(navId);

      // Search for nav item
      for (var itemIndex in service.navs[navId].items) {
        if (service.navs[navId].items[itemIndex].state === parentItemState) {
          // Push new subnav item
          service.navs[navId].items[itemIndex].items.push({
            title: options.title || '',
            icon: options.icon || '',
            state: options.state || '',
            roles: ((options.roles === null || typeof options.roles === 'undefined') ? service.navs[navId].items[itemIndex].roles : options.roles),
            position: options.position || 0,
            shouldRender: shouldRender
          });
        }
      }

      // Return the nav object
      return service.navs[navId];
    }

    // Get the nav object by nav id
    function getNav(navId) {
      // Validate that the nav exists
      service.validateNavExistance(navId);

      // Return the nav object
      return service.navs[navId];
    }

    function init() {
      // A private function for rendering decision
      shouldRender = function (user) {
        if (this.roles.indexOf('*') !== -1) {
          return true;
        } else {
          if (!user) {
            return false;
          }

          for (var userRoleIndex in user.roles) {
            if (user.roles.hasOwnProperty(userRoleIndex)) {
              for (var roleIndex in this.roles) {
                if (this.roles.hasOwnProperty(roleIndex) && this.roles[roleIndex] === user.roles[userRoleIndex]) {
                  return true;
                }
              }
            }
          }
        }

        return false;
      };

      // Adding the topbar nav
      addNav('topbar', {
        roles: ['*']
      });
      // Adding the topbar nav for mobile
      addNav('topbar_mobile', {
        roles: ['*']
      });
    }

    // Remove existing nav object by nav id
    function removeNav(navId) {
      // Validate that the nav exists
      service.validateNavExistance(navId);

      delete service.navs[navId];
    }

    // Remove existing nav object by nav id
    function removeNavItem(navId, navItemState) {
      // Validate that the nav exists
      service.validateNavExistance(navId);

      // Search for nav item to remove
      for (var itemIndex in service.navs[navId].items) {
        if (service.navs[navId].items.hasOwnProperty(itemIndex) && service.navs[navId].items[itemIndex].state === navItemState) {
          service.navs[navId].items.splice(itemIndex, 1);
        }
      }

      // Return the nav object
      return service.navs[navId];
    }

    // Remove existing nav object by nav id
    function removeSubNavItem(navId, subnavItemState) {
      // Validate that the nav exists
      service.validateNavExistance(navId);

      // Search for nav item to remove
      for (var itemIndex in service.navs[navId].items) {
        if (this.navs[navId].items.hasOwnProperty(itemIndex)) {
          for (var subitemIndex in service.navs[navId].items[itemIndex].items) {
            if (this.navs[navId].items[itemIndex].items.hasOwnProperty(subitemIndex) && service.navs[navId].items[itemIndex].items[subitemIndex].state === subnavItemState) {
              service.navs[navId].items[itemIndex].items.splice(subitemIndex, 1);
            }
          }
        }
      }

      // Return the nav object
      return service.navs[navId];
    }

    // Validate nav existance
    function validateNavExistance(navId) {
      if (navId && navId.length) {
        if (service.navs[navId]) {
          return true;
        } else {
          throw new Error('nav does not exist');
        }
      } else {
        throw new Error('navId was not provided');
      }
    }
  }
}());
