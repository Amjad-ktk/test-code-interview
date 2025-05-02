// import React, { useState, useEffect, useRef } from "react";
// import openTestWindow  from './components/InterviewWindow';
// const App = () => {
//   const styles = {
//     container: {
//       fontFamily: "Segoe UI, sans-serif",
//       background: "linear-gradient(to right, #4B0082, #FFC0CB)",
//       minHeight: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "2rem",
//       textAlign: "center",
//       paddingBottom: '0.5rem',
//     },
//     section: {
//       maxWidth: "600px",
//       width: "100%",
//       background: "thansparent",
//       padding: "2rem",
//       color:"white",
//       borderRadius: "12px",
//       boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
//       marginBottom: "2rem",
//     },
//     button: {
//       padding: "12px 24px",
//       fontSize: "16px",
//       background: "linear-gradient(to right, #4B0082, #FFC0CB)",      color: "white",
//       border: "none",
//       borderRadius: "8px",
//       cursor: "pointer",
//       transition: "background-color 0.3s ease",
//       margin: "0.5rem 0",
//       width: "35%",
//     },
//     buttonHover: {
//       background: "linear-gradient(to left, rgba(138, 43, 226, 1), rgba(255, 182, 193, 0.5))",
//       transform: "scale(1.05)",
//     },
//     buttonDisabled: {
//       backgroundColor: "#a5b4fc",
//       cursor: "not-allowed",
//     },
//     videoContainer: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "1.5rem",
//       marginTop: "2rem",
//       alignItems: "center",
//     },
//     videoBox: {
//       border: "2px solid #e5e7eb",
//       borderRadius: "10px",
//       width: "100%",
//       maxWidth: "300px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
//       overflow: "hidden",
//       background: "transparent",
//     },
//     warningText: {
//       color: "#d97706",
//       marginTop: "1rem",
//       fontSize: "0.9rem",
//     },
//   };
  
  
//   const [isTestStarted, setIsTestStarted] = useState(false);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const [isCameraAttempted, setIsCameraAttempted] = useState(false);
//   const [cameraAccessFailed, setCameraAccessFailed] = useState(false);
//   const [testWin, setTestWin] = useState(null);

//   const screenVideoRef = useRef(null);
//   const cameraVideoRef = useRef(null);

//   const startScreenShare = async () => {
//     try {
//       const screenStream = await navigator.mediaDevices.getDisplayMedia({
//         video: { cursor: "always" },
//         audio: true,
//       });
//       screenVideoRef.current.srcObject = screenStream;
//       screenVideoRef.current.play();
//       setIsScreenSharing(true);
//     } catch (err) {
//       alert("Screen sharing failed: " + err.message);
//     }
//   };

//   const startCamera = async () => {
//     try {
//       const cameraStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       cameraVideoRef.current.srcObject = cameraStream;
//       cameraVideoRef.current.play();
//     } catch (err) {
//       console.warn("Camera/mic access failed:", err.message);
//       setCameraAccessFailed(true);
//     } finally {
//       setIsCameraAttempted(true);
//     }
//   };

//   const requestPermission = async () => {
//     const ok = window.confirm(
//       "We need your permission to block other activities during the interview.\n" +
//         "You won't be able to switch tabs, minimize, or close the window easily. Do you agree?"
//     );
//     if (ok) {
//       startTest();
//     } else {
//       alert("You must accept to proceed.");
//     }
//   };

//   const startTest = () => {
//     setIsTestStarted(true);
//     openTestWindow(setTestWin);
//   };

// //   const openTestWindow = () => {
// //     // const w = window.screen.width;
// //     // const h = window.screen.height;
// //     // const offscreenTop = -200;
// //     // const offscreenleft =200;
// //     const win = window.open(
// //       "",
// //       "",
// //       `top=50,width=800,height=600,left=100,resizable=no,scrollbars=yes`
// //     );


// //     if (!win) {
// //       alert("Popup blocked! Please allow popups for this site.");
// //       return;
// //     }

// //     setTestWin(win);

// //     win.document.write(`
// //       <html>
// //         <head>
// //           <title>Interview In Progress</title>
// //           <style>
// //             body { font-family: sans-serif; text-align: center; padding: 2rem; }
// //             button { padding: 10px 20px; font-size: 18px; }
// //           </style>
// //         </head>
// //         <body>
// //           <h1>Interview In Progress</h1>
// //           <p>You cannot leave this window until the interview ends.</p>
// //           <button id="startFullscreenBtn">Start Fullscreen</button>
// //           <script>
// //             let switchCount = 0;
// //             const btn = document.getElementById('startFullscreenBtn');
            
