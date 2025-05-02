import { useState } from "react"
import { SecureInterviewWindow } from "../components/SecureInterviewWindow"

const InterviewPage = () => {
  const [logs, setLogs] = useState([])

  const handleWindowClosed = () => {
    setLogs((prev) => [...prev, { message: "Interview window was closed", timestamp: Date.now() }])
  }

  const handleActivity = (activity) => {
    setLogs((prev) => [
      ...prev,
      {
        message: activity,
        timestamp: Date.now(),
        isViolation: true,
      },
    ])
  }

  return (
    <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "24px" }}>Secure Interview System</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>Interview Controls</h2>
          <SecureInterviewWindow
            title="Technical Interview"
            onWindowClosed={handleWindowClosed}
            onActivity={handleActivity}
            customContent={`
              <div style="margin-top: 2rem; padding: 1rem; background-color: #f3f4f6; border-radius: 0.5rem;">
                <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">Interview Questions</h2>
                <ol style="text-align: left; line-height: 1.6;">
                  <li>Explain the difference between let, const, and var in JavaScript.</li>
                  <li>What is the virtual DOM in React and how does it work?</li>
                  <li>Describe the event loop in JavaScript.</li>
                </ol>
              </div>
            `}
          />
        </div>

        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>Activity Log</h2>
          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "16px",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              height: "400px",
              overflowY: "auto",
            }}
          >
            {logs.length === 0 ? (
              <p style={{ color: "#6b7280", fontStyle: "italic" }}>No activity yet</p>
            ) : (
              <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                {logs.map((log, index) => (
                  <li
                    key={index}
                    style={{
                      fontSize: "0.875rem",
                      borderBottom: "1px solid #e5e7eb",
                      paddingBottom: "8px",
                      marginBottom: "8px",
                      color: log.isViolation ? "#f59e0b" : "#374151",
                    }}
                  >
                    <span style={{ color: "#9ca3af", marginRight: "8px" }}>
                      [{new Date(log.timestamp).toLocaleTimeString()}]
                    </span>
                    {log.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "32px",
          padding: "16px",
          backgroundColor: "#eff6ff",
          borderRadius: "0.5rem",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "8px" }}>How It Works</h2>
        <p style={{ color: "#374151", marginBottom: "8px" }}>
          This secure interview system uses prevention techniques to create a controlled environment for online
          interviews. It actively prevents tab switching, fullscreen exit, window resizing, and other actions that could
          compromise the integrity of the interview.
        </p>
        <p style={{ color: "#374151" }}>
          The system logs all prevention activities and provides an answer box for candidates to submit their responses.
          All activity is tracked and displayed in real-time in the activity log.
        </p>
      </div>
    </div>
  )
}

export default InterviewPage
