#!/bin/bash

# A simple bash script

echo "Welcome to the Tea Estate Management System!"
echo "Starting the system..."

# start frontend in a new shell
gnome-terminal -- bash -c "cd frontend; npm run dev"

# start backend in a new shell
gnome-terminal -- bash -c "cd backend; npm start"

echo "System started successfully."