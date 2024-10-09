#!/bin/bash

#kill already running ports 
#sudo lsof -t -i:3002 | xargs kill -9
#sudo lsof -t -i:5374 | xargs kill -9

# start tmux session
# tmux new-session -d -s "TeaEstateManagementSystem" -n "frontend" "cd frontend; npm run dev"
# tmux split-window -v "cd backend; npm start"
# tmux -2 attach-session -d

#no more tmux
# cd frontend; npm run dev
#here i cant run the backend bcs command will never end, how can i do that?
#i dont want to stop the frontend
# Run the frontend in the background
cd frontend && npm run dev &

# Change to the backend directory and start it
cd .. && cd backend && npm start


