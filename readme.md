# Star-Collision Simulator

Test-Link: https://rsteam02.github.io/Star-Collision-Simulator/

+ 14.07:
    - if canvas bound is reached => stop counting distance, distinguish between diagonal and non-diagonal controls (keyboard control with arrows)  
+ 13.07:
    - determine for each object the distance in pixel
+ 12.07:
    - set dragspeed to 0 if mouse has stopped moving 
    - determine maximum reached dragSpeed of each object

+ 10.07: 
    - determine speed of dragged object (pixel per sec), reference: https://stackoverflow.com/questions/45519597/get-mouse-moving-speed
        - calculate absolute difference of current time-last time (measured time) and current position-last position (distance between two points in 2D) 
        - calculate speed = 1000 * distance/time (in seconds)
+ 07.07:
    - use of experimental Path2D() to seperate vector (path) data from view, reference: https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D
    - some refactoring (08.07)
    - checkbox for displaying all attributes of all objects  
+ 05.07:
    - display attributes of every object (Collision-Sim Mode) 
        - hover on object => display type of shape and position coordinates (x/y)
    - remove object from array, when it was hit by bullet (arr.splice(index, 1))
+ 04.07:
    - drag and drop shape object with mouselistener (Collision-Sim Mode):
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
    
