/*
  ░██████    ░██████   ░█████████  ░██     ░██ ░█████████  ░██████  ░██████  ░██     ░██ ░██████████                        
 ░██   ░██  ░██   ░██  ░██     ░██  ░██   ░██  ░██     ░██   ░██   ░██   ░██ ░██     ░██     ░██                            
░██        ░██     ░██ ░██     ░██   ░██ ░██   ░██     ░██   ░██  ░██        ░██     ░██     ░██                            
░██        ░██     ░██ ░█████████     ░████    ░█████████    ░██  ░██  █████ ░██████████     ░██                            
░██        ░██     ░██ ░██             ░██     ░██   ░██     ░██  ░██     ██ ░██     ░██     ░██                            
 ░██   ░██  ░██   ░██  ░██             ░██     ░██    ░██    ░██   ░██  ░███ ░██     ░██     ░██                            
  ░██████    ░██████   ░██             ░██     ░██     ░██ ░██████  ░█████░█ ░██     ░██     ░██                            

   ░███    ░████████   ░██████    ░██████    ░████    ░██████  ░████████               ░██    ░██       ░██         ░████   
  ░██░██   ░██    ░██    ░██     ░██   ░██  ░██ ░██  ░██   ░██ ░██                     ░██    ░██     ░████        ░██ ░██  
 ░██  ░██  ░██    ░██    ░██           ░██ ░██ ░████       ░██ ░███████                ░██    ░██       ░██       ░██ ░████ 
░█████████ ░████████     ░██       ░█████  ░██░██░██   ░█████        ░██    ░██████    ░██    ░██       ░██       ░██░██░██ 
░██    ░██ ░██     ░██   ░██      ░██      ░████ ░██  ░██      ░██   ░██                ░██  ░██        ░██       ░████ ░██ 
░██    ░██ ░██     ░██   ░██     ░██        ░██ ░██  ░██       ░██   ░██                 ░██░██         ░██        ░██ ░██  
░██    ░██ ░█████████  ░██████   ░████████   ░████   ░████████  ░██████                   ░███    ░██ ░██████ ░██   ░████   
*/

