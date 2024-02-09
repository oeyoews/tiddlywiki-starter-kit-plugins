// @ts-nocheck
import 'vditor/dist/index.css';

import Md from 'vditor';

import { widget as Widget } from '$:/core/modules/widgets/widget.js';

class VditorWidget extends Widget {
  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const editor = document.createElement('div');
    const title = this.getVariable('currentTiddler') || 'vditor';

    const options: IOptions = {
      upload: {
        // url: 'http://127.0.0.1:8080/files',
      },
      after: () => {
        // md.setValue('最小化示例');
      },
      resize: {
        position: 'bottom',
        enable: true,
      },
      image: {
        isPreview: true,
        preview: bom => {
          console.log(bom);
        },
      },
      cache: {
        id: title, // 缓存 id to localstorage
        // enable: false,
      },
      //   fullscreen
      placeholder: '写点什么吧 ...',
      lang: 'en_US',
      minHeight: 400,
      rtl: false,
      icon: 'material', // cdn
      classes: 'prose prose-indigo',
      counter: {
        enable: true,
      },
      comment: {
        enable: true,
      },
      outline: {
        enable: true,
        position: 'right',
      },
      customRenders: {},
      value: '最小化示例',
      debugger: true,
    };

    // entry
    new Md(editor, options);

    parent.insertBefore(editor, nextSibling);
    this.domNodes.push(editor);
  }
}

exports.vditor = VditorWidget;
