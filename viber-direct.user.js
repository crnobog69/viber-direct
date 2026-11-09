// ==UserScript==
// @name         Вибер - директно отварање линкова
// @namespace    local.viber-direct
// @version      1.0.0
// @description  Прескаче Виберову страницу за преусмеравање.
// @match        https://css.viber.com/*
// @match        http://css.viber.com/*
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    const match = location.href.match(/[?&]url=([\s\S]*)/i);
    if (!match || !match[1]) return;

    let target = match[1];

    if (!/^https?:\/\//i.test(target)) {
        try {
            target = decodeURIComponent(target);
        } catch {
            return;
        }
    }

    try {
        const destination = new URL(target);

        if (!['http:', 'https:'].includes(destination.protocol)) return;
        if (destination.hostname === 'css.viber.com') return;

        location.replace(destination.href);
    } catch {
        // Неисправна адреса.
    }
})();
