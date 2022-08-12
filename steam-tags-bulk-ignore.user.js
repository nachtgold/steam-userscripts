// ==UserScript==
// @name         Steam tags bulk ignore
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://store.steampowered.com/tags*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ignore_button_text = document.createElement('span');
    ignore_button_text.innerHTML = 'Ignore all';

    const ignore_button = document.createElement('div');
    ignore_button.setAttribute('class', 'btnv6_blue_hoverfade btn_small');

    ignore_button.appendChild(ignore_button_text);

    ignore_button.onclick = function(event) {
        // filter bundles
        const all_hits = document.querySelectorAll('.tab_content_section_ctn:not([style*="display:none"]):not([style*="display: none"]) a:not(.ds_ignored)')
        const bundle_hits = document.querySelectorAll('.tab_content_section_ctn:not([style*="display:none"]):not([style*="display: none"]) a[data-ds-bundleid]')

        // then go for ignore
        const search_hits = [...all_hits].filter(n => ![...bundle_hits].includes(n)).map(x => x.querySelector('div.ds_options'));

        if(search_hits.length > 0) {
            // one element in list must be hovered first
            const link = search_hits[0].parentElement;
            link.dispatchEvent(new Event('mouseover'));
            link.dispatchEvent(new Event('mouseout'));
            console.log(link.querySelector('.tab_item_name').innerHTML);

            let hide_ignored = document.querySelectorAll('.tab_content_section_ctn:not([style*="display:none"]):not([style*="display: none"]) a.ds_ignored');
            hide_ignored.forEach(e => e.remove());

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
    }

    const tabbar = document.querySelector('.tabbar');
    if(!!tabbar) {
        tabbar.append(ignore_button);
    }
})();
