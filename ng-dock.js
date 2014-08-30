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
                message: "dock position must be one of this: " + valids.join(', ')
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
            if ("top|bottom".indexOf(pos) != -1) size = $element.outerHeight(true);
            if ("left|right".indexOf(pos) != -1) size = $element.outerWidth(true);
            if (pos == "bottom") s.bottom += size;
            if (pos == "left")   s.left   += size;
            if (pos == "right")  s.right  += size;
            if (pos == "top")    s.top   += size;
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
      compile: function() {
      },
      controller: function($scope, $element) {
        $scope.__dock_ref_id = String(Math.random()).replace(/\./g, "");
        dock.dockRefs[$scope.__dock_ref_id] = new dock.Area($element);
      },
      scope: true
    };
  })
  .directive('dock', function(dock) { 
    return {
      restrict: "A",
      compile: function($element, $args) {
        return { 
          pre: function preLink($scope, $element, $args) {
          },
          post: function postLink($scope, $element, $args) {
          }
        };
      },
      controller: function($scope, $element) {
        var to = ['top', 'bottom', 'left', 'right', 'fill'];
        if (to.indexOf($element.attr('dock').toLowerCase()) == -1) {
          throw {
            message: "dock position must be one of this: " + to.join(', ')
          }
        }
        $scope.dock = {
          position: $element.attr('dock').toLowerCase()
        };
        $scope.__dock_id = String(Math.random()).replace(/\./g, "");
        var sz = 0;
        if ("top|bottom".indexOf($scope.dock.position) != -1) sz = $element.outerHeight(true);
        if ("left|right".indexOf($scope.dock.position) != -1) sz = $element.outerWidth(true);
        var area = dock.dockRefs[$scope.$parent.__dock_ref_id];
        $element.css(area.addChild($element, $scope.dock.position, sz));
      },
      scope: true
    };
  })
  
