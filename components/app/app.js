// import


// ES2015 Modules
import {Menu} from './../menu/menu';

let Form = window.Form;
let LinksService = window.LinksService;

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

            LinksService.putLinks(this.menu.data)
                .then(this._updateMenu.bind(this))
                .then(this._onMenuUpdate.bind(this))
                .catch(() => {
                    console.log('Что-то пошло не так!');
                });
        });

        LinksService.getLinks()
        .then(this._updateMenu.bind(this))
        .catch(() => {
            console.log('Что-то пошло не так!');
        });
    }

    /**
     * @param {*} linksData 
     * @return {Promise<undefined>}
     */
    _updateMenu(linksData) {
        return new Promise((resolve, reject) => {
            this.menu.setData(linksData);
            resolve();
        });
    }
}

// export
window.App = App;

