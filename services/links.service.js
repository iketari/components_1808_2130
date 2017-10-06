(function() {
    'use strict';

    const BASE_URL = 'https://components2510.firebaseio.com/menu1808/-KvYnwMT8fBqPu7_Qdqr.json';

    /**
     * Data source for links collection
     */
    class LinksService {
        /**
         * Wrapper for XMLHttpRequest
         * @param {strin} type 
         * @param {string} url 
         * @param {Object} data
         * @return {Promise<*>}
         */
        static _makeRequest(type, url, data) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(type, url, true);

                xhr.onload = () => {
                    resolve(JSON.parse(xhr.responseText));
                };

                if (typeof data !== 'undefined') {
                    data = JSON.stringify(data);
                }

                xhr.send(data);
            });
        }

        /**
         * Get collection
         * @param {Function} callback
         * @return {Promise<*>}
         */
        static getLinks(callback) {
            return this._makeRequest('GET', BASE_URL, undefined, callback);
        }

        /**
         * Update collections
         * @param {Object} links
         * @return {Promise<*>}
         */
        static putLinks(links) {
            return this._makeRequest('PUT', BASE_URL, links, callback);
        }
    }

    // export
    window.LinksService = LinksService;
})();
