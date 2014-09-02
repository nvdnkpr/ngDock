ngDock
======

angular module for tag dock system

usage:
<body dock-ref>
  <div dock="$angularexpr"></div>
</body>

$angularexpr is an angular expression that returns one of this:
top, left, right, bottom, fill

example:
<body dock-ref>
  <div dock="'fill'"></div>
</body>
or:
<body dock-ref>
  <div dock="myScopeVariable"></div>
</body>

if you want to be able to resize a dock you need to set another directive:
dock-resizable
example:
<body dock-ref>
  <div dock="'top'" dock-resizeble>Top</div>
  <div dock="'fill'">Fill</div>
</body>

notice:
you can only resize a non 'fill' dock
