#!/bin/bash

# Start the Python backend
echo "Starting Flask backend server..."
python api_server.py &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"

# Wait for the backend to initialize
sleep 2
echo "Backend running at http://localhost:5000"
echo ""

# Start the React frontend
echo "Starting React frontend..."
cd retirement-partnership
npm start &
FRONTEND_PID=$!
echo "Frontend started with PID: $FRONTEND_PID"
echo "Frontend running at http://localhost:3000"
echo ""

echo "Press Ctrl+C to stop all services"

# Handle clean termination of both services
function cleanup {
  echo ""
  echo "Stopping services..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  echo "All services stopped"
  exit 0
}

trap cleanup SIGINT

# Keep the script running
while true; do
  sleep 1
done 