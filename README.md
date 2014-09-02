ngDock
======

angular module for tag dock system

usage:

&lt;body dock-ref&gt;

  &lt;div dock="$angularexpr"&gt;my content&lt;/div&gt;
  
&lt;/body&gt;

$angularexpr is an angular expression that returns one of this:

top, left, right, bottom, fill

example:

&lt;body dock-ref&gt;

  &lt;div dock="'fill'"&gt;&lt;/div&gt;
  
&lt;/body&gt;

or:

&lt;body dock-ref&gt;

  &lt;div dock="myScopeVariable"&gt;my content&lt;/div&gt;
  
&lt;/body&gt;

if you want to be able to resize a dock you need to set another directive:

dock-resizable

example:

&lt;body dock-ref&gt;

  &lt;div dock="'top'" dock-resizeble&gt;Top&lt;/div&gt;

  &lt;div dock="'fill'"&gt;Fill&lt;/div&gt;

&lt;/body&gt;

notice:

you can only resize a non 'fill' dock
