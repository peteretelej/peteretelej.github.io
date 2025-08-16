#!/bin/bash
set -e 

# Development environment launcher for peteretelej.github.io
# This session will mostly be taken over by Claude Code

SESSION_NAME="peteretelej-dev"

# Kill existing session if it exists (gracefully ignore failure)
tmux kill-session -t $SESSION_NAME 2>/dev/null || true

# Create new tmux session with dev terminal
tmux new-session -d -s $SESSION_NAME -n "dev" -c "$(pwd)"

# Split the window to create a commands pane
tmux split-window -h -t $SESSION_NAME:dev -c "$(pwd)"

# Start Astro dev server in left pane
tmux send-keys -t $SESSION_NAME:dev.1 "npm run dev" Enter

# Set pane titles
tmux select-pane -t $SESSION_NAME:dev.1 -T "Astro Dev Server"
tmux select-pane -t $SESSION_NAME:dev.2 -T "Commands"

# Attach to the session
tmux attach-session -t $SESSION_NAME