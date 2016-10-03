(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MIDI", [], factory);
	else if(typeof exports === 'object')
		exports["MIDI"] = factory();
	else
		root["MIDI"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _root = __webpack_require__(2);
	
	var _root2 = _interopRequireDefault(_root);
	
	__webpack_require__(3);
	
	__webpack_require__(8);
	
	__webpack_require__(9);
	
	__webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.MIDI = _root2.default;
	exports.default = _root2.default;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {};
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
	                                                                                                                                                                                                                                                                                ----------------------------------------------------------
	                                                                                                                                                                                                                                                                                root.Plugin : 0.3.4 : 2015-03-26
	                                                                                                                                                                                                                                                                                ----------------------------------------------------------
	                                                                                                                                                                                                                                                                                https://github.com/mudcube/root.js
	                                                                                                                                                                                                                                                                                ----------------------------------------------------------
	                                                                                                                                                                                                                                                                                Inspired by javax.sound.midi (albeit a super simple version):
	                                                                                                                                                                                                                                                                                  http://docs.oracle.com/javase/6/docs/api/javax/sound/midi/package-summary.html
	                                                                                                                                                                                                                                                                                ----------------------------------------------------------
	                                                                                                                                                                                                                                                                                Technologies
	                                                                                                                                                                                                                                                                                ----------------------------------------------------------
	                                                                                                                                                                                                                                                                                  Web MIDI API - no native support yet (jazzplugin)
	                                                                                                                                                                                                                                                                                  Web Audio API - firefox 25+, chrome 10+, safari 6+, opera 15+
	                                                                                                                                                                                                                                                                                  HTML5 Audio Tag - ie 9+, firefox 3.5+, chrome 4+, safari 4+, opera 9.5+, ios 4+, android 2.3+
	                                                                                                                                                                                                                                                                                ----------------------------------------------------------
	                                                                                                                                                                                                                                                                              */
	
	var _utils = __webpack_require__(4);
	
	var _root = __webpack_require__(2);
	
	var _root2 = _interopRequireDefault(_root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_root2.default.Soundfont = {};
	_root2.default.DEBUG = true;
	_root2.default.USE_XHR = true;
	_root2.default.soundfontUrl = './soundfont/';
	
	/*
	  root.loadPlugin({
	    onsuccess: function() { },
	    onprogress: function(state, percent) { },
	    targetFormat: 'mp3', // optionally can force to use MP3 (for instance on mobile networks)
	    instrument: 'acoustic_grand_piano', // or 1 (default)
	    instruments: [ 'acoustic_grand_piano', 'acoustic_guitar_nylon' ] // or multiple instruments
	  })
	*/
	
	_root2.default.loadPlugin = function (opts) {
	  if (typeof opts === 'function') {
	    opts = { onsuccess: opts };
	  }
	
	  _root2.default.soundfontUrl = opts.soundfontUrl || _root2.default.soundfontUrl;
	
	  // / Detect the best type of audio to use
	  (0, _utils.audioDetect)(function (supports) {
	    var hash = window.location.hash;
	    var api = '';
	
	    // / use the most appropriate plugin if not specified
	    if (supports[opts.api]) {
	      api = opts.api;
	    } else if (supports[hash.substr(1)]) {
	      api = hash.substr(1);
	    } else if (supports.webmidi) {
	      api = 'webmidi';
	    } else if (window.AudioContext) {
	      // Chrome
	      api = 'webaudio';
	    } else if (window.Audio) {
	      // Firefox
	      api = 'audiotag';
	    }
	
	    if (connect[api]) {
	      // / use audio/ogg when supported
	      var audioFormat = void 0;
	      if (opts.targetFormat) {
	        audioFormat = opts.targetFormat;
	      } else {
	        // use best quality
	        audioFormat = supports['audio/ogg'] ? 'ogg' : 'mp3';
	      }
	
	      // / load the specified plugin
	      _root2.default.__api = api;
	      _root2.default.__audioFormat = audioFormat;
	      _root2.default.supports = supports;
	      _root2.default.loadResource(opts);
	    }
	  });
	};
	
	/*
	  root.loadResource({
	    onsuccess: function() { },
	    onprogress: function(state, percent) { },
	    instrument: 'banjo'
	  })
	*/
	
	_root2.default.loadResource = function (opts) {
	  var instruments = opts.instruments || opts.instrument || 'acoustic_grand_piano';
	  // /
	  if ((typeof instruments === 'undefined' ? 'undefined' : _typeof(instruments)) !== 'object') {
	    if (instruments || instruments === 0) {
	      instruments = [instruments];
	    } else {
	      instruments = [];
	    }
	  }
	  // / convert numeric ids into strings
	  for (var i = 0; i < instruments.length; i++) {
	    var instrument = instruments[i];
	    if (instrument === +instrument) {
	      // is numeric
	      if (_root2.default.GM.byId[instrument]) {
	        instruments[i] = _root2.default.GM.byId[instrument].id;
	      }
	    }
	  }
	  // /
	  opts.format = _root2.default.__audioFormat;
	  opts.instruments = instruments;
	  // /
	  connect[_root2.default.__api](opts);
	};
	
	var connect = {
	  webmidi: function webmidi(opts) {
	    // cant wait for this to be standardized!
	    _root2.default.WebMIDI.connect(opts);
	  },
	  audiotag: function audiotag(opts) {
	    // works ok, kinda like a drunken tuna fish, across the board
	    // http://caniuse.com/audio
	    requestQueue(opts, 'AudioTag');
	  },
	  webaudio: function webaudio(opts) {
	    // works awesome! safari, chrome and firefox support
	    // http://caniuse.com/web-audio
	    requestQueue(opts, 'WebAudio');
	  }
	};
	
	var requestQueue = function requestQueue(opts, context) {
	  var audioFormat = opts.format;
	  var instruments = opts.instruments;
	  var onprogress = opts.onprogress;
	  var onerror = opts.onerror;
	  // /
	  var length = instruments.length;
	  var pending = length;
	  var waitForEnd = function waitForEnd() {
	    if (! --pending) {
	      onprogress && onprogress('load', 1.0);
	      _root2.default[context].connect(opts);
	    }
	  };
	  // /
	  for (var i = 0; i < length; i++) {
	    var instrumentId = instruments[i];
	    if (_root2.default.Soundfont[instrumentId]) {
	      // already loaded
	      waitForEnd();
	    } else {
	      // needs to be requested
	      sendRequest(instruments[i], audioFormat, function (evt, progress) {
	        var fileProgress = progress / length;
	        var queueProgress = (length - pending) / length;
	        onprogress && onprogress('load', fileProgress + queueProgress, instrumentId);
	      }, function () {
	        waitForEnd();
	      }, onerror);
	    }
	  }
	};
	
	var sendRequest = function sendRequest(instrumentId, audioFormat, onprogress, _onsuccess, onerror) {
	  var soundfontPath = _root2.default.soundfontUrl + instrumentId + '-' + audioFormat + '.js';
	  if (_root2.default.USE_XHR) {
	    (0, _utils.request)({
	      url: soundfontPath,
	      format: 'text',
	      onerror: onerror,
	      onprogress: onprogress,
	      onsuccess: function onsuccess(event, responseText) {
	        var script = document.createElement('script');
	        script.language = 'javascript';
	        script.type = 'text/javascript';
	        script.text = responseText;
	        document.body.appendChild(script);
	        _onsuccess();
	      }
	    });
	  } else {
	    _utils.loadScript.add({
	      url: soundfontPath,
	      verify: 'root.Soundfont["' + instrumentId + '"]',
	      onerror: onerror,
	      onsuccess: function onsuccess() {
	        _onsuccess();
	      }
	    });
	  }
	};
	
	_root2.default.setDefaultPlugin = function (midi) {
	  for (var key in midi) {
	    _root2.default[key] = midi[key];
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _audioDetect = __webpack_require__(5);
	
	Object.keys(_audioDetect).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _audioDetect[key];
	    }
	  });
	});
	
	var _loadScript = __webpack_require__(6);
	
	Object.keys(_loadScript).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _loadScript[key];
	    }
	  });
	});
	
	var _request = __webpack_require__(7);
	
	Object.keys(_request).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _request[key];
	    }
	  });
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*
	  ----------------------------------------------------------
	  midi.audioDetect : 0.3.2 : 2015-03-26
	  ----------------------------------------------------------
	  https://github.com/mudcube/midi.js
	  ----------------------------------------------------------
	  Probably, Maybe, No... Absolutely!
	  Test to see what types of <audio> MIME types are playable by the browser.
	  ----------------------------------------------------------
	*/
	
	var supports = {}; // object of supported file types
	var pending = 0; // pending file types to process
	var canPlayThrough = function canPlayThrough(src) {
	  // check whether format plays through
	  pending++;
	  var body = document.body;
	  var audio = new window.Audio();
	  var mime = src.split(';')[0];
	  audio.id = 'audio';
	  audio.setAttribute('preload', 'auto');
	  audio.setAttribute('audiobuffer', true);
	  audio.addEventListener('error', function () {
	    body.removeChild(audio);
	    supports[mime] = false;
	    pending--;
	  }, false);
	  audio.addEventListener('canplaythrough', function () {
	    body.removeChild(audio);
	    supports[mime] = true;
	    pending--;
	  }, false);
	  audio.src = 'data:' + src;
	  body.appendChild(audio);
	};
	
	var audioDetect = exports.audioDetect = function audioDetect(onsuccess) {
	  // / detect jazz-midi plugin
	  if (navigator.requestMIDIAccess) {
	    var isNative = Function.prototype.toString.call(navigator.requestMIDIAccess).indexOf('[native code]');
	    if (isNative) {
	      // has native midiapi support
	      supports['webmidi'] = true;
	    } else {
	      // check for jazz plugin midiapi support
	      for (var n = 0; navigator.plugins.length > n; n++) {
	        var plugin = navigator.plugins[n];
	        if (plugin.name.indexOf('Jazz-Plugin') >= 0) {
	          supports['webmidi'] = true;
	        }
	      }
	    }
	  }
	
	  // / check whether <audio> tag is supported
	  if (typeof window.Audio === 'undefined') {
	    return onsuccess({});
	  } else {
	    supports['audiotag'] = true;
	  }
	
	  // / check for webaudio api support
	  if (window.AudioContext || window.webkitAudioContext) {
	    supports['webaudio'] = true;
	  }
	
	  // / check whether canPlayType is supported
	  var audio = new window.Audio();
	  if (typeof audio.canPlayType === 'undefined') {
	    return onsuccess(supports);
	  }
	
	  // / see what we can learn from the browser
	  var vorbis = audio.canPlayType('audio/ogg; codecs="vorbis"');
	  vorbis = vorbis === 'probably' || vorbis === 'maybe';
	  var mpeg = audio.canPlayType('audio/mpeg');
	  mpeg = mpeg === 'probably' || mpeg === 'maybe';
	  // maybe nothing is supported
	  if (!vorbis && !mpeg) {
	    onsuccess(supports);
	    return;
	  }
	
	  // / or maybe something is supported
	  if (vorbis) canPlayThrough('audio/ogg;base64,T2dnUwACAAAAAAAAAADqnjMlAAAAAOyyzPIBHgF2b3JiaXMAAAAAAUAfAABAHwAAQB8AAEAfAACZAU9nZ1MAAAAAAAAAAAAA6p4zJQEAAAANJGeqCj3//////////5ADdm9yYmlzLQAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMTAxMTAxIChTY2hhdWZlbnVnZ2V0KQAAAAABBXZvcmJpcw9CQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBACAAAAYRqF1TCqDEEPKQ4QUY9AzoxBDDEzGHGNONKQMMogzxZAyiFssLqgQBKEhKwKAKAAAwBjEGGIMOeekZFIi55iUTkoDnaPUUcoolRRLjBmlEluJMYLOUeooZZRCjKXFjFKJscRUAABAgAMAQICFUGjIigAgCgCAMAYphZRCjCnmFHOIMeUcgwwxxiBkzinoGJNOSuWck85JiRhjzjEHlXNOSuekctBJyaQTAAAQ4AAAEGAhFBqyIgCIEwAwSJKmWZomipamiaJniqrqiaKqWp5nmp5pqqpnmqpqqqrrmqrqypbnmaZnmqrqmaaqiqbquqaquq6nqrZsuqoum65q267s+rZru77uqapsm6or66bqyrrqyrbuurbtS56nqqKquq5nqq6ruq5uq65r25pqyq6purJtuq4tu7Js664s67pmqq5suqotm64s667s2rYqy7ovuq5uq7Ks+6os+75s67ru2rrwi65r66os674qy74x27bwy7ouHJMnqqqnqq7rmarrqq5r26rr2rqmmq5suq4tm6or26os67Yry7aumaosm64r26bryrIqy77vyrJui67r66Ys67oqy8Lu6roxzLat+6Lr6roqy7qvyrKuu7ru+7JuC7umqrpuyrKvm7Ks+7auC8us27oxuq7vq7It/KosC7+u+8Iy6z5jdF1fV21ZGFbZ9n3d95Vj1nVhWW1b+V1bZ7y+bgy7bvzKrQvLstq2scy6rSyvrxvDLux8W/iVmqratum6um7Ksq/Lui60dd1XRtf1fdW2fV+VZd+3hV9pG8OwjK6r+6os68Jry8ov67qw7MIvLKttK7+r68ow27qw3L6wLL/uC8uq277v6rrStXVluX2fsSu38QsAABhwAAAIMKEMFBqyIgCIEwBAEHIOKQahYgpCCKGkEEIqFWNSMuakZM5JKaWUFEpJrWJMSuaclMwxKaGUlkopqYRSWiqlxBRKaS2l1mJKqcVQSmulpNZKSa2llGJMrcUYMSYlc05K5pyUklJrJZXWMucoZQ5K6iCklEoqraTUYuacpA46Kx2E1EoqMZWUYgupxFZKaq2kFGMrMdXUWo4hpRhLSrGVlFptMdXWWqs1YkxK5pyUzDkqJaXWSiqtZc5J6iC01DkoqaTUYiopxco5SR2ElDLIqJSUWiupxBJSia20FGMpqcXUYq4pxRZDSS2WlFosqcTWYoy1tVRTJ6XFklKMJZUYW6y5ttZqDKXEVkqLsaSUW2sx1xZjjqGkFksrsZWUWmy15dhayzW1VGNKrdYWY40x5ZRrrT2n1mJNMdXaWqy51ZZbzLXnTkprpZQWS0oxttZijTHmHEppraQUWykpxtZara3FXEMpsZXSWiypxNhirLXFVmNqrcYWW62ltVprrb3GVlsurdXcYqw9tZRrrLXmWFNtBQAADDgAAASYUAYKDVkJAEQBAADGMMYYhEYpx5yT0ijlnHNSKucghJBS5hyEEFLKnINQSkuZcxBKSSmUklJqrYVSUmqttQIAAAocAAACbNCUWByg0JCVAEAqAIDBcTRNFFXVdX1fsSxRVFXXlW3jVyxNFFVVdm1b+DVRVFXXtW3bFn5NFFVVdmXZtoWiqrqybduybgvDqKqua9uybeuorqvbuq3bui9UXVmWbVu3dR3XtnXd9nVd+Bmzbeu2buu+8CMMR9/4IeTj+3RCCAAAT3AAACqwYXWEk6KxwEJDVgIAGQAAgDFKGYUYM0gxphhjTDHGmAAAgAEHAIAAE8pAoSErAoAoAADAOeecc84555xzzjnnnHPOOeecc44xxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY0wAwE6EA8BOhIVQaMhKACAcAABACCEpKaWUUkoRU85BSSmllFKqFIOMSkoppZRSpBR1lFJKKaWUIqWgpJJSSimllElJKaWUUkoppYw6SimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaVUSimllFJKKaWUUkoppRQAYPLgAACVYOMMK0lnhaPBhYasBAByAwAAhRiDEEJpraRUUkolVc5BKCWUlEpKKZWUUqqYgxBKKqmlklJKKbXSQSihlFBKKSWUUkooJYQQSgmhlFRCK6mEUkoHoYQSQimhhFRKKSWUzkEoIYUOQkmllNRCSB10VFIpIZVSSiklpZQ6CKGUklJLLZVSWkqpdBJSKamV1FJqqbWSUgmhpFZKSSWl0lpJJbUSSkklpZRSSymFVFJJJYSSUioltZZaSqm11lJIqZWUUkqppdRSSiWlkEpKqZSSUmollZRSaiGVlEpJKaTUSimlpFRCSamlUlpKLbWUSkmptFRSSaWUlEpJKaVSSksppRJKSqmllFpJKYWSUkoplZJSSyW1VEoKJaWUUkmptJRSSymVklIBAEAHDgAAAUZUWoidZlx5BI4oZJiAAgAAQABAgAkgMEBQMApBgDACAQAAAADAAAAfAABHARAR0ZzBAUKCwgJDg8MDAAAAAAAAAAAAAACAT2dnUwAEAAAAAAAAAADqnjMlAgAAADzQPmcBAQA=');
	  if (mpeg) canPlayThrough('audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
	
	  // / lets find out!
	  var time = new Date().getTime();
	  var interval = window.setInterval(function () {
	    var now = new Date().getTime();
	    var maxExecution = now - time > 5000;
	    if (!pending || maxExecution) {
	      window.clearInterval(interval);
	      onsuccess(supports);
	    }
	  }, 1);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*
	  -----------------------------------------------------------
	  loadScript.js : 0.1.4 : 2014/02/12 : http://mudcu.be
	  -----------------------------------------------------------
	  Copyright 2011-2014 Mudcube. All rights reserved.
	  -----------------------------------------------------------
	  /// No verification
	  loadScript.add("../js/jszip/jszip.js")
	  /// Strict loading order and verification.
	  loadScript.add({
	    strictOrder: true,
	    urls: [
	      {
	        url: "../js/jszip/jszip.js",
	        verify: "JSZip",
	        onsuccess: function() {
	          console.log(1)
	        }
	      },
	      {
	        url: "../inc/downloadify/js/swfobject.js",
	        verify: "swfobject",
	        onsuccess: function() {
	          console.log(2)
	        }
	      }
	    ],
	    onsuccess: function() {
	      console.log(3)
	    }
	  })
	  /// Just verification.
	  loadScript.add({
	    url: "../js/jszip/jszip.js",
	    verify: "JSZip",
	    onsuccess: function() {
	      console.log(1)
	    }
	  })
	*/
	
	var _globalExists = function _globalExists(path, root) {
	  try {
	    path = path.split('"').join('').split("'").join('').split(']').join('').split('[').join('.');
	    var parts = path.split('.');
	    var length = parts.length;
	    var object = root || window;
	    for (var n = 0; n < length; n++) {
	      var key = parts[n];
	      if (object[key] == null) {
	        return false;
	      } else {
	        //
	        object = object[key];
	      }
	    }
	    return true;
	  } catch (e) {
	    return false;
	  }
	};
	
	var LoadScript = function LoadScript() {
	  this.loaded = {};
	  this.loading = {};
	  return this;
	};
	
	LoadScript.prototype.add = function (config) {
	  var that = this;
	  if (typeof config === 'string') {
	    config = { url: config };
	  }
	  var urls = config.urls;
	  if (typeof urls === 'undefined') {
	    urls = [{
	      url: config.url,
	      verify: config.verify
	    }];
	  }
	  // / adding the elements to the head
	  var doc = document.getElementsByTagName('head')[0];
	  // /
	  var testElement = function testElement(element, test) {
	    if (that.loaded[element.url]) return;
	    if (test && _globalExists(test) === false) return;
	    that.loaded[element.url] = true;
	    //
	    if (that.loading[element.url]) that.loading[element.url]();
	    delete that.loading[element.url];
	    //
	    if (element.onsuccess) element.onsuccess();
	    if (typeof getNext !== 'undefined') getNext();
	  };
	  // /
	  var hasError = false;
	  var batchTest = [];
	  var addElement = function addElement(element) {
	    if (typeof element === 'string') {
	      element = {
	        url: element,
	        verify: config.verify
	      };
	    }
	    if (/([\w\d.\[\]'"])$/.test(element.verify)) {
	      // check whether its a variable reference
	      var verify = element.test = element.verify;
	      if ((typeof verify === 'undefined' ? 'undefined' : _typeof(verify)) === 'object') {
	        for (var n = 0; n < verify.length; n++) {
	          batchTest.push(verify[n]);
	        }
	      } else {
	        batchTest.push(verify);
	      }
	    }
	    if (that.loaded[element.url]) return;
	    var script = document.createElement('script');
	    script.onreadystatechange = function () {
	      if (this.readyState !== 'loaded' && this.readyState !== 'complete') return;
	      testElement(element);
	    };
	    script.onload = function () {
	      testElement(element);
	    };
	    script.onerror = function () {
	      hasError = true;
	      delete that.loading[element.url];
	      if (_typeof(element.test) === 'object') {
	        for (var key in element.test) {
	          removeTest(element.test[key]);
	        }
	      } else {
	        removeTest(element.test);
	      }
	    };
	    script.setAttribute('type', 'text/javascript');
	    script.setAttribute('src', element.url);
	    doc.appendChild(script);
	    that.loading[element.url] = function () {};
	  };
	  // / checking to see whether everything loaded properly
	  var removeTest = function removeTest(test) {
	    var ret = [];
	    for (var n = 0; n < batchTest.length; n++) {
	      if (batchTest[n] === test) continue;
	      ret.push(batchTest[n]);
	    }
	    batchTest = ret;
	  };
	  var onLoad = function onLoad(element) {
	    if (element) {
	      testElement(element, element.test);
	    } else {
	      for (var n = 0; n < urls.length; n++) {
	        testElement(urls[n], urls[n].test);
	      }
	    }
	    var istrue = true;
	    for (var _n = 0; _n < batchTest.length; _n++) {
	      if (_globalExists(batchTest[_n]) === false) {
	        istrue = false;
	      }
	    }
	    if (!config.strictOrder && istrue) {
	      // finished loading all the requested scripts
	      if (hasError) {
	        if (config.error) {
	          config.error();
	        }
	      } else if (config.onsuccess) {
	        config.onsuccess();
	      }
	    } else {
	      // keep calling back the function
	      setTimeout(function () {
	        // - should get slower over time?
	        onLoad(element);
	      }, 10);
	    }
	  };
	  // / loading methods;  strict ordering or loose ordering
	  if (config.strictOrder) {
	    var ID = -1;
	    var getNext = function getNext() {
	      ID++;
	      if (!urls[ID]) {
	        // all elements are loaded
	        if (hasError) {
	          if (config.error) {
	            config.error();
	          }
	        } else if (config.onsuccess) {
	          config.onsuccess();
	        }
	      } else {
	        // loading new script
	        var element = urls[ID];
	        var url = element.url;
	        if (that.loading[url]) {
	          // already loading from another call (attach to event)
	          that.loading[url] = function () {
	            if (element.onsuccess) element.onsuccess();
	            getNext();
	          };
	        } else if (!that.loaded[url]) {
	          // create script element
	          addElement(element);
	          onLoad(element);
	        } else {
	          // it's already been successfully loaded
	          getNext();
	        }
	      }
	    };
	    getNext();
	  } else {
	    // loose ordering
	    for (var _ID = 0; _ID < urls.length; _ID++) {
	      addElement(urls[_ID]);
	      onLoad(urls[_ID]);
	    }
	  }
	};
	
	var loadScript = exports.loadScript = new LoadScript();

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.request = request;
	/*
	  ----------------------------------------------------------
	  Request : 0.1.1 : 2015-03-26
	  ----------------------------------------------------------
	  request({
	    url: './dir/something.extension',
	    data: 'test!',
	    format: 'text', // text | xml | json | binary
	    responseType: 'text', // arraybuffer | blob | document | json | text
	    headers: {},
	    withCredentials: true, // true | false
	    ///
	    onerror: function(evt, percent) {
	      console.log(evt)
	    },
	    onsuccess: function(evt, responseText) {
	      console.log(responseText)
	    },
	    onprogress: function(evt, percent) {
	      percent = Math.round(percent * 100)
	      loader.create('thread', 'loading... ', percent)
	    }
	  })
	*/
	
	function request(opts, onsuccess, onerror, onprogress) {
	  if (typeof opts === 'string') opts = { url: opts };
	  var data = opts.data;
	  var url = opts.url;
	  var method = opts.method || (opts.data ? 'POST' : 'GET');
	  var format = opts.format;
	  var headers = opts.headers;
	  var responseType = opts.responseType;
	  var withCredentials = opts.withCredentials || false;
	  var xhr = new window.XMLHttpRequest();
	  onsuccess = onsuccess || opts.onsuccess;
	  onerror = onerror || opts.onerror;
	  onprogress = onprogress || opts.onprogress;
	  xhr.open(method, url, true);
	  if (headers) {
	    for (var type in headers) {
	      xhr.setRequestHeader(type, headers[type]);
	    }
	  } else if (data) {
	    // set the default headers for POST
	    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	  }
	  if (format === 'binary') {
	    // - default to responseType="blob" when supported
	    if (xhr.overrideMimeType) {
	      xhr.overrideMimeType('text/plain; charset=x-user-defined');
	    }
	  }
	  if (responseType) {
	    xhr.responseType = responseType;
	  }
	  if (withCredentials) {
	    xhr.withCredentials = 'true';
	  }
	  if (onerror && 'onerror' in xhr) {
	    xhr.onerror = onerror;
	  }
	  if (onprogress && xhr.upload && 'onprogress' in xhr.upload) {
	    if (data) {
	      xhr.upload.onprogress = function (evt) {
	        onprogress.call(xhr, evt, evt.loaded / evt.total);
	      };
	    } else {
	      xhr.addEventListener('progress', function (evt) {
	        var totalBytes = 0;
	        if (evt.lengthComputable) {
	          totalBytes = evt.total;
	        } else if (xhr.totalBytes) {
	          totalBytes = xhr.totalBytes;
	        } else {
	          var rawBytes = parseInt(xhr.getResponseHeader('Content-Length-Raw'));
	          if (isFinite(rawBytes)) {
	            xhr.totalBytes = totalBytes = rawBytes;
	          } else {
	            return;
	          }
	        }
	        onprogress.call(xhr, evt, evt.loaded / totalBytes);
	      });
	    }
	  }
	  // /
	  xhr.onreadystatechange = function (evt) {
	    if (xhr.readyState === 4) {
	      // The request is complete
	      if (xhr.status === 200 || // Response OK
	      xhr.status === 304 || // Not Modified
	      xhr.status === 308 // Permanent Redirect
	      ) {
	          if (onsuccess) {
	            var res;
	            if (format === 'xml') {
	              res = evt.target.responseXML;
	            } else if (format === 'text') {
	              res = evt.target.responseText;
	            } else if (format === 'json') {
	              try {
	                res = JSON.parse(evt.target.response);
	              } catch (err) {
	                onerror && onerror.call(xhr, evt);
	              }
	            }
	            onsuccess.call(xhr, evt, res);
	          }
	        } else {
	        onerror && onerror.call(xhr, evt);
	      }
	    }
	  };
	  xhr.send(data);
	  return xhr;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _root = __webpack_require__(2);
	
	var _root2 = _interopRequireDefault(_root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_root2.default.GM = function (map) {
	  var clean = function clean(name) {
	    return name.replace(/[^a-z0-9 ]/gi, '').replace(/[ ]/g, '_').toLowerCase();
	  };
	  var res = {
	    byName: {},
	    byId: {},
	    byCategory: {}
	  };
	  for (var key in map) {
	    var list = map[key];
	    for (var n = 0, length = list.length; n < length; n++) {
	      var instrument = list[n];
	      if (!instrument) continue;
	      var num = parseInt(instrument.substr(0, instrument.indexOf(' ')), 10);
	      instrument = instrument.replace(num + ' ', '');
	      res.byId[--num] = res.byName[clean(instrument)] = res.byCategory[clean(key)] = {
	        id: clean(instrument),
	        instrument: instrument,
	        number: num,
	        category: key
	      };
	    }
	  }
	  return res;
	}({
	  'Piano': ['1 Acoustic Grand Piano', '2 Bright Acoustic Piano', '3 Electric Grand Piano', '4 Honky-tonk Piano', '5 Electric Piano 1', '6 Electric Piano 2', '7 Harpsichord', '8 Clavinet'],
	  'Chromatic Percussion': ['9 Celesta', '10 Glockenspiel', '11 Music Box', '12 Vibraphone', '13 Marimba', '14 Xylophone', '15 Tubular Bells', '16 Dulcimer'],
	  'Organ': ['17 Drawbar Organ', '18 Percussive Organ', '19 Rock Organ', '20 Church Organ', '21 Reed Organ', '22 Accordion', '23 Harmonica', '24 Tango Accordion'],
	  'Guitar': ['25 Acoustic Guitar (nylon)', '26 Acoustic Guitar (steel)', '27 Electric Guitar (jazz)', '28 Electric Guitar (clean)', '29 Electric Guitar (muted)', '30 Overdriven Guitar', '31 Distortion Guitar', '32 Guitar Harmonics'],
	  'Bass': ['33 Acoustic Bass', '34 Electric Bass (finger)', '35 Electric Bass (pick)', '36 Fretless Bass', '37 Slap Bass 1', '38 Slap Bass 2', '39 Synth Bass 1', '40 Synth Bass 2'],
	  'Strings': ['41 Violin', '42 Viola', '43 Cello', '44 Contrabass', '45 Tremolo Strings', '46 Pizzicato Strings', '47 Orchestral Harp', '48 Timpani'],
	  'Ensemble': ['49 String Ensemble 1', '50 String Ensemble 2', '51 Synth Strings 1', '52 Synth Strings 2', '53 Choir Aahs', '54 Voice Oohs', '55 Synth Choir', '56 Orchestra Hit'],
	  'Brass': ['57 Trumpet', '58 Trombone', '59 Tuba', '60 Muted Trumpet', '61 French Horn', '62 Brass Section', '63 Synth Brass 1', '64 Synth Brass 2'],
	  'Reed': ['65 Soprano Sax', '66 Alto Sax', '67 Tenor Sax', '68 Baritone Sax', '69 Oboe', '70 English Horn', '71 Bassoon', '72 Clarinet'],
	  'Pipe': ['73 Piccolo', '74 Flute', '75 Recorder', '76 Pan Flute', '77 Blown Bottle', '78 Shakuhachi', '79 Whistle', '80 Ocarina'],
	  'Synth Lead': ['81 Lead 1 (square)', '82 Lead 2 (sawtooth)', '83 Lead 3 (calliope)', '84 Lead 4 (chiff)', '85 Lead 5 (charang)', '86 Lead 6 (voice)', '87 Lead 7 (fifths)', '88 Lead 8 (bass + lead)'],
	  'Synth Pad': ['89 Pad 1 (new age)', '90 Pad 2 (warm)', '91 Pad 3 (polysynth)', '92 Pad 4 (choir)', '93 Pad 5 (bowed)', '94 Pad 6 (metallic)', '95 Pad 7 (halo)', '96 Pad 8 (sweep)'],
	  'Synth Effects': ['97 FX 1 (rain)', '98 FX 2 (soundtrack)', '99 FX 3 (crystal)', '100 FX 4 (atmosphere)', '101 FX 5 (brightness)', '102 FX 6 (goblins)', '103 FX 7 (echoes)', '104 FX 8 (sci-fi)'],
	  'Ethnic': ['105 Sitar', '106 Banjo', '107 Shamisen', '108 Koto', '109 Kalimba', '110 Bagpipe', '111 Fiddle', '112 Shanai'],
	  'Percussive': ['113 Tinkle Bell', '114 Agogo', '115 Steel Drums', '116 Woodblock', '117 Taiko Drum', '118 Melodic Tom', '119 Synth Drum'],
	  'Sound effects': ['120 Reverse Cymbal', '121 Guitar Fret Noise', '122 Breath Noise', '123 Seashore', '124 Bird Tweet', '125 Telephone Ring', '126 Helicopter', '127 Applause', '128 Gunshot']
	});
	
	/* get/setInstrument
	--------------------------------------------------- */
	/*
	  ----------------------------------------------------------
	  GeneralMIDI
	  ----------------------------------------------------------
	*/
	
	_root2.default.getInstrument = function (channelId) {
	  var channel = _root2.default.channels[channelId];
	  return channel && channel.instrument;
	};
	
	_root2.default.setInstrument = function (channelId, program, delay) {
	  var channel = _root2.default.channels[channelId];
	  if (delay) {
	    return setTimeout(function () {
	      channel.instrument = program;
	    }, delay);
	  } else {
	    channel.instrument = program;
	  }
	};
	
	/* get/setMono
	--------------------------------------------------- */
	_root2.default.getMono = function (channelId) {
	  var channel = _root2.default.channels[channelId];
	  return channel && channel.mono;
	};
	
	_root2.default.setMono = function (channelId, truthy, delay) {
	  var channel = _root2.default.channels[channelId];
	  if (delay) {
	    return setTimeout(function () {
	      channel.mono = truthy;
	    }, delay);
	  } else {
	    channel.mono = truthy;
	  }
	};
	
	/* get/setOmni
	--------------------------------------------------- */
	_root2.default.getOmni = function (channelId) {
	  var channel = _root2.default.channels[channelId];
	  return channel && channel.omni;
	};
	
	_root2.default.setOmni = function (channelId, truthy, delay) {
	  var channel = _root2.default.channels[channelId];
	  if (delay) {
	    return setTimeout(function () {
	      channel.omni = truthy;
	    }, delay);
	  } else {
	    channel.omni = truthy;
	  }
	};
	
	/* get/setSolo
	--------------------------------------------------- */
	_root2.default.getSolo = function (channelId) {
	  var channel = _root2.default.channels[channelId];
	  return channel && channel.solo;
	};
	
	_root2.default.setSolo = function (channelId, truthy, delay) {
	  var channel = _root2.default.channels[channelId];
	  if (delay) {
	    return setTimeout(function () {
	      channel.solo = truthy;
	    }, delay);
	  } else {
	    channel.solo = truthy;
	  }
	};
	
	/* channels
	--------------------------------------------------- */
	_root2.default.channels = function () {
	  // 0 - 15 channels
	  var channels = {};
	  for (var i = 0; i < 16; i++) {
	    channels[i] = { // default values
	      instrument: i,
	      pitchBend: 0,
	      mute: false,
	      mono: false,
	      omni: false,
	      solo: false
	    };
	  }
	  return channels;
	}();
	
	/* note conversions
	--------------------------------------------------- */
	_root2.default.keyToNote = {}; // C8  == 108
	_root2.default.noteToKey = {}; // 108 ==  C8
	
	~function () {
	  var A0 = 0x15; // first note
	  var C8 = 0x6C; // last note
	  var number2key = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
	  for (var n = A0; n <= C8; n++) {
	    var octave = (n - 12) / 12 >> 0;
	    var name = number2key[n % 12] + octave;
	    _root2.default.keyToNote[name] = n;
	    _root2.default.noteToKey[n] = name;
	  }
	}();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jasmid = __webpack_require__(10);
	
	var _root = __webpack_require__(2);
	
	var _root2 = _interopRequireDefault(_root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	  ----------------------------------------------------------
	  midi.Player : 0.3.1 : 2015-03-26
	  ----------------------------------------------------------
	  https://github.com/mudcube/midi.js
	  ----------------------------------------------------------
	*/
	
	(function () {
	  _root2.default.Player = {};
	  var player = _root2.default.Player;
	  player.currentTime = 0;
	  player.endTime = 0;
	  player.restart = 0;
	  player.playing = false;
	  player.timeWarp = 1;
	  player.startDelay = 0;
	  player.BPM = 120;
	
	  player.start = player.resume = function (onsuccess) {
	    if (player.currentTime < -1) {
	      player.currentTime = -1;
	    }
	    startAudio(player.currentTime, null, onsuccess);
	  };
	
	  player.pause = function () {
	    var tmp = player.restart;
	    stopAudio();
	    player.restart = tmp;
	  };
	
	  player.stop = function () {
	    stopAudio();
	    player.restart = 0;
	    player.currentTime = 0;
	  };
	
	  player.addListener = function (onsuccess) {
	    onMidiEvent = onsuccess;
	  };
	
	  player.removeListener = function () {
	    onMidiEvent = undefined;
	  };
	
	  player.clearAnimation = function () {
	    if (player.animationFrameId) {
	      window.cancelAnimationFrame(player.animationFrameId);
	    }
	  };
	
	  player.setAnimation = function (callback) {
	    var currentTime = 0;
	    var tOurTime = 0;
	    var tTheirTime = 0;
	    //
	    player.clearAnimation();
	    // /
	    var frame = function frame() {
	      player.animationFrameId = window.requestAnimationFrame(frame);
	      // /
	      if (player.endTime === 0) {
	        return;
	      }
	      if (player.playing) {
	        currentTime = tTheirTime === player.currentTime ? tOurTime - Date.now() : 0;
	        if (player.currentTime === 0) {
	          currentTime = 0;
	        } else {
	          currentTime = player.currentTime - currentTime;
	        }
	        if (tTheirTime !== player.currentTime) {
	          tOurTime = Date.now();
	          tTheirTime = player.currentTime;
	        }
	      } else {
	        // paused
	        currentTime = player.currentTime;
	      }
	      // /
	      var endTime = player.endTime;
	      // var percent = currentTime / endTime
	      var total = currentTime / 1000;
	      var minutes = total / 60;
	      var seconds = total - minutes * 60;
	      var t1 = minutes * 60 + seconds;
	      var t2 = endTime / 1000;
	      // /
	      if (t2 - t1 < -1.0) {
	        return;
	      } else {
	        callback({
	          now: t1,
	          end: t2,
	          events: noteRegistrar
	        });
	      }
	    };
	    // /
	    window.requestAnimationFrame(frame);
	  };
	
	  // helpers
	
	  player.loadMidiFile = function (onsuccess, onprogress, onerror) {
	    try {
	      // console.log(MidiFile(player.currentData), new Replayer(MidiFile(player.currentData), player.timeWarp, null, player.BPM))
	      player.replayer = new _jasmid.Replayer((0, _jasmid.MidiFile)(player.currentData), player.timeWarp, null, player.BPM);
	      player.data = player.replayer.getData();
	      player.endTime = getLength();
	      // /
	      _root2.default.loadPlugin({
	        // instruments: player.getFileInstruments(),
	        onsuccess: onsuccess,
	        onprogress: onprogress,
	        onerror: onerror
	      });
	    } catch (event) {
	      console.error(event);
	      onerror && onerror(event);
	    }
	  };
	
	  player.loadFile = function (file, onsuccess, onprogress, onerror) {
	    player.stop();
	    if (file.indexOf('base64,') !== -1) {
	      var data = window.atob(file.split(',')[1]);
	      player.currentData = data;
	      player.loadMidiFile(onsuccess, onprogress, onerror);
	    } else {
	      var fetch = new window.XMLHttpRequest();
	      fetch.open('GET', file);
	      fetch.overrideMimeType('text/plain; charset=x-user-defined');
	      fetch.onreadystatechange = function () {
	        if (this.readyState === 4) {
	          if (this.status === 200) {
	            var t = this.responseText || '';
	            var ff = [];
	            var mx = t.length;
	            var scc = String.fromCharCode;
	            for (var z = 0; z < mx; z++) {
	              ff[z] = scc(t.charCodeAt(z) & 255);
	            }
	            // /
	            var data = ff.join('');
	            player.currentData = data;
	            player.loadMidiFile(onsuccess, onprogress, onerror);
	          } else {
	            onerror && onerror('Unable to load MIDI file');
	          }
	        }
	      };
	      fetch.send();
	    }
	  };
	
	  player.getFileInstruments = function () {
	    var instruments = {};
	    var programs = {};
	    for (var n = 0; n < player.data.length; n++) {
	      var event = player.data[n][0].event;
	      if (event.type !== 'channel') {
	        continue;
	      }
	      var channel = event.channel;
	      switch (event.subtype) {
	        case 'controller':
	          //        console.log(event.channel, root.defineControl[event.controllerType], event.value)
	          break;
	        case 'programChange':
	          programs[channel] = event.programNumber;
	          break;
	        case 'noteOn':
	          var program = programs[channel];
	          var gm = _root2.default.GM.byId[isFinite(program) ? program : channel];
	          instruments[gm.id] = true;
	          break;
	      }
	    }
	    var ret = [];
	    for (var key in instruments) {
	      ret.push(key);
	    }
	    return ret;
	  };
	
	  // Playing the audio
	
	  var eventQueue = []; // hold events to be triggered
	  var queuedTime; //
	  var startTime = 0; // to measure time elapse
	  var noteRegistrar = {}; // get event for requested note
	  var onMidiEvent; // listener
	  var scheduleTracking = function scheduleTracking(channel, note, currentTime, offset, message, velocity, time) {
	    return setTimeout(function () {
	      var data = {
	        channel: channel,
	        note: note,
	        now: currentTime,
	        end: player.endTime,
	        message: message,
	        velocity: velocity
	      };
	      //
	      if (message === 128) {
	        delete noteRegistrar[note];
	      } else {
	        noteRegistrar[note] = data;
	      }
	      if (onMidiEvent) {
	        onMidiEvent(data);
	      }
	      player.currentTime = currentTime;
	      // /
	      eventQueue.shift();
	      // /
	      if (eventQueue.length < 1000) {
	        startAudio(queuedTime, true);
	      } else if (player.currentTime === queuedTime && queuedTime < player.endTime) {
	        // grab next sequence
	        startAudio(queuedTime, true);
	      }
	    }, currentTime - offset);
	  };
	
	  var getContext = function getContext() {
	    if (_root2.default.api === 'webaudio') {
	      return _root2.default.WebAudio.getContext();
	    } else {
	      player.ctx = { currentTime: 0 };
	    }
	    return player.ctx;
	  };
	
	  var getLength = function getLength() {
	    var data = player.data;
	    var length = data.length;
	    var totalTime = 0.5;
	    for (var n = 0; n < length; n++) {
	      totalTime += data[n][1];
	    }
	    return totalTime;
	  };
	
	  var __now;
	  var getNow = function getNow() {
	    if (window.performance && window.performance.now) {
	      return window.performance.now();
	    } else {
	      return Date.now();
	    }
	  };
	
	  var startAudio = function startAudio(currentTime, fromCache, onsuccess) {
	    if (!player.replayer) {
	      return;
	    }
	    if (!fromCache) {
	      if (typeof currentTime === 'undefined') {
	        currentTime = player.restart;
	      }
	      // /
	      player.playing && stopAudio();
	      player.playing = true;
	      player.data = player.replayer.getData();
	      player.endTime = getLength();
	    }
	    // /
	    var note;
	    var offset = 0;
	    var messages = 0;
	    var data = player.data;
	    var ctx = getContext();
	    var length = data.length;
	    //
	    queuedTime = 0.5;
	    // /
	    // var interval = eventQueue[0] && eventQueue[0].interval || 0
	    var foffset = currentTime - player.currentTime;
	    // /
	    if (_root2.default.api !== 'webaudio') {
	      // set currentTime on ctx
	      var now = getNow();
	      __now = __now || now;
	      ctx.currentTime = (now - __now) / 1000;
	    }
	    // /
	    startTime = ctx.currentTime;
	    // /
	    for (var n = 0; n < length && messages < 100; n++) {
	      var obj = data[n];
	      if ((queuedTime += obj[1]) <= currentTime) {
	        offset = queuedTime;
	        continue;
	      }
	      // /
	      currentTime = queuedTime - offset;
	      // /
	      var event = obj[0].event;
	      if (event.type !== 'channel') {
	        continue;
	      }
	      // /
	      var channelId = event.channel;
	      var channel = _root2.default.channels[channelId];
	      var delay = ctx.currentTime + (currentTime + foffset + player.startDelay) / 1000;
	      var queueTime = queuedTime - offset + player.startDelay;
	      switch (event.subtype) {
	        case 'controller':
	          _root2.default.setController(channelId, event.controllerType, event.value, delay);
	          break;
	        case 'programChange':
	          _root2.default.programChange(channelId, event.programNumber, delay);
	          break;
	        case 'pitchBend':
	          _root2.default.pitchBend(channelId, event.value, delay);
	          break;
	        case 'noteOn':
	          if (channel.mute) break;
	          note = event.noteNumber - (player.MIDIOffset || 0);
	          eventQueue.push({
	            event: event,
	            time: queueTime,
	            source: _root2.default.noteOn(channelId, event.noteNumber, event.velocity, delay),
	            interval: scheduleTracking(channelId, note, queuedTime + player.startDelay, offset - foffset, 144, event.velocity)
	          });
	          messages++;
	          break;
	        case 'noteOff':
	          if (channel.mute) break;
	          note = event.noteNumber - (player.MIDIOffset || 0);
	          eventQueue.push({
	            event: event,
	            time: queueTime,
	            source: _root2.default.noteOff(channelId, event.noteNumber, delay),
	            interval: scheduleTracking(channelId, note, queuedTime, offset - foffset, 128, 0)
	          });
	          break;
	        default:
	          break;
	      }
	    }
	    // /
	    onsuccess && onsuccess(eventQueue);
	  };
	
	  var stopAudio = function stopAudio() {
	    var ctx = getContext();
	    player.playing = false;
	    player.restart += (ctx.currentTime - startTime) * 1000;
	    // stop the audio, and intervals
	    while (eventQueue.length) {
	      var o = eventQueue.pop();
	      window.clearInterval(o.interval);
	      if (!o.source) continue; // is not webaudio
	      if (typeof o.source === 'number') {
	        window.clearTimeout(o.source);
	      } else {
	        // webaudio
	        o.source.disconnect(0);
	      }
	    }
	    // run callback to cancel any notes still playing
	    for (var key in noteRegistrar) {
	      var _o = noteRegistrar[key];
	      if (noteRegistrar[key].message === 144 && onMidiEvent) {
	        onMidiEvent({
	          channel: _o.channel,
	          note: _o.note,
	          now: _o.now,
	          end: _o.end,
	          message: 128,
	          velocity: _o.velocity
	        });
	      }
	    }
	    // reset noteRegistrar
	    noteRegistrar = {};
	  };
	})();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _midifile = __webpack_require__(11);
	
	Object.keys(_midifile).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _midifile[key];
	    }
	  });
	});
	
	var _replayer = __webpack_require__(13);
	
	Object.keys(_replayer).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _replayer[key];
	    }
	  });
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MidiFile = MidiFile;
	
	var _stream = __webpack_require__(12);
	
	var _stream2 = _interopRequireDefault(_stream);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function MidiFile(data) {
	  var lastEventTypeByte;
	
	  function readChunk(stream) {
	    var id = stream.read(4);
	    var length = stream.readInt32();
	    return {
	      'id': id,
	      'length': length,
	      'data': stream.read(length)
	    };
	  }
	
	  function readEvent(stream) {
	    var event = {};
	    event.deltaTime = stream.readVarInt();
	    var eventTypeByte = stream.readInt8();
	    if ((eventTypeByte & 0xf0) === 0xf0) {
	      /* system / meta event */
	      if (eventTypeByte === 0xff) {
	        /* meta event */
	        event.type = 'meta';
	        var subtypeByte = stream.readInt8();
	        var length = stream.readVarInt();
	        switch (subtypeByte) {
	          case 0x00:
	            event.subtype = 'sequenceNumber';
	            if (length !== 2) throw new Error('Expected length for sequenceNumber event is 2, got ' + length);
	            event.number = stream.readInt16();
	            return event;
	          case 0x01:
	            event.subtype = 'text';
	            event.text = stream.read(length);
	            return event;
	          case 0x02:
	            event.subtype = 'copyrightNotice';
	            event.text = stream.read(length);
	            return event;
	          case 0x03:
	            event.subtype = 'trackName';
	            event.text = stream.read(length);
	            return event;
	          case 0x04:
	            event.subtype = 'instrumentName';
	            event.text = stream.read(length);
	            return event;
	          case 0x05:
	            event.subtype = 'lyrics';
	            event.text = stream.read(length);
	            return event;
	          case 0x06:
	            event.subtype = 'marker';
	            event.text = stream.read(length);
	            return event;
	          case 0x07:
	            event.subtype = 'cuePoint';
	            event.text = stream.read(length);
	            return event;
	          case 0x20:
	            event.subtype = 'midiChannelPrefix';
	            if (length !== 1) throw new Error('Expected length for midiChannelPrefix event is 1, got ' + length);
	            event.channel = stream.readInt8();
	            return event;
	          case 0x2f:
	            event.subtype = 'endOfTrack';
	            if (length !== 0) throw new Error('Expected length for endOfTrack event is 0, got ' + length);
	            return event;
	          case 0x51:
	            event.subtype = 'setTempo';
	            if (length !== 3) throw new Error('Expected length for setTempo event is 3, got ' + length);
	            event.microsecondsPerBeat = (stream.readInt8() << 16) + (stream.readInt8() << 8) + stream.readInt8();
	            return event;
	          case 0x54:
	            event.subtype = 'smpteOffset';
	            if (length !== 5) throw new Error('Expected length for smpteOffset event is 5, got ' + length);
	            var hourByte = stream.readInt8();
	            event.frameRate = {
	              0x00: 24, 0x20: 25, 0x40: 29, 0x60: 30
	            }[hourByte & 0x60];
	            event.hour = hourByte & 0x1f;
	            event.min = stream.readInt8();
	            event.sec = stream.readInt8();
	            event.frame = stream.readInt8();
	            event.subframe = stream.readInt8();
	            return event;
	          case 0x58:
	            event.subtype = 'timeSignature';
	            if (length !== 4) throw new Error('Expected length for timeSignature event is 4, got ' + length);
	            event.numerator = stream.readInt8();
	            event.denominator = Math.pow(2, stream.readInt8());
	            event.metronome = stream.readInt8();
	            event.thirtyseconds = stream.readInt8();
	            return event;
	          case 0x59:
	            event.subtype = 'keySignature';
	            if (length !== 2) throw new Error('Expected length for keySignature event is 2, got ' + length);
	            event.key = stream.readInt8(true);
	            event.scale = stream.readInt8();
	            return event;
	          case 0x7f:
	            event.subtype = 'sequencerSpecific';
	            event.data = stream.read(length);
	            return event;
	          default:
	            // console.log("Unrecognised meta event subtype: " + subtypeByte)
	            event.subtype = 'unknown';
	            event.data = stream.read(length);
	            return event;
	        }
	        // event.data = stream.read(length)
	        // return event
	      } else if (eventTypeByte === 0xf0) {
	        event.type = 'sysEx';
	        var _length = stream.readVarInt();
	        event.data = stream.read(_length);
	        return event;
	      } else if (eventTypeByte === 0xf7) {
	        event.type = 'dividedSysEx';
	        var _length2 = stream.readVarInt();
	        event.data = stream.read(_length2);
	        return event;
	      } else {
	        throw new Error('Unrecognised MIDI event type byte: ' + eventTypeByte);
	      }
	    } else {
	      /* channel event */
	      var param1;
	      if ((eventTypeByte & 0x80) === 0) {
	        /* running status - reuse lastEventTypeByte as the event type.
	          eventTypeByte is actually the first parameter
	        */
	        param1 = eventTypeByte;
	        eventTypeByte = lastEventTypeByte;
	      } else {
	        param1 = stream.readInt8();
	        lastEventTypeByte = eventTypeByte;
	      }
	      var eventType = eventTypeByte >> 4;
	      event.channel = eventTypeByte & 0x0f;
	      event.type = 'channel';
	      switch (eventType) {
	        case 0x08:
	          event.subtype = 'noteOff';
	          event.noteNumber = param1;
	          event.velocity = stream.readInt8();
	          return event;
	        case 0x09:
	          event.noteNumber = param1;
	          event.velocity = stream.readInt8();
	          if (event.velocity === 0) {
	            event.subtype = 'noteOff';
	          } else {
	            event.subtype = 'noteOn';
	          }
	          return event;
	        case 0x0a:
	          event.subtype = 'noteAftertouch';
	          event.noteNumber = param1;
	          event.amount = stream.readInt8();
	          return event;
	        case 0x0b:
	          event.subtype = 'controller';
	          event.controllerType = param1;
	          event.value = stream.readInt8();
	          return event;
	        case 0x0c:
	          event.subtype = 'programChange';
	          event.programNumber = param1;
	          return event;
	        case 0x0d:
	          event.subtype = 'channelAftertouch';
	          event.amount = param1;
	          return event;
	        case 0x0e:
	          event.subtype = 'pitchBend';
	          event.value = param1 + (stream.readInt8() << 7);
	          return event;
	        default:
	          throw new Error('Unrecognised MIDI event type: ' + eventType);
	        /*
	        console.log("Unrecognised MIDI event type: " + eventType)
	        stream.readInt8()
	        event.subtype = 'unknown'
	        return event
	        */
	      }
	    }
	  }
	
	  var stream = (0, _stream2.default)(data);
	  var headerChunk = readChunk(stream);
	  if (headerChunk.id !== 'MThd' || headerChunk.length !== 6) {
	    throw new Error('Bad .mid file - header not found');
	  }
	  var headerStream = (0, _stream2.default)(headerChunk.data);
	  var formatType = headerStream.readInt16();
	  var trackCount = headerStream.readInt16();
	  var timeDivision = headerStream.readInt16();
	  var ticksPerBeat;
	
	  if (timeDivision & 0x8000) {
	    throw new Error('Expressing time division in SMTPE frames is not supported yet');
	  } else {
	    ticksPerBeat = timeDivision;
	  }
	
	  var header = {
	    'formatType': formatType,
	    'trackCount': trackCount,
	    'ticksPerBeat': ticksPerBeat
	  };
	  var tracks = [];
	  for (var i = 0; i < header.trackCount; i++) {
	    tracks[i] = [];
	    var trackChunk = readChunk(stream);
	    if (trackChunk.id !== 'MTrk') {
	      throw new Error('Unexpected chunk - expected MTrk, got ' + trackChunk.id);
	    }
	    var trackStream = (0, _stream2.default)(trackChunk.data);
	    while (!trackStream.eof()) {
	      var event = readEvent(trackStream);
	      tracks[i].push(event);
	      // console.log(event)
	    }
	  }
	
	  return {
	    'header': header,
	    'tracks': tracks
	  };
	} /**
	   * class to parse the .mid file format
	   * (depends on _stream.js)
	   */

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (str) {
	  var position = 0;
	
	  function read(length) {
	    var result = str.substr(position, length);
	    position += length;
	    return result;
	  }
	
	  /* read a big-endian 32-bit integer */
	  function readInt32() {
	    var result = (str.charCodeAt(position) << 24) + (str.charCodeAt(position + 1) << 16) + (str.charCodeAt(position + 2) << 8) + str.charCodeAt(position + 3);
	    position += 4;
	    return result;
	  }
	
	  /* read a big-endian 16-bit integer */
	  function readInt16() {
	    var result = (str.charCodeAt(position) << 8) + str.charCodeAt(position + 1);
	    position += 2;
	    return result;
	  }
	
	  /* read an 8-bit integer */
	  function readInt8(signed) {
	    var result = str.charCodeAt(position);
	    if (signed && result > 127) result -= 256;
	    position += 1;
	    return result;
	  }
	
	  function eof() {
	    return position >= str.length;
	  }
	
	  /* read a MIDI-style variable-length integer
	    (big-endian value in groups of 7 bits,
	    with top bit set to signify that another byte follows)
	  */
	  function readVarInt() {
	    var result = 0;
	    while (true) {
	      var b = readInt8();
	      if (b & 0x80) {
	        result += b & 0x7f;
	        result <<= 7;
	      } else {
	        /* b is the last byte */
	        return result + b;
	      }
	    }
	  }
	
	  return {
	    'eof': eof,
	    'read': read,
	    'readInt32': readInt32,
	    'readInt16': readInt16,
	    'readInt8': readInt8,
	    'readVarInt': readVarInt
	  };
	};
	
	module.exports = exports['default']; /* Wrapper for accessing strings through sequential reads */

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.Replayer = Replayer;
	var clone = function clone(o) {
	  if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) !== 'object') return o;
	  if (o === null) return o;
	  var ret = typeof o.length === 'number' ? [] : {};
	  for (var key in o) {
	    ret[key] = clone(o[key]);
	  }return ret;
	};
	
	function Replayer(midiFile, timeWarp, eventProcessor, bpm) {
	  var trackStates = [];
	  var beatsPerMinute = bpm || 120;
	  var bpmOverride = !!bpm;
	  var ticksPerBeat = midiFile.header.ticksPerBeat;
	
	  for (var i = 0; i < midiFile.tracks.length; i++) {
	    trackStates[i] = {
	      'nextEventIndex': 0,
	      'ticksToNextEvent': midiFile.tracks[i].length ? midiFile.tracks[i][0].deltaTime : null
	    };
	  }
	
	  function getNextEvent() {
	    var ticksToNextEvent = null;
	    var nextEventTrack = null;
	    var nextEventIndex = null;
	
	    for (var _i = 0; _i < trackStates.length; _i++) {
	      if (trackStates[_i].ticksToNextEvent != null && (ticksToNextEvent == null || trackStates[_i].ticksToNextEvent < ticksToNextEvent)) {
	        ticksToNextEvent = trackStates[_i].ticksToNextEvent;
	        nextEventTrack = _i;
	        nextEventIndex = trackStates[_i].nextEventIndex;
	      }
	    }
	    if (nextEventTrack != null) {
	      /* consume event from that track */
	      var nextEvent = midiFile.tracks[nextEventTrack][nextEventIndex];
	      if (midiFile.tracks[nextEventTrack][nextEventIndex + 1]) {
	        trackStates[nextEventTrack].ticksToNextEvent += midiFile.tracks[nextEventTrack][nextEventIndex + 1].deltaTime;
	      } else {
	        trackStates[nextEventTrack].ticksToNextEvent = null;
	      }
	      trackStates[nextEventTrack].nextEventIndex += 1;
	      /* advance timings on all tracks by ticksToNextEvent */
	      for (var _i2 = 0; _i2 < trackStates.length; _i2++) {
	        if (trackStates[_i2].ticksToNextEvent != null) {
	          trackStates[_i2].ticksToNextEvent -= ticksToNextEvent;
	        }
	      }
	      return {
	        'ticksToEvent': ticksToNextEvent,
	        'event': nextEvent,
	        'track': nextEventTrack
	      };
	    } else {
	      return null;
	    }
	  }
	  //
	  var midiEvent;
	  var temporal = [];
	  ~function processEvents() {
	    function processNext() {
	      if (!bpmOverride && midiEvent.event.type === 'meta' && midiEvent.event.subtype === 'setTempo') {
	        // tempo change events can occur anywhere in the middle and affect events that follow
	        beatsPerMinute = 60000000 / midiEvent.event.microsecondsPerBeat;
	      }
	      // /
	      var beatsToGenerate = 0;
	      var secondsToGenerate = 0;
	      if (midiEvent.ticksToEvent > 0) {
	        beatsToGenerate = midiEvent.ticksToEvent / ticksPerBeat;
	        secondsToGenerate = beatsToGenerate / (beatsPerMinute / 60);
	      }
	      // /
	      var time = secondsToGenerate * 1000 * timeWarp || 0;
	      temporal.push([midiEvent, time]);
	      midiEvent = getNextEvent();
	    }
	    // /
	    midiEvent = getNextEvent();
	    if (midiEvent) {
	      while (midiEvent) {
	        processNext(true);
	      }
	    }
	  }();
	
	  return {
	    getData: function getData() {
	      return clone(temporal);
	    }
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(15);
	
	__webpack_require__(16);
	
	__webpack_require__(17);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _root = __webpack_require__(2);
	
	var _root2 = _interopRequireDefault(_root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.Audio && function () {
	  var midi = _root2.default.AudioTag = { api: 'audiotag' };
	  var noteToKey = {};
	  var volume = 127; // floating point
	  var bufferNid = -1; // current channel
	  var audioBuffers = []; // the audio channels
	  var notesOn = []; // instrumentId + noteId that is currently playing in each 'channel', for routing noteOff/chordOff calls
	  var notes = {}; // the piano keys
	  for (var nid = 0; nid < 12; nid++) {
	    audioBuffers[nid] = new window.Audio();
	  }
	
	  var playChannel = function playChannel(channel, note) {
	    if (!_root2.default.channels[channel]) return;
	    var instrument = _root2.default.channels[channel].instrument;
	    var instrumentId = _root2.default.GM.byId[instrument].id;
	    note = notes[note];
	    if (note) {
	      var instrumentNoteId = instrumentId + '' + note.id;
	      var nid = (bufferNid + 1) % audioBuffers.length;
	      var audio = audioBuffers[nid];
	      notesOn[nid] = instrumentNoteId;
	      if (!_root2.default.Soundfont[instrumentId]) {
	        if (_root2.default.DEBUG) {
	          console.log('404', instrumentId);
	        }
	        return;
	      }
	      audio.src = _root2.default.Soundfont[instrumentId][note.id];
	      audio.volume = volume / 127;
	      audio.play();
	      bufferNid = nid;
	    }
	  };
	
	  var stopChannel = function stopChannel(channel, note) {
	    if (!_root2.default.channels[channel]) return;
	    var instrument = _root2.default.channels[channel].instrument;
	    var instrumentId = _root2.default.GM.byId[instrument].id;
	    note = notes[note];
	    if (note) {
	      var instrumentNoteId = instrumentId + '' + note.id;
	      for (var i = 0, len = audioBuffers.length; i < len; i++) {
	        var nid = (i + bufferNid + 1) % len;
	        var cId = notesOn[nid];
	        if (cId && cId === instrumentNoteId) {
	          audioBuffers[nid].pause();
	          notesOn[nid] = null;
	          return;
	        }
	      }
	    }
	  };
	
	  midi.audioBuffers = audioBuffers;
	  midi.send = function (data, delay) {};
	  midi.setController = function (channel, type, value, delay) {};
	  midi.setVolume = function (channel, n) {
	    volume = n; // - should be channel specific volume
	  };
	
	  midi.programChange = function (channel, program) {
	    _root2.default.channels[channel].instrument = program;
	  };
	
	  midi.pitchBend = function (channel, program, delay) {};
	
	  midi.noteOn = function (channel, note, velocity, delay) {
	    var id = noteToKey[note];
	    if (!notes[id]) return;
	    if (delay) {
	      return setTimeout(function () {
	        playChannel(channel, id);
	      }, delay * 1000);
	    } else {
	      playChannel(channel, id);
	    }
	  };
	
	  midi.noteOff = function (channel, note, delay) {
	    //      var id = noteToKey[note]
	    //      if (!notes[id]) return
	    //      if (delay) {
	    //        return setTimeout(function() {
	    //          stopChannel(channel, id)
	    //        }, delay * 1000)
	    //      } else {
	    //        stopChannel(channel, id)
	    //      }
	  };
	
	  midi.chordOn = function (channel, chord, velocity, delay) {
	    for (var idx = 0; idx < chord.length; idx++) {
	      var n = chord[idx];
	      var id = noteToKey[n];
	      if (!notes[id]) continue;
	      if (delay) {
	        return setTimeout(function () {
	          playChannel(channel, id);
	        }, delay * 1000);
	      } else {
	        playChannel(channel, id);
	      }
	    }
	  };
	
	  midi.chordOff = function (channel, chord, delay) {
	    for (var idx = 0; idx < chord.length; idx++) {
	      var n = chord[idx];
	      var id = noteToKey[n];
	      if (!notes[id]) continue;
	      if (delay) {
	        return setTimeout(function () {
	          stopChannel(channel, id);
	        }, delay * 1000);
	      } else {
	        stopChannel(channel, id);
	      }
	    }
	  };
	
	  midi.stopAllNotes = function () {
	    for (var nid = 0, length = audioBuffers.length; nid < length; nid++) {
	      audioBuffers[nid].pause();
	    }
	  };
	
	  midi.connect = function (opts) {
	    _root2.default.setDefaultPlugin(midi);
	    // /
	    for (var key in _root2.default.keyToNote) {
	      noteToKey[_root2.default.keyToNote[key]] = key;
	      notes[key] = { id: key };
	    }
	    // /
	    opts.onsuccess && opts.onsuccess();
	  };
	}(); /*
	       ----------------------------------------------------------------------
	       AudioTag <audio> - OGG or MPEG Soundbank
	       ----------------------------------------------------------------------
	       http://dev.w3.org/html5/spec/Overview.html#the-audio-element
	       ----------------------------------------------------------------------
	     */

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _root = __webpack_require__(2);
	
	var _root2 = _interopRequireDefault(_root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// REF: http://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
	function base64ToArrayBuffer(base64) {
	  var binaryString = window.atob(base64);
	  var len = binaryString.length;
	  var bytes = new Uint8Array(len);
	  for (var i = 0; i < len; i++) {
	    bytes[i] = binaryString.charCodeAt(i);
	  }
	  return bytes.buffer;
	} /*
	    ----------------------------------------------------------
	    Web Audio API - OGG or MPEG Soundbank
	    ----------------------------------------------------------
	    http://webaudio.github.io/web-audio-api/
	    ----------------------------------------------------------
	  */
	
	
	window.AudioContext && function () {
	  // var audioContext = null // new AudioContext()
	  var useStreamingBuffer = false; // !!audioContext.createMediaElementSource
	  var midi = _root2.default.WebAudio = { api: 'webaudio' };
	  var ctx; // audio context
	  var sources = {};
	  var effects = {};
	  var masterVolume = 127;
	  var audioBuffers = {};
	  // /
	  midi.audioBuffers = audioBuffers;
	  midi.send = function (data, delay) {};
	  midi.setController = function (channelId, type, value, delay) {};
	
	  midi.setVolume = function (channelId, volume, delay) {
	    if (delay) {
	      setTimeout(function () {
	        masterVolume = volume;
	      }, delay * 1000);
	    } else {
	      masterVolume = volume;
	    }
	  };
	
	  midi.programChange = function (channelId, program, delay) {
	    //      if (delay) {
	    //        return setTimeout(function() {
	    //          var channel = root.channels[channelId]
	    //          channel.instrument = program
	    //        }, delay)
	    //      } else {
	    var channel = _root2.default.channels[channelId];
	    channel.instrument = program;
	    //      }
	  };
	
	  midi.pitchBend = function (channelId, program, delay) {
	    //      if (delay) {
	    //        setTimeout(function() {
	    //          var channel = root.channels[channelId]
	    //          channel.pitchBend = program
	    //        }, delay)
	    //      } else {
	    var channel = _root2.default.channels[channelId];
	    channel.pitchBend = program;
	    //      }
	  };
	
	  midi.noteOn = function (channelId, noteId, velocity, delay) {
	    delay = delay || 0;
	
	    // / check whether the note exists
	    var channel = _root2.default.channels[channelId];
	    var instrument = channel.instrument;
	    var bufferId = instrument + '' + noteId;
	    var buffer = audioBuffers[bufferId];
	    if (!buffer) {
	      //        console.log(midi.GM.byId[instrument].id, instrument, channelId)
	      return;
	    }
	
	    // / convert relative delay to absolute delay
	    if (delay < ctx.currentTime) {
	      delay += ctx.currentTime;
	    }
	
	    // / create audio buffer
	    var source;
	    if (useStreamingBuffer) {
	      source = ctx.createMediaElementSource(buffer);
	    } else {
	      // XMLHTTP buffer
	      source = ctx.createBufferSource();
	      source.buffer = buffer;
	    }
	
	    // / add effects to buffer
	    if (effects) {
	      var chain = source;
	      for (var key in effects) {
	        chain.connect(effects[key].input);
	        chain = effects[key];
	      }
	    }
	
	    // / add gain + pitchShift
	    var gain = velocity / 127 * (masterVolume / 127) * 2 - 1;
	    source.connect(ctx.destination);
	    source.playbackRate.value = 1; // pitch shift
	    source.gainNode = ctx.createGain(); // gain
	    source.gainNode.connect(ctx.destination);
	    source.gainNode.gain.value = Math.min(1.0, Math.max(-1.0, gain));
	    source.connect(source.gainNode);
	    // /
	    if (useStreamingBuffer) {
	      if (delay) {
	        return setTimeout(function () {
	          buffer.currentTime = 0;
	          buffer.play();
	        }, delay * 1000);
	      } else {
	        buffer.currentTime = 0;
	        buffer.play();
	      }
	    } else {
	      source.start(delay || 0);
	    }
	    // /
	    sources[channelId + '' + noteId] = source;
	    // /
	    return source;
	  };
	
	  midi.noteOff = function (channelId, noteId, delay) {
	    delay = delay || 0;
	
	    // / check whether the note exists
	    var channel = _root2.default.channels[channelId];
	    var instrument = channel.instrument;
	    var bufferId = instrument + '' + noteId;
	    var buffer = audioBuffers[bufferId];
	    if (buffer) {
	      if (delay < ctx.currentTime) {
	        delay += ctx.currentTime;
	      }
	      // /
	      var source = sources[channelId + '' + noteId];
	      if (source) {
	        if (source.gainNode) {
	          // @Miranet: 'the values of 0.2 and 0.3 could of course be used as
	          // a 'release' parameter for ADSR like time settings.'
	          // add { 'metadata': { release: 0.3 } } to soundfont files
	          var gain = source.gainNode.gain;
	          gain.linearRampToValueAtTime(gain.value, delay);
	          gain.linearRampToValueAtTime(-1.0, delay + 0.3);
	        }
	        // /
	        if (useStreamingBuffer) {
	          if (delay) {
	            setTimeout(function () {
	              buffer.pause();
	            }, delay * 1000);
	          } else {
	            buffer.pause();
	          }
	        } else {
	          if (source.noteOff) {
	            source.noteOff(delay + 0.5);
	          } else {
	            source.stop(delay + 0.5);
	          }
	        }
	        // /
	        delete sources[channelId + '' + noteId];
	        // /
	        return source;
	      }
	    }
	  };
	
	  midi.chordOn = function (channel, chord, velocity, delay) {
	    var res = {};
	    for (var n = 0, note, len = chord.length; n < len; n++) {
	      res[note = chord[n]] = midi.noteOn(channel, note, velocity, delay);
	    }
	    return res;
	  };
	
	  midi.chordOff = function (channel, chord, delay) {
	    var res = {};
	    for (var n = 0, note, len = chord.length; n < len; n++) {
	      res[note = chord[n]] = midi.noteOff(channel, note, delay);
	    }
	    return res;
	  };
	
	  midi.stopAllNotes = function () {
	    for (var sid in sources) {
	      var delay = 0;
	      if (delay < ctx.currentTime) {
	        delay += ctx.currentTime;
	      }
	      var source = sources[sid];
	      source.gain.linearRampToValueAtTime(1, delay);
	      source.gain.linearRampToValueAtTime(0, delay + 0.3);
	      if (source.noteOff) {
	        // old api
	        source.noteOff(delay + 0.3);
	      } else {
	        // new api
	        source.stop(delay + 0.3);
	      }
	      delete sources[sid];
	    }
	  };
	
	  midi.setEffects = function (list) {
	    if (ctx.tunajs) {
	      for (var n = 0; n < list.length; n++) {
	        var data = list[n];
	        var effect = new ctx.tunajs[data.type](data);
	        effect.connect(ctx.destination);
	        effects[data.type] = effect;
	      }
	    } else {
	      return console.log('Effects module not installed.');
	    }
	  };
	
	  midi.connect = function (opts) {
	    _root2.default.setDefaultPlugin(midi);
	    midi.setContext(ctx || createAudioContext(), opts.onsuccess);
	  };
	
	  midi.getContext = function () {
	    return ctx;
	  };
	
	  midi.setContext = function (newCtx, onload, onprogress, onerror) {
	    ctx = newCtx;
	
	    // / tuna.js effects module - https://github.com/Dinahmoe/tuna
	    if (typeof window.Tuna !== 'undefined' && !ctx.tunajs) {
	      ctx.tunajs = new window.Tuna(ctx);
	    }
	
	    // / loading audio files
	    var urls = [];
	    var notes = _root2.default.keyToNote;
	    for (var key in notes) {
	      urls.push(key);
	    } // /
	    var waitForEnd = function waitForEnd(instrument) {
	      for (var _key in bufferPending) {
	        // has pending items
	        if (bufferPending[_key]) return;
	      }
	      // /
	      if (onload) {
	        // run onload once
	        onload();
	        onload = null;
	      }
	    };
	    // /
	    var requestAudio = function requestAudio(soundfont, instrumentId, index, key) {
	      var url = soundfont[key];
	      if (url) {
	        bufferPending[instrumentId]++;
	        loadAudio(url, function (buffer) {
	          buffer.id = key;
	          var noteId = _root2.default.keyToNote[key];
	          audioBuffers[instrumentId + '' + noteId] = buffer;
	          // /
	          if (--bufferPending[instrumentId] === 0) {
	            // var percent = index / 87
	            //              console.log(midi.GM.byId[instrumentId], 'processing: ', percent)
	            soundfont.isLoaded = true;
	            waitForEnd(instrument);
	          }
	        }, function (err) {
	          console.error(err);
	        });
	      }
	    };
	    // /
	    var bufferPending = {};
	    for (var instrument in _root2.default.Soundfont) {
	      var soundfont = _root2.default.Soundfont[instrument];
	      if (soundfont.isLoaded) {
	        continue;
	      }
	      // /
	      var synth = _root2.default.GM.byName[instrument];
	      var instrumentId = synth.number;
	      // /
	      bufferPending[instrumentId] = 0;
	      // /
	      for (var index = 0; index < urls.length; index++) {
	        var _key2 = urls[index];
	        requestAudio(soundfont, instrumentId, index, _key2);
	      }
	    }
	    // /
	    setTimeout(waitForEnd, 1);
	  };
	
	  /* Load audio file: streaming | base64 | arraybuffer
	  ---------------------------------------------------------------------- */
	  function loadAudio(url, onload, onerror) {
	    if (useStreamingBuffer) {
	      var audio = new window.Audio();
	      audio.src = url;
	      audio.controls = false;
	      audio.autoplay = false;
	      audio.preload = false;
	      audio.addEventListener('canplay', function () {
	        onload && onload(audio);
	      });
	      audio.addEventListener('error', function (err) {
	        onerror && onerror(err);
	      });
	      document.body.appendChild(audio);
	    } else if (url.indexOf('data:audio') === 0) {
	      // Base64 string
	      var base64 = url.split(',')[1];
	      var buffer = base64ToArrayBuffer(base64);
	      ctx.decodeAudioData(buffer, onload, onerror);
	    } else {
	      // XMLHTTP buffer
	      var request = new window.XMLHttpRequest();
	      request.open('GET', url, true);
	      request.responseType = 'arraybuffer';
	      request.onload = function () {
	        ctx.decodeAudioData(request.response, onload, onerror);
	      };
	      request.send();
	    }
	  }
	
	  function createAudioContext() {
	    return new (window.AudioContext || window.webkitAudioContext)();
	  }
	}();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _root = __webpack_require__(2);
	
	var _root2 = _interopRequireDefault(_root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  var plugin = null;
	  var output = null;
	  var midi = _root2.default.WebMIDI = { api: 'webmidi' };
	  midi.send = function (data, delay) {
	    // set channel volume
	    output.send(data, delay * 1000);
	  };
	
	  midi.setController = function (channel, type, value, delay) {
	    output.send([channel, type, value], delay * 1000);
	  };
	
	  midi.setVolume = function (channel, volume, delay) {
	    // set channel volume
	    output.send([0xB0 + channel, 0x07, volume], delay * 1000);
	  };
	
	  midi.programChange = function (channel, program, delay) {
	    // change patch (instrument)
	    output.send([0xC0 + channel, program], delay * 1000);
	  };
	
	  midi.pitchBend = function (channel, program, delay) {
	    // pitch bend
	    output.send([0xE0 + channel, program], delay * 1000);
	  };
	
	  midi.noteOn = function (channel, note, velocity, delay) {
	    output.send([0x90 + channel, note, velocity], delay * 1000);
	  };
	
	  midi.noteOff = function (channel, note, delay) {
	    output.send([0x80 + channel, note, 0], delay * 1000);
	  };
	
	  midi.chordOn = function (channel, chord, velocity, delay) {
	    for (var n = 0; n < chord.length; n++) {
	      var note = chord[n];
	      output.send([0x90 + channel, note, velocity], delay * 1000);
	    }
	  };
	
	  midi.chordOff = function (channel, chord, delay) {
	    for (var n = 0; n < chord.length; n++) {
	      var note = chord[n];
	      output.send([0x80 + channel, note, 0], delay * 1000);
	    }
	  };
	
	  midi.stopAllNotes = function () {
	    output.cancel();
	    for (var channel = 0; channel < 16; channel++) {
	      output.send([0xB0 + channel, 0x7B, 0]);
	    }
	  };
	
	  midi.connect = function (opts) {
	    _root2.default.setDefaultPlugin(midi);
	    var errFunction = function errFunction(err) {
	      // well at least we tried!
	      if (window.AudioContext) {
	        // Chrome
	        opts.api = 'webaudio';
	      } else if (window.Audio) {
	        // Firefox
	        opts.api = 'audiotag';
	      } else {
	        // no support
	        return err;
	      }
	      _root2.default.loadPlugin(opts);
	    };
	    // /
	    navigator.requestMIDIAccess().then(function (access) {
	      plugin = access;
	      var pluginOutputs = plugin.outputs;
	      if (typeof pluginOutputs === 'function') {
	        // Chrome pre-43
	        output = pluginOutputs()[0];
	      } else {
	        // Chrome post-43
	        output = pluginOutputs[0];
	      }
	      if (output === undefined) {
	        // nothing there...
	        errFunction();
	      } else {
	        opts.onsuccess && opts.onsuccess();
	      }
	    }, errFunction);
	  };
	})(); /*
	        ----------------------------------------------------------------------
	        Web MIDI API - Native Soundbanks
	        ----------------------------------------------------------------------
	        http://webaudio.github.io/web-midi-api/
	        ----------------------------------------------------------------------
	      */

/***/ }
/******/ ])
});
;
//# sourceMappingURL=midi.js.map