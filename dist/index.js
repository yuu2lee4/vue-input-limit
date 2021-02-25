/*!
 * Vue3InputLimit.js v0.0.1
 * https://github.com/naifen00/vue-input-limit#readme
 *
 * Copyright 2015-present liqianyong
 * Released under the MIT license
 *
 * Date: 2021-02-25T03:21:40.030Z
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue3InputLimit = factory());
}(this, (function () { 'use strict';

    var index = {
      beforeMount: function beforeMount(el, binding) {
        var type = Object.prototype.toString.call(binding.value);
        var input = el.nodeName.toUpperCase() === 'INPUT' ? el : el.querySelector('input');
        var composing = false;
        var filter;

        if (type === '[object RegExp]') {
          filter = function filter() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            return value.replace(new RegExp(binding.value, 'g'), '');
          };
        } else if (type === '[object Function]') {
          filter = binding.value;
        } else {
          throw new Error("[Vue-input-limit:] expression is not a function or regexp");
        }

        input.addEventListener('compositionstart', function () {
          composing = true;
        }, false);
        input.addEventListener('compositionend', function (e) {
          var wish = filter(e.target.value);
          composing = false;
          e.target.value = wish;
          setTimeout(function () {
            e.target.value = wish;
            e.target.dispatchEvent(new InputEvent('input'));
          });
        }, false);
        input.addEventListener('input', function (e) {
          var wish = filter(e.target.value);

          if (!composing && e.target.value !== wish) {
            e.target.value = wish;
            setTimeout(function () {
              e.target.value = wish;
              e.target.dispatchEvent(new InputEvent('input'));
            });
          }
        }, false);
      }
    };

    return index;

})));
