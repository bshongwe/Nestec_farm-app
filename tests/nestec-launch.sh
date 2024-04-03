#!/bin/bash

# Define paths
DEPLOY_VALIDATE_SCRIPT="./deploy-validate.sh"
NESTEC_BUILD_SCRIPT="./nestec-build.sh"
LOG_FILE="./nestec-launch.log"

# Function to log messages
log_message() {
    echo "$(date +'%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Function to execute a script
execute_script() {
    local script="$1"
    local script_name="$(basename "$script")"
    log_message "Executing $script_name..."
    ./"$script" >> "$LOG_FILE" 2>&1
    local exit_status=$?
    if [ $exit_status -ne 0 ]; then
        log_message "Error: $script_name failed with exit code $exit_status."
        exit $exit_status
    fi
    log_message "$script_name completed successfully."
}

# Main function
main() {
    echo "Starting Nestec launch process..."
    log_message "Starting Nestec launch process..."
    
    # Execute deployment validation
    execute_script "$DEPLOY_VALIDATE_SCRIPT"
    
    # Execute Nestec build
    execute_script "$NESTEC_BUILD_SCRIPT"
    
    echo "Nestec launch process completed successfully."
    log_message "Nestec launch process completed successfully."
}

# Run main function
main
