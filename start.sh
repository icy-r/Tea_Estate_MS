#!/bin/bash

# start tmux session
tmux new-session -d -s "TeaEstateManagementSystem" -n "frontend" "cd frontend; npm run dev"
tmux split-window -v "cd backend; npm start"
tmux -2 attach-session -d
