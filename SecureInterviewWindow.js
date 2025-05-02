import { useState, useEffect } from "react"
import { useSecureWindow } from "../hooks/useSecureWindow"

export const SecureInterviewWindow = ({
  title = "Interview In Progress",
  onWindowClosed,
  onActivity,
  autoOpen = false,
  customContent = "",
  customStyles = "",
}) => {
  const [isOpen, setIsOpen] = useState(autoOpen)

  const {
    openSecureWindow,
    closeSecureWindow,
    window: testWindow,
    isFullscreen,
    activityLog,
    answers,
  } = useSecureWindow({
    title,
    onWindowClosed: () => {
      setIsOpen(false)
      if (onWindowClosed) onWindowClosed()
    },
    onActivity,
    autoRequestFullscreen: true,
    customContent,
    customStyles,
  })

  // Open the window when isOpen changes to true
  useEffect(() => {
    if (isOpen && !testWindow) {
      openSecureWindow()
    }
  }, [isOpen, testWindow, openSecureWindow])

  // Handle opening the window
  const handleOpenWindow = () => {
    setIsOpen(true)
  }

  // Handle closing the window
  const handleCloseWindow = () => {
    closeSecureWindow()
    setIsOpen(false)
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      {!isOpen ? (
        <button
          onClick={handleOpenWindow}
          style={{
            padding: "10px 16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Open Secure Interview Window
        </button>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              padding: "16px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "#111827",
                margin: "0 0 8px 0",
              }}
            >
              Interview Window Status
            </h3>
            <div style={{ marginTop: "8px" }}>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 8px 0" }}>
                Window Open: <span style={{ fontWeight: "500", color: "#111827" }}>{testWindow ? "Yes" : "No"}</span>
              </p>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 8px 0" }}>
                Fullscreen: <span style={{ fontWeight: "500", color: "#111827" }}>{isFullscreen ? "Yes" : "No"}</span>
              </p>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: "0" }}>
                Status:{" "}
                <span
                  style={{
                    fontWeight: "500",
                    color: "#10b981",
                  }}
                >
                  Secure Mode Active
                </span>
              </p>
            </div>
          </div>

          {activityLog.length > 0 && (
            <div
              style={{
                padding: "16px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#111827", margin: "0 0 8px 0" }}>
                Activity Log
              </h3>
              <div
                style={{
                  marginTop: "8px",
                  maxHeight: "160px",
                  overflowY: "auto",
                }}
              >
                <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                  {activityLog.map((activity, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: "14px",
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                        paddingBottom: "4px",
                        marginBottom: "4px",
                      }}
                    >
                      <span style={{ color: "#9ca3af", marginRight: "8px" }}>
                        [{new Date(activity.timestamp).toLocaleTimeString()}]
                      </span>
                      {activity.type}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {answers.current && (
            <div
              style={{
                padding: "16px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#111827", margin: "0 0 8px 0" }}>
                Current Answer
              </h3>
              <div
                style={{
                  marginTop: "8px",
                  padding: "12px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb",
                  maxHeight: "160px",
                  overflowY: "auto",
                }}
              >
                <p style={{ fontSize: "14px", whiteSpace: "pre-wrap", margin: "0" }}>{answers.current}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleCloseWindow}
            style={{
              padding: "10px 16px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            End Interview & Close Window
          </button>
        </div>
      )}
    </div>
  )
}
