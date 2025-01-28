/*\
title: $:/plugins/oeyoews/unocss/startup.js
type: application/javascript
module-type: startup

\*/

exports.platforms = ['browser'];
exports.synchronous = true;

exports.startup = function () {
  window.__unocss = {
    runtime: {
      rootElement: () =>
        document.getElementsByClassName('tc-page-container-wrapper')[0],
    },
    // ...
  };
  require('./runtime');
  //   require('./global');
};