// //             btn.addEventListener('click', async () => {
// //               makeItFullScreen();
              
// //             });

// //             window.onbeforeunload = () => "The interview is still running. You cannot close this window.";

// //             // window.addEventListener('blur', () => {
// //             //   window.focus();
// //             //   switchCount++;
// //             //   alert("You switched focus! Stay on the interview window. Switches detected: " + switchCount);
// //             //   if (switchCount >= 3) {
// //             //     alert("Too many switches! You may be disqualified.");
// //             //   }
// //             // });

            
// //             window.addEventListener('keydown', (e) => {
// //               if (e.key === 'Escape' || e.key === 'F11') {
// //                 e.preventDefault();
// //                 e.stopPropagation();
// //                 alert("You cannot exit fullscreen during the interview!");
// //                 }
// //                 });
                
// //                 document.addEventListener('visibilitychange', () => {
// //                   if (document.hidden) {
// //                     window.focus();
// //                     switchCount++;
// //                     alert("You minimized or switched tab! Switches detected: " + switchCount);
// //                     if (switchCount >= 3) {
// //                       alert("Too many switches! You may be disqualified.");
// //                     }
// //                   }
// //                 });

// //  const FIXED_WIDTH  =  window.screen.width;
// //   const FIXED_HEIGHT = window.screen.height;
// //   let userResizeFlag = false;

// //   // Listen for any resize event
// //   window.addEventListener('resize', () => {
// //     // If it wasn not our own resizeTo call, snap back
// //     if (!userResizeFlag) {
// //       window.resizeTo(FIXED_WIDTH, FIXED_HEIGHT);  // restore size :contentReference[oaicite:3]{index=3}
// //     }
// //     userResizeFlag = false;  // reset flag for next event
// //   });

           
// //                 // Desired fixed position
// // const FIXED_LEFT = 0;
// // const FIXED_TOP  = -50000;
// //   // How often to check (ms)
// //   const CHECK_INTERVAL = 500;

// //   // Prevent the new window from stealing focus
// //   window.blur();                     // keep this window unfocused&#8203;:contentReference[oaicite:6]{index=6}
// //   if (window.opener) window.opener.focus();

// //   // Periodically ensure the window is at the fixed position
// //   setInterval(() => {
// //     // For most browsers use screenX/screenY; IE uses screenLeft/screenTop
// //     const currentX = window.screenX !== undefined ? window.screenX : window.screenLeft;
// //     const currentY = window.screenY !== undefined ? window.screenY : window.screenTop;

// //     if (currentX !== FIXED_LEFT || currentY !== FIXED_TOP) {
// //       // Move back to the fixed coordinates
// //       window.moveTo(FIXED_LEFT, FIXED_TOP);  // absolute move&#8203;:contentReference[oaicite:7]{index=7}
// //     }
// //   }, CHECK_INTERVAL);
// //   // let resizeAllowedOnce = false;

// // // window.addEventListener('resize', () => {
// // //     const windowWidth = window.outerWidth;
// // //     const windowHeight = window.outerHeight;
// // //     const screenWidth = screen.width;
// // //     const screenHeight = screen.height;

// // //     // Check if the window is in fullscreen mode
// // //     const isFullscreen = windowWidth === screenWidth && windowHeight === screenHeight;

// // //     if (!resizeAllowedOnce && isFullscreen) {
// // //         // Allow the first resize only if the window has entered fullscreen
// // //         resizeAllowedOnce = true;
// // //         console.log("First resize allowed: entered fullscreen.");
// // //         return;
// // //     }

// // //     if (!resizeAllowedOnce) {
// // //         // Prevent resizing before entering fullscreen
// // //         alert("Please enter fullscreen mode before starting interview");
// // //         return;
// // //     }

// // //     switchCount++;
// // //     alert("Resizing the window is not allowed! Attempts: " + switchCount);

