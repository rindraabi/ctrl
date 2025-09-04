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

    // Enhanced disable-devtool initialization
    var disableDevtoolScript = document.createElement('script');
    disableDevtoolScript.src = 'https://cdn.jsdelivr.net/npm/disable-devtool@latest';
    disableDevtoolScript.onload = function() {
        // Initialize disable-devtool with all options
        if (typeof DisableDevtool !== 'undefined') {
            DisableDevtool({
                md5: 'your-custom-md5-hash-here', // Optional: Add your custom MD5
                url: 'https://www.instagram.com/lambda.net.id/',
                tkName: 'disable-devtool',
                ondevtoolopen: function() {
                    disableInteraction();
                    window.location.href = 'https://www.instagram.com/lambda.net.id/';
                },
                interval: 1000,
                disableMenu: true,
                stopIntervalTime: 5000,
                clearLog: true,
                disableSelect: true,
                disableCopy: true,
                disableCut: true,
                disablePaste: true
            });
        }
    };
    document.head.appendChild(disableDevtoolScript);

    // Enhanced console disabling with error handling
    var originalConsole = window.console;
    Object.defineProperty(window, 'console', {
        get: function() {
            return {
                log: function() {},
                warn: function() {},
                error: function() {},
                info: function() {},
                debug: function() {},
                table: function() {},
                clear: function() {},
                trace: function() {},
                dir: function() {},
                group: function() {},
                groupEnd: function() {},
                assert: function() {},
                count: function() {},
                time: function() {},
                timeEnd: function() {}
            };
        },
        set: function(value) {
            // Prevent overriding our console object
        }
    });

    // Create security overlay
    function disableInteraction() {
        // Remove any existing overlay first
        var existingOverlay = document.getElementById('security-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        var overlay = document.createElement("div");
        overlay.id = "security-overlay";
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
        overlay.style.zIndex = "999999";
        overlay.style.pointerEvents = "auto";
        overlay.style.textAlign = "center";
        overlay.innerHTML = asciiArt + 
            '<h2 style="color: white;">SECURITY WARNING</h2>' +
            '<p style="color: white;">Developer tools access is prohibited</p>' +
            '<p style="color: white;">Your IP and activity have been logged</p>' +
            '<p style="color: white;">Redirecting in 3 seconds...</p>';
        document.body.appendChild(overlay);
        
        // Redirect after a short delay
        setTimeout(function() {
            window.location.href = 'https://www.instagram.com/lambda.net.id/';
        }, 3000);
    }

    // Enhanced anti-HTTCrack and web scraper protection
    function preventPageCopying() {
        // Block common scraper user agents with more comprehensive list
        var blockedAgents = [
            'HTTrack', 'WebCopier', 'WebZIP', 'SiteSnagger', 
            'Teleport', 'WebWhacker', 'Offline Explorer', 'WebSucker',
            'wget', 'curl', 'python-requests', 'python-urllib', 'java',
            'scrapy', 'mechanize', 'php', 'go-http-client', 'node-fetch',
            'axios', 'request', 'libwww-perl', 'ruby', 'okhttp'
        ];
        
        var userAgent = navigator.userAgent.toLowerCase();
        if (blockedAgents.some(agent => userAgent.includes(agent.toLowerCase()))) {
            window.location.href = 'https://www.instagram.com/lambda.net.id/';
            return;
        }

        // Detect if page is being framed (common in scrapers)
        if (window.top !== window.self) {
            try {
                window.top.location.href = window.self.location.href;
            } catch (e) {
                // If we can't break out of the frame, replace content
                document.body.innerHTML = '<h1>Access Denied</h1><p>Framing of this page is not allowed.</p>';
            }
        }

        // Add protection against "Save Page As" functionality
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
                e.preventDefault();
                disableInteraction();
            }
        }, false);
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
            }
            
            // Block right-click context menu key
            if (event.keyCode === 93) {
                event.preventDefault();
                disableInteraction();
            }
        });
    }

    // Enhanced right-click blocking
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        disableInteraction();
    }, false);

    // Block view-source: protocol and other browser-specific tricks
    function blockViewSource() {
        // Block attempts to view source via URL
        if (window.location.protocol === 'view-source:') {
            window.location.href = 'https://www.instagram.com/lambda.net.id/';
            return;
        }
        
        // Block attempts to use data: URLs for iframe injection
        if (window.location.protocol === 'data:') {
            window.location.href = 'https://www.instagram.com/lambda.net.id/';
            return;
        }
    }

    // Detect DevTools opening (alternative method)
    var devtoolsOpen = false;
    var threshold = 160;
    
    function checkDevTools() {
        var widthThreshold = window.outerWidth - window.innerWidth > threshold;
        var heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (!(widthThreshold || heightThreshold)) {
            // Check for performance issues that might indicate devtools
            var start = performance.now();
            debugger;
            var end = performance.now();
            
            if (end - start > 100) {
                devtoolsOpen = true;
            }
        } else {
            devtoolsOpen = true;
        }
        
        if (devtoolsOpen) {
            disableInteraction();
        }
    }
    
    setInterval(checkDevTools, 1000);

    // Enhanced page integrity check
    function checkPageIntegrity() {
        // Check if important elements have been removed (indicates scraping)
        var importantElements = ['body', 'html', 'head'];
        for (var i = 0; i < importantElements.length; i++) {
            if (!document[importantElements[i]]) {
                window.location.href = 'https://www.instagram.com/lambda.net.id/';
                return;
            }
        }
        
        // Check if DOM has been excessively modified
        var originalBodyContent = document.body.innerHTML;
        setTimeout(function() {
            if (document.body.innerHTML !== originalBodyContent) {
                window.location.href = 'https://www.instagram.com/lambda.net.id/';
            }
        }, 1000);
    }

    // Anti-scraping technique: Add honey pots
    function addHoneyPots() {
        // Add invisible links that scrapers might follow
        var honeyPot = document.createElement('div');
        honeyPot.style.display = 'none';
        honeyPot.innerHTML = '<a href="/wp-admin/private-scraper-page.php" style="display:none;">Private</a>';
        document.body.appendChild(honeyPot);
        
        // Monitor for clicks on honeypot links
        document.addEventListener('click', function(e) {
            if (e.target.getAttribute('href') === '/wp-admin/private-scraper-page.php') {
                disableInteraction();
            }
        });
    }

    // Initialize all protections
    window.onload = function() {
        blockShortcuts();
        preventPageCopying();
        blockViewSource();
        checkPageIntegrity();
        addHoneyPots();
        
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
        
        // Add CSP header via meta tag
        var cspMeta = document.createElement('meta');
        cspMeta.httpEquiv = 'Content-Security-Policy';
        cspMeta.content = "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline';";
        document.head.appendChild(cspMeta);
    };

    // Continuous monitoring for DevTools
    setInterval(function() {
        if (window.outerWidth - window.innerWidth > 160 || 
            window.outerHeight - window.innerHeight > 160) {
            // Detected window resize that might indicate DevTools
            disableInteraction();
        }
    }, 1000);
})();
