/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _states = __webpack_require__(1);
	
	var _states2 = _interopRequireDefault(_states);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// 2x Gameboy resolution
	var width = 480;
	var height = 360;
	var renderer = Phaser.AUTO;
	var parent = 'content';
	var defaultState = null;
	var transparent = false;
	var antialias = false;
	var physicsConfig = null;
	var game = new Phaser.Game(width, height, renderer, parent, defaultState, transparent, antialias, physicsConfig);
	
	_states2.default.loading(game.state);
	
	global.game = game;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Gameplay = __webpack_require__(2);
	
	var _Gameplay2 = _interopRequireDefault(_Gameplay);
	
	var _Loading = __webpack_require__(24);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _Menu = __webpack_require__(26);
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  loading: function loading(stateManager) {
	    changeState(stateManager, _Loading2.default);
	  },
	
	  menu: function menu(stateManager) {
	    changeState(stateManager, _Menu2.default);
	  },
	
	  gameplay: function gameplay(stateManager) {
	    changeState(stateManager, _Gameplay2.default);
	  }
	};
	
	/**
	 * This weird little work-around is here because I wasn't able to import
	 * index.js into files in the same directory. Injecting the module via
	 * each state's constructor felt OKAY, but I'd love to understand more.
	 */
	function createState(state) {
	  return new state(module.exports);
	}
	
	function changeState(stateManager, state) {
	  if (stateManager.checkState(state.name) != true) {
	    stateManager.add(state.name, createState(state));
	  }
	  stateManager.start(state.name);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _game_objects = __webpack_require__(4);
	
	var _game_objects2 = _interopRequireDefault(_game_objects);
	
	var _display_objects = __webpack_require__(14);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
	var _ui = __webpack_require__(19);
	
	var _ui2 = _interopRequireDefault(_ui);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ALIEN_RANGE = 250;
	var REQUIRED_SCORE = 20;
	
	var Gameplay = function (_State2) {
	  _inherits(Gameplay, _State2);
	
	  function Gameplay() {
	    _classCallCheck(this, Gameplay);
	
	    return _possibleConstructorReturn(this, (Gameplay.__proto__ || Object.getPrototypeOf(Gameplay)).apply(this, arguments));
	  }
	
	  _createClass(Gameplay, [{
	    key: 'create',
	    value: function create() {
	      var _this2 = this;
	
	      _ui2.default.gameOver.create(this);
	      _ui2.default.win.create(this);
	      this.attached = false;
	      this.background = _display_objects2.default.background(game);
	      this.stage.backgroundColor = '#000000';
	
	      game.physics.startSystem(Phaser.Physics.P2JS);
	      game.physics.p2.setBoundsToWorld(false, false, false, false, false);
	      game.physics.p2.restitution = 0.8;
	
	      this.world.setBounds(0, 0, 480, 360);
	      this.earth = _display_objects2.default.earth(game, 380, 264);
	      this.throwables = _game_objects2.default.throwables(game, this.earth.x, this.earth.y);
	      this.enemies = _game_objects2.default.enemies(game, 100, 100);
	
	      this.motherShip = _game_objects2.default.mothership(game, 50, 50);
	      this.motherShip.onFled.addOnce(this.win, this);
	      this.MouseObject = _game_objects2.default.mouse(game, game.input.x, game.input.y);
	      this.score = 0;
	      this.nextAngerThreshold = 5;
	
	      this.stagingPoints = [new Phaser.Point(70, 70), new Phaser.Point(70, -20), new Phaser.Point(0, 90)];
	
	      this.line = new Phaser.Line();
	      this.draggingBody = null;
	
	      this.add.existing(this.motherShip);
	      this.add.existing(this.MouseObject);
	
	      game.input.onDown.add(this.click, this);
	      game.input.addMoveCallback(this.move, this);
	
	      this.earth.onPolluted.addOnce(this.loseGame, this);
	
	      this.spawnNewAlien();
	      this.game.time.events.loop(1500, function () {
	        _this2.spawnNewThrowable();
	        _this2.spawnNewAlien();
	      });
	    }
	  }, {
	    key: 'win',
	    value: function win() {
	      var _this3 = this;
	
	      var successLevel = 3;
	      if (this.earth.health > 80) {
	        successLevel = 1;
	      } else if (this.earth.health > 45) {
	        successLevel = 2;
	      }
	
	      _ui2.default.win.show(successLevel, function () {
	        _this3.stateProvider.gameplay(_this3.state);
	      });
	    }
	  }, {
	    key: 'spawnNewThrowable',
	    value: function spawnNewThrowable() {
	      var _this4 = this;
	
	      var throwable = this.throwables.spawn();
	      if (throwable) {
	        this.game.sound.play('jettison', 0.25);
	        throwable.scale.setTo(0.1, 0.1);
	
	        var scaleTween = this.game.add.tween(throwable.scale);
	        var positionTween = this.game.add.tween(throwable.body);
	        var x = throwable.x - this.stagingPoints[throwable.index].x;
	        var y = throwable.y - this.stagingPoints[throwable.index].y;
	
	        scaleTween.to({ x: 1, y: 1 }, 400, Phaser.Easing.Quadratic.Out, true);
	        positionTween.to({ x: x, y: y }, 400, Phaser.Easing.Quadratic.Out, true);
	
	        scaleTween.onComplete.add(function () {
	          throwable.rotation = 0;
	
	          throwable.ready();
	          _this4.earth.doDamage(-1);
	        });
	      }
	    }
	  }, {
	    key: 'spawnNewAlien',
	    value: function spawnNewAlien() {
	      var enemy = this.enemies.spawn();
	      if (enemy) {
	        enemy.body.x = 100;
	        enemy.body.y = 100;
	        enemy.onMove.add(this.checkRange, this, 0, enemy);
	        enemy.onShoot.add(this.throwTrash, this, 0, enemy);
	        enemy.body.onBeginContact.add(this.alienHit, this, 0, enemy);
	      }
	    }
	  }, {
	    key: 'loseGame',
	    value: function loseGame() {
	      var _this5 = this;
	
	      _ui2.default.gameOver.show(function () {
	        _this5.stateProvider.gameplay(_this5.state);
	      });
	    }
	  }, {
	    key: 'checkRange',
	    value: function checkRange(enemy) {
	      var sourceX = enemy.x;
	      var sourceY = enemy.y;
	      var targetX = this.earth.x;
	      var targetY = this.earth.y;
	
	      var distance = Phaser.Math.distance(sourceX, sourceY, targetX, targetY);
	
	      if (distance < ALIEN_RANGE) {
	        enemy.attack();
	      }
	    }
	  }, {
	    key: 'throwTrash',
	    value: function throwTrash(enemy) {
	      var _this6 = this;
	
	      var trash = new _game_objects2.default.trash(game, enemy.body.x, enemy.body.y);
	      this.add.existing(trash);
	      var tween = this.game.add.tween(trash);
	      tween.to({ x: this.earth.x, y: this.earth.y }, 1000, Phaser.Easing.Quadratic.Out, true);
	      this.game.sound.play('trash', 0.35);
	
	      tween.onComplete.add(function () {
	        trash.destroy();
	        _this6.earth.doDamage(7);
	        _this6.game.sound.play('trashHit', 0.35);
	      });
	    }
	  }, {
	    key: 'alienHit',
	    value: function alienHit(collidedWith, b, c, d, e, enemy) {
	      enemy.onMove.removeAll();
	      enemy.onShoot.removeAll();
	      enemy.splode();
	      this.score++;
	      if (collidedWith.sprite.exists) {
	        collidedWith.sprite.kill();
	      }
	    }
	  }, {
	    key: 'move',
	    value: function move(pointer, x, y, isDown) {
	      if (!this.drawLine) {
	        this.MouseObject.body.x = x;
	        this.MouseObject.body.y = y;
	      } else {
	        var rads = Phaser.Math.angleBetweenPoints(this.MouseObject.body, this.draggingBody);
	        this.draggingBody.x = x;
	        this.draggingBody.y = y;
	        this.draggingBody.rotation = rads - 1.57;
	      }
	    }
	  }, {
	    key: 'click',
	    value: function click(pointer) {
	      var bodies = game.physics.p2.hitTest(pointer.position, this.throwables.children);
	
	      if (bodies.length) {
	        var body = bodies[0].parent;
	        body.static = true;
	        this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, body.x, body.y);
	        this.drawLine = true;
	        body.setZeroVelocity();
	        this.draggingBody = body;
	        this.game.input.onUp.addOnce(this.release, this);
	      }
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      var sourceX = this.draggingBody.x;
	      var sourceY = this.draggingBody.y;
	      var targetX = this.MouseObject.body.x;
	      var targetY = this.MouseObject.body.y;
	
	      var lineLength = Phaser.Math.distance(sourceX, sourceY, targetX, targetY);
	      this.game.sound.play('shoot', 0.35);
	
	      this.draggingBody.static = false;
	      this.draggingBody.thrust(lineLength * 400);
	      this.drawLine = false;
	      this.draggingBody = null;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var _this7 = this;
	
	      this.throwables.forEach(function (throwable) {
	        if (!_this7.world.bounds.contains(throwable.x, throwable.y) && throwable.exists) {
	          throwable.kill();
	        }
	      });
	
	      if (this.score >= this.nextAngerThreshold) {
	        this.nextAngerThreshold += 5;
	        this.motherShip.anger();
	      }
	
	      if (this.score > REQUIRED_SCORE && !this.earth.invincible) {
	        this.enemies.splode();
	        this.motherShip.flee();
	        this.game.sound.play('flee', 0.45);
	        this.earth.invincible = true;
	      }
	    }
	  }, {
	    key: 'preRender',
	    value: function preRender() {
	      if (this.line && this.draggingBody) {
	        this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, this.draggingBody.x, this.draggingBody.y);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.drawLine) {
	        game.debug.geom(this.line);
	      }
	    }
	  }]);
	
	  return Gameplay;
	}(_State4.default);
	
	exports.default = Gameplay;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _State = function (_Phaser$State) {
	  _inherits(_State, _Phaser$State);
	
	  function _State(stateProvider) {
	    _classCallCheck(this, _State);
	
	    var _this = _possibleConstructorReturn(this, (_State.__proto__ || Object.getPrototypeOf(_State)).call(this));
	
	    _this.stateProvider = stateProvider;
	    return _this;
	  }
	
	  return _State;
	}(Phaser.State);
	
	exports.default = _State;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Ship = __webpack_require__(5);
	
	var _Ship2 = _interopRequireDefault(_Ship);
	
	var _ThrowableObject = __webpack_require__(6);
	
	var _ThrowableObject2 = _interopRequireDefault(_ThrowableObject);
	
	var _MouseObject = __webpack_require__(7);
	
	var _MouseObject2 = _interopRequireDefault(_MouseObject);
	
	var _Alien = __webpack_require__(8);
	
	var _Alien2 = _interopRequireDefault(_Alien);
	
	var _Trash = __webpack_require__(9);
	
	var _Trash2 = _interopRequireDefault(_Trash);
	
	var _Throwables = __webpack_require__(10);
	
	var _Throwables2 = _interopRequireDefault(_Throwables);
	
	var _Enemies = __webpack_require__(12);
	
	var _Enemies2 = _interopRequireDefault(_Enemies);
	
	var _Mothership = __webpack_require__(13);
	
	var _Mothership2 = _interopRequireDefault(_Mothership);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PLAYER_SHIP = 'ship';
	var CAR1 = 'car1';
	var ALIEN = 'alienSpriteSheet';
	var COW = 'spaceCow';
	var EXPLOSION = 'explosion';
	var FLING = 'fling';
	var TRASH = 'trash';
	var MOTHERSHIP = 'mothership';
	var COAL_PLANT = 'coalPlant';
	
	module.exports = {
	  load: function load(loader) {
	    loader.load.spritesheet(PLAYER_SHIP, 'ship.png', 6, 6);
	    loader.load.spritesheet(CAR1, 'car1.png', 16, 16);
	    loader.load.spritesheet(ALIEN, 'alien.png', 16, 16);
	    loader.load.spritesheet(COW, 'spaceCow.png', 16, 16);
	    loader.load.spritesheet(FLING, 'fling.png', 16, 16);
	    loader.load.spritesheet(TRASH, 'trash.png', 8, 8);
	    loader.load.spritesheet(MOTHERSHIP, 'motherShip.png', 64, 64);
	    loader.load.spritesheet(COAL_PLANT, 'coalPlant.png', 32, 32);
	    loader.load.physics('physicsData', 'mothership.json');
	  },
	
	  mothership: function mothership(game, x, y) {
	    return new _Mothership2.default(game, x, y, MOTHERSHIP);
	  },
	
	  player: function player(game, x, y) {
	    return new _Ship2.default(game, x, y, PLAYER_SHIP);
	  },
	
	  car: function car(game, x, y) {
	    return new _ThrowableObject2.default(game, x, y, CAR1);
	  },
	
	  cow: function cow(game, x, y) {
	    return new _ThrowableObject2.default(game, x, y, COW);
	  },
	
	  mouse: function mouse(game, x, y) {
	    return new _MouseObject2.default(game, x, y, FLING);
	  },
	
	  alien: function alien(game, x, y) {
	    return new _Alien2.default(game, x, y, ALIEN);
	  },
	
	  trash: function trash(game, x, y) {
	    return new _Trash2.default(game, x, y, TRASH);
	  },
	
	  throwables: function throwables(game, x, y) {
	    return new _Throwables2.default(game, x, y, [COAL_PLANT, CAR1, COW]);
	  },
	
	  enemies: function enemies(game, x, y) {
	    return new _Enemies2.default(game, x, y, ALIEN);
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ship = function (_Phaser$Sprite) {
	  _inherits(Ship, _Phaser$Sprite);
	
	  function Ship(game, x, y, key) {
	    _classCallCheck(this, Ship);
	
	    var _this = _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this, game, x, y, key));
	
	    _this.animations.add('normal', [0, 1, 2], 20, true);
	    _this.animations.add('bank', [3, 4, 5], 20, true);
	    _this.animations.add('explode', [6, 7, 8], 12, false);
	    _this.anchor.setTo(0.5, 1);
	
	    game.physics.enable(_this);
	    _this.body.drag.x = 300;
	    _this.body.maxVelocity = new Phaser.Point(120, 120);
	    _this.normal();
	    return _this;
	  }
	
	  _createClass(Ship, [{
	    key: 'respawn',
	    value: function respawn() {
	      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	      this.health = 100;
	      this.alive = true;
	      this.x = x;
	      this.y = y;
	      this.body.velocity.x = 0;
	      this.revive();
	      this.normal();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.health = 0;
	      this.animations.play('explode', null, null, true);
	    }
	  }, {
	    key: 'normal',
	    value: function normal() {
	      if (this.health > 0) {
	        this.animations.play('normal');
	        this.scale.x = 1;
	      }
	    }
	  }, {
	    key: 'bankLeft',
	    value: function bankLeft() {
	      if (this.health > 0) {
	        this.animations.play('bank');
	        this.body.velocity.x = -this.body.maxVelocity.x;
	        this.scale.x = 1;
	      }
	    }
	  }, {
	    key: 'bankRight',
	    value: function bankRight() {
	      if (this.health > 0) {
	        this.animations.play('bank');
	        this.body.velocity.x = this.body.maxVelocity.x;
	        this.scale.x = -1;
	      }
	    }
	  }]);
	
	  return Ship;
	}(Phaser.Sprite);
	
	exports.default = Ship;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ThrowableObject = function (_Phaser$Sprite) {
	  _inherits(ThrowableObject, _Phaser$Sprite);
	
	  function ThrowableObject(game, x, y, key) {
	    _classCallCheck(this, ThrowableObject);
	
	    var _this = _possibleConstructorReturn(this, (ThrowableObject.__proto__ || Object.getPrototypeOf(ThrowableObject)).call(this, game, x, y, key));
	
	    _this.anchor.setTo(0.5, 0.5);
	
	    game.physics.p2.enable(_this, false);
	    return _this;
	  }
	
	  _createClass(ThrowableObject, [{
	    key: "ready",
	    value: function ready() {
	      this.body.collideWorldBounds = false;
	
	      this.body.setCircle(10);
	      this.body.static = false;
	    }
	  }]);
	
	  return ThrowableObject;
	}(Phaser.Sprite);
	
	exports.default = ThrowableObject;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MouseObject = function (_Phaser$Sprite) {
	  _inherits(MouseObject, _Phaser$Sprite);
	
	  function MouseObject(game, x, y, key) {
	    _classCallCheck(this, MouseObject);
	
	    var _this = _possibleConstructorReturn(this, (MouseObject.__proto__ || Object.getPrototypeOf(MouseObject)).call(this, game, x, y, key));
	
	    _this.anchor.setTo(0.5, 1);
	
	    game.physics.p2.enable(_this, false);
	    _this.body.static = true;
	    _this.body.setCircle(9);
	    _this.body.data.shapes[0].sensor = true;
	    return _this;
	  }
	
	  return MouseObject;
	}(Phaser.Sprite);
	
	exports.default = MouseObject;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DURATION = 100;
	var DISTANCE = 64;
	var MAX_IDLE_MOVES = 3;
	
	var Alien = function (_Phaser$Sprite) {
	    _inherits(Alien, _Phaser$Sprite);
	
	    function Alien(game, x, y, spritesheetKey) {
	        _classCallCheck(this, Alien);
	
	        var _this = _possibleConstructorReturn(this, (Alien.__proto__ || Object.getPrototypeOf(Alien)).call(this, game, x, y, spritesheetKey, 0));
	
	        _this.onMove = new Phaser.Signal();
	        _this.onShoot = new Phaser.Signal();
	
	        game.physics.p2.enable(_this, false);
	        _this.body.static = true;
	        _this.body.setCircle(9);
	        _this.body.data.shapes[0].sensor = true;
	        _this.animations.add('idle', [0, 1, 2, 3], 6, true);
	        _this.animations.add('splode', [4, 5, 7, 8, 10, 11], 10, false);
	        _this.game.time.events.loop(1500, function () {
	            _this.act();
	        });
	
	        _this.init();
	        return _this;
	    }
	
	    _createClass(Alien, [{
	        key: 'init',
	        value: function init() {
	            this.inRange = false;
	            this.notAlive = false;
	            this.idleMoves = 0;
	            this.animations.play('idle');
	        }
	    }, {
	        key: 'update',
	        value: function update() {}
	    }, {
	        key: 'act',
	        value: function act() {
	            if (this.notAlive) {
	                return;
	            }
	
	            if (this.inRange) {
	                this.shoot();
	            } else {
	                this.move();
	            }
	        }
	    }, {
	        key: 'move',
	        value: function move() {
	            var _this2 = this;
	
	            var centerX = this.body.x;
	            var centerY = this.body.y;
	            var destination = void 0;
	            if (this.idleMoves > MAX_IDLE_MOVES) {
	                destination = pointTowardsTarget(game, centerX, centerY);
	            } else {
	                destination = pointInBounds(game, centerX, centerY);
	            }
	
	            this.tween = this.game.add.tween(this.body);
	
	            this.tween.onComplete.add(function () {
	                _this2.onMove.dispatch();
	                _this2.tween = null;
	            });
	
	            this.tween.to({ x: destination.x, y: destination.y }, DURATION, Phaser.Easing.Quadratic.Out, true);
	            this.idleMoves++;
	        }
	    }, {
	        key: 'splode',
	        value: function splode() {
	            var _this3 = this;
	
	            var suffix = game.rnd.integerInRange(1, 3);
	
	            this.game.sound.play('explosion_' + suffix, 0.5);
	            if (this.tween) {
	                this.tween.stop();
	                this.tween = null;
	            }
	            this.notAlive = true;
	            var anim = this.animations.play('splode', 10, false, true);
	            anim.onComplete.addOnce(function () {
	                _this3.kill();
	            });
	        }
	    }, {
	        key: 'regen',
	        value: function regen() {
	            this.reset(100, 100, 100);
	            this.init();
	        }
	    }, {
	        key: 'attack',
	        value: function attack() {
	            this.inRange = true;
	        }
	    }, {
	        key: 'shoot',
	        value: function shoot() {
	            this.onShoot.dispatch();
	        }
	    }]);
	
	    return Alien;
	}(Phaser.Sprite);
	
	exports.default = Alien;
	
	
	function pointTowardsTarget(game, centerX, centerY) {
	    var angle = Phaser.Math.angleBetweenPoints({ x: centerX, y: centerY }, { x: 480, y: 360 });
	    var x = centerX + DISTANCE * Math.cos(angle);
	    var y = centerY + DISTANCE * Math.sin(angle);
	
	    return { x: x, y: y };
	}
	
	function pointInBounds(game, centerX, centerY) {
	    var angle = game.rnd.integerInRange(1, 360);
	    var x = centerX + DISTANCE * Math.cos(angle);
	    var y = centerY + DISTANCE * Math.sin(angle);
	
	    while (x < 20 || x > 460 || y < 20 || y > 340) {
	        angle = game.rnd.integerInRange(1, 360);
	        x = centerX + DISTANCE * Math.cos(angle);
	        y = centerY + DISTANCE * Math.sin(angle);
	    }
	
	    return { x: x, y: y };
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Trash = function (_Phaser$Sprite) {
	    _inherits(Trash, _Phaser$Sprite);
	
	    function Trash(game, x, y, key) {
	        _classCallCheck(this, Trash);
	
	        return _possibleConstructorReturn(this, (Trash.__proto__ || Object.getPrototypeOf(Trash)).call(this, game, x, y, key));
	    }
	
	    return Trash;
	}(Phaser.Sprite);
	
	exports.default = Trash;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ThrowableObject = __webpack_require__(6);
	
	var _ThrowableObject2 = _interopRequireDefault(_ThrowableObject);
	
	var _CoalPlant = __webpack_require__(11);
	
	var _CoalPlant2 = _interopRequireDefault(_CoalPlant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Throwables = function (_Phaser$Group) {
	    _inherits(Throwables, _Phaser$Group);
	
	    function Throwables(game, x, y, childTypes) {
	        _classCallCheck(this, Throwables);
	
	        var _this = _possibleConstructorReturn(this, (Throwables.__proto__ || Object.getPrototypeOf(Throwables)).call(this, game));
	
	        _this.childTypes = childTypes;
	        _this.childX = x;
	        _this.childY = y;
	        _this.maxCount = 3;
	        _this.index = 0;
	        return _this;
	    }
	
	    _createClass(Throwables, [{
	        key: 'spawn',
	        value: function spawn() {
	            var child = this.getFirstDead();
	
	            if (!child) {
	                if (this.length < this.maxCount) {
	                    if (this.index === 0) {
	                        child = new _CoalPlant2.default(this.game, this.childX, this.childY);
	                    } else {
	                        child = new _ThrowableObject2.default(this.game, this.childX, this.childY, this.childTypes[this.index]);
	                    }
	                    this.add(child);
	                    child.index = this.index;
	                    this.index++;
	                }
	            } else {
	                child.reset(this.childX, this.childY);
	                child.body.static = true;
	            }
	
	            return child;
	        }
	    }]);
	
	    return Throwables;
	}(Phaser.Group);
	
	exports.default = Throwables;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _ThrowableObject2 = __webpack_require__(6);
	
	var _ThrowableObject3 = _interopRequireDefault(_ThrowableObject2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CoalPlant = function (_ThrowableObject) {
	    _inherits(CoalPlant, _ThrowableObject);
	
	    function CoalPlant(game, x, y) {
	        _classCallCheck(this, CoalPlant);
	
	        var _this = _possibleConstructorReturn(this, (CoalPlant.__proto__ || Object.getPrototypeOf(CoalPlant)).call(this, game, x, y, 'coalPlant'));
	
	        _this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8], 14, true);
	        _this.animations.play('idle');
	        return _this;
	    }
	
	    _createClass(CoalPlant, [{
	        key: 'ready',
	        value: function ready() {
	            _get(CoalPlant.prototype.__proto__ || Object.getPrototypeOf(CoalPlant.prototype), 'ready', this).call(this);
	            this.body.setRectangleFromSprite(this);
	        }
	    }]);
	
	    return CoalPlant;
	}(_ThrowableObject3.default);
	
	exports.default = CoalPlant;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Alien = __webpack_require__(8);
	
	var _Alien2 = _interopRequireDefault(_Alien);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Enemies = function (_Phaser$Group) {
	    _inherits(Enemies, _Phaser$Group);
	
	    function Enemies(game, x, y, spriteKey) {
	        _classCallCheck(this, Enemies);
	
	        var _this = _possibleConstructorReturn(this, (Enemies.__proto__ || Object.getPrototypeOf(Enemies)).call(this, game));
	
	        _this.spriteKey = spriteKey;
	        _this.childX = x;
	        _this.childY = y;
	        _this.maxCount = 3;
	        _this.sploded = false;
	        return _this;
	    }
	
	    _createClass(Enemies, [{
	        key: 'spawn',
	        value: function spawn() {
	            if (this.sploded) return;
	
	            var child = this.getFirstDead();
	
	            if (!child) {
	                if (this.length < this.maxCount) {
	                    child = new _Alien2.default(this.game, this.childX, this.childY, this.spriteKey);
	                    this.add(child);
	                }
	            } else {
	                child.regen();
	            }
	
	            return child;
	        }
	    }, {
	        key: 'splode',
	        value: function splode() {
	            this.sploded = true;
	            var existing = this.children.filter(function (child) {
	                return child.exists;
	            });
	
	            existing.forEach(function (child) {
	                child.splode();
	            });
	        }
	    }]);
	
	    return Enemies;
	}(Phaser.Group);
	
	exports.default = Enemies;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Alien = function (_Phaser$Sprite) {
	    _inherits(Alien, _Phaser$Sprite);
	
	    function Alien(game, x, y, spritesheetKey) {
	        _classCallCheck(this, Alien);
	
	        var _this = _possibleConstructorReturn(this, (Alien.__proto__ || Object.getPrototypeOf(Alien)).call(this, game, x, y, spritesheetKey, 0));
	
	        game.physics.p2.enable(_this, false);
	        _this.body.static = true;
	        _this.onFled = new Phaser.Signal();
	        _this.angerLevel = 0;
	
	        _this.body.clearShapes();
	        _this.body.loadPolygon('physicsData', 'motherShip');
	        _this.animations.add('angerLevel_0', [0, 4], 9, true);
	        _this.animations.add('angerLevel_1', [1, 5], 9, true);
	        _this.animations.add('angerLevel_2', [2, 6], 9, true);
	        _this.animations.add('angerLevel_3', [3, 7], 9, true);
	
	        _this.animations.play('angerLevel_' + _this.angerLevel);
	        return _this;
	    }
	
	    _createClass(Alien, [{
	        key: 'anger',
	        value: function anger() {
	            this.angerLevel++;
	            this.animations.play('angerLevel_' + this.angerLevel);
	        }
	    }, {
	        key: 'flee',
	        value: function flee() {
	            var _this2 = this;
	
	            var tween = this.game.add.tween(this.body);
	            tween.to({ x: -100, y: -100 }, 2000, Phaser.Easing.Quadratic.Out, true);
	
	            tween.onComplete.add(function () {
	                _this2.onFled.dispatch();
	            });
	        }
	    }]);
	
	    return Alien;
	}(Phaser.Sprite);
	
	exports.default = Alien;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _BitmapFont = __webpack_require__(15);
	
	var _BitmapFont2 = _interopRequireDefault(_BitmapFont);
	
	var _ProgressBar = __webpack_require__(16);
	
	var _ProgressBar2 = _interopRequireDefault(_ProgressBar);
	
	var _SpaceField = __webpack_require__(17);
	
	var _SpaceField2 = _interopRequireDefault(_SpaceField);
	
	var _Planet = __webpack_require__(18);
	
	var _Planet2 = _interopRequireDefault(_Planet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DISPLAY_FONT = 'Blocktopia_32pt';
	var BODY_FONT = 'Blocktopia_12pt';
	var PROGRESS_LEFT = 'progress_left';
	var PROGRESS_MID = 'progress_mid';
	var PROGRESS_RIGHT = 'progress_right';
	var PROGRESS_RED_FILL = 'progress_red_fill';
	var SPACE_1 = 'space_1';
	var SPACE_2 = 'space_2';
	var SPACE_3 = 'space_3';
	var SPACE_4 = 'space_4';
	var EARTH = 'earth';
	var SAD_EARTH = 'sad_earth';
	var PLANET_OUTLINE = 'planet_outline';
	
	module.exports = {
	  load: function load(loader) {
	    var images = {};
	
	    images[PROGRESS_LEFT] = 'progress_left.png';
	    images[PROGRESS_MID] = 'progress_mid.png';
	    images[PROGRESS_RIGHT] = 'progress_right.png';
	    images[PROGRESS_RED_FILL] = 'progress_red_fill.png';
	    images[SPACE_1] = 'space_1.png';
	    images[SPACE_2] = 'dust.png';
	    images[SPACE_3] = 'space_3.png';
	    images[SPACE_4] = 'space_4.png';
	    images[EARTH] = 'world3.png';
	    images[SAD_EARTH] = 'world4.png';
	    images[PLANET_OUTLINE] = 'world_outline.png';
	
	    loader.load.bitmapFont(DISPLAY_FONT, 'Blocktopia_32pt.png', 'Blocktopia_32pt.fnt');
	    loader.load.bitmapFont(BODY_FONT, 'Blocktopia_12pt.png', 'Blocktopia_12pt.fnt');
	    loader.load.images(Object.keys(images), Object.values(images));
	  },
	
	  displayFont: function displayFont(game) {
	    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	    var align = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'left';
	
	    return new _BitmapFont2.default(game, x, y, DISPLAY_FONT, text, 32, align);
	  },
	
	  bodyFont: function bodyFont(game) {
	    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	    var align = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'left';
	
	    return new _BitmapFont2.default(game, x, y, BODY_FONT, text, 12, align);
	  },
	
	  healthBar: function healthBar(game, x, y, width) {
	    var maxValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 100;
	    var initialValue = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
	
	    return new _ProgressBar2.default(game, x, y, width, maxValue, initialValue, PROGRESS_LEFT, PROGRESS_MID, PROGRESS_RIGHT, PROGRESS_RED_FILL);
	  },
	
	  background: function background(game) {
	    return new _SpaceField2.default(game, [SPACE_1, SPACE_2, SPACE_3, SPACE_4]);
	  },
	
	  earth: function earth(game, x, y) {
	    return new _Planet2.default(game, x, y, EARTH, SAD_EARTH, PLANET_OUTLINE);
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BitmapFont = function (_Phaser$BitmapText) {
	  _inherits(BitmapFont, _Phaser$BitmapText);
	
	  function BitmapFont(game, x, y, key, text, size, align) {
	    _classCallCheck(this, BitmapFont);
	
	    return _possibleConstructorReturn(this, (BitmapFont.__proto__ || Object.getPrototypeOf(BitmapFont)).call(this, game, x, y, key, text, size, align));
	  }
	
	  /**
	   * @override Phaser.BitmapText._align
	   */
	
	
	  _createClass(BitmapFont, [{
	    key: '_align',
	    set: function set(value) {
	      this.__align = value;
	      switch (value) {
	        case 'center':
	          this.anchor.x = 0.5;
	          this.anchor.y = 0.5;
	          break;
	        case 'right':
	          this.anchor.x = 1;
	          this.anchor.y = 0.5;
	          break;
	        case 'left':
	        default:
	          this.anchor.x = 0;
	          this.anchor.y = 0.5;
	          break;
	      }
	    },
	    get: function get() {
	      return this.__align;
	    }
	  }]);
	
	  return BitmapFont;
	}(Phaser.BitmapText);
	
	exports.default = BitmapFont;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ProgressBar = function (_Phaser$Group) {
	    _inherits(ProgressBar, _Phaser$Group);
	
	    function ProgressBar(game, x, y, width, maxValue, initialValue, leftImageKey, midImageKey, rightImageKey, fillImageKey) {
	        _classCallCheck(this, ProgressBar);
	
	        var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this, game));
	
	        _this.x = x;
	        _this.y = y;
	        _this.padding = 9;
	        _this.maxValue = maxValue;
	        _this._currentValue = 0;
	
	        _this.leftImage = new Phaser.Image(game, 0, 0, leftImageKey);
	        _this.midImage = new Phaser.Image(game, 0, 0, midImageKey);
	        _this.rightImage = new Phaser.Image(game, 0, 0, rightImageKey);
	        _this.fillImage = new Phaser.Image(game, 0, 0, fillImageKey);
	
	        var edgeWidth = _this.leftImage.width + _this.rightImage.width;
	        var midWidth = Math.max(width - edgeWidth, 0);
	
	        _this.fillImage.x = _this.padding;
	        _this.fillMaxWidth = midWidth + edgeWidth - _this.padding * 2;
	        _this.midImage.width = midWidth;
	        _this.midImage.x = _this.leftImage.width;
	        _this.rightImage.x = _this.leftImage.width + _this.midImage.width;
	
	        _this.add(_this.leftImage);
	        _this.add(_this.midImage);
	        _this.add(_this.rightImage);
	        _this.add(_this.fillImage);
	        _this.value = initialValue;
	        return _this;
	    }
	
	    _createClass(ProgressBar, [{
	        key: "value",
	        set: function set(value) {
	            this._currentValue = Math.min(Math.max(value, 0), this.maxValue);
	            var normal = this._currentValue / this.maxValue;
	            var fillWidth = normal * this.fillMaxWidth;
	
	            this.fillImage.width = fillWidth;
	        },
	        get: function get() {
	            return this._currentValue;
	        }
	    }]);
	
	    return ProgressBar;
	}(Phaser.Group);
	
	exports.default = ProgressBar;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SpaceField = function (_Phaser$Group) {
	    _inherits(SpaceField, _Phaser$Group);
	
	    function SpaceField(game, imageKeys) {
	        _classCallCheck(this, SpaceField);
	
	        var _this = _possibleConstructorReturn(this, (SpaceField.__proto__ || Object.getPrototypeOf(SpaceField)).call(this, game));
	
	        var count = imageKeys.length;
	
	        imageKeys.forEach(function (key, index) {
	            var velocity = (index + 1) / count * 25;
	            if (index < 2) {
	                velocity = 15;
	            }
	            var sprite = new Phaser.TileSprite(game, 0, 0, 480, 360, key);
	            _this.add(sprite);
	            sprite.autoScroll(velocity, 0);
	        });
	        return _this;
	    }
	
	    return SpaceField;
	}(Phaser.Group);
	
	exports.default = SpaceField;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MAX_HEALTH = 100;
	
	var Planet = function (_Phaser$Group) {
	    _inherits(Planet, _Phaser$Group);
	
	    function Planet(game, x, y, imageKey, sadImageKey, outlineKey) {
	        _classCallCheck(this, Planet);
	
	        var _this = _possibleConstructorReturn(this, (Planet.__proto__ || Object.getPrototypeOf(Planet)).call(this, game));
	
	        _this.health = MAX_HEALTH;
	        _this.planetGroup = new Phaser.Group(game);
	        _this.image = new Phaser.Image(game, 0, 0, imageKey);
	        _this.sadImage = new Phaser.Image(game, 0, 0, sadImageKey);
	        _this.outline = new Phaser.Sprite(game, 0, 0, outlineKey);
	        _this.onPolluted = new Phaser.Signal();
	        _this.x = x;
	        _this.y = y;
	
	        _this.planetGroup.anchor = new Phaser.Point(0.5, 0.5);
	        _this.image.anchor = new Phaser.Point(0.5, 0.5);
	        _this.sadImage.anchor = new Phaser.Point(0.5, 0.5);
	        _this.outline.anchor = new Phaser.Point(0.5, 0.5);
	
	        _this.planetGroup.add(_this.sadImage);
	        _this.planetGroup.add(_this.image);
	        _this.add(_this.planetGroup);
	        _this.add(_this.outline);
	
	        _this.startRotation();
	        return _this;
	    }
	
	    _createClass(Planet, [{
	        key: "startRotation",
	        value: function startRotation() {
	            var _this2 = this;
	
	            this.game.time.events.loop(16, function () {
	                return _this2.planetGroup.angle += 0.02;
	            });
	        }
	    }, {
	        key: "doDamage",
	        value: function doDamage(value) {
	            if (this.invincible) return;
	
	            this.health -= value;
	            this.health = Math.min(this.health, MAX_HEALTH);
	            this.image.alpha = Math.max(this.health / MAX_HEALTH, 0);
	
	            if (this.health < 1) {
	                this.onPolluted.dispatch();
	            }
	        }
	    }]);
	
	    return Planet;
	}(Phaser.Group);
	
	exports.default = Planet;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _menu = __webpack_require__(20);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	var _gameOver = __webpack_require__(21);
	
	var _gameOver2 = _interopRequireDefault(_gameOver);
	
	var _win = __webpack_require__(22);
	
	var _win2 = _interopRequireDefault(_win);
	
	var _theme = __webpack_require__(23);
	
	var _theme2 = _interopRequireDefault(_theme);
	
	var _display_objects = __webpack_require__(14);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    load: function load(game, callback) {
	        var uiAssets = _theme2.default.__config__.resources.filter(function (asset) {
	            return asset.includes('.png');
	        });
	
	        uiAssets.forEach(function (asset) {
	            game.load.image(asset, '' + asset);
	        });
	
	        game.load.onLoadComplete.add(function () {
	            EZGUI.Compatibility.fixCache.call(game.load, uiAssets);
	
	            EZGUI.Theme.load(['theme.json'], function () {
	                callback();
	            });
	        });
	    },
	
	    menu: {
	        create: function create(game) {
	            EZGUI.create(_menu2.default, 'ui-theme');
	            EZGUI.components.menu.visible = false;
	            EZGUI.components.menu_instructions_label_1.visible = false;
	            EZGUI.components.menu_instructions_label_2.visible = false;
	            EZGUI.components.menu_more_instructions.visible = false;
	        },
	
	        show: function show(cb) {
	            EZGUI.components.menu.visible = true;
	            EZGUI.components.menu_button.on('click', function () {
	                EZGUI.components.menu.visible = false;
	                cb();
	            });
	
	            EZGUI.components.menu_instructions.on('click', function () {
	                EZGUI.components.menu_label.visible = false;
	                EZGUI.components.menu_instructions.visible = false;
	                EZGUI.components.menu_button.visible = false;
	
	                EZGUI.components.menu_instructions_label_1.visible = true;
	                EZGUI.components.menu_instructions_label_2.visible = false;
	                EZGUI.components.menu_more_instructions.visible = true;
	            });
	
	            EZGUI.components.menu_more_instructions.on('click', function () {
	                if (EZGUI.components.menu_instructions_label_1.visible) {
	                    EZGUI.components.menu_instructions_label_1.visible = false;
	                    EZGUI.components.menu_instructions_label_2.visible = true;
	                } else {
	                    EZGUI.components.menu_label.visible = true;
	                    EZGUI.components.menu_instructions.visible = true;
	                    EZGUI.components.menu_button.visible = true;
	
	                    EZGUI.components.menu_instructions_label_1.visible = false;
	                    EZGUI.components.menu_instructions_label_2.visible = false;
	                    EZGUI.components.menu_more_instructions.visible = false;
	                }
	            });
	        }
	    },
	
	    gameOver: {
	        create: function create(game) {
	            EZGUI.create(_gameOver2.default, 'ui-theme');
	            EZGUI.components.gameOver.visible = false;
	        },
	
	        show: function show(cb) {
	            EZGUI.components.gameOver.visible = true;
	            EZGUI.components.gameOver_button.on('click', function () {
	                EZGUI.components.gameOver.visible = false;
	                cb();
	            });
	        }
	    },
	
	    win: {
	        create: function create(game) {
	            EZGUI.create(_win2.default, 'ui-theme');
	            EZGUI.components.win.visible = false;
	            EZGUI.components.win_label_1.visible = false;
	            EZGUI.components.win_label_2.visible = false;
	            EZGUI.components.win_label_3.visible = false;
	        },
	
	        show: function show(successLevel, cb) {
	            EZGUI.components.win.visible = true;
	            var key = 'win_label_' + successLevel;
	            EZGUI.components[key].visible = true;
	
	            EZGUI.components.win_button.on('click', function () {
	                EZGUI.components.win.visible = false;
	                EZGUI.components[key].visible = false;
	                cb();
	            });
	        }
	    }
	
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    id: 'menu',
	    component: 'Window',
	    draggable: false,
	    position: { x: 100, y: 60 },
	    width: 280,
	    height: 240,
	
	    children: [{
	        id: 'menu_label',
	        component: 'Label',
	        position: { x: 40, y: 40 },
	        text: 'DEFEND YOUR\nSMALLEST\nOF WORLDS',
	        width: 200,
	        padding: 10,
	        height: 50,
	        font: {
	            size: "32px",
	            family: "Blocktopia_32pt",
	            color: "#f0f0f0"
	        }
	    }, {
	        id: 'menu_instructions_label_1',
	        component: 'Label',
	        position: { x: 40, y: 40 },
	        text: 'The world is too small.\n\nAliens have arrived. They are using your\nworld as a dumping ground for their\ntrash.\n\nThe only rational way to combat this\nis to use newly discovered ultra-powerful\nslingshot technology to fling the most\ncarbon dioxide producing materials on the\nplanet (cars, cows and coal plants) at the\nattackers.',
	        width: 200,
	        padding: 10,
	        height: 100,
	        font: {
	            size: "12px",
	            family: "Blocktopia_12pt",
	            color: "#f0f0f0"
	        }
	    }, {
	        id: 'menu_instructions_label_2',
	        component: 'Label',
	        position: { x: 40, y: 40 },
	        text: 'The mothership is too powerful for you\nto do any real damage, but she cares\nabout her minions.\n\nVanquish enough of them and she will\nbecome depressed and give up.',
	        width: 200,
	        padding: 10,
	        height: 100,
	        font: {
	            size: "12px",
	            family: "Blocktopia_12pt",
	            color: "#f0f0f0"
	        }
	    }, {
	        id: 'menu_more_instructions',
	        component: 'Button',
	        position: { x: 60, y: 190 },
	        text: 'Continue',
	        width: 160,
	        height: 36
	    }, {
	        id: 'menu_instructions',
	        component: 'Button',
	        position: { x: 60, y: 150 },
	        text: 'Press for instructions',
	        width: 160,
	        height: 36
	    }, {
	        id: 'menu_button',
	        component: 'Button',
	        position: { x: 60, y: 190 },
	        text: 'Play',
	        width: 160,
	        height: 36
	    }]
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    id: 'gameOver',
	    component: 'Window',
	    draggable: false,
	    position: { x: 100, y: 60 },
	    width: 280,
	    height: 240,
	
	    layout: [1, 3],
	    children: [{
	        id: 'gameOver_label',
	        component: 'Label',
	        position: { x: 40, y: 60 },
	        text: 'THE EARTH\nIS\nUNLIVABLE.\nBAD JOB.',
	        width: 200,
	        padding: 10,
	        height: 50,
	        font: {
	            size: "32px",
	            family: "Blocktopia_32pt",
	            color: "#f0f0f0"
	        }
	    }, null, {
	        id: 'gameOver_button',
	        component: 'Button',
	        position: 'center',
	        text: 'Try again',
	        width: 160,
	        height: 36
	    }]
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    id: 'win',
	    component: 'Window',
	    draggable: false,
	    position: { x: 100, y: 60 },
	    width: 280,
	    height: 240,
	
	    children: [{
	        id: 'win_label_1',
	        component: 'Label',
	        position: { x: 40, y: 40 },
	        text: 'YOU ARE\nVERY\nSUCCESSFUL.',
	        width: 200,
	        padding: 10,
	        height: 50,
	        font: {
	            size: "32px",
	            family: "Blocktopia_32pt",
	            color: "#f0f0f0"
	        }
	    }, {
	        id: 'win_label_2',
	        component: 'Label',
	        position: { x: 40, y: 40 },
	        text: 'YOU ARE\nPRETTY\nSUCCESSFUL.',
	        width: 200,
	        padding: 10,
	        height: 50,
	        font: {
	            size: "32px",
	            family: "Blocktopia_32pt",
	            color: "#f0f0f0"
	        }
	    }, {
	        id: 'win_label_3',
	        component: 'Label',
	        position: { x: 40, y: 40 },
	        text: 'YOU ARE\nBARELY\nSUCCESSFUL.',
	        width: 200,
	        padding: 10,
	        height: 50,
	        font: {
	            size: "32px",
	            family: "Blocktopia_32pt",
	            color: "#f0f0f0"
	        }
	    }, {
	        id: 'win_button',
	        component: 'Button',
	        position: { x: 60, y: 190 },
	        text: 'Start over',
	        width: 160,
	        height: 36
	    }]
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = {
		"__config__": {
			"name": "ui-theme",
			"resources": [
				"./bottom_left_border.png",
				"./bottom_middle_border.png",
				"./bottom_right_border.png",
				"./middle_left_border.png",
				"./middle_middle_border.png",
				"./middle_right_border.png",
				"./top_left_border.png",
				"./top_middle_border.png",
				"./top_right_border.png",
				"./button_top_left.png",
				"./button_top_middle.png",
				"./button_top_right.png",
				"./button_middle_left.png",
				"./button_middle_middle.png",
				"./button_middle_right.png",
				"./button_bottom_left.png",
				"./button_bottom_middle.png",
				"./button_bottom_right.png",
				"./button_top_left_down.png",
				"./button_top_middle_down.png",
				"./button_top_right_down.png",
				"./button_middle_left_down.png",
				"./button_middle_middle_down.png",
				"./button_middle_right_down.png",
				"./button_bottom_left_down.png",
				"./button_bottom_middle_down.png",
				"./button_bottom_right_down.png",
				"./Blocktopia_12pt.fnt",
				"./Blocktopia_32pt.fnt"
			]
		},
		"default": {
			"scale": 1,
			"bg": "",
			"padding": 0,
			"bgPadding": 0,
			"corner": "./top_left_border.png",
			"line": "./top_middle_border.png",
			"font": {
				"size": "12px",
				"family": "Blocktopia_12pt",
				"color": "#f0f0f0"
			}
		},
		"Window": {
			"bgPadding": 6,
			"bg": "./middle_middle_border.png",
			"corner-tl": "./top_left_border.png",
			"corner-tr": "./top_right_border.png",
			"corner-bl": "./bottom_left_border.png",
			"corner-br": "./bottom_right_border.png",
			"line-t": "./top_middle_border.png",
			"line-r": "./middle_right_border.png",
			"line-b": "./bottom_middle_border.png",
			"line-l": "./middle_left_border.png"
		},
		"Button": {
			"bgPadding": 6,
			"bg": {
				"default": "./button_middle_middle.png",
				"down": "button_middle_middle_down.png"
			},
			"corner-tl": {
				"default": "./button_top_left.png",
				"down": "button_top_left_down.png"
			},
			"corner-tr": {
				"default": "./button_top_right.png",
				"down": "button_top_right_down.png"
			},
			"corner-bl": {
				"default": "./button_bottom_left.png",
				"down": "button_bottom_left_down.png"
			},
			"corner-br": {
				"default": "./button_bottom_right.png",
				"down": "button_bottom_right_down.png"
			},
			"line-t": {
				"default": "./button_top_middle.png",
				"down": "button_top_middle_down.png"
			},
			"line-r": {
				"default": "./button_middle_right.png",
				"down": "button_middle_right_down.png"
			},
			"line-b": {
				"default": "./button_bottom_middle.png",
				"down": "button_bottom_middle_down.png"
			},
			"line-l": {
				"default": "./button_middle_left.png",
				"down": "button_middle_left_down.png"
			}
		}
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _display_objects = __webpack_require__(14);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
	var _game_objects = __webpack_require__(4);
	
	var _game_objects2 = _interopRequireDefault(_game_objects);
	
	var _ui = __webpack_require__(19);
	
	var _ui2 = _interopRequireDefault(_ui);
	
	var _sounds = __webpack_require__(25);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Loading = function (_State2) {
	  _inherits(Loading, _State2);
	
	  function Loading() {
	    _classCallCheck(this, Loading);
	
	    return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
	  }
	
	  _createClass(Loading, [{
	    key: 'init',
	    value: function init() {
	      // Pixel-perfect canvas scaling!
	      // Thanks to http://www.belenalbeza.com/retro-crisp-pixel-art-in-phaser/
	      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	      game.scale.pageAlignHorizontally = true;
	      game.scale.pageAlignVertically = true;
	
	      // Rounds x/y positions to the nearest whole to avoid sub-pixel rendering
	      game.renderer.renderSession.roundPixels = true;
	
	      // Sets browser-prefixed "image-rendering" CSS property on the game canvas
	      Phaser.Canvas.setImageRenderingCrisp(game.canvas);
	
	      // Prevent these keys from being handled by the browser
	      // when the game is in focus
	      game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
	    }
	  }, {
	    key: 'preload',
	    value: function preload() {
	      var _this2 = this;
	
	      _sounds2.default.loadResources(this);
	      _display_objects2.default.load(this);
	      _game_objects2.default.load(this);
	
	      _ui2.default.load(this.game, function () {
	        _this2.stateProvider.menu(_this2.state);
	        // this.stateProvider.gameplay(this.state);
	      });
	    }
	  }]);
	
	  return Loading;
	}(_State4.default);
	
	exports.default = Loading;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var game = void 0;
	var currentSong = void 0;
	var songs = {};
	
	exports.default = {
	  loadResources: function loadResources(state) {
	    game = state.game;
	    game.load.audio('menuSong', 'fantasy_game_loop.wav', true);
	    // game.load.audio('gameOverSong', 'assets/looperman-l-1319133-0090841-fanto8bc-julian-8-bit.wav', true)
	    game.load.audio('shoot', 'shoot.wav', true);
	    game.load.audio('trash', 'trash.wav', true);
	    game.load.audio('explosion_1', 'explosion_1.wav', true);
	    game.load.audio('explosion_2', 'explosion_2.wav', true);
	    game.load.audio('explosion_3', 'explosion_3.wav', true);
	    game.load.audio('jettison', 'jettison.wav', true);
	    game.load.audio('flee', 'flee.wav', true);
	    game.load.audio('trashHit', 'trashHit.wav', true);
	  },
	
	  init: function init() {
	    songs.menuSong = game.add.audio('menuSong', 1, true);
	    songs.gameOverSong = game.add.audio('gameOverSong', 1, true);
	  },
	
	  playMusic: function playMusic(key, volume) {
	    var song = songs[key];
	
	    if (!song) {
	      console.log('no song ' + key);
	      return;
	    }
	
	    if (currentSong && currentSong.key === song.key) {
	      currentSong.volume = volume;
	      return;
	    }
	
	    if (currentSong) {
	      currentSong.stop();
	    }
	
	    currentSong = song;
	    currentSong.play('', 0, volume);
	  },
	
	  stopMusic: function stopMusic() {
	    if (currentSong) {
	      currentSong.stop();
	      currentSong = null;
	    }
	  },
	
	  setMusicVolume: function setMusicVolume(volume) {
	    if (currentSong) {
	      currentSong.volume = volume;
	    }
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _ui = __webpack_require__(19);
	
	var _ui2 = _interopRequireDefault(_ui);
	
	var _display_objects = __webpack_require__(14);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
	var _sounds = __webpack_require__(25);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Menu = function (_State2) {
	  _inherits(Menu, _State2);
	
	  function Menu() {
	    _classCallCheck(this, Menu);
	
	    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
	  }
	
	  _createClass(Menu, [{
	    key: 'create',
	    value: function create() {
	      var _this2 = this;
	
	      this.background = _display_objects2.default.background(game);
	      this.stage.disableVisibilityChange = true;
	
	      _sounds2.default.init();
	      _sounds2.default.playMusic('menuSong', 0.5);
	
	      _ui2.default.menu.create(this);
	      _ui2.default.menu.show(function () {
	        _this2.stateProvider.gameplay(_this2.state);
	      });
	    }
	  }]);
	
	  return Menu;
	}(_State4.default);
	
	exports.default = Menu;

/***/ }
/******/ ]);
//# sourceMappingURL=game.js.map