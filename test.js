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

    // Create security overlay with improved design
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
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.97)";
        overlay.style.color = "#ff4444";
        overlay.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        overlay.style.fontSize = "18px";
        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "9999";
        overlay.style.pointerEvents = "auto";
        overlay.style.textAlign = "center";
        overlay.style.padding = "20px";
        overlay.style.boxSizing = "border-box";
        overlay.style.overflow = "auto";
        
        // Create animated border effect
        overlay.style.border = "4px solid transparent";
        overlay.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.97), rgba(0, 0, 0, 0.97)), linear-gradient(45deg, #ff0000, #ff4444, #ff8888)";
        overlay.style.backgroundOrigin = "border-box";
        overlay.style.backgroundClip = "content-box, border-box";
        overlay.style.animation = "border-pulse 2s infinite";
        
        // Add CSS animation for border
        var style = document.createElement('style');
        style.textContent = `
            @keyframes border-pulse {
                0% { background-image: linear-gradient(rgba(0, 0, 0, 0.97), rgba(0, 0, 0, 0.97)), linear-gradient(45deg, #ff0000, #ff4444, #ff8888); }
                50% { background-image: linear-gradient(rgba(0, 0, 0, 0.97), rgba(0, 0, 0, 0.97)), linear-gradient(45deg, #ff4444, #ff8888, #ffcccc); }
                100% { background-image: linear-gradient(rgba(0, 0, 0, 0.97), rgba(0, 0, 0, 0.97)), linear-gradient(45deg, #ff0000, #ff4444, #ff8888); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
        
        // Create content container for better styling
        var contentContainer = document.createElement("div");
        contentContainer.style.maxWidth = "800px";
        contentContainer.style.padding = "30px";
        contentContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        contentContainer.style.borderRadius = "12px";
        contentContainer.style.boxShadow = "0 10px 30px rgba(255, 0, 0, 0.3)";
        contentContainer.style.animation = "shake 0.5s ease-in-out";
        
        // ASCII art styling
        var asciiElement = document.createElement("pre");
        asciiElement.textContent = asciiArt;
        asciiElement.style.color = "#ff4444";
        asciiElement.style.margin = "0";
        asciiElement.style.fontSize = "14px";
        asciiElement.style.lineHeight = "1.2";
        asciiElement.style.textAlign = "center";
        
        // Warning text
        var warningHTML = `
            <h2 style="color: #ff4444; margin-top: 20px; font-size: 28px; text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);">SECURITY WARNING</h2>
            <div style="background: rgba(255, 0, 0, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ff4444;">
                <p style="color: #ff8888; margin: 10px 0;">⚠️ Developer tools access is prohibited</p>
                <p style="color: #ff8888; margin: 10px 0;">⚠️ Your IP and activity have been logged</p>
            </div>
            <p style="color: #cccccc; font-size: 16px; margin: 20px 0;">This page will redirect to <span style="color: #ff4444;">https://www.instagram.com/lambda.net.id/</span> shortly</p>
            <div style="display: flex; justify-content: center; gap: 15px; margin-top: 25px;">
                <button id="close-warning" style="padding: 12px 25px; background: linear-gradient(to bottom, #ff4444, #cc0000); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 8px rgba(255, 0, 0, 0.3); transition: all 0.3s;">Close Warning</button>
                <button id="understand-btn" style="padding: 12px 25px; background: linear-gradient(to bottom, #444444, #222222); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); transition: all 0.3s;">I Understand</button>
            </div>
            <div style="margin-top: 20px; color: #888888; font-size: 14px;">
                <p>If you believe this is a mistake, please contact support</p>
            </div>
        `;
        
        contentContainer.appendChild(asciiElement);
        contentContainer.innerHTML += warningHTML;
        overlay.appendChild(contentContainer);
        document.body.appendChild(overlay);
        
        // Add hover effects to buttons
        var closeBtn = document.getElementById('close-warning');
        var understandBtn = document.getElementById('understand-btn');
        
        closeBtn.onmouseover = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(255, 0, 0, 0.4)';
        };
        closeBtn.onmouseout = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(255, 0, 0, 0.3)';
        };
        
        understandBtn.onmouseover = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
        };
        understandBtn.onmouseout = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        };
        
        // Add event listener to close button
        closeBtn.addEventListener('click', function() {
            overlay.remove();
            document.body.style.pointerEvents = 'auto';
            securityTriggered = false;
        });
        
        // Add event listener to understand button
        understandBtn.addEventListener('click', function() {
            overlay.remove();
            document.body.style.pointerEvents = 'auto';
            securityTriggered = false;
        });
        
        // Redirect after a delay, but only if this was a real security event
        setTimeout(function() {
            if (securityTriggered && overlay.parentNode) {
                window.location.href = 'https://www.instagram.com/lambda.net.id/';
            }
        }, 5000);
    }

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
                        disableInteraction(); // Using the existing function
                    }
                },
                interval: 1000,
                disableMenu: true
            });
        }
    };
    document.head.appendChild(disableDevtoolScript);

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
            disableInteraction();
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
                disableInteraction();
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
                    disableInteraction();
                }
            }
        });
    }

    // Block right-click menu - Show warning instead of immediate redirect
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        if (!securityTriggered) {
            securityTriggered = true;
            disableInteraction();
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
                disableInteraction();
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
