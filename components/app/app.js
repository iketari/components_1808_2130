(function() {
    'use strict';

   // import
   let Menu = window.Menu;
   let Form = window.Form;

    /**
     * Компонента "Форма"
     */
    class App {
        /**
         * @param {Object} param0 
         * @param {HTMLElement} param0.el
         */
        constructor({el}) {
            let menu = new Menu({
                el: document.querySelector('.js-menu'),

                onPick(item) {
                    console.log(item);
                },

                data: {
                    title: 'SINGLE PAGE APPLICATION',
                    items: [
                        {
                            href: 'https://vk.com',
                            anchor: 'vk.com'
                        },
                        {
                            href: 'https://ok.ru',
                            anchor: 'ok.ru'
                        },
                        {
                            href: 'https://yahoo.com',
                            anchor: 'yahoo.com'
                        },
                        {
                            href: 'https://yandex.ru',
                            anchor: 'yandex.ru'
                        },
                        {
                            href: 'https://yandex.ru',
                            anchor: 'yandex.ru'
                        }
                    ]
                }
            });

            let form = new Form({
                el: el.querySelector('.js-form'),
                data: {}
            });

            form.addEventListener('save', (event) => {
                menu.addItem(event.detail);
            });
        }
    }

    // export
    window.App = App;
})();
