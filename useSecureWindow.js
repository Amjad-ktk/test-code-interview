import { useState, useEffect, useCallback, useRef } from "react"

const DEFAULT_OPTIONS = {
  width: window.screen.width,
  height: window.screen.height,
  title: "Interview In Progress",
  autoRequestFullscreen: true,
  customStyles: "",
  customContent: "",
}

export function useSecureWindow(options = {}) {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
  const [state, setState] = useState({
    window: null,
    isFullscreen: false,
    activityLog: [],
    answers: {},
  })

  // Use a ref to access the latest state in event listeners
  const stateRef = useRef(state)
  stateRef.current = state

  // Use a ref to access the latest options in event listeners
  const optionsRef = useRef(mergedOptions)
  optionsRef.current = mergedOptions

  // Function to log activity
  const logActivity = useCallback((activity) => {
    setState((prev) => ({
      ...prev,
      activityLog: [...prev.activityLog, { type: activity, timestamp: Date.now() }],
    }))

    // Call the onActivity callback if provided
    if (optionsRef.current.onActivity) {
      optionsRef.current.onActivity(activity)
    }
  }, [])

  // Function to open the secure window
  const openSecureWindow = useCallback(() => {
    const { width, height, title } = optionsRef.current

    // Define window features
    const features = `width=${width},height=${height},resizable=no,scrollbars=yes,status=no,location=no,toolbar=no,menubar=no`

    // Open the window
    const win = window.open("", "", features)

    if (!win) {
      alert("Popup blocked! Please allow popups for this site to continue with the interview.")
      return null
    }

    // Update state with the new window
    setState((prev) => ({ ...prev, window: win }))

    // Generate the HTML content for the new window
    const htmlContent = generateWindowContent(optionsRef.current)

    // Write the content to the window
    win.document.open()
    win.document.write(htmlContent)
    win.document.close()

    // Set up communication between windows
    setupWindowCommunication(win)

    return win
  }, [])

  // Function to generate the HTML content for the new window
  const generateWindowContent = (options) => {
    const { title, customStyles, customContent } = options

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              text-align: center;
              padding: 2rem;
              margin: 0;
              background-color: #f9fafb;
              color: #111827;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 2rem;
              background-color: white;
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            h1 {
              color: #1f2937;
              margin-bottom: 1rem;
            }
            p {
              color: #4b5563;
              margin-bottom: 1.5rem;
              line-height: 1.5;
            }
            .warning {
              color: #b91c1c;
              font-weight: bold;
            }
            .status-indicator {
              position: fixed;
              top: 1rem;
              right: 1rem;
              background-color: #10b981;
              color: white;
              padding: 0.5rem 1rem;
              border-radius: 0.25rem;
              font-size: 0.875rem;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            }
            .answer-box {
              margin-top: 2rem;
              width: 100%;
            }
            .answer-box textarea {
              width: 100%;
              min-height: 150px;
              padding: 0.75rem;
              border: 1px solid #d1d5db;
              border-radius: 0.375rem;
              font-family: inherit;
              font-size: 1rem;
              resize: vertical;
            }
            .answer-box button {
              margin-top: 0.75rem;
              background-color: #2563eb;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              font-size: 1rem;
              border-radius: 0.375rem;
              cursor: pointer;
              transition: background-color 0.2s;
            }
            .answer-box button:hover {
              background-color: #1d4ed8;
            }
            ${customStyles || ""}
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${title}</h1>
            <p>This is a secure interview window. The following actions are prevented:</p>
            <ul style="text-align: left; margin-bottom: 1.5rem;">
              <li>Switching tabs or minimizing this window</li>
              <li>Exiting fullscreen mode</li>
              <li>Resizing or moving this window</li>
              <li>Closing this window until the interview is complete</li>
            </ul>
            <p class="warning">This window must remain in fullscreen mode for the entire interview.</p>
            <div id="status-indicator" class="status-indicator">Secure Mode Active</div>
            ${customContent || ""}
            
            <div class="answer-box">
              <h2>Your Answer</h2>
              <textarea id="answer-textarea" placeholder="Type your answer here..."></textarea>
              <button id="save-answer-btn">Save Answer</button>
              <p id="save-status" style="margin-top: 0.5rem; font-size: 0.875rem; color: #10b981;"></p>
            </div>
          </div>
          
          <script>
            (function() {
              // Track state
              let isFullscreen = false;
              const statusIndicator = document.getElementById('status-indicator');
              const answerTextarea = document.getElementById('answer-textarea');
              const saveAnswerBtn = document.getElementById('save-answer-btn');
              const saveStatus = document.getElementById('save-status');
              
              // Function to log activity to parent window
              function logActivity(activity) {
                if (window.opener && !window.opener.closed) {
                  window.opener.postMessage({
                    type: 'activity',
                    activity: activity,
                    timestamp: Date.now()
                  }, '*');
                }
              }
              
              // Function to save answer
              function saveAnswer() {
                const answer = answerTextarea.value.trim();
                if (window.opener && !window.opener.closed) {
                  window.opener.postMessage({
                    type: 'answer',
                    answer: answer,
                    timestamp: Date.now()
                  }, '*');
                  
                  saveStatus.textContent = 'Answer saved!';
                  setTimeout(() => {
                    saveStatus.textContent = '';
                  }, 3000);
                }
              }
              
              // Add event listener to save button
              if (saveAnswerBtn) {
                saveAnswerBtn.addEventListener('click', saveAnswer);
              }
              
              // Also save on Ctrl+S
              window.addEventListener('keydown', function(e) {
                if (e.ctrlKey && e.key === 's') {
                  e.preventDefault();
                  saveAnswer();
                }
              });
              
              // Function to force fullscreen
              function forceFullscreen() {
                const elem = document.documentElement;
                
                try {
                  if (elem.requestFullscreen) {
                    elem.requestFullscreen().catch(err => {
                      console.error('Error attempting to enable fullscreen:', err);
                      // Keep trying
                      setTimeout(forceFullscreen, 500);
                    });
                  } else if (elem.webkitRequestFullscreen) {
                    // Safari / older Chrome
                    elem.webkitRequestFullscreen();
                  } else if (elem.mozRequestFullScreen) {
                    // Firefox
                    elem.mozRequestFullScreen();
                  } else if (elem.msRequestFullscreen) {
                    // IE/Edge
                    elem.msRequestFullscreen();
                  }
                  
                  // Force focus
                  window.focus();
                } catch (err) {
                  console.error('Error attempting to enable fullscreen:', err);
                  // Keep trying
                  setTimeout(forceFullscreen, 500);
                }
              }
              
              // Prevent closing the window - make it very difficult
              window.onbeforeunload = function(e) {
                e.preventDefault();
                e.returnValue = '';
                return '';
              };
              
              // Detect tab switching and immediately force focus back
              document.addEventListener('visibilitychange', function() {
                if (document.hidden) {
                  // Log activity
                  logActivity('Tab switch attempted');
                  
                  // Force focus back immediately
                  window.focus();
                  
                  // If we lost focus, we might have exited fullscreen, so force it again
                  setTimeout(forceFullscreen, 100);
                }
              });
              
              // Detect fullscreen exit and force it back immediately
              function onFullscreenChange() {
                if (document.fullscreenElement || 
                    document.webkitFullscreenElement || 
                    document.mozFullScreenElement || 
                    document.msFullscreenElement) {
                  isFullscreen = true;
                  if (statusIndicator) {
                    statusIndicator.style.backgroundColor = '#10b981'; // Green
                    statusIndicator.textContent = 'Secure Mode Active';
                  }
                } else if (isFullscreen) {
                  isFullscreen = false;
                  
                  // Log activity
                  logActivity('Fullscreen exit attempted');
                  
                  if (statusIndicator) {
                    statusIndicator.style.backgroundColor = '#f59e0b'; // Amber
                    statusIndicator.textContent = 'Restoring Secure Mode...';
                  }
                  // Force fullscreen back immediately
                  forceFullscreen();
                }
              }
              
              document.addEventListener('fullscreenchange', onFullscreenChange);
              document.addEventListener('webkitfullscreenchange', onFullscreenChange);
              document.addEventListener('mozfullscreenchange', onFullscreenChange);
              document.addEventListener('MSFullscreenChange', onFullscreenChange);
              
              // Only prevent F11 and Escape keys to avoid exiting fullscreen
              window.addEventListener('keydown', function(e) {
                // Block only F11 and Escape keys to prevent exiting fullscreen
                if (e.key === 'F11' || e.key === 'Escape') {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  // Log activity
                  logActivity('Fullscreen exit key attempted: ' + e.key);
                  
                  return false;
                }
              }, true);
              
              // Extremely aggressive focus management
              // This will continuously check if the window has focus and force it back if not
              setInterval(function() {
                if (document.hasFocus() === false) {
                  // Log activity
                  logActivity('Focus loss detected');
                  
                  window.focus();
                }
              }, 200);
              
              // Prevent window resize by continuously resetting to original size
              const originalWidth = window.outerWidth;
              const originalHeight = window.outerHeight;
              
              setInterval(function() {
                if (window.outerWidth !== originalWidth || window.outerHeight !== originalHeight) {
                  // Log activity
                  logActivity('Resize attempted');
                  
                  window.resizeTo(originalWidth, originalHeight);
                }
              }, 100);
              
              // Prevent window movement by continuously resetting position
              const originalX = window.screenX || window.screenLeft;
              const originalY = window.screenY || window.screenTop;
              
              setInterval(function() {
                const currentX = window.screenX || window.screenLeft;
                const currentY = window.screenY || window.screenTop;
                
                if (currentX !== originalX || currentY !== originalY) {
                  // Log activity
                  logActivity('Window move attempted');
                  
                  window.moveTo(originalX, originalY);
                }
              }, 100);
              
              // Force fullscreen immediately when the window loads
              window.addEventListener('load', function() {
                forceFullscreen();
                
                // Also set up a recurring check to ensure we stay in fullscreen
                setInterval(function() {
                  if (!document.fullscreenElement && 
                      !document.webkitFullscreenElement && 
                      !document.mozFullScreenElement && 
                      !document.msFullscreenElement) {
                    forceFullscreen();
                  }
                }, 1000);
              });
              
              // Disable right-click context menu
              window.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                logActivity('Right-click attempted');
                return false;
              });
              
              // Disable selection to prevent copy-paste outside of textarea
              document.addEventListener('selectstart', function(e) {
                if (e.target !== answerTextarea) {
                  e.preventDefault();
                  return false;
                }
              });
              
              // Listen for messages from the parent window
              window.addEventListener('message', function(event) {
                if (event.data && typeof event.data === 'object') {
                  if (event.data.type === 'ping') {
                    // Respond to ping to confirm the window is still open
                    if (window.opener && !window.opener.closed) {
                      window.opener.postMessage({ type: 'pong', timestamp: Date.now() }, '*');
                    }
                  } else if (event.data.type === 'get_answer') {
                    // Send the current answer back to the parent
                    if (window.opener && !window.opener.closed) {
                      window.opener.postMessage({ 
                        type: 'answer', 
                        answer: answerTextarea.value,
                        timestamp: Date.now() 
                      }, '*');
                    }
                  }
                }
              });
              
              // Send ready message to parent
              if (window.opener && !window.opener.closed) {
                window.opener.postMessage({ type: 'ready', timestamp: Date.now() }, '*');
              }
            })();
          </script>
        </body>
      </html>
    `
  }

  // Function to set up communication between windows
  const setupWindowCommunication = (win) => {
    // Listen for messages from the child window
    const messageHandler = (event) => {
      if (!event.data || typeof event.data !== "object") return

      switch (event.data.type) {
        case "fullscreen_entered":
          setState((prev) => ({ ...prev, isFullscreen: true }))
          break

        case "activity":
          logActivity(event.data.activity)
          break

        case "answer":
          setState((prev) => ({
            ...prev,
            answers: { ...prev.answers, current: event.data.answer },
          }))
          break

        case "ready":
          // The child window is ready
          console.log("Secure window is ready")
          break

        case "pong":
          // Response to ping, window is still alive
          break
      }
    }

    window.addEventListener("message", messageHandler)

    // Set up an interval to check if the window is still open
    const checkInterval = setInterval(() => {
      if (win.closed) {
        clearInterval(checkInterval)
        window.removeEventListener("message", messageHandler)

        setState((prev) => ({ ...prev, window: null }))

        // Call the onWindowClosed callback if provided
        if (optionsRef.current.onWindowClosed) {
          optionsRef.current.onWindowClosed()
        }
      } else {
        // Send a ping to check if the window is responsive
        win.postMessage({ type: "ping", timestamp: Date.now() }, "*")

        // Also request the latest answer
        win.postMessage({ type: "get_answer", timestamp: Date.now() }, "*")
      }
    }, 1000)

    // Clean up when the component unmounts
    return () => {
      clearInterval(checkInterval)
      window.removeEventListener("message", messageHandler)
    }
  }

  // Function to close the secure window
  const closeSecureWindow = useCallback(() => {
    if (state.window && !state.window.closed) {
      state.window.close()
      setState((prev) => ({ ...prev, window: null }))
    }
  }, [state.window])

  // Clean up when the component unmounts
  useEffect(() => {
    return () => {
      if (state.window && !state.window.closed) {
        state.window.close()
      }
    }
  }, [state.window])

  return {
    openSecureWindow,
    closeSecureWindow,
    window: state.window,
    isFullscreen: state.isFullscreen,
    activityLog: state.activityLog,
    answers: state.answers,
  }
}
