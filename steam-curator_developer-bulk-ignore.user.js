// ==UserScript==
// @name         Steam developer or curator or publisher bulk ignore
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       You
// @match        https://store.steampowered.com/curator*
// @match        https://store.steampowered.com/developer*
// @match        https://store.steampowered.com/publisher*
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

    const tabs = document.querySelector('.browse_tabs');
    tabs.appendChild(ignore_button);

    ignore_button.onclick = function(event) {
        const link = document.querySelector('.recommendation a.store_capsule:not(.ds_ignored)');
        if(!!link) {
            const recommendation = link.closest('.recommendation');
            console.log(recommendation.querySelector('span.color_created').innerHTML);

            const tooltip = link.querySelector('div.ds_options');

            link.dispatchEvent(new Event('mouseover'));
            link.dispatchEvent(new Event('mouseout'));

            tooltip.click();

            const ignore_click = () => {
                const tooltip = document.querySelector('.ds_options_tooltip');


                if(!!tooltip) {
                    tooltip.childElements()[1].click()
                } else {
                    setTimeout(ignore_click, 100);
                    console.log('retry');
                }
            }
            setTimeout(ignore_click, 100);
        } else {
            ignore_button.setAttribute('class', ignore_button.getAttribute('class') + " ds_ignored");
            ignore_button.onclick = ()=>{};
        }
    }
})();
