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
	var width = 320;
	var height = 288;
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
	
	var _Loading = __webpack_require__(13);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _Menu = __webpack_require__(17);
	
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
	
	var _display_objects = __webpack_require__(8);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Gameplay = function (_State2) {
	  _inherits(Gameplay, _State2);
	
	  function Gameplay() {
	    _classCallCheck(this, Gameplay);
	
	    return _possibleConstructorReturn(this, (Gameplay.__proto__ || Object.getPrototypeOf(Gameplay)).apply(this, arguments));
	  }
	
	  _createClass(Gameplay, [{
	    key: 'create',
	    value: function create() {
	      this.background = _display_objects2.default.background(game);
	      game.physics.startSystem(Phaser.Physics.P2JS); //Starting the p2 physics
	      this.stage.backgroundColor = '#223344';
	      game.physics.p2.restitution = 0.8;
	      this.world.setBounds(0, 0, 320, 288);
	      this.earth = _display_objects2.default.earth(game, 300, 264);
	      this.mars = _display_objects2.default.mars(game, 20, 20);
	      this.ThrowableObject = _game_objects2.default.throwable(game, this.world.centerx, this.world.centery); //Importing the ThrowableObject
	      this.MouseObject = _game_objects2.default.mouse(game, game.input.x, game.input.y);
	      this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
	
	      this.add.existing(this.ThrowableObject); //Adding the throwable object
	      this.add.existing(this.MouseObject);
	      // this.add.existing(this.earth);
	      // this.add.existing(this.mars);
	
	      game.input.addMoveCallback(this.move, this);
	    }
	  }, {
	    key: 'move',
	    value: function move(pointer, x, y, isDown) {
	      this.MouseObject.body.x = x;
	      this.MouseObject.body.y = y;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
	        this.player.respawn(game.world.centerX, this.player.y);
	      }
	
	      if (this.input.keyboard.isDown(Phaser.Keyboard.O)) {
	        this.player.destroy();
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PLAYER_SHIP = 'ship';
	var CAR1 = 'car1';
	
	module.exports = {
	  load: function load(loader) {
	    loader.load.spritesheet(PLAYER_SHIP, 'ship.png', 6, 6);
	    loader.load.spritesheet(CAR1, 'car1.png', 16, 16);
	  },
	
	  player: function player(game, x, y) {
	    return new _Ship2.default(game, x, y, PLAYER_SHIP);
	  },
	  throwable: function throwable(game, x, y) {
	    return new _ThrowableObject2.default(game, x, y, CAR1);
	  },
	  mouse: function mouse(game, x, y) {
	    return new _MouseObject2.default(game, x, y, CAR1);
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
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ThrowableObject = function (_Phaser$Sprite) {
	  _inherits(ThrowableObject, _Phaser$Sprite);
	
	  function ThrowableObject(game, x, y, key) {
	    _classCallCheck(this, ThrowableObject);
	
	    var _this = _possibleConstructorReturn(this, (ThrowableObject.__proto__ || Object.getPrototypeOf(ThrowableObject)).call(this, game, x, y, key));
	
	    _this.anchor.setTo(0.5, 1);
	
	    game.physics.p2.enable(_this, true);
	    _this.body.setCircle(10);
	    return _this;
	  }
	
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
	
	    game.physics.p2.enable(_this, true);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _BitmapFont = __webpack_require__(9);
	
	var _BitmapFont2 = _interopRequireDefault(_BitmapFont);
	
	var _ProgressBar = __webpack_require__(10);
	
	var _ProgressBar2 = _interopRequireDefault(_ProgressBar);
	
	var _SpaceField = __webpack_require__(11);
	
	var _SpaceField2 = _interopRequireDefault(_SpaceField);
	
	var _Planet = __webpack_require__(12);
	
	var _Planet2 = _interopRequireDefault(_Planet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DISPLAY_FONT = 'Blocktopia_32pt';
	var BODY_FONT = 'Blocktopia_12pt';
	
	module.exports = {
	  load: function load(loader) {
	    var images = {
	      progress_left: '../../progress_left.png',
	      progress_mid: '../../progress_mid.png',
	      progress_right: '../../progress_right.png',
	      progress_red_fill: '../../progress_red_fill.png',
	      space_background: '../../space1.png',
	      earth: '../../world3.png',
	      mars: '../../world4.png',
	      planet_outline: '../../world_outline.png'
	    };
	
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
	
	    return new _ProgressBar2.default(game, x, y, width, maxValue, initialValue, 'progress_left', 'progress_mid', 'progress_right', 'progress_red_fill');
	  },
	
	  background: function background(game) {
	    return new _SpaceField2.default(game, ['space_background']);
	  },
	
	  earth: function earth(game, x, y) {
	    return new _Planet2.default(game, x, y, 'earth', 'planet_outline');
	  },
	
	  mars: function mars(game, x, y) {
	    return new _Planet2.default(game, x, y, 'mars', 'planet_outline');
	  }
	};

/***/ },
/* 9 */
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
/* 10 */
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
/* 11 */
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
	
	        imageKeys.forEach(function (key) {
	            _this.add(new Phaser.Image(game, 0, 0, key));
	        });
	        return _this;
	    }
	
	    return SpaceField;
	}(Phaser.Group);
	
	exports.default = SpaceField;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Planet = function (_Phaser$Group) {
	    _inherits(Planet, _Phaser$Group);
	
	    function Planet(game, x, y, imageKey, outlineKey) {
	        _classCallCheck(this, Planet);
	
	        var _this = _possibleConstructorReturn(this, (Planet.__proto__ || Object.getPrototypeOf(Planet)).call(this, game));
	
	        _this.image = new Phaser.Image(game, x, y, imageKey);
	        _this.outline = new Phaser.Image(game, x, y, outlineKey);
	        _this.image.anchor = new Phaser.Point(0.5, 0.5);
	        _this.outline.anchor = new Phaser.Point(0.5, 0.5);
	
	        _this.add(_this.image);
	        _this.add(_this.outline);
	
	        _this.rotate();
	        return _this;
	    }
	
	    _createClass(Planet, [{
	        key: "rotate",
	        value: function rotate() {
	            var _this2 = this;
	
	            this.game.time.events.loop(16, function () {
	                return _this2.image.angle += 0.02;
	            });
	        }
	    }]);
	
	    return Planet;
	}(Phaser.Group);
	
	exports.default = Planet;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _display_objects = __webpack_require__(8);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
	var _game_objects = __webpack_require__(4);
	
	var _game_objects2 = _interopRequireDefault(_game_objects);
	
	var _ui = __webpack_require__(14);
	
	var _ui2 = _interopRequireDefault(_ui);
	
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
	
	      _display_objects2.default.load(this);
	      _game_objects2.default.load(this);
	
	      _ui2.default.load(this.game, function () {
	        _this2.stateProvider.menu(_this2.state);
	      });
	    }
	  }]);
	
	  return Loading;
	}(_State4.default);
	
	exports.default = Loading;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _menu = __webpack_require__(15);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	var _theme = __webpack_require__(16);
	
	var _theme2 = _interopRequireDefault(_theme);
	
	var _display_objects = __webpack_require__(8);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var menuScreen = void 0;
	
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
	            this.menuScreen = EZGUI.create(_menu2.default, 'ui-theme');
	        },
	
	        onStart: function onStart(cb) {
	            var _this = this;
	
	            EZGUI.components.menu_button.on('click', function () {
	                cb();
	                _this.menuScreen.destroy();
	            });
	        }
	    }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    id: 'menu',
	    component: 'Window',
	    draggable: false,
	    position: { x: 20, y: 20 },
	    width: 280,
	    height: 248,
	
	    layout: [1, 3],
	    children: [{
	        id: 'menu_label',
	        component: 'Label',
	        position: { x: 40, y: 40 },
	        text: 'WELCOME TO\nTHE SMALLEST\nOF WORLDS',
	        width: 200,
	        padding: 10,
	        height: 50,
	        font: {
	            size: "32px",
	            family: "Blocktopia_32pt",
	            color: "#f0f0f0"
	        }
	    }, null, {
	        id: 'menu_button',
	        component: 'Button',
	        position: 'center',
	        text: 'Press for full immersion',
	        width: 160,
	        height: 36
	    }]
	};

/***/ },
/* 16 */
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
				"../Blocktopia_12pt.fnt",
				"../Blocktopia_32pt.fnt"
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _ui = __webpack_require__(14);
	
	var _ui2 = _interopRequireDefault(_ui);
	
	var _display_objects = __webpack_require__(8);
	
	var _display_objects2 = _interopRequireDefault(_display_objects);
	
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
	
	      _ui2.default.menu.create(this);
	      _ui2.default.menu.onStart(function () {
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