YUI.add('model-sync-zope', function (Y) {

    var ZopeSync = function () {};

    ZopeSync.HTTP_HEADERS = {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
    };

    ZopeSync.HTTP_TIMEOUT = 30000;


    ZopeSync.prototype = {

        initializer: function (config) {
            config || (config = {});

            // Overrides `root` at the instance level.
            if ('root' in config) {
                this.root = config.root || '';
            }
            this.after('change', function (ev) {
                console.log('change', ev);
                for (var field in ev.changed) {
                    if (!( field in this._changes)) {
                        this._changes[field] = ev.changed[field].prevVal;
                    }

                }

            });
            this._changes = {};

        },

        parseIOResponse: function (response) {
            return response.responseText;
        },

        serialize: function () {
            return Y.JSON.stringify(this);
        },
        serializeChanged: function () {
            var resp = {}, field;
            resp[this.idAttribute] = this.get('id');
            for (field in this._changes) {
                if (field !== this.idAttribute && field !== 'id') {
                    resp[field] = {
                        prevVal: this._changes[field],
                        newVal: this.get(field)
                    };
                }
            }
            return Y.JSON.stringify(resp);

        },

        sync: function (action, options, callback) {
            options || (options = {});

            var url       = this.root,
                urlArgs,
                headers   = Y.merge(ZopeSync.HTTP_HEADERS, options.headers),
                timeout   = options.timeout || ZopeSync.HTTP_TIMEOUT,
                method,
                body;

            options.zopeaction = action;

            switch (action) {
                case 'create':
                    body = this.serialize();
                    method = 'POST';
                    break;
                case 'update':
                    options.id = this.get('id');
                    /*
                     * You can choose which one to use.
                     *
                     * this.serialize will return the whole record serialized as JSON
                     *
                     * this.serializeChange will get the primary key plus only the values
                     *  that have changed since the last sync with the database.
                     *  For each of those changed fields it will give
                     *  the previous value in prevVal and the current value in newVal
                     *
                     */
                    // body = this.serialize();
                    body = this.serializeChanged();
                    method = 'POST';
                    break;
                case 'read':
                    if (!this._isYUIModelList) {
                        options.id = this.get('id');
                    }
                    method = 'GET';
                    break;
                case 'delete':
                    options.id = this.get('id');
                    method = 'GET';
                    break;
            }
            urlArgs = [];
            Y.Object.each(options, function (value, key) {
                urlArgs.push(key + '=' + encodeURIComponent(value));
            });

            urlArgs = urlArgs.join('&');
            url += '?' + urlArgs;

            this._sendSyncIORequest({
                action  : action,
                callback: callback,
                headers : headers,
                method  : method,
                body    : body,
                timeout : timeout,
                url     : url
            });
        },

        _parse: function (response) {
            // When `parseIOResponse` is defined as a method, it will be invoked and
            // the result will become the new response object that the `parse()`
            // will be invoked with.
            if (typeof this.parseIOResponse === 'function') {
                response = this.parseIOResponse(response);
            }

            return this.parse(response);
        },

        _sendSyncIORequest: function (config) {
            return Y.io(config.url, {
                'arguments': {
                    action  : config.action,
                    callback: config.callback,
                    url     : config.url
                },

                context: this,
                data   : config.body,
                headers: config.headers,
                method : config.method,
                timeout: config.timeout,

                on: {
                    start  : this._onSyncIOStart,
                    failure: this._onSyncIOFailure,
                    success: this._onSyncIOSuccess,
                    end    : this._onSyncIOEnd
                }
            });
        },

        _onSyncIOEnd: function (txId, details) {},
        _onSyncIOFailure: function (txId, res, details) {
            var callback = details.callback;

            if (callback) {
                callback({
                    code: res.status,
                    msg : res.statusText
                }, res);
            }
        },
        _onSyncIOSuccess: function (txId, res, details) {
            this._changes = {};
            var callback = details.callback;

            if (callback) {
                callback(null, res);
            }
        },
        _onSyncIOStart: function (txId, details) {}
    };

    // -- Namespace ----------------------------------------------------------------

    Y.namespace('ModelSync').Zope = ZopeSync;
},'@VERSION@', {
    requires: ['io','json']
});
