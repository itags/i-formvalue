module.exports = function (window) {
    "use strict";

    require('itags.core')(window);

    var itagName = 'i-formvalue', // <-- define your own itag-name here
        IFormElement = require('i-formelement')(window),
        Itag;

    if (!window.ITAGS[itagName]) {

        Itag = IFormElement.subClass(itagName, {
            attrs: {
                'i-prop': 'string'
            },

            init: function() {
                var element = this,
                    designNode = element.getItagContainer(),
                    property = designNode.getText().trim(),
                    pos;

                if (property.length>0) {
                    if ((pos=property.indexOf(' '))!==-1) {
                        property = property.substr(0, pos);
                    }
                    // when initializing: make sure NOT to overrule model-properties that already
                    // might have been defined when modeldata was boundend. Therefore, use `defineWhenUndefined`
                    element.defineWhenUndefined('i-prop', property);
                }
            },

            sync: function() {
                var element = this;
                // set the content:
                element.setHTML(element.getValue());
            }
        });

        window.ITAGS[itagName] = Itag;
    }

    return window.ITAGS[itagName];
};
