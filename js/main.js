/*globals window, Player, Key, Forces, Space, Vector, Monster, playerBullets, monsters:true,
FpsMeter, SPACE_WIDTH:true, SPACE_HEIGHT:true, CANVAS:true,
CX:true, Td:true, Asteroids:true, AnimationFrame:true*/

/**
 *    YOU NEED COLLISION TESTING: http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/
 * Asteroids, the Game
 */
window.Asteroids = (function(){
  var ship, space, lastGameTick, animationFrame, fpsMeter;

  var init = function() {
    animationFrame = new AnimationFrame();

    ship = new Player(new Vector(SPACE_WIDTH/2, SPACE_HEIGHT/2));

    space = new Space();
    space.createSpace();

    var rateElem = document.getElementById('rate');
    fpsMeter = new FpsMeter();
    fpsMeter.start(function(fps) {
    	 rateElem.innerHTML = fps + ' FPS';
    });
      // Event handlers
    CANVAS.addEventListener('mousedown', function(e) {
      var target = space.handleMouseDown(e);
      ship.shoot(target);
    });

    console.log('Game initalized.');
  };

  var update = function(Td) {
    ship.update(Td);
  };

  var render = function() {
    var i;
    CX.save();
    CX.clearRect(0,0,SPACE_WIDTH,SPACE_HEIGHT);
    ship.draw();
    space.draw(ship.position);

    var arr = playerBullets;
    for( i = 0; i < arr.length; i++){
        arr[i].draw();
        arr[i].update();
    }

    if (space.getMonsterTime() === 2) {monsters.push( new Monster() );}
    var arrb = monsters;
    for( i = 0; i < arrb.length; i++){
        arrb[i].draw();
        arrb[i].update();
      if( arrb[i].position.x < 0 ) {
        monsters.splice(i, 1); // take away monster
      }
    }

    CX.fillStyle = "green";
    CX.font = "24px Helvetica";
    CX.textAlign = "left";
    CX.textBaseline = "top";
    CX.fillText("Shots fired: " + ship.bulletCount, 16, 16);
    CX.font = "9px Helvetica";
    CX.fillText("(sorry, you can't kill or be killed...)", 16, 42);
    CX.restore();
  };

  var gameLoop = function() {
    var now = Date.now();
    Td = (now - (lastGameTick || now)) / 1000; // Timediff since last frame / gametick
    lastGameTick = now;

    fpsMeter.tick();
    space.countDown();

    animationFrame.request(gameLoop);

    update(Td);
    render();
  };

  return {
    'init': init,
    'gameLoop': gameLoop
  };
}());


window.addEventListener('keyup',   function(event) { Key.onKeyup(event); },   false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

window.Forces = new Forces();
window.Forces.addAcceleration('gravity', new Vector(0, 9.82));
window.Forces.addDamping('drag', 0.97);
window.Forces.addWind('wind', new Vector(0.5, 0));

var element = document.getElementById('canvas1');
var SPACE_WIDTH = element.getAttribute('width');
var SPACE_HEIGHT = element.getAttribute('height');
var CANVAS = element;
var CX = CANVAS.getContext('2d');



/*
 * Document Ready.... then do this!!!!!
 *
 */
//$(function() {
//  'use strict';

  // Initialize Game and commence loop.
  Asteroids.init('canvas1');
  Asteroids.gameLoop();
  console.log('Ready to play.');
//});