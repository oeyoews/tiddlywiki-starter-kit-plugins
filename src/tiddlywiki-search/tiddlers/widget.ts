// @ts-nocheck
import MiniSearch, { type SearchOptions } from 'minisearch';
import { widget as Widget } from '$:/core/modules/widgets/widget.js';

class MiniSearchWidget extends Widget {
  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    const filter = '[!is[system]]';
    const tiddlers = $tw.wiki.filterTiddlers(filter);
    const formatedTiddlers = tiddlers.map(t => {
      return {
        id: t,
        title: t,
        text: $tw.wiki.getTiddlerText(t),
      };
    });

    let miniSearch = new MiniSearch({
      fields: ['title', 'text'], // fields to index for full-text search
      storeFields: ['title', 'text'], // fields to return with search results
      tokenize: (string, _fieldName) => string.split('-'),
      searchOptions: {
        prefix: true,
        tokenize: string => string.split(/[\s-]+/), // search query tokenizer
        processTerm: term => term.toLowerCase(), // search query processing
        fuzzy: 0.2,
        fields: ['title', 'text'],
      },
    });
    // miniSearch.autoSuggest('neromancer', { fuzzy: 0.2, filter } as SearchOptions);
    miniSearch.addAll(formatedTiddlers);
    const { text = 'oeyoews' } = this.attributes;

    let results = miniSearch.search(text, {});
    console.log(results);

    const createElement = $tw.utils.domMaker;
    const htmlNode = [];
    results.forEach(result => {
      htmlNode.push(
        `<h2>${result.title}</h2>` +
          $tw.wiki.renderTiddler('text/html', result.title),
      );
    });

    console.log(htmlNode.join(''));
    const buttonNode = this.document.createElement('div');
    buttonNode.innerHTML = htmlNode.join('');

    parent.insertBefore(buttonNode, nextSibling);
    this.domNodes.push(buttonNode);
  }
}

exports.minisearch = MiniSearchWidget;
