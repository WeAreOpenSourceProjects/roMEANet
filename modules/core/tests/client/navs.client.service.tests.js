'use strict';

(function () {
  describe('Navs', function () {
    // Initialize global variables
    var scope,
      Navs;

    // Load the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(inject(function (_Navs_) {
      Navs = _Navs_;
    }));

    it('should have topbar added', function () {
      expect(Navs.navs.topbar).toBeDefined();
    });

    it('should have default roles to user and admin', function () {
      expect(Navs.defaultRoles).toEqual(['user', 'admin']);
    });

    describe('addNav', function () {
      describe('with no options', function () {
        var navId = 'nav1',
          nav;
        beforeEach(function () {
          nav = Navs.addNav(navId);
        });

        it('should return nav object', function () {
          expect(nav).toBeDefined();
        });

        it('should default roles', function () {
          expect(nav.roles).toEqual(Navs.defaultRoles);
        });

        it('should have empty items', function () {
          expect(nav.items).toEqual([]);
        });

        it('should set shouldRender to shouldRender function handle', function () {
          expect(nav.shouldRender()).toBeFalsy();
        });
      });

      describe('with options', function () {
        var nav,
          options = {
            roles: ['a', 'b', 'c'],
            items: ['d', 'e', 'f']
          };
        beforeEach(function () {
          nav = Navs.addNav('nav1', options);
        });

        it('should set items to options.items list', function () {
          expect(nav.items).toBe(options.items);
        });

        it('should set roles to options.roles list', function () {
          expect(nav.roles).toBe(options.roles);
        });
      });
    });

    describe('shouldRender', function () {
      var navOptions = {
          roles: ['*', 'navrole']
        },
        nav;
      beforeEach(function () {
        nav = Navs.addNav('nav1', navOptions);
      });

      describe('when logged out', function () {
        it('should render if nav is public', function () {
          expect(nav.shouldRender()).toBeTruthy();
        });

        it('should not render if nav is private', function () {
          nav = Navs.addNav('nav1', {
            isPublic: false
          });
          expect(nav.shouldRender()).toBeFalsy();
        });
      });

      describe('when logged in', function () {
        var user = {
          roles: ['1', 'navrole', '2']
        };
        describe('nav with * role', function () {
          it('should render', function () {
            expect(nav.shouldRender(user)).toBeTruthy();
          });
        });

        describe('nav without * role', function () {
          beforeEach(function () {
            nav = Navs.addNav('nav1', {
              roles: ['b', 'navrole', 'c']
            });
          });

          it('should render if user has same role as nav', function () {
            expect(nav.shouldRender(user)).toBeTruthy();
          });

          it('should not render if user has different roles', function () {
            user = {
              roles: ['1', '2', '3']
            };
            expect(nav.shouldRender(user)).toBeFalsy();
          });
        });
      });
    });

    describe('validateNavExistance', function () {
      describe('when navId not provided', function () {
        it('should throw navId error', function () {
          expect(Navs.validateNavExistance).toThrowError('navId was not provided');
        });
      });

      describe('when nav does not exist', function () {
        it('should throw no nav error', function () {
          var target = function () {
            Navs.validateNavExistance('noNavId');
          };
          expect(target).toThrowError('nav does not exist');
        });
      });

      describe('when nav exists', function () {
        var navId = 'navId';
        beforeEach(function () {
          Navs.navs[navId] = {};
        });

        it('should return truthy', function () {
          expect(Navs.validateNavExistance(navId)).toBeTruthy();
        });
      });
    });

    describe('removeNav', function () {
      var nav = {
        id: 'navId'
      };
      beforeEach(function () {
        Navs.navs[nav.id] = nav;
        Navs.validateNavExistance = jasmine.createSpy();
        Navs.removeNav(nav.id);
      });

      it('should remove existing nav from navs', function () {
        expect(Navs.navs).not.toContain(nav.id);
      });

      it('validates nav existance before removing', function () {
        expect(Navs.validateNavExistance).toHaveBeenCalledWith(nav.id);
      });
    });

    describe('addNavItem', function () {
      var navId = 'nav1',
        subMenuItem1 = {
          title: 'sub1'
        },
        subMenuItem2 = {
          title: 'sub2'
        },
        navItemOptions = {
          title: 'title',
          state: 'state',
          type: 'type',
          class: 'class',
          isPublic: false,
          roles: ['a', 'b'],
          position: 2,
          items: [subMenuItem1, subMenuItem2]
        },
        nav,
        navItem;

      beforeEach(function () {
        Navs.validateNavExistance = jasmine.createSpy();
        Navs.addSubNavItem = jasmine.createSpy();
        Navs.addNav(navId, {
          roles: ['a', 'b']
        });
        nav = Navs.addNavItem(navId, navItemOptions);
        navItem = nav.items[0];
      });

      it('should validate nav existance', function () {
        expect(Navs.validateNavExistance).toHaveBeenCalledWith(navId);
      });

      it('should return the nav', function () {
        expect(nav).toBeDefined();
      });

      it('should set nav item shouldRender function', function () {
        expect(navItem.shouldRender).toBeDefined();
      });

      describe('with options set', function () {
        it('should add nav item to nav', function () {
          expect(nav.items.length).toBe(1);
        });

        it('should set nav item title to options title', function () {
          expect(navItem.title).toBe(navItemOptions.title);
        });

        it('should set nav item state to options state', function () {
          expect(navItem.state).toBe(navItemOptions.state);
        });

        it('should set nav item type to options type', function () {
          expect(navItem.type).toBe(navItemOptions.type);
        });

        it('should set nav item class to options class', function () {
          expect(navItem.class).toBe(navItemOptions.class);
        });

        it('should set nav item position to options position', function () {
          expect(navItem.position).toBe(navItemOptions.position);
        });

        it('should call addSubNavItem for each item in options', function () {
          expect(Navs.addSubNavItem).toHaveBeenCalledWith(navId, navItemOptions.state, subMenuItem1);
          expect(Navs.addSubNavItem).toHaveBeenCalledWith(navId, navItemOptions.state, subMenuItem2);
        });
      });

      describe('without options set', function () {
        beforeEach(function () {
          nav = Navs.addNavItem(navId);
          navItem = nav.items[1];
        });

        it('should set nav item type to item', function () {
          expect(navItem.type).toBe('item');
        });

        it('should set nav item title to empty', function () {
          expect(navItem.title).toBe('');
        });

        it('should set nav item isPublic to false', function () {
          expect(navItem.isPublic).toBeFalsy();
        });

        it('should set nav item roles to default roles', function () {
          expect(navItem.roles).toEqual(Navs.defaultRoles);
        });

        it('should set nav item position to 0', function () {
          expect(navItem.position).toBe(0);
        });
      });
    });

    describe('removeNavItem', function () {
      var navId = 'navId',
        navItemState = 'nav.state1',
        navItemState2 = 'nav.state2',
        nav;

      beforeEach(function () {
        Navs.addNav(navId);
        Navs.addNavItem(navId, {
          state: navItemState
        });
        Navs.addNavItem(navId, {
          state: navItemState2
        });
        Navs.validateNavExistance = jasmine.createSpy();
        nav = Navs.removeNavItem(navId, navItemState);
      });

      it('should return nav object', function () {
        expect(nav).not.toBeNull();
      });

      it('should validate nav existance', function () {
        expect(Navs.validateNavExistance).toHaveBeenCalledWith(navId);
      });

      it('should remove sub nav items with same state', function () {
        expect(nav.items.length).toBe(1);
        expect(nav.items[0].state).toBe(navItemState2);
      });
    });

    describe('addSubNavItem', function () {
      var subItemOptions = {
        title: 'title',
        state: 'sub.state',
        isPublic: false,
        roles: ['a', 'b'],
        position: 4
      };
      var navId = 'nav1',
        navItem1Options = {
          state: 'item1.state',
          items: [],
          isPublic: false
        },
        navItem2Options = {
          state: 'item2.state2',
          items: [],
          isPublic: true,
          roles: ['a']
        },
        navItem1,
        navItem2,
        navItem3,
        subItem1,
        subItem2,
        nav;

      beforeEach(function () {
        Navs.validateNavExistance = jasmine.createSpy();
        Navs.addNav(navId);
        Navs.addNavItem(navId, navItem1Options);
        Navs.addNavItem(navId, navItem2Options);
        Navs.addNavItem(navId, {
          state: 'something.else'
        });
        Navs.addSubNavItem(navId, navItem1Options.state, subItemOptions);
        nav = Navs.addSubNavItem(navId, navItem1Options.state);
        navItem1 = nav.items[0];
        navItem2 = nav.items[1];
        navItem3 = nav.items[2];
        subItem1 = navItem1.items[0];
        subItem2 = navItem1.items[1];
      });

      afterEach(function () {
        Navs.removeNav(navId);
      });

      it('should return nav object', function () {
        expect(nav).not.toBeNull();
      });

      it('should validate nav existance', function () {
        expect(Navs.validateNavExistance).toHaveBeenCalledWith(navId);
      });

      it('should not add sub nav item to nav item of different state', function () {
        expect(navItem3.items.length).toBe(0);
      });

      it('should set shouldRender', function () {
        expect(subItem1.shouldRender).toBeDefined();
      });

      describe('with options set', function () {
        it('should add sub nav item to nav item', function () {
          expect(subItem1).toBeDefined();
        });

        it('should set title to options title', function () {
          expect(subItem1.title).toBe(subItemOptions.title);
        });

        it('should set state to options state', function () {
          expect(subItem1.state).toBe(subItemOptions.state);
        });

        it('should set roles to options roles', function () {
          expect(subItem1.roles).toEqual(subItemOptions.roles);
        });

        it('should set position to options position', function () {
          expect(subItem1.position).toEqual(subItemOptions.position);
        });
      });

      describe('without optoins set', function () {
        it('should add sub nav item to nav item', function () {
          expect(subItem2).toBeDefined();
        });

        it('should set isPublic to parent isPublic', function () {
          expect(subItem2.isPublic).toBe(navItem1.isPublic);
        });

        it('should set title to blank', function () {
          expect(subItem2.title).toBe('');
        });

        it('should set state to blank', function () {
          expect(subItem2.state).toBe('');
        });

        it('should set roles to parent roles', function () {
          expect(subItem2.roles).toEqual(navItem1.roles);
        });

        it('should set position to 0', function () {
          expect(subItem2.position).toBe(0);
        });
      });

      describe('then removeSubNavItem', function () {
        beforeEach(function () {
          Navs.validateNavExistance = jasmine.createSpy();
          nav = Navs.removeSubNavItem(navId, subItem1.state);
        });

        it('should validate nav existance', function () {
          expect(Navs.validateNavExistance).toHaveBeenCalledWith(navId);
        });

        it('should return nav object', function () {
          expect(nav).toBeDefined();
        });

        it('should remove sub nav item', function () {
          expect(navItem1.items.length).toBe(1);
          expect(navItem1.items[0].state).toEqual(subItem2.state);
        });
      });
    });
  });
}());
