/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import


// ES2015 Modules


var _menu = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = window.Form;
var LinksService = window.LinksService;

/**
 * Компонента "Форма"
 */

var App = function () {
    /**
     * @param {Object} param0 
     * @param {HTMLElement} param0.el
     */
    function App(_ref) {
        var _this = this;

        var el = _ref.el;

        _classCallCheck(this, App);

        this.menu = new _menu.Menu({
            el: document.querySelector('.js-menu'),
            onPick: function onPick(item) {
                console.log(item);
            },

            data: {}
        });

        var form = new Form({
            el: el.querySelector('.js-form'),
            data: {}
        });

        form.addEventListener('save', function (event) {
            _this.menu.addItem(event.detail);

            LinksService.putLinks(_this.menu.data).then(_this._updateMenu.bind(_this)).then(_this._onMenuUpdate.bind(_this)).catch(function () {
                console.log('Что-то пошло не так!');
            });
        });

        LinksService.getLinks().then(this._updateMenu.bind(this)).catch(function () {
            console.log('Что-то пошло не так!');
        });
    }

    /**
     * @param {*} linksData 
     * @return {Promise<undefined>}
     */


    _createClass(App, [{
        key: '_updateMenu',
        value: function _updateMenu(linksData) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.menu.setData(linksData);
                resolve();
            });
        }
    }]);

    return App;
}();

// export


window.App = App;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var template = window.menuTemplate;
var templateItem = window.menuItemTemplate;

/**
 * @typedef {Item} Тип элемента меню
 * @prop {string} href URL
 * @prop {string} anchor текст
 */

/**
 * Компонента "Меню"
 */

var Menu = exports.Menu = function () {
    /**
     * @constructor
     * @param  {Object} opts
     */
    function Menu(opts) {
        _classCallCheck(this, Menu);

        this.el = opts.el;
        this.data = opts.data;
        this.onPick = opts.onPick;
        this._initEvents();
    }

    /**
     * Возвращает HTML элемент списка меню
     * @return {HTMLUListElement}
     */


    _createClass(Menu, [{
        key: 'setData',


        /**
         * Обновление состояния меню
         * @param {Object} data 
         */
        value: function setData(data) {
            this.data = data;
            this.render();
        }

        /**
         * Добавляем элемент меню
         * @param {Object} item
         */

    }, {
        key: 'addItem',
        value: function addItem(item) {
            var el = document.createElement('div');
            el.innerHTML = this.getItemHtml(item, this.data.items.length);
            el = el.firstElementChild;

            this.list.append(el);
            el.addEventListener('animationend', function () {
                return el.classList.remove('bounce-in-left');
            });
            el.classList.add('bounce-in-left');

            this.data.items.push(item);
        }

        /**
         * Удаляем пункт меню из данных
         * @param  {Object} removedItem
         */

    }, {
        key: 'removeItem',
        value: function removeItem(removedItem) {
            this.data.items = this.data.items.filter(function (item, index) {
                return index !== removedItem.index;
            });
            this.render();
        }

        /**
         * HTML одного объекта меню
         * @param {Item} item
         * @param {number} index
         * @return {string}
         */

    }, {
        key: 'getItemHtml',
        value: function getItemHtml(item, index) {
            return templateItem({ item: item, index: index });
        }

        /**
         * Обновляет HTML в элементе
         */

    }, {
        key: 'render',
        value: function render() {
            this.el.innerHTML = template(this.data);
        }

        /**
        * Удаления элемента меню
        * @param  {Element} item
        * @private
        */

    }, {
        key: '_onRemoveClick',
        value: function _onRemoveClick(item) {
            var el = /** @type {Element} */item.parentNode;

            var index = parseInt(item.parentNode.dataset.index, 10);
            el.addEventListener('animationend', this.removeItem.bind(this, { index: index }));
            el.classList.add('bounce-out-right');
        }

        /**
        * Выбор элемента меню
        * @param  {HTMLElement} item
        */

    }, {
        key: '_onPickClick',
        value: function _onPickClick(item) {
            this.onPick(item);
        }

        /**
        * Развешиваем события
        */

    }, {
        key: '_initEvents',
        value: function _initEvents() {
            this.el.addEventListener('click', this._onClick.bind(this));
        }

        /**
        * Клик в любую область меню
        * @param {Event} event
        * @private
        */

    }, {
        key: '_onClick',
        value: function _onClick(event) {
            event.preventDefault();
            var item = event.target;

            switch (item.dataset.action) {
                case 'remove':
                    this._onRemoveClick(item);
                    break;

                case 'pick':
                    this._onPickClick(item);
                    break;
            }
        }
    }, {
        key: 'list',
        get: function get() {
            return this.el.querySelector('.menu__list');
        }

        /**
         * Возвращает HTML элемент заголовка меню
         * @return {HTMLUListElement}
         */

    }, {
        key: 'title',
        get: function get() {
            return this.el.querySelector('.menu__title');
        }
    }]);

    return Menu;
}();

/***/ })
/******/ ]);