// // //     if (switchCount >= 3) {
// // //         alert("Too many resizes! You may be disqualified.");
// // //         // Optionally, remove the event listener or take other actions
// // //         window.removeEventListener('resize', arguments.callee);
// // //     }
// // // });
// //  // async function makeItFullScreen() {
// //             //   try {
// //             //     const elem = document.documentElement;
// //             //     if (elem.requestFullscreen) {
// //             //       await elem.requestFullscreen();
// //             //     } else if (elem.mozRequestFullScreen) {
// //             //       await elem.mozRequestFullScreen();
// //             //     } else if (elem.webkitRequestFullscreen) {
// //             //       await elem.webkitRequestFullscreen();
// //             //     } else if (elem.msRequestFullscreen) {
// //             //       await elem.msRequestFullscreen();
// //             //     }
// //             //     btn.style.display = 'none';
// //             //     document.body.innerHTML += '<p>Fullscreen mode activated. Stay focused!</p>';
// //             //   } catch (err) {
// //             //     alert("Fullscreen failed: " + err.message);
// //             //   }
// //             // }
// //           </script>
// //         </body>
// //       </html>
// //     `);



    
// //   };

//   useEffect(() => {
//     return () => {
//       window.onbeforeunload = null;
//       document.removeEventListener("visibilitychange", () => {});
     
//     };
//   }, []);

//   return (
//     <div style={styles.container}>
//     {!isTestStarted ? (
//       <div style={styles.section}>
//         <h2>Welcome to the Interview System</h2>
  
//         {/* Screen Sharing Section */}
//         <p>Step 1: Share your screen (required)</p>
//         <button
//           onClick={startScreenShare}
//           disabled={isScreenSharing}
//           style={{
//             ...styles.button,
//             ...(isScreenSharing ? styles.buttonDisabled : {}),
//             marginBottom: "1rem",
//           }}
//         >
//           {isScreenSharing ? "Screen Sharing Active" : "Start Screen Share"}
//         </button>
  
//         {/* Camera & Mic Section */}
//         <p>Step 2: Enable Camera & Microphone (optional)</p>
//         <button
//           onClick={startCamera}
//           disabled={isCameraAttempted}
//           style={{
//             ...styles.button,
//             ...(isCameraAttempted ? styles.buttonDisabled : {}),
//           }}
//         >
//           {isCameraAttempted ? "Camera Attempted" : "Enable Camera & Mic"}
//         </button>
//         {cameraAccessFailed && (
//           <p style={styles.warningText}>
//             ⚠️ Camera/Mic not available or denied. You can still proceed.
//           </p>
//         )}
  
//         {/* Video Previews */}
//         <div style={styles.videoContainer}>
//           <div style={styles.videoBox}>
//             <h4>Screen</h4>
//             <video
//               ref={screenVideoRef}
//               style={{ width: "100%" }}
//               autoPlay
//               playsInline
//               muted
//             />
//           </div>
//           {isCameraAttempted && !cameraAccessFailed && (
//             <div style={styles.videoBox}>
//               <h4>Webcam</h4>
//               <video
//                 ref={cameraVideoRef}
//                 style={{ width: "100%" }}
//                 autoPlay
//                 playsInline
//                 muted
//               />
//             </div>
//           )}
//         </div>
  
//         {/* Start Interview Button */}
//         {isScreenSharing && (
//           <div style={{ marginTop: "2rem" }}>
//             <button style={styles.button} onClick={requestPermission}>
//               Start Interview
//             </button>
//           </div>
//         )}
//       </div>
//     ) : (
//       <div style={styles.section}>
//         <h2>Interview Started</h2>
//         <p>The interview window is open. Please stay focused there!</p>
//       </div>
//     )}
//   </div>
  
//   );
// };

// export default App;
// // import React, { useState } from 'react';
// // import InterviewWindow from './Components/InterviewWindow';

// // function App() {
// //   const [isTestStarted, setIsTestStarted] = useState(false);

// //   const openInterview = () => {
// //     const w = window.screen.width;
// //     const h = window.screen.height;
// //     const top = -200;
// //     const left = 0;
// //     const features = `width=${w},height=${h},top=${top},left=${left},resizable=no,scrollbars=yes`;
// //     const win = window.open('/interview', 'InterviewWindow', features);
// //     if (!win) { alert('Enable popups'); return; }
// //     setIsTestStarted(true);
// //   };

// //   return (
// //     <div>
// //       {!isTestStarted ? (
// //         <button onClick={openInterview}>Start Interview</button>
// //       ) : null}
// //     </div>
// //   );
// // }

// // export default App;
import "./App.css"
import InterviewPage from "./pages/InterviewPage"

function App() {
  return (
    <div className="App">
      <InterviewPage />
    </div>
  )
}

export default App
