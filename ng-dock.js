angular.module('ngDock', [])
  .factory('dock', function() {
    return {
      dockRefs: {},
      Area: (function() {
        var Area = function($div) {
          var s = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          };
          this.addChild = function($element, pos, size) {
            var valids = [ 'left', 'right', 'top', 'bottom', 'fill' ];
            if (valids.indexOf(pos) == -1)
              throw {
                message: "pos must be one of this: " + valids.join(', ')
              };
            var r = {};
            r.position = 'absolute';
            if (pos != "bottom") r.top = s.top;
            if (pos != "left") r.right = s.right;
            if (pos != "right") r.left = s.left;
            if (pos != "top") r.bottom = s.bottom;
            if ("top|bottom".indexOf(pos) != -1) r.height = size;
            if ("left|right".indexOf(pos) != -1) r.width = size;
            $element.addClass("dock-" + pos);
            $element.css(r);
            if ("top|bottom".indexOf(pos) != -1) size = $element.outerHeight(true);
            if ("left|right".indexOf(pos) != -1) size = $element.outerWidth(true);
            if (pos == "bottom") s.bottom += size;
            if (pos == "left") s.left += size;
            if (pos == "right") s.right += size;
            if (pos == "top") s.top += size;
            $div.css({
              minWidth  : s.left + s.right,
              minHeight : s.top + s.bottom
            });
            $div.css(css);
            return r;
          };
        };
        return Area;
      })()
    };
  })
  .directive('dockRef', function(dock) {
    return {
      restrict: "A",
      link: function($scope, $element, $args) {
        $element.css({
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        });
      },
      controller: function($scope, $element) {
        $scope.__dock_ref_id = String(Math.random()).replace(/\./g, "");
        dock.dockRefs[$scope.__dock_ref_id] = new dock.Area($element);
      },
      scope: true
    };
  })
  .directive('dockTop', function(dock) {
    return {
      restrict: "A",
      link: function($scope, $element, $args) {
        var area = dock.dockRefs[$scope.$parent.__dock_ref_id];
        area.addChild($element, 'top', parseInt($args.dockTop));
      },
      controller: function($scope, $element) {
        $scope.__dock_id = String(Math.random()).replace(/\./g, "");
      },
      scope: true
    };
  })
  .directive('dockLeft', function(dock) {
    return {
      restrict: "A",
      link: function($scope, $element, $args) {
        var area = dock.dockRefs[$scope.$parent.__dock_ref_id];
        area.addChild($element, 'left', parseInt($args.dockLeft));
      },
      controller: function($scope, $element) {
        $scope.__dock_id = String(Math.random()).replace(/\./g, "");
      },
      scope: true
    };
  })
  .directive('dockBottom', function(dock) {
    return {
      restrict: "A",
      link: function($scope, $element, $args) {
        var area = dock.dockRefs[$scope.$parent.__dock_ref_id];
        area.addChild($element, 'bottom', parseInt($args.dockBottom));
      },
      controller: function($scope, $element) {
        $scope.__dock_id = String(Math.random()).replace(/\./g, "");
      },
      scope: true
    };
  })
  .directive('dockRight', function(dock) {
    return {
      restrict: "A",
      link: function($scope, $element, $args) {
        var area = dock.dockRefs[$scope.$parent.__dock_ref_id];
        area.addChild($element, 'right', parseInt($args.dockRight));
      },
      controller: function($scope, $element) {
        $scope.__dock_id = String(Math.random()).replace(/\./g, "");
      },
      scope: true
    };
  })
  .directive('dockFill', function(dock) {
    return {
      restrict: "A",
      link: function($scope, $element, $args) {
        var area = dock.dockRefs[$scope.$parent.__dock_ref_id];
        area.addChild($element, 'fill');
      },
      controller: function($scope, $element) {
        $scope.__dock_id = String(Math.random()).replace(/\./g, "");
      },
      scope: true
    };
  })
