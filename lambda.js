(function() {
    // Enhanced security script by Manyu Store
    // Protections against: DevTools, View-Source, F12, HTTrack, web scrapers
    // Last updated: 09/04/2025

    // ASCII art for warning message
    var asciiArt = 
`█████╗░░░███╗░█████╗░███╗░░██╗██╗░░░██╗██╗░░░██╗
████╗░████║██╔══██╗████╗░██║╚██╗░██╔╝██║░░░██║
██╔████╔██║███████║██╔██╗██║░╚████╔╝░██║░░░██║
██║╚██╔╝██║██╔══██║██║╚████║░░╚██╔╝░░██║░░░██║
██║░╚═╝░██║██║░░██║██║░╚███║░░░██║░░░╚██████╔╝
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░░░╚═════╝░`;

    // Load disable-devtool with all protections enabled
    var disableDevtoolScript = document.createElement('script');
    disableDevtoolScript.src = 'https://cdn.jsdelivr.net/npm/disable-devtool';
    disableDevtoolScript.setAttribute('disable-devtool-auto', '');
    document.head.appendChild(disableDevtoolScript);

    // Disable console completely
    Object.defineProperty(window, 'console', {
        get: function() {
            return {
                log: function() {},
                warn: function() {},
                error: function() {},
                info: function() {},
                debug: function() {},
                table: function() {},
                clear: function() {}
            };
        }
    });

    // Create security overlay
    function disableInteraction() {
        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
        overlay.style.color = "red";
        overlay.style.fontFamily = "monospace";
        overlay.style.fontSize = "20px";
        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "9999";
        overlay.style.pointerEvents = "auto";
        overlay.style.textAlign = "center";
        overlay.innerHTML = asciiArt + 
            '<h2 style="color: white;">SECURITY WARNING</h2>' +
            '<p style="color: white;">Developer tools access is prohibited</p>' +
            '<p style="color: white;">Your IP and activity have been logged</p>';
        document.body.appendChild(overlay);
    }

    // Input sanitization functions
    function sanitizeInput(input) {
        var element = document.createElement('div');
        element.innerText = input;
        return element.innerHTML;
    }

    function preventSQLInjection(input) {
        return input.replace(/['";\\]/g, '');
    }

    // Anti-HTTCrack and web scraper protection
    function preventPageCopying() {
        // Block common scraper user agents
        var blockedAgents = [
            'HTTrack', 'WebCopier', 'WebZIP', 'SiteSnagger', 
            'Teleport', 'WebWhacker', 'Offline Explorer', 'WebSucker'
        ];
        
        var userAgent = navigator.userAgent;
        if (blockedAgents.some(agent => userAgent.includes(agent))) {
            window.location.href = 'https://www.instagram.com/lambda.net.id/';
            return;
        }

        // Detect if page is being framed (common in scrapers)
        if (window.top !== window.self) {
            window.top.location.href = window.self.location.href;
        }

        // Add protection against "Save Page As" functionality
        document.onkeydown = function(e) {
            if (e.ctrlKey && (e.keyCode === 83 || e.keyCode === 85 || e.keyCode === 73)) {
                e.preventDefault();
                disableInteraction();
                window.location.href = 'https://www.instagram.com/lambda.net.id/';
            }
        };
    }

    // Enhanced keyboard shortcuts blocking
    function blockShortcuts() {
        window.addEventListener('keydown', function(event) {
            // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
            if (event.keyCode === 123 || // F12
                (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
                (event.ctrlKey && event.shiftKey && event.keyCode === 74) || // Ctrl+Shift+J
                (event.ctrlKey && event.shiftKey && event.keyCode === 67) || // Ctrl+Shift+C
                (event.ctrlKey && event.keyCode === 85)) { // Ctrl+U
                event.preventDefault();
                disableInteraction();
                window.location.href = 'https://www.instagram.com/lambda.net.id/';
            }
            
            // Block right-click context menu
            if (event.keyCode === 93) { // Context Menu key
                event.preventDefault();
            }
        });
    }

    // Block right-click menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        disableInteraction();
    });

    // Block view-source: protocol
    function blockViewSource() {
        try {
            // This will throw an error if someone tries view-source:
            window.location.href = "view-source:" + window.location.href;
        } catch (e) {
            // Redirect if view-source is attempted
            if (e.message.includes('view-source')) {
                window.location.href = 'https://www.instagram.com/lambda.net.id/';
            }
        }
    }

    // Detect DevTools opening (alternative method)
    var devtools = /./;
    devtools.toString = function() {
        console.log(asciiArt);
        disableInteraction();
        window.location.href = 'https://www.instagram.com/lambda.net.id/';
        return '';
    };
    console.log(devtools);

    // Initialize all protections
    blockShortcuts();
    preventPageCopying();
    blockViewSource();

    // Continuous monitoring for DevTools
    setInterval(function() {
        if (window.outerWidth - window.innerWidth > 160 || 
            window.outerHeight - window.innerHeight > 160) {
            // Detected window resize that might indicate DevTools
            disableInteraction();
            window.location.href = 'https://www.instagram.com/lambda.net.id/';
        }
    }, 1000);

    // Page integrity check
    var currentPath = window.location.pathname;
    fetch(currentPath, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Protection-Check': 'true'
        }
    })
    .then(function(response) {
        if (!response.ok || 
            !response.headers.get('Content-Type').includes('text/html')) {
            window.location.href = 'https://www.instagram.com/lambda.net.id/';
        }
    })
    .catch(function() {
        window.location.href = 'https://www.instagram.com/lambda.net.id/';
    });

    // Add meta tag to prevent caching (makes scraping harder)
    var meta = document.createElement('meta');
    meta.httpEquiv = 'Cache-Control';
    meta.content = 'no-store, no-cache, must-revalidate, max-age=0';
    document.head.appendChild(meta);

    // Add meta tag to prevent framing
    var frameMeta = document.createElement('meta');
    frameMeta.httpEquiv = 'X-Frame-Options';
    frameMeta.content = 'DENY';
    document.head.appendChild(frameMeta);
})();
