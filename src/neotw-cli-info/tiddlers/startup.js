/*\
title: $:/plugins/oeyoews/neotw-cli/startup.js
type: application/javascript
module-type: startup

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'cli-info-startup-hook';
  exports.platforms = ['node'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    const count = (tag) => {
      return $tw.wiki.filterTiddlers(tag).length;
    };

    const totalPlugins = count('[plugin-type[plugin]]');
    const customPlugins = count('[plugin-type[plugin]author[oeyoews]]');
    const officialPlugins = count(
      '[plugin-type[plugin]prefix[$:/plugins/tiddlywiki]] [[$:/core]]',
    );
    const tiddlersPlugin = totalPlugins - officialPlugins - customPlugins;
    console.log(
      `
🐠 太微版本 -> ${$tw.version}
📦 全部插件 -> ${totalPlugins}
👮 官方插件 -> ${officialPlugins}
🔪 用户插件 -> ${customPlugins}
🧩 其他插件 -> ${tiddlersPlugin}
      `,
    );
  };
})();
