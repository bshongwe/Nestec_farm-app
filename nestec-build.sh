#!/bin/bash

# Define paths
REPO_ROOT=$(git rev-parse --show-toplevel)
PUBLIC_DIR="$REPO_ROOT/public"
SERVER_SCRIPT="$REPO_ROOT/server.js"
VALIDATE_SCRIPT="$REPO_ROOT/deploy-validate.sh"
BUILD_DIR="$REPO_ROOT/build"
LOG_FILE="$REPO_ROOT/build.log"

# Function to log messages
log_message() {
    echo "$(date +'%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Function to check if files exist
check_files_exist() {
    for file in "$@"; do
        if [ ! -f "$file" ]; then
            log_message "Error: $file does not exist."
            exit 1
        fi
    done
}

# Function to create build directory
create_build_dir() {
    if [ ! -d "$BUILD_DIR" ]; then
        mkdir "$BUILD_DIR" || { log_message "Error: Unable to create build directory."; exit 1; }
    fi
}

# Function to copy necessary files to build directory
copy_files_to_build() {
    cp "$SERVER_SCRIPT" "$BUILD_DIR" || { log_message "Error: Unable to copy server.js to build directory."; exit 1; }
    cp -r "$PUBLIC_DIR" "$BUILD_DIR" || { log_message "Error: Unable to copy public directory to build directory."; exit 1; }
    cp "$VALIDATE_SCRIPT" "$BUILD_DIR" || { log_message "Error: Unable to copy deploy-validate.sh to build directory."; exit 1; }
}

# Function to run deployment validation
run_validation() {
    log_message "Running deployment validation..."
    cd "$BUILD_DIR" || { log_message "Error: Unable to change directory to build directory."; exit 1; }
    ./deploy-validate.sh || { log_message "Error: Deployment validation failed."; exit 1; }
}

# Main function
main() {
    echo "Starting build process..."
    
    # Check if necessary files exist
    check_files_exist "$SERVER_SCRIPT" "$VALIDATE_SCRIPT"
    
    # Create build directory
    create_build_dir
    
    # Copy necessary files to build directory
    copy_files_to_build
    
    # Run deployment validation
    run_validation
    
    echo "Build process completed successfully."
}

# Run main function and log output
main >> "$LOG_FILE" 2>&1
