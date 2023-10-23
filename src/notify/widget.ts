// @ts-nocheck
import Notify from 'simple-notify';
import 'simple-notify/dist/simple-notify.min.css';
import { widget as Widget } from '$:/core/modules/widgets/widget.js';
import defaultOptions from './options';

class NotifyWidget extends Widget {
  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const options = this.attributes;

    const createElement = $tw.utils.domMaker;
    const buttonNode = createElement('button', {
      text: options.title || 'click',
    });

    buttonNode.onclick = () => {
      new Notify(Object.assign({}, defaultOptions, options));
    };

    parent.insertBefore(buttonNode, nextSibling);
    this.domNodes.push(buttonNode);
  }
}

exports.notify = NotifyWidget;
