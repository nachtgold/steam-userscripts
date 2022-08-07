// ==UserScript==
// @name         Steam search bulk ignore
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://store.steampowered.com/search/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const search_button = document.querySelector('.searchbar_left button[type="submit"]');

    const ignore_button_text = document.createElement('span');
    ignore_button_text.innerHTML = 'Ignore all';

    const ignore_button = document.createElement('div');
    ignore_button.setAttribute('class', 'btnv6_blue_hoverfade btn_small');

    ignore_button.appendChild(ignore_button_text);

    ignore_button.onclick = function(event) {
        // filter bundles
        const all_hits = document.querySelectorAll('#search_resultsRows a:not(.ds_ignored')
        const bundle_hits = document.querySelectorAll('#search_resultsRows a[data-ds-bundleid]')

        // then go for ignore
        //document.querySelectorAll('#search_resultsRows a:not(.ds_ignored) div.ds_options');
        const search_hits = [...all_hits].filter(n => ![...bundle_hits].includes(n)).map(x => x.querySelector('div.ds_options'));
        //document.getElementsByClassName('ds_options_tooltip')[0].childElements()[1].click()

        // one element in list must be hovered first
        search_hits[0].parentElement.dispatchEvent(new Event('mouseover'));
        search_hits[0].parentElement.dispatchEvent(new Event('mouseout'));

        search_hits[0].click();
        const ignore_click = () => {
            const tooltip = document.querySelector('.ds_options_tooltip')
            if(!!tooltip) {
                tooltip.childElements()[1].click()
            } else {
                setTimeout(ignore_click, 100);
                console.log('retry');
            }
        }
        setTimeout(ignore_click, 100);
    }

    search_button.parentNode.insertBefore(ignore_button, search_button.nextSibling);
})();
