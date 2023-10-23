// @ts-nocheck
import Notify from 'simple-notify';
import 'simple-notify/dist/simple-notify.min.css';
import defaultOptions from './options';

const startup = () => {
  $tw.rootWidget.addEventListener('om-notify', event => {
    try {
      const paramObject = event.paramObject || {};
      new Notify(Object.assign({}, defaultOptions, paramObject));
    } catch (e) {
      console.warn(e);
    }
  });
};

exports.name = 'notify-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = startup;
