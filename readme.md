# Star-Collision Simulator

+ controller.js: 
- generate canvas area
- generate random star objects
- control a random star object (arrows, strg keys) in all directions, 
- update frame move shapes (requestAnimationFrame) 

+ polygram.js:
- generates a star polygon (also called polygram):
- required parameters: x/y pos, s (number of vertices), color in rgb, dy/dx (direction), r (radius), these params are always given randomly

+ rectangle.js:
- generates a rectangle
- required parameters: x/y pos, color in rgb, width, height
- static params, given by user

+ shapeStatus.js (inherited class)
- inherited by polygram.js, rectangle.js
- check every collision between objects, if detected change direction and rotation

