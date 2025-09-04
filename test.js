(function() {
    // Enhanced security script by Manyu Store
    // Protections against: DevTools, View-Source, F12, HTTrack, web scrapers
    // Last updated: 09/04/2025 - Fixed false positives

    // ASCII art for warning message
    var asciiArt = `
██╗      █████╗ ███╗   ███╗██████╗ ██████╗  █████╗ 
██║     ██╔══██╗████╗ ████║██╔══██╗██╔══██╗██╔══██╗
██║     ███████║██╔████╔██║██████╔╝██║  ██║███████║
██║     ██╔══██║██║╚██╔╝██║██╔══██╗██║  ██║██╔══██║
███████╗██║  ██║██║ ╚═╝ ██║██████╔╝██████╔╝██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚═════╝ ╚═╝  ╚═╝
`;

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
        
        // Add CSS styles
        var style = document.createElement('style');
        style.textContent = `
            @keyframes border-pulse {
                0% { border-color: #ff0000; box-shadow: 0 0 20px rgba(255, 0, 0, 0.5); }
                50% { border-color: #ff4444; box-shadow: 0 0 30px rgba(255, 0, 0, 0.7); }
                100% { border-color: #ff0000; box-shadow: 0 0 20px rgba(255, 0, 0, 0.5); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .security-btn {
                padding: 12px 25px;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
                font-size: 16px;
                min-width: 140px;
            }
            .security-btn:hover {
                transform: translateY(-2px);
            }
            .security-btn:active {
                transform: translateY(1px);
            }
            @media (max-width: 768px) {
                .security-content {
                    width: 90% !important;
                    padding: 20px !important;
                }
                .security-buttons {
                    flex-direction: column;
                    gap: 10px !important;
                }
                .security-btn {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
        
        var overlay = document.createElement("div");
        overlay.id = "security-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "9999";
        overlay.style.pointerEvents = "auto";
        overlay.style.padding = "20px";
        overlay.style.boxSizing = "border-box";
        overlay.style.overflow = "auto";
        overlay.style.fontFamily = "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif";
        overlay.style.animation = "fadeIn 0.5s ease-out";
        
        // Create content container for better styling
        var contentContainer = document.createElement("div");
        contentContainer.style.maxWidth = "650px";
        contentContainer.style.width = "100%";
        contentContainer.style.padding = "40px";
        contentContainer.style.backgroundColor = "rgba(20, 20, 20, 0.95)";
        contentContainer.style.borderRadius = "16px";
        contentContainer.style.boxShadow = "0 15px 35px rgba(255, 0, 0, 0.25)";
        contentContainer.style.border = "2px solid #ff4444";
        contentContainer.style.animation = "shake 0.5s ease-in-out, border-pulse 2s infinite";
        contentContainer.style.textAlign = "center";
        contentContainer.style.color = "#ffffff";
        contentContainer.style.position = "relative";
        contentContainer.style.overflow = "hidden";
        
        // Add decorative elements
        var cornerTopLeft = document.createElement("div");
        cornerTopLeft.style.position = "absolute";
        cornerTopLeft.style.top = "15px";
        cornerTopLeft.style.left = "15px";
        cornerTopLeft.style.width = "30px";
        cornerTopLeft.style.height = "30px";
        cornerTopLeft.style.borderTop = "3px solid #ff4444";
        cornerTopLeft.style.borderLeft = "3px solid #ff4444";
        contentContainer.appendChild(cornerTopLeft);
        
        var cornerTopRight = document.createElement("div");
        cornerTopRight.style.position = "absolute";
        cornerTopRight.style.top = "15px";
        cornerTopRight.style.right = "15px";
        cornerTopRight.style.width = "30px";
        cornerTopRight.style.height = "30px";
        cornerTopRight.style.borderTop = "3px solid #ff4444";
        cornerTopRight.style.borderRight = "3px solid #ff4444";
        contentContainer.appendChild(cornerTopRight);
        
        var cornerBottomLeft = document.createElement("div");
        cornerBottomLeft.style.position = "absolute";
        cornerBottomLeft.style.bottom = "15px";
        cornerBottomLeft.style.left = "15px";
        cornerBottomLeft.style.width = "30px";
        cornerBottomLeft.style.height = "30px";
        cornerBottomLeft.style.borderBottom = "3px solid #ff4444";
        cornerBottomLeft.style.borderLeft = "3px solid #ff4444";
        contentContainer.appendChild(cornerBottomLeft);
        
        var cornerBottomRight = document.createElement("div");
        cornerBottomRight.style.position = "absolute";
        cornerBottomRight.style.bottom = "15px";
        cornerBottomRight.style.right = "15px";
        cornerBottomRight.style.width = "30px";
        cornerBottomRight.style.height = "30px";
        cornerBottomRight.style.borderBottom = "3px solid #ff4444";
        cornerBottomRight.style.borderRight = "3px solid #ff4444";
        contentContainer.appendChild(cornerBottomRight);
        
        // Warning icon
        var iconContainer = document.createElement("div");
        iconContainer.style.marginBottom = "20px";
        iconContainer.innerHTML = `
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V14" stroke="#ff4444" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 17V17.5" stroke="#ff4444" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ff4444" stroke-width="2"/>
            </svg>
        `;
        contentContainer.appendChild(iconContainer);
        
        // Title
        var title = document.createElement("h2");
        title.textContent = "SECURITY WARNING";
        title.style.color = "#ff4444";
        title.style.margin = "0 0 15px 0";
        title.style.fontSize = "28px";
        title.style.fontWeight = "700";
        title.style.letterSpacing = "1px";
        title.style.textShadow = "0 0 15px rgba(255, 0, 0, 0.5)";
        contentContainer.appendChild(title);
        
        // ASCII art
        var asciiElement = document.createElement("pre");
        asciiElement.textContent = asciiArt;
        asciiElement.style.color = "#ff6b6b";
        asciiElement.style.margin = "0 0 25px 0";
        asciiElement.style.fontSize = "12px";
        asciiElement.style.lineHeight = "1.2";
        asciiElement.style.overflow = "hidden";
        contentContainer.appendChild(asciiElement);
        
        // Warning messages
        var messageContainer = document.createElement("div");
        messageContainer.style.background = "rgba(255, 0, 0, 0.1)";
        messageContainer.style.padding = "20px";
        messageContainer.style.borderRadius = "10px";
        messageContainer.style.margin = "0 0 25px 0";
        messageContainer.style.borderLeft = "4px solid #ff4444";
        messageContainer.style.textAlign = "left";
        
        var message1 = document.createElement("p");
        message1.innerHTML = "<strong>⚠️ Developer tools access is prohibited</strong>";
        message1.style.color = "#ff8888";
        message1.style.margin = "0 0 10px 0";
        message1.style.fontSize = "16px";
        message1.style.display = "flex";
        message1.style.alignItems = "center";
        message1.style.gap = "8px";
        
        var message2 = document.createElement("p");
        message2.innerHTML = "<strong>⚠️ Your IP and activity have been logged</strong>";
        message2.style.color = "#ff8888";
        message2.style.margin = "0";
        message2.style.fontSize = "16px";
        message2.style.display = "flex";
        message2.style.alignItems = "center";
        message2.style.gap = "8px";
        
        messageContainer.appendChild(message1);
        messageContainer.appendChild(message2);
        contentContainer.appendChild(messageContainer);
        
        // Redirect message
        var redirectMessage = document.createElement("p");
        redirectMessage.innerHTML = 'This page will redirect to <span style="color: #ff4444; font-weight: 600;">https://www.instagram.com/lambda.net.id/</span> shortly';
        redirectMessage.style.color = "#cccccc";
        redirectMessage.style.margin = "0 0 30px 0";
        redirectMessage.style.fontSize = "16px";
        contentContainer.appendChild(redirectMessage);
        
        // Buttons container
        var buttonsContainer = document.createElement("div");
        buttonsContainer.style.display = "flex";
        buttonsContainer.style.justifyContent = "center";
        buttonsContainer.style.gap = "15px";
        buttonsContainer.style.margin = "0 0 20px 0";
        buttonsContainer.className = "security-buttons";
        
        // Close button
        var closeBtn = document.createElement("button");
        closeBtn.id = "close-warning";
        closeBtn.textContent = "Close Warning";
        closeBtn.className = "security-btn";
        closeBtn.style.background = "linear-gradient(135deg, #ff4444, #cc0000)";
        closeBtn.style.boxShadow = "0 4px 15px rgba(255, 0, 0, 0.3)";
        
        // Understand button
        var understandBtn = document.createElement("button");
        understandBtn.id = "understand-btn";
        understandBtn.textContent = "I Understand";
        understandBtn.className = "security-btn";
        understandBtn.style.background = "linear-gradient(135deg, #444, #222)";
        understandBtn.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
        
        buttonsContainer.appendChild(closeBtn);
        buttonsContainer.appendChild(understandBtn);
        contentContainer.appendChild(buttonsContainer);
        
        // Support message
        var supportMessage = document.createElement("p");
        supportMessage.textContent = "If you believe this is a mistake, please contact support";
        supportMessage.style.color = "#888888";
        supportMessage.style.margin = "0";
        supportMessage.style.fontSize = "14px";
        contentContainer.appendChild(supportMessage);
        
        overlay.appendChild(contentContainer);
        document.body.appendChild(overlay);
        
        // Add event listeners to buttons
        closeBtn.addEventListener('click', function() {
            overlay.remove();
            document.body.style.pointerEvents = 'auto';
            securityTriggered = false;
        });
        
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
                        disableInteraction();
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
