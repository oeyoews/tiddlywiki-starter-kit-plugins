// @ts-nocheck
import { widget as Widget } from '$:/core/modules/widgets/widget.js';
import { IChangedTiddlers } from 'tiddlywiki';
import mermaid from 'mermaid';

class MermaidWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }
  async render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.computeAttributes();
    this.execute();

    const domNode = this.document.createElement('div');
    if (domNode.isTiddlyWikiFakeDom) return;

    // const { mermaidAPI: mermaid } = await import(
    //   'node_modules/mermaid/dist/mermaid.tiny.min.js'
    // );
    // window.mermaid = mermaid;
    const { mermaid } = (await import('mermaid')).default;

    const config = {
      securityLevel: 'loose',
      theme: 'default', //  "default" | "forest" | "dark" | "neutral"
      startOnLoad: false, // 会自动寻找 mermaid class
      htmlLabels: true,
    };
    mermaid.initialize(config);
    // mermaid.run()
    const id = 'test';
    // const code = 'graph LR;\n a';
    const code = `
	  quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]
	`;
    // const { svg } = await mermaid.render(id, code);
    await mermaid.render(id, code, svg => {
      domNode.setAttribute('id', id);
      domNode.setAttribute('class', 'mermaid');
      domNode.innerHTML = svg;
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }

  refresh(changedTiddlers: IChangedTiddlers): boolean | void {}
}

exports.mer = MermaidWidget;
