(function() {
    'use strict';

    const template = window.menuTemplate;
    const templateItem = window.menuItemTemplate;

    /**
     * @typedef {Item} Тип элемента меню
     * @prop {string} href URL
     * @prop {string} anchor текст
     */

    /**
     * Компонента "Меню"
     */
    class Menu {
        /**
         * @constructor
         * @param  {Object} opts
         */
        constructor(opts) {
            this.el = opts.el;
            this.data = opts.data;
            this.onPick = opts.onPick;

            this.render();
            this._initEvents();
        }

        /**
         * Возвращает HTML элемент списка меню
         * @return {HTMLUListElement}
         */
        get list() {
            return this.el.querySelector('.menu__list');
        }

        /**
         * Возвращает HTML элемент заголовка меню
         * @return {HTMLUListElement}
         */
        get title() {
            return this.el.querySelector('.menu__title');
        }

        /**
         * Добавляем элемент меню
         * @param {Object} item
         */
        addItem(item) {
            let el = document.createElement('div');
            el.innerHTML = this.getItemHtml(item, this.data.items.length);
            el = el.firstElementChild;

            this.list.append(el);
            el.addEventListener('animationend',
                () => el.classList.remove('bounce-in-left'));
            el.classList.add('bounce-in-left');

            this.data.items.push(item);
        }

        /**
         * Удаляем пункт меню из данных
         * @param  {Object} removedItem
         */
        removeItem(removedItem) {
            this.data.items = this.data.items.filter((item, index) => {
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
        getItemHtml(item, index) {
            return templateItem({item, index});
        }

        /**
         * Обновляет HTML в элементе
         */
        render() {
            this.el.innerHTML = template(this.data);
        }

        /**
        * Удаления элемента меню
        * @param  {Element} item
        * @private
        */
        _onRemoveClick(item) {
            let el = /** @type {Element} */ item.parentNode;

            let index = parseInt(item.parentNode.dataset.index, 10);
            el.addEventListener('animationend',
                this.removeItem.bind(this, {index}));
            el.classList.add('bounce-out-right');
        }

        /**
        * Выбор элемента меню
        * @param  {HTMLElement} item
        */
        _onPickClick(item) {
            this.onPick(item);
        }

        /**
        * Развешиваем события
        */
        _initEvents() {
            this.el.addEventListener('click', this._onClick.bind(this));
        }

        /**
        * Клик в любую область меню
        * @param {Event} event
        * @private
        */
        _onClick(event) {
            event.preventDefault();
            let item = event.target;

            switch (item.dataset.action) {
            case 'remove':
            this._onRemoveClick(item);
            break;

            case 'pick':
            this._onPickClick(item);
            break;
            }
        }
    }

    // Export
    window.Menu = Menu;
})(window);
