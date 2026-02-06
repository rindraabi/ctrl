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

    var DEVTOOLS_LOCKED = false;
    var SIZE_THRESHOLD = 160; // Toleransi ukuran panel DevTools
    var DEBUGGER_DELAY = 100; // ms

    // 1. Bisukan Console agar tidak bisa debug manual
    if (window.console) {
        Object.keys(console).forEach(function (fn) {
            console[fn] = function () {};
        });
    }

    // 2. Fungsi Pengunci Halaman (Overlay Invisible & Un-clickable)
    function lockPage() {
        if (DEVTOOLS_LOCKED) return;
        DEVTOOLS_LOCKED = true;

        try {
            // Hentikan loading halaman jika masih berjalan
            if (window.stop) { window.stop(); }

            // Hapus seluruh isi konten website
            document.body.innerHTML = '';

            // Buat overlay transparan/putih yang menutupi layar & memblokir klik
            var overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2147483647;background:#fff;cursor:not-allowed;';
            document.body.appendChild(overlay);

            // Matikan fungsi mouse dan keyboard total
            window.addEventListener('keydown', function (e) { e.preventDefault(); e.stopPropagation(); }, true);
            window.addEventListener('contextmenu', function (e) { e.preventDefault(); e.stopPropagation(); }, true);
            window.addEventListener('mousedown', function (e) { e.preventDefault(); e.stopPropagation(); }, true);
            window.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); }, true);
            
            // Opsional: Paksa reload jika mereka mencoba menutup devtools
            // location.reload(); 
        } catch (e) {}
    }

    // 3. Blokir Tombol Kombinasi (F12, Ctrl+Shift+I/J/C, Ctrl+U)
    window.addEventListener('keydown', function (e) {
        if (DEVTOOLS_LOCKED) return false;

        var key = e.key || e.keyCode;

        // F12
        if (key === 'F12' || key === 123) {
            e.preventDefault();
            lockPage();
            return false;
        }

        // Ctrl + U (View Source)
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || key === 85)) {
            e.preventDefault();
            lockPage();
            return false;
        }

        // Ctrl + Shift + I / J / C
        if (e.ctrlKey && e.shiftKey) {
            var k = e.key.toUpperCase();
            if (k === 'I' || k === 'J' || k === 'C') {
                e.preventDefault();
                lockPage();
                return false;
            }
        }
    }, true);

    // 4. Blokir Klik Kanan
    window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, true);

    // 5. Deteksi DevTools via Ukuran Window (Docked)
    function checkResize() {
        if (DEVTOOLS_LOCKED) return;
        var widthDiff = window.outerWidth - window.innerWidth;
        var heightDiff = window.outerHeight - window.innerHeight;
        
        if (widthDiff > SIZE_THRESHOLD || heightDiff > SIZE_THRESHOLD) {
            lockPage();
        }
    }
    window.addEventListener('resize', checkResize);
    setInterval(checkResize, 1000);

    // 6. Deteksi DevTools via Debugger Trap (Undocked/Separate Window)
    (function antiDevTools() {
        if (DEVTOOLS_LOCKED) return;
        
        var start = new Date().getTime();
        debugger; // Browser akan pause di sini jika DevTools buka
        var end = new Date().getTime();

        if (end - start > DEBUGGER_DELAY) {
            lockPage();
        }

        // Loop pengecekan
        setTimeout(antiDevTools, 500);
    })();

})();