(function () {
    'use strict';

    var COPYRIGHT_TEXT = 'Copyright Abi 2025 - v.1.0';
    var DEVTOOLS_LOCKED = false;
    var SIZE_THRESHOLD = 160;   // untuk deteksi panel DevTools
    var DEBUGGER_DELAY_THRESHOLD = 100; // ms

    // 1. Tampilkan tulisan di console sekali (sebelum kita bisukan console)
    try {
        if (window.console) {
            console.log(
                '%c' + COPYRIGHT_TEXT,
                'font-size:18px; font-weight:bold; padding:6px 10px; background:#000; color:#0f0;'
            );
        }
    } catch (e) {
        // ignore
    }

    // 2. Nonaktifkan hampir semua fungsi console (SUPER LENGKAP)
    if (window.console) {
        [
            'log', 'info', 'warn', 'error', 'debug', 'trace', 'table',
            'group', 'groupCollapsed', 'groupEnd',
            'profile', 'profileEnd', 'assert',
            'clear', 'count', 'countReset',
            'dir', 'dirxml',
            'time', 'timeEnd', 'timeLog', 'timeStamp',
            'context'
        ].forEach(function (fn) {
            if (typeof console[fn] === 'function') {
                console[fn] = function () {
                    // dibisukan total
                    return undefined;
                };
            }
        });

        try {
            if (console.memory) {
                console.memory = {};
            }
        } catch (e) {}

        try {
            Object.freeze(console);
        } catch (e) {}
    }

    // Fungsi untuk mengunci halaman ketika DevTools terdeteksi
    function lockDevTools() {
        if (DEVTOOLS_LOCKED) return;
        DEVTOOLS_LOCKED = true;

        try {
            // Hapus semua event listener penting
            window.onkeydown = null;
            window.onkeypress = null;
            window.onkeyup = null;
            document.onkeydown = null;
            document.onkeypress = null;
            document.onkeyup = null;

            // Bersihkan body dan pasang overlay
            var body = document.body;
            if (!body) {
                body = document.createElement('body');
                document.documentElement.appendChild(body);
            }

            body.innerHTML = '';

            var overlay = document.createElement('div');
            overlay.id = 'devtools-blocker';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.background = '#000';
            overlay.style.color = '#0f0';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = '999999';
            overlay.style.fontFamily = 'monospace';
            overlay.style.fontSize = '18px';
            overlay.style.textAlign = 'center';
            overlay.style.padding = '20px';
            overlay.style.userSelect = 'none';
            overlay.style.cursor = 'not-allowed';

            overlay.textContent =
                COPYRIGHT_TEXT +
                ' - Developer tools detected. ' +
                'Elements, Console, Network, Sources, Performance, Memory, Security are blocked.';

            body.appendChild(overlay);

            // Cegah semua interaksi selanjutnya
            window.addEventListener('click', function (e) { e.stopPropagation(); e.preventDefault(); }, true);
            window.addEventListener('keydown', function (e) { e.stopPropagation(); e.preventDefault(); }, true);
            window.addEventListener('contextmenu', function (e) { e.stopPropagation(); e.preventDefault(); }, true);
        } catch (e) {
            // fallback: kalau gagal, paksa reload
            try {
                location.reload();
            } catch (_e) {}
        }
    }

    // 3. Blokir key kombinasi: F12, Ctrl+Shift+I/J/C, Ctrl+U
    window.addEventListener('keydown', function (e) {
        if (DEVTOOLS_LOCKED) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        var key = e.key || e.keyCode;

        // F12
        if (key === 'F12' || key === 123 || e.keyCode === 123) {
            e.preventDefault();
            e.stopPropagation();
            lockDevTools();
            return false;
        }

        // Ctrl+Shift+I / J / C
        if (e.ctrlKey && e.shiftKey) {
            var upper = (e.key || '').toUpperCase();
            if (upper === 'I' || upper === 'J' || upper === 'C') {
                e.preventDefault();
                e.stopPropagation();
                lockDevTools();
                return false;
            }
        }

        // Ctrl+U
        if (e.ctrlKey && !e.shiftKey) {
            var upper2 = (e.key || '').toUpperCase();
            if (upper2 === 'U') {
                e.preventDefault();
                e.stopPropagation();
                lockDevTools();
                return false;
            }
        }
    }, true);

    // 4. Blokir klik kanan
    window.addEventListener('contextmenu', function (e) {
        if (DEVTOOLS_LOCKED) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        e.preventDefault();
    }, true);

    // 5a. Deteksi DevTools via ukuran (Elements/Network/Sources/Performance/Memory/Security)
    function checkSizeDevTools() {
        if (DEVTOOLS_LOCKED) return;

        var widthDiff  = window.outerWidth  - window.innerWidth;
        var heightDiff = window.outerHeight - window.innerHeight;

        if (widthDiff > SIZE_THRESHOLD || heightDiff > SIZE_THRESHOLD) {
            lockDevTools();
        }
    }

    setInterval(checkSizeDevTools, 800);

    window.addEventListener('resize', function () {
        checkSizeDevTools();
    });

    // 5b. Deteksi DevTools via delay debugger (ekstrim)
    (function debugLoop() {
        if (DEVTOOLS_LOCKED) return;

        setTimeout(function () {
            if (DEVTOOLS_LOCKED) return;
            var start = Date.now();

            // debugger hanya akan "berhenti" ketika DevTools aktif
            debugger;

            var diff = Date.now() - start;
            if (diff > DEBUGGER_DELAY_THRESHOLD) {
                // Kalau delay terlalu besar, kemungkinan besar DevTools aktif
                lockDevTools();
                return;
            }

            debugLoop();
        }, 1500);
    })();

})();
