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

    const COPYRIGHT_TEXT = 'Copyright Abi 2025 - v.1.0';

    // 1. Tampilkan tulisan di console sekali
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

    // 2. Nonaktifkan sebagian besar fungsi console
    if (window.console) {
        ['log', 'info', 'warn', 'error', 'debug', 'table', 'trace'].forEach(function (fn) {
            if (typeof console[fn] === 'function') {
                console[fn] = function () {
                    // dibisukan
                };
            }
        });
    }

    // 3. Blokir key kombinasi: F12, Ctrl+Shift+I/J/C, Ctrl+U
    window.addEventListener('keydown', function (e) {
        const key = e.key || e.keyCode;

        // F12
        if (key === 'F12' || key === 123 || e.keyCode === 123) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        // Ctrl+Shift+I / J / C
        if (e.ctrlKey && e.shiftKey) {
            const upper = (e.key || '').toUpperCase();
            if (upper === 'I' || upper === 'J' || upper === 'C') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }

        // Ctrl+U
        if (e.ctrlKey && !e.shiftKey) {
            const upper = (e.key || '').toUpperCase();
            if (upper === 'U') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
    }, true);

    // 4. Blokir klik kanan
    window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, true);

    // 5. Deteksi DevTools (tidak bisa 100%, hanya menghalangi)
    (function watchDevTools() {
        const THRESHOLD = 160;

        setInterval(function () {
            const widthDiff  = window.outerWidth  - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;

            if (widthDiff > THRESHOLD || heightDiff > THRESHOLD) {
                // Buat overlay blokir jika DevTools terdeteksi
                if (!document.getElementById('devtools-blocker')) {
                    const overlay = document.createElement('div');
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
                    overlay.textContent = COPYRIGHT_TEXT + ' - Developer tools are disabled.';
                    
                    // Hapus konten lama dan tampilkan overlay
                    document.body.innerHTML = '';
                    document.body.appendChild(overlay);
                }
            }
        }, 1000);
    })();

})();
