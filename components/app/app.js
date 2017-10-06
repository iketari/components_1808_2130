(function() {
    'use strict';

   // import
   let Menu = window.Menu;
   let Form = window.Form;
   let LinksService = window.LinksService;

    /**
     * Контроллер приложения
     */
    class App {
        /**
         * @param {Object} param0 
         * @param {HTMLElement} param0.el
         */
        constructor({el}) {
            this.menu = new Menu({
                el: document.querySelector('.js-menu'),
                onPick(item) {
                    console.log(item);
                },
                data: {}
            });

            let form = new Form({
                el: el.querySelector('.js-form'),
                data: {}
            });

            form.addEventListener('save', (event) => {
                this.menu.addItem(event.detail);

                LinksService.putLinks(this.menu.data, (data) => {
                    this.menu.setData(data);
                });
            });

            LinksService.getLinks((linksData) => {
                this.menu.setData(linksData);
            });
        }
    }

    // export
    window.App = App;
})();
