/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 385:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  encode: (__webpack_require__(69)/* .encode */ .c),
  decode: (__webpack_require__(413)/* .decode */ .J)
}


/***/ }),

/***/ 226:
/***/ ((module) => {

"use strict";


// Reverse of
// http://plantuml.sourceforge.net/codejavascript2.html

// It is described as being "a transformation close to base64"
// The code has been slightly modified to pass linters

function decode6bit (cc) {
  var c = cc.charCodeAt(0)
  if (cc === '_') return 63
  if (cc === '-') return 62
  if (c >= 97) return c - 61 // - 97 + 26 + 10
  if (c >= 65) return c - 55 // - 65 + 10
  if (c >= 48) return c - 48
  return '?'
}

function extract3bytes (data) {
  var c1 = decode6bit(data[0])
  var c2 = decode6bit(data[1])
  var c3 = decode6bit(data[2])
  var c4 = decode6bit(data[3])
  var b1 = c1 << 2 | (c2 >> 4) & 0x3F
  var b2 = (c2 << 4) & 0xF0 | (c3 >> 2) & 0xF
  var b3 = (c3 << 6) & 0xC0 | c4 & 0x3F

  return [b1, b2, b3]
}

module.exports = function (data) {
  var r = ''
  var i = 0
  for (i = 0; i < data.length; i += 4) {
    var t = extract3bytes(data.substring(i, i + 4))
    r = r + String.fromCharCode(t[0])
    r = r + String.fromCharCode(t[1])
    r = r + String.fromCharCode(t[2])
  }
  return r
}


/***/ }),

/***/ 413:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inflate = __webpack_require__(685)
var decode64 = __webpack_require__(226)

module.exports.J = function (encoded) {
  var deflated = decode64(encoded)
  return inflate(deflated)
}


/***/ }),

/***/ 2:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const zlib = __webpack_require__(796)

module.exports = function (data) {
  return zlib.deflateRawSync(data, { level: 9 }).toString('binary')
}


/***/ }),

/***/ 620:
/***/ ((module) => {

"use strict";


// Encode code taken from the PlantUML website:
// http://plantuml.sourceforge.net/codejavascript2.html

// It is described as being "a transformation close to base64"
// The code has been slightly modified to pass linters

function encode6bit (b) {
  if (b < 10) {
    return String.fromCharCode(48 + b)
  }
  b -= 10
  if (b < 26) {
    return String.fromCharCode(65 + b)
  }
  b -= 26
  if (b < 26) {
    return String.fromCharCode(97 + b)
  }
  b -= 26
  if (b === 0) {
    return '-'
  }
  if (b === 1) {
    return '_'
  }
  return '?'
}

function append3bytes (b1, b2, b3) {
  var c1 = b1 >> 2
  var c2 = ((b1 & 0x3) << 4) | (b2 >> 4)
  var c3 = ((b2 & 0xF) << 2) | (b3 >> 6)
  var c4 = b3 & 0x3F
  var r = ''
  r += encode6bit(c1 & 0x3F)
  r += encode6bit(c2 & 0x3F)
  r += encode6bit(c3 & 0x3F)
  r += encode6bit(c4 & 0x3F)
  return r
}

module.exports = function (data) {
  var r = ''
  for (var i = 0; i < data.length; i += 3) {
    if (i + 2 === data.length) {
      r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), 0)
    } else if (i + 1 === data.length) {
      r += append3bytes(data.charCodeAt(i), 0, 0)
    } else {
      r += append3bytes(data.charCodeAt(i),
        data.charCodeAt(i + 1),
        data.charCodeAt(i + 2))
    }
  }
  return r
}


/***/ }),

/***/ 69:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var deflate = __webpack_require__(2)
var encode64 = __webpack_require__(620)

module.exports.c = function (puml) {
  var deflated = deflate(puml)
  return encode64(deflated)
}


/***/ }),

/***/ 685:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const zlib = __webpack_require__(796)

module.exports = function (data) {
  return zlib.inflateRawSync(Buffer.from(data, 'binary')).toString()
}


/***/ }),

/***/ 796:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var plantuml_encoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(385);
/* harmony import */ var plantuml_encoder__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(plantuml_encoder__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  assets: function () {
    return [];
  },

  plugin: function (markdownIt) {
    const defaultRender =
      markdownIt.renderer.rules.fence ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options, env, self);
      };

    markdownIt.renderer.rules.fence = function (
      tokens,
      idx,
      options,
      env,
      self
    ) {
      const token = tokens[idx];
      if (token.info !== "plantuml")
        return defaultRender(tokens, idx, options, env, self);

      const deflateCode = (0,plantuml_encoder__WEBPACK_IMPORTED_MODULE_0__.encode)(token.content);
      const contentHtml = markdownIt.utils.escapeHtml(token.content);
      // Note: The mermaid script (`contentHtml`) needs to be wrapped
      // in a `pre` tag, otherwise in WYSIWYG mode TinyMCE removes
      // all the white space from it, which causes mermaid to fail.
      // See PR #4670 https://github.com/laurent22/joplin/pull/4670
      return `
				<div class="joplin-editable">
					<pre class="joplin-source" data-joplin-language="plantuml" data-joplin-source-open="\`\`\`plantuml&#10;" data-joplin-source-close="&#10;\`\`\`&#10;">${contentHtml}</pre>
					<img src="${process.env.PLANTUML_SERVER}/plantuml/svg/${deflateCode}">
				</div>
			`;
    };
  },
});

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;