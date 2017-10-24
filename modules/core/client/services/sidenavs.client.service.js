(function () {
  'use strict';

  angular
    .module('core')
    .factory('sideNavs', sideNavs);

  function sideNavs() {
    var shouldRender;
    var shouldRenderItem;
    var service = {
      addSideNav: addSideNav,
      addSideNavItem: addSideNavItem,
      addSubSideNavItem: addSubSideNavItem,
      defaultRoles: ['user', 'admin'],
      getSideNav: getSideNav,
      sidenavs: {},
      removeSideNav: removeSideNav,
      removeSideNavItem: removeSideNavItem,
      removeSubSideNavItem: removeSubSideNavItem,
      validateSideNavExistance: validateSideNavExistance
    };

    init();

    return service;

    // Add new sideNav object by sideNav id
    function addSideNav(sideNavId, options) {
      options = options || {};

      // Create the new sideNav
      service.sidenavs[sideNavId] = {
        roles: options.roles || service.defaultRoles,
        items: options.items || [],
        shouldRender: shouldRender,
        shouldRenderItem: shouldRenderItem
      };

      // Return the sideNav object
      return service.sidenavs[sideNavId];
    }

    // Add sideNav item object
    function addSideNavItem(sideNavId, options) {
      options = options || {};

      // Validate that the sideNav exists
      service.validateSideNavExistance(sideNavId);

      // Push new sideNav item
      service.sidenavs[sideNavId].items.push({
        title: options.title || '',
        state: options.state || '',
        view: options.view || '',
        icon: options.icon || '',
        color: options.color || '',
        fontColor: options.fontColor || '',
        type: options.type || 'item',
        class: options.class,
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? service.defaultRoles : options.roles),
        position: options.position || 0,
        items: [],
        shouldRender: shouldRender,
        shouldRenderItem: shouldRenderItem
      });

      // Add subsideNav items
      if (options.items) {
        for (var i in options.items) {
          if (options.items.hasOwnProperty(i)) {
            service.addSubSideNavItem(sideNavId, options.state, options.items[i]);
          }
        }
      }

      // Return the sideNav object
      return service.sidenavs[sideNavId];
    }

    // Add subsideNav item object
    function addSubSideNavItem(sideNavId, parentItemState, options) {
      options = options || {};

      // Validate that the sideNav exists
      service.validateSideNavExistance(sideNavId);

      // Search for sideNav item
      for (var itemIndex in service.sidenavs[sideNavId].items) {
        if (service.sidenavs[sideNavId].items[itemIndex].state === parentItemState) {
          // Push new subsideNav item
          service.sidenavs[sideNavId].items[itemIndex].items.push({
            title: options.title || '',
            view: options.view || '',
            icon: options.icon || '',
            color: options.color || '',
            fontColor: options.fontColor || '',
            state: options.state || '',
            roles: ((options.roles === null || typeof options.roles === 'undefined') ? service.sidenavs[sideNavId].items[itemIndex].roles : options.roles),
            position: options.position || 0,
            shouldRender: shouldRender,
            shouldRenderItem: shouldRenderItem
          });
        }
      }

      // Return the sideNav object
      return service.sidenavs[sideNavId];
    }

    // Get the sideNav object by sideNav id
    function getSideNav(sideNavId) {
      // Validate that the sideNav exists
      service.validateSideNavExistance(sideNavId);

      // Return the sideNav object
      return service.sidenavs[sideNavId];
    }

    function init() {
      // A private function for rendering decision
      shouldRenderItem = function (user) {
        if (user && _.indexOf(this.roles, 'moderator') !== -1 && _.indexOf(user.roles, 'moderator') !== -1) {
          return true;
        }
        if (user && _.indexOf(user.apps, this.state) === -1 && this.state !== 'home' && _.indexOf(this.roles, 'user') === -1) {
          return false;
        }
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
      // Adding the topbar sideNav
      addSideNav('sidebar', {
        roles: ['*']
      });
    }

    // Remove existing sideNav object by sideNav id
    function removeSideNav(sideNavId) {
      // Validate that the sideNav exists
      service.validateSideNavExistance(sideNavId);

      delete service.sidenavs[sideNavId];
    }

    // Remove existing sideNav object by sideNav id
    function removeSideNavItem(sideNavId, sideNavItemState) {
      // Validate that the sideNav exists
      service.validateSideNavExistance(sideNavId);

      // Search for sideNav item to remove
      for (var itemIndex in service.sidenavs[sideNavId].items) {
        if (service.sidenavs[sideNavId].items.hasOwnProperty(itemIndex) && service.sidenavs[sideNavId].items[itemIndex].state === sideNavItemState) {
          service.sidenavs[sideNavId].items.splice(itemIndex, 1);
        }
      }

      // Return the sideNav object
      return service.sidenavs[sideNavId];
    }

    // Remove existing sideNav object by sideNav id
    function removeSubSideNavItem(sideNavId, subsideNavItemState) {
      // Validate that the sideNav exists
      service.validateSideNavExistance(sideNavId);

      // Search for sideNav item to remove
      for (var itemIndex in service.sidenavs[sideNavId].items) {
        if (this.sidenavs[sideNavId].items.hasOwnProperty(itemIndex)) {
          for (var subitemIndex in service.sidenavs[sideNavId].items[itemIndex].items) {
            if (this.sidenavs[sideNavId].items[itemIndex].items.hasOwnProperty(subitemIndex) && service.sidenavs[sideNavId].items[itemIndex].items[subitemIndex].state === subsideNavItemState) {
              service.sidenavs[sideNavId].items[itemIndex].items.splice(subitemIndex, 1);
            }
          }
        }
      }

      // Return the sideNav object
      return service.sidenavs[sideNavId];
    }

    // Validate sideNav existance
    function validateSideNavExistance(sideNavId) {
      if (sideNavId && sideNavId.length) {
        if (service.sidenavs[sideNavId]) {
          return true;
        } else {
          throw new Error('SideNav does not exist');
        }
      } else {
        throw new Error('SideNavId was not provided');
      }
    }
  }
}());
