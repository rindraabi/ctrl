(function() {
    // Enhanced security script by Manyu Store
    // Protections against: DevTools, View-Source, F12, HTTrack, web scrapers
    // Last updated: 09/04/2025 - Enhanced version

    // ASCII art for warning message
    var asciiArt = 
`█████╗░░░███╗░█████╗░███╗░░██╗██╗░░░██╗██╗░░░██╗
████╗░████║██╔══██╗████╗░██║╚██╗░██╔╝██║░░░██║
██╔████╔██║███████║██╔██╗██║░╚████╔╝░██║░░░██║
██║╚██╔╝██║██╔══██║██║╚████║░░╚██╔╝░░██║░░░██║
██║░╚═╝░██║██║░░██║██║░╚███║░░░██║░░░╚██████╔╝
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░░░╚═════╝░`;

    // Load disable-devtool with all protections enabled - FIXED
    var disableDevtoolScript = document.createElement('script');
    disableDevtoolScript.src = 'https://cdn.jsdelivr.net/npm/disable-devtool@latest/dist/index.min.js';
    disableDevtoolScript.onload = function() {
        // Initialize disable-devtool after script is loaded
        if (typeof DisableDevtool !== 'undefined') {
            DisableDevtool({
                md5: Date.now().toString(), // Randomize to prevent caching issues
                url: 'https://www.instagram.com/lambda.net.id/',
                tkName: 'disable-devtool',
                ondevtoolopen: function(type) {
                    disableInteraction();
                    window.location.href = 'https://www.instagram.com/lambda.net.id/';
                },
                interval: 1000,
                disableMenu: true
            });
        }
    };
    document.head.appendChild(disableDevtoolScript);

    // Disable console completely - Enhanced
    var originalConsole = window.console;
    Object.defineProperty(window, 'console', {
        get: function() {
            return {
                log: function() { 
                    disableInteraction();
                    window.location.href = 'https://www.instagram.com/lambda.net.id/';
                },
                warn: function() {
                    disableInteraction();
                    window.location.href = 'https://www.instagram.com/lambda.net.id/';
                },
                error: function() {
                    disableInteraction();
                    window.location.href = 'https://www.instagram.com/lambda.net.id/';
                },
                info: function() {
                    disableInteraction();
                    window.location.href = 'https://www.instagram.com/lambda.net.id/';
                },
                debug: function() {
                    disableInteraction();
                    window.location.href = 'https://www.instagram.com/lambda.net.id/';
                },
                table: function() {
                    disableInteraction();
                    window.location.href = 'https://www.instagram.com/lambda.net.id/';
                },
                clear: function() {
                    disableInteraction();
                    window.location.href = 'https://www.instagram.com/lambda.net.id/';
                }
            };
        },
        set: function() {} // Prevent overriding
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
        overlay.style.zIndex = "9999";
        overlay.style.pointerEvents = "auto";
        overlay.style.textAlign = "center";
        overlay.innerHTML = asciiArt + 
            '<h2 style="color: white; margin-top: 20px;">SECURITY WARNING</h2>' +
            '<p style="color: white;">Developer tools access is prohibited</p>' +
            '<p style="color: white;">Your IP and activity have been logged</p>' +
            '<p style="color: white; font-size: 16px;">Redirecting to https://www.instagram.com/lambda.net.id/</p>';
        document.body.appendChild(overlay);
        
        // Disable all interactions
        document.body.style.pointerEvents = 'none';
        document.body.style.userSelect = 'none';
        
        // Redirect after a short delay
        setTimeout(function() {
            window.location.href = 'https://www.instagram.com/lambda.net.id/';
        }, 2000);
    }

    // Anti-HTTCrack and web scraper protection - Enhanced
    function preventPageCopying() {
        // Block common scraper user agents - Expanded list
        var blockedAgents = [
            'HTTrack', 'WebCopier', 'WebZIP', 'SiteSnagger', 'Teleport', 
            'WebWhacker', 'Offline Explorer', 'WebSucker', 'saveweb2zip',
            'wget', 'curl', 'python-requests', 'java', 'scrapy', 'axios'
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
                // If we can't break out of the frame, replace content with warning
                document.body.innerHTML = '<h1>Framing detected and blocked</h1>';
                document.body.style.pointerEvents = 'none';
            }
        }

        // Add protection against "Save Page As" functionality - Enhanced
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
            
            // Block right-click context menu
            if (event.keyCode === 93) { // Context Menu key
                event.preventDefault();
                disableInteraction();
            }
        });
    }

    // Block right-click menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        disableInteraction();
    });

    // Block view-source: protocol - Enhanced
    function blockViewSource() {
        try {
            // This will throw an error if someone tries view-source:
            window.location.href = "view-source:" + window.location.href;
        } catch (e) {
            // Redirect if view-source is attempted
            if (e.message && e.message.includes('view-source')) {
                window.location.href = 'https://www.instagram.com/lambda.net.id/';
            }
        }
    }

    // Detect DevTools opening (alternative method) - Enhanced
    var devToolsOpened = false;
    function checkDevTools() {
        var widthThreshold = window.outerWidth - window.innerWidth > 160;
        var heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if ((widthThreshold || heightThreshold) && !devToolsOpened) {
            devToolsOpened = true;
            disableInteraction();
        }
    }
    
    // Continuous monitoring for DevTools
    setInterval(checkDevTools, 1000);

    // Page integrity check - Enhanced
    function checkPageIntegrity() {
        var currentPath = window.location.pathname;
        fetch(currentPath, {
            method: 'HEAD',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Protection-Check': 'true'
            },
            cache: 'no-store'
        })
        .then(function(response) {
            if (!response.ok) {
                window.location.href = 'https://www.instagram.com/lambda.net.id/';
            }
        })
        .catch(function() {
            window.location.href = 'https://www.instagram.com/lambda.net.id/';
        });
    }

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
    
    // Add CSP header dynamically
    var cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline';";
    document.head.appendChild(cspMeta);

    // Initialize all protections
    blockShortcuts();
    preventPageCopying();
    blockViewSource();
    checkPageIntegrity();
    
    // Additional protection: Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Additional protection: Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
})();
