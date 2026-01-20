#!/bin/bash

# BetterBobcats Production Script
# Builds frontend and runs both backend and frontend in production mode

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to cleanup background processes on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down services...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    wait $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    echo -e "${GREEN}All services stopped.${NC}"
    exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup SIGINT SIGTERM

echo -e "${BLUE}🚀 Starting BetterBobcats Production Environment${NC}\n"

# Check if we're in the project root
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Build Frontend
echo -e "${GREEN}Building Frontend (Next.js)...${NC}"
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
fi

# Build frontend
echo -e "${YELLOW}Creating production build...${NC}"
npm run build

cd ..

# Start Backend
echo -e "${GREEN}Starting Backend (FastAPI)...${NC}"
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Virtual environment not found. Creating one...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Check if dependencies are installed
if ! python -c "import fastapi" 2>/dev/null; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    pip install -r requirements.txt
fi

# Start backend server (production mode, no reload)
echo -e "${GREEN}Backend running on http://localhost:8000${NC}"
uvicorn app.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

cd ..

# Start Frontend
echo -e "${GREEN}Starting Frontend (Next.js Production)...${NC}"
cd frontend

# Start frontend server (production mode)
echo -e "${GREEN}Frontend running on http://localhost:3000${NC}"
npm run start &
FRONTEND_PID=$!

cd ..

echo -e "\n${BLUE}✅ Both services are running in production mode!${NC}"
echo -e "${BLUE}Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "${BLUE}Backend API: ${GREEN}http://localhost:8000${NC}"
echo -e "${BLUE}API Docs: ${GREEN}http://localhost:8000/docs${NC}"
echo -e "\n${YELLOW}Press Ctrl+C to stop all services${NC}\n"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
