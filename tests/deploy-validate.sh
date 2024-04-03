#!/bin/bash

# Define paths
REPO_ROOT=$(git rev-parse --show-toplevel)
PUBLIC_DIR="$REPO_ROOT/public"
INDEX_FILE="$REPO_ROOT/index.html"
AI_MODELS_DIR="$PUBLIC_DIR/ai-models"
ERROR_404="$REPO_ROOT/404.html"
ERROR_500="$REPO_ROOT/500.html"
ABOUT_HTML="$PUBLIC_DIR/about.html"
FEATURES_HTML="$PUBLIC_DIR/features.html"
INVENTORY_HTML="$PUBLIC_DIR/inventory.html"
NEWS_HTML="$PUBLIC_DIR/news.html"
WEATHER_HTML="$PUBLIC_DIR/weather.html"

# Function to check if files exist
check_files_exist() {
    for file in "$@"; do
        if [ ! -f "$file" ]; then
            echo "Error: $file does not exist."
            exit 1
        fi
    done
}

# Function to check if directories exist
check_directories_exist() {
    for dir in "$@"; do
        if [ ! -d "$dir" ]; then
            echo "Error: $dir does not exist."
            exit 1
        fi
    done
}

# Function to check if CSS and Bootstrap files are linked in index.html
check_css_bootstrap_links() {
    if ! grep -q "bootstrap.css" "$INDEX_FILE" || ! grep -q "nestec.css" "$INDEX_FILE"; then
        echo "Error: CSS or Bootstrap files are not linked in index.html."
        exit 1
    fi
}

# Main function
main() {
    echo "Starting validation process..."

    # Check if directories exist
    check_directories_exist "$REPO_ROOT" "$PUBLIC_DIR" "$AI_MODELS_DIR"

    # Check if files exist
    check_files_exist "$INDEX_FILE" "$ERROR_404" "$ERROR_500" "$ABOUT_HTML" "$FEATURES_HTML" "$INVENTORY_HTML" "$NEWS_HTML" "$WEATHER_HTML"

    # Check CSS and Bootstrap links in index.html
    check_css_bootstrap_links

    echo "Validation completed successfully."
}

# Run main function
main
