'use strict';

(function () {
  describe('sideNavs', function () {
    // Initialize global variables
    var scope,
      sideNavs;

    // Load the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(inject(function (_sideNavs_) {
      sideNavs = _sideNavs_;
    }));

    it('should have sidebar added', function () {
      expect(sideNavs.sidenavs.sidebar).toBeDefined();
    });

    it('should have default roles to user and admin', function () {
      expect(sideNavs.defaultRoles).toEqual(['user', 'admin']);
    });

    describe('addSideNav', function () {
      describe('with no options', function () {
        var sidenavId = 'sidenav1',
          sidenav;
        beforeEach(function () {
          sidenav = sideNavs.addSideNav(sidenavId);
        });

        it('should return sidenav object', function () {
          expect(sidenav).toBeDefined();
        });

        it('should default roles', function () {
          expect(sidenav.roles).toEqual(sideNavs.defaultRoles);
        });

        it('should have empty items', function () {
          expect(sidenav.items).toEqual([]);
        });

        it('should set shouldRender to shouldRender function handle', function () {
          expect(sidenav.shouldRender()).toBeFalsy();
        });
      });

      describe('with options', function () {
        var sidenav,
          options = {
            roles: ['a', 'b', 'c'],
            items: ['d', 'e', 'f']
          };
        beforeEach(function () {
          sidenav = sideNavs.addSideNav('sidenav1', options);
        });

        it('should set items to options.items list', function () {
          expect(sidenav.items).toBe(options.items);
        });

        it('should set roles to options.roles list', function () {
          expect(sidenav.roles).toBe(options.roles);
        });
      });
    });

    describe('shouldRender', function () {
      var sidenavOptions = {
          roles: ['*', 'sidenavrole']
        },
        sidenav;
      beforeEach(function () {
        sidenav = sideNavs.addSideNav('sidenav1', sidenavOptions);
      });

      describe('when logged out', function () {
        it('should render if sidenav is public', function () {
          expect(sidenav.shouldRender()).toBeTruthy();
        });

        it('should not render if sidenav is private', function () {
          sidenav = sideNavs.addSideNav('sidenav1', {
            isPublic: false
          });
          expect(sidenav.shouldRender()).toBeFalsy();
        });
      });

      describe('when logged in', function () {
        var user = {
          roles: ['1', 'sidenavrole', '2']
        };
        describe('sidenav with * role', function () {
          it('should render', function () {
            expect(sidenav.shouldRender(user)).toBeTruthy();
          });
        });

        describe('sidenav without * role', function () {
          beforeEach(function () {
            sidenav = sideNavs.addSideNav('sidenav1', {
              roles: ['b', 'sidenavrole', 'c']
            });
          });

          it('should render if user has same role as sidenav', function () {
            expect(sidenav.shouldRender(user)).toBeTruthy();
          });

          it('should not render if user has different roles', function () {
            user = {
              roles: ['1', '2', '3']
            };
            expect(sidenav.shouldRender(user)).toBeFalsy();
          });
        });
      });
    });

    describe('validateSideNavExistance', function () {
      describe('when sidenavId not provided', function () {
        it('should throw sidenavId error', function () {
          expect(sideNavs.validateSideNavExistance).toThrowError('SideNavId was not provided');
        });
      });

      describe('when sidenav does not exist', function () {
        it('should throw no sidenav error', function () {
          var target = function () {
            sideNavs.validateSideNavExistance('noNavId');
          };
          expect(target).toThrowError('SideNav does not exist');
        });
      });

      describe('when sidenav exists', function () {
        var sidenavId = 'sidenavId';
        beforeEach(function () {
          sideNavs.sidenavs[sidenavId] = {};
        });

        it('should return truthy', function () {
          expect(sideNavs.validateSideNavExistance(sidenavId)).toBeTruthy();
        });
      });
    });

    describe('removeSideNav', function () {
      var sidenav = {
        id: 'sidenavId'
      };
      beforeEach(function () {
        sideNavs.sidenavs[sidenav.id] = sidenav;
        sideNavs.validateSideNavExistance = jasmine.createSpy();
        sideNavs.removeSideNav(sidenav.id);
      });

      it('should remove existing sidenav from sidenavs', function () {
        expect(sideNavs.sidenavs).not.toContain(sidenav.id);
      });

      it('validates sidenav existance before removing', function () {
        expect(sideNavs.validateSideNavExistance).toHaveBeenCalledWith(sidenav.id);
      });
    });

    describe('addSideNavItem', function () {
      var sidenavId = 'sidenav1',
        subMenuItem1 = {
          title: 'sub1'
        },
        subMenuItem2 = {
          title: 'sub2'
        },
        sidenavItemOptions = {
          title: 'title',
          state: 'state',
          type: 'type',
          class: 'class',
          isPublic: false,
          roles: ['a', 'b'],
          position: 2,
          items: [subMenuItem1, subMenuItem2]
        },
        sidenav,
        sidenavItem;

      beforeEach(function () {
        sideNavs.validateSideNavExistance = jasmine.createSpy();
        sideNavs.addSubSideNavItem = jasmine.createSpy();
        sideNavs.addSideNav(sidenavId, {
          roles: ['a', 'b']
        });
        sidenav = sideNavs.addSideNavItem(sidenavId, sidenavItemOptions);
        sidenavItem = sidenav.items[0];
      });

      it('should validate sidenav existance', function () {
        expect(sideNavs.validateSideNavExistance).toHaveBeenCalledWith(sidenavId);
      });

      it('should return the sidenav', function () {
        expect(sidenav).toBeDefined();
      });

      it('should set sidenav item shouldRender function', function () {
        expect(sidenavItem.shouldRender).toBeDefined();
      });

      describe('with options set', function () {
        it('should add sidenav item to sidenav', function () {
          expect(sidenav.items.length).toBe(1);
        });

        it('should set sidenav item title to options title', function () {
          expect(sidenavItem.title).toBe(sidenavItemOptions.title);
        });

        it('should set sidenav item state to options state', function () {
          expect(sidenavItem.state).toBe(sidenavItemOptions.state);
        });

        it('should set sidenav item type to options type', function () {
          expect(sidenavItem.type).toBe(sidenavItemOptions.type);
        });

        it('should set sidenav item class to options class', function () {
          expect(sidenavItem.class).toBe(sidenavItemOptions.class);
        });

        it('should set sidenav item position to options position', function () {
          expect(sidenavItem.position).toBe(sidenavItemOptions.position);
        });

        it('should call addSubSideNavItem for each item in options', function () {
          expect(sideNavs.addSubSideNavItem).toHaveBeenCalledWith(sidenavId, sidenavItemOptions.state, subMenuItem1);
          expect(sideNavs.addSubSideNavItem).toHaveBeenCalledWith(sidenavId, sidenavItemOptions.state, subMenuItem2);
        });
      });

      describe('without options set', function () {
        beforeEach(function () {
          sidenav = sideNavs.addSideNavItem(sidenavId);
          sidenavItem = sidenav.items[1];
        });

        it('should set sidenav item type to item', function () {
          expect(sidenavItem.type).toBe('item');
        });

        it('should set sidenav item title to empty', function () {
          expect(sidenavItem.title).toBe('');
        });

        it('should set sidenav item isPublic to false', function () {
          expect(sidenavItem.isPublic).toBeFalsy();
        });

        it('should set sidenav item roles to default roles', function () {
          expect(sidenavItem.roles).toEqual(sideNavs.defaultRoles);
        });

        it('should set sidenav item position to 0', function () {
          expect(sidenavItem.position).toBe(0);
        });
      });
    });

    describe('removeSideNavItem', function () {
      var sidenavId = 'sidenavId',
        sidenavItemState = 'sidenav.state1',
        sidenavItemState2 = 'sidenav.state2',
        sidenav;

      beforeEach(function () {
        sideNavs.addSideNav(sidenavId);
        sideNavs.addSideNavItem(sidenavId, {
          state: sidenavItemState
        });
        sideNavs.addSideNavItem(sidenavId, {
          state: sidenavItemState2
        });
        sideNavs.validateSideNavExistance = jasmine.createSpy();
        sidenav = sideNavs.removeSideNavItem(sidenavId, sidenavItemState);
      });

      it('should return sidenav object', function () {
        expect(sidenav).not.toBeNull();
      });

      it('should validate sidenav existance', function () {
        expect(sideNavs.validateSideNavExistance).toHaveBeenCalledWith(sidenavId);
      });

      it('should remove sub sidenav items with same state', function () {
        expect(sidenav.items.length).toBe(1);
        expect(sidenav.items[0].state).toBe(sidenavItemState2);
      });
    });

    describe('addSubSideNavItem', function () {
      var subItemOptions = {
        title: 'title',
        state: 'sub.state',
        isPublic: false,
        roles: ['a', 'b'],
        position: 4
      };
      var sidenavId = 'sidenav1',
        sidenavItem1Options = {
          state: 'item1.state',
          items: [],
          isPublic: false
        },
        sidenavItem2Options = {
          state: 'item2.state2',
          items: [],
          isPublic: true,
          roles: ['a']
        },
        sidenavItem1,
        sidenavItem2,
        sidenavItem3,
        subItem1,
        subItem2,
        sidenav;

      beforeEach(function () {
        sideNavs.validateSideNavExistance = jasmine.createSpy();
        sideNavs.addSideNav(sidenavId);
        sideNavs.addSideNavItem(sidenavId, sidenavItem1Options);
        sideNavs.addSideNavItem(sidenavId, sidenavItem2Options);
        sideNavs.addSideNavItem(sidenavId, {
          state: 'something.else'
        });
        sideNavs.addSubSideNavItem(sidenavId, sidenavItem1Options.state, subItemOptions);
        sidenav = sideNavs.addSubSideNavItem(sidenavId, sidenavItem1Options.state);
        sidenavItem1 = sidenav.items[0];
        sidenavItem2 = sidenav.items[1];
        sidenavItem3 = sidenav.items[2];
        subItem1 = sidenavItem1.items[0];
        subItem2 = sidenavItem1.items[1];
      });

      afterEach(function () {
        sideNavs.removeSideNav(sidenavId);
      });

      it('should return sidenav object', function () {
        expect(sidenav).not.toBeNull();
      });

      it('should validate sidenav existance', function () {
        expect(sideNavs.validateSideNavExistance).toHaveBeenCalledWith(sidenavId);
      });

      it('should not add sub sidenav item to sidenav item of different state', function () {
        expect(sidenavItem3.items.length).toBe(0);
      });

      it('should set shouldRender', function () {
        expect(subItem1.shouldRender).toBeDefined();
      });

      describe('with options set', function () {
        it('should add sub sidenav item to sidenav item', function () {
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
        it('should add sub sidenav item to sidenav item', function () {
          expect(subItem2).toBeDefined();
        });

        it('should set isPublic to parent isPublic', function () {
          expect(subItem2.isPublic).toBe(sidenavItem1.isPublic);
        });

        it('should set title to blank', function () {
          expect(subItem2.title).toBe('');
        });

        it('should set state to blank', function () {
          expect(subItem2.state).toBe('');
        });

        it('should set roles to parent roles', function () {
          expect(subItem2.roles).toEqual(sidenavItem1.roles);
        });

        it('should set position to 0', function () {
          expect(subItem2.position).toBe(0);
        });
      });

      describe('then removeSubNavItem', function () {
        beforeEach(function () {
          sideNavs.validateSideNavExistance = jasmine.createSpy();
          sidenav = sideNavs.removeSubSideNavItem(sidenavId, subItem1.state);
        });

        it('should validate sidenav existance', function () {
          expect(sideNavs.validateSideNavExistance).toHaveBeenCalledWith(sidenavId);
        });

        it('should return sidenav object', function () {
          expect(sidenav).toBeDefined();
        });

        it('should remove sub sidenav item', function () {
          expect(sidenavItem1.items.length).toBe(1);
          expect(sidenavItem1.items[0].state).toEqual(subItem2.state);
        });
      });
    });
  });
}());
