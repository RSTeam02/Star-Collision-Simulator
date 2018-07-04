# Star-Collision Simulator

Test-Link: https://rsteam02.github.io/Star-Collision-Simulator/
+ 04.07:
    - drag and drop shape objects with mouselistener (CollisionSim):
        - mousedown: pick up an object in canvas (and stop random movement when dragging) => (drag == true)
        - mousemove: return and set object coordinates when shape is moved, redraw every movement, clear last 
        - mouseup: release an object in canvas, keep last set coordinates (and continue last random movement) => (drag == false)   
    
+ 02.07:
    - explosion effect added
+ 01.07:
    - limit collison log up to 10 entries
    - show/hide collision log
    - improved collision info feedback
+ 29.06:
    - range rotation slider in both directions (counter)clockwise
+ 28.06:
    - limit user direction controls within the canvas area
    - prevent page scrolling when using arrow keys (focus on content with tab key)
    - set radius in visualization mode

+ 27.06: 
    - switch between single visualization model and set of objects
    - visualization mode: 
        - display single star polygon
        - select number of vertices of a star polygon (3 - 100) 
        - rotate object (optional) 
        - choose color with rgb sliders 
        - (un)check fill/stroke


+ controller.js: 
    - generate canvas area
    - generate random star objects, number of objects is required (1 to 50) => params are always given randomly
    - generate rectangle object for bullets => static params
    - start or pause of shape movements
    - choose speed of objects
    - a random star object is assigned to userControl: with arrow keys, move the obj in all directions, ctrl shoots bullets 
    - update frame move shapes (requestAnimationFrame) 

+ polygram.js:
    - class for creating a star polygon instance (also known as polygram):
    - required parameters: x/y pos, s (number of vertices), color in rgb, dy/dx (direction), r (radius)

+ rectangle.js:
    - class for creating a rectangle instance 
    - required parameters: x/y pos, color in rgb, width, height
 

+ shapeStatus.js (inherited class):
    - inherited by polygram.js, rectangle.js
    - check every collision between objects, if detected change direction and rotation    

+ view.js:
    - class for creating a canvas area instance with info tag
    
