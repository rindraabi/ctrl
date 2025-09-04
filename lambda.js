(function() {
    // Enhanced security script by Manyu Store
    // Protections against: DevTools, View-Source, F12, HTTrack, web scrapers
    // Last updated: 09/04/2025 - Fixed false positives

    // ASCII art for warning message
    var asciiArt = 
`█████╗░░░███╗░█████╗░███╗░░██╗██╗░░░██╗██╗░░░██╗
████╗░████║██╔══██╗████╗░██║╚██╗░██╔╝██║░░░██║
██╔████╔██║███████║██╔██╗██║░╚████╔╝░██║░░░██║
██║╚██╔╝██║██╔══██║██║╚████║░░╚██╔╝░░██║░░░██║
██║░╚═╝░██║██║░░██║██║░╚███║░░░██║░░░╚██████╔╝
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░░░╚═════╝░`;

    // Track if devtools was opened by user action
    var devToolsOpened = false;
    var securityTriggered = false;

    // Load disable-devtool with all protections enabled - FIXED
    var disableDevtoolScript = document.createElement('script');
    disableDevtoolScript.src = 'https://cdn.jsdelivr.net/npm/disable-devtool@latest/dist/index.min.js';
    disableDevtoolScript.onload = function() {
        // Initialize disable-devtool after script is loaded
        if (typeof DisableDevtool !== 'undefined') {
            DisableDevtool({
                md5: Date.now().toString(),
                url: 'https://www.instagram.com/lambda.net.id/',
                tkName: 'disable-devtool',
                ondevtoolopen: function(type) {
                    if (!securityTriggered) {
                        securityTriggered = true;
                        showSecurityWarning();
                    }
                },
                interval: 1000,
                disableMenu: true
            });
        }
    };
    document.head.appendChild(disableDevtoolScript);

    // Create security warning (without immediate redirect)
    function showSecurityWarning() {
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
            '<p style="color: white; font-size: 16px;">This page will redirect shortly</p>' +
            '<button id="close-warning" style="margin-top: 20px; padding: 10px 20px; background: red; color: white; border: none; cursor: pointer;">Close Warning</button>';
        document.body.appendChild(overlay);
        
        // Add event listener to close button
        document.getElementById('close-warning').addEventListener('click', function() {
            overlay.remove();
            document.body.style.pointerEvents = 'auto';
        });
        
        // Redirect after a delay, but only if this was a real security event
        setTimeout(function() {
            if (securityTriggered && overlay.parentNode) {
                window.location.href = 'https://www.instagram.com/lambda.net.id/';
            }
        }, 5000);
    }

    // Anti-HTTCrack and web scraper protection - Less aggressive
    function preventPageCopying() {
        // Block common scraper user agents - Expanded list
        var blockedAgents = [
            'HTTrack', 'WebCopier', 'WebZIP', 'SiteSnagger', 'Teleport', 
            'WebWhacker', 'Offline Explorer', 'WebSucker', 'saveweb2zip',
            'wget', 'curl', 'python-requests', 'java', 'scrapy', 'axios'
        ];
        
        var userAgent = navigator.userAgent;
        if (blockedAgents.some(agent => userAgent.includes(agent))) {
            // Only redirect for known scraping tools
            securityTriggered = true;
            showSecurityWarning();
            return;
        }

        // Detect if page is being framed (common in scrapers)
        if (window.top !== window.self) {
            try {
                // Only break out of frame if it's not a same-origin frame
                if (window.top.location.hostname !== window.self.location.hostname) {
                    window.top.location.href = window.self.location.href;
                }
            } catch (e) {
                // If we can't break out of the frame, it's likely a security issue
                securityTriggered = true;
                showSecurityWarning();
            }
        }
    }

    // Enhanced keyboard shortcuts blocking - Only trigger on specific shortcuts
    function blockShortcuts() {
        window.addEventListener('keydown', function(event) {
            // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
            if (event.keyCode === 123 || // F12
                (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
                (event.ctrlKey && event.shiftKey && event.keyCode === 74) || // Ctrl+Shift+J
                (event.ctrlKey && event.shiftKey && event.keyCode === 67) || // Ctrl+Shift+C
                (event.ctrlKey && event.keyCode === 85)) { // Ctrl+U
                event.preventDefault();
                if (!securityTriggered) {
                    securityTriggered = true;
                    showSecurityWarning();
                }
            }
        });
    }

    // Block right-click menu - Show warning instead of immediate redirect
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        if (!securityTriggered) {
            securityTriggered = true;
            showSecurityWarning();
        }
    });

    // Detect DevTools opening (alternative method) - Less sensitive
    function checkDevTools() {
        var widthThreshold = window.outerWidth - window.innerWidth > 160;
        var heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if ((widthThreshold || heightThreshold) && !devToolsOpened) {
            devToolsOpened = true;
            if (!securityTriggered) {
                securityTriggered = true;
                showSecurityWarning();
            }
        }
    }
    
    // Continuous monitoring for DevTools - Less frequent checking
    setInterval(checkDevTools, 2000);

    // Initialize all protections
    blockShortcuts();
    preventPageCopying();

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
    
    // Additional protection: Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
})();
