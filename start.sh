#!/bin/bash

#kill already running ports 
#sudo lsof -t -i:3002 | xargs kill -9
#sudo lsof -t -i:5374 | xargs kill -9

# start tmux session
tmux new-session -d -s "TeaEstateManagementSystem" -n "frontend" "cd frontend; npm run dev"
tmux split-window -v "cd backend; npm start"
tmux -2 attach-session -d
