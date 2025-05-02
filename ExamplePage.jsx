"use client"

import { useState } from "react"
import { SecureInterviewWindow } from "../components/SecureInterviewWindow"

const ExamplePage = () => {
  const [logs, setLogs] = useState([])

  const handleWindowClosed = () => {
    setLogs((prev) => [...prev, { message: "Interview window was closed", timestamp: Date.now() }])
  }

  const handleActivity = (activity) => {
    setLogs((prev) => [...prev, { message: activity, timestamp: Date.now() }])
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Secure Interview System</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Interview Controls</h2>
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
          <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500 italic">No activity yet</p>
            ) : (
              <ul className="space-y-2">
                {logs.map((log, index) => (
                  <li key={index} className="text-sm border-b border-gray-200 pb-2">
                    <span className="text-gray-400 mr-2">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    {log.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">How It Works</h2>
        <p className="text-gray-700 mb-2">
          This secure interview system uses aggressive prevention techniques to create a strictly controlled environment
          for online interviews. It actively prevents tab switching, fullscreen exit, window resizing, and other actions
          that could compromise the integrity of the interview.
        </p>
        <p className="text-gray-700">
          The system logs all prevention activities and provides an answer box for candidates to submit their responses.
          All activity is tracked and displayed in real-time in the activity log.
        </p>
      </div>
    </div>
  )
}

export default ExamplePage
