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

                this.uploadData();
            });

            this.loadData();
        }

        /**
         * Load data from server
         */
        loadData() {
            const url = 'https://components2510.firebaseio.com/menu1808/-KvYnwMT8fBqPu7_Qdqr.json';
            const xhr = new XMLHttpRequest();

            xhr.addEventListener('readystatechange', (event) => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        console.error('Сетевая ошибка', xhr);
                    } else {
                        const resp = xhr.responseText;
                        this.menu.setData(JSON.parse(resp));
                    }
                }
            });

            xhr.open('GET', url, true);
            xhr.send();
        }

        /**
         * Upload data to the server
         */
        uploadData() {
            const url = 'https://components2510.firebaseio.com/menu1808/-KvYnwMT8fBqPu7_Qdqr.json';
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', url, true);

            xhr.onload = (event) => {
                console.log('DONE!');
            };

            xhr.send(JSON.stringify(this.menu.data));
        }
    }

    // export
    window.App = App;
})();
