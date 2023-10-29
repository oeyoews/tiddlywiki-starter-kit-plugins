// @ts-nocheck
import QRCode from 'qrcode';
import { widget as Widget } from '$:/core/modules/widgets/widget.js';

class QRCodeWidget extends Widget {
  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const {
      title = 'info-qrcode.svg',
      text = $tw.wiki.getTiddlerText('$:/info/url/full'),
      width = 256,
      //   save = false,
      //   timestamp = false
    } = this.attributes;
    const domNode = this.document.createElement('div');

    QRCode.toString(text, {
      type: 'terminal',
      width,
    }).then(url => {
      //   save &&
      //   $tw.wiki.addTiddler({
      //     type: 'image/svg+xml',
      //     title,
      //     text: url,
      //   });
      domNode.innerHTML = url;

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    });
  }
}

exports.qrcode = QRCodeWidget;
