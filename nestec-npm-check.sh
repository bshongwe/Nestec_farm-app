#!/bin/bash

# Define paths
REPO_ROOT=$(git rev-parse --show-toplevel)
PACKAGE_JSON="$REPO_ROOT/package.json"

# Function to analyze npm dependencies
analyze_npm_dependencies() {
    echo "Analyzing npm dependencies..."

    # Check if package.json exists
    if [ ! -f "$PACKAGE_JSON" ]; then
        echo "Error: package.json not found."
        exit 1
    fi

    # Get list of npm dependencies from package.json
    dependencies=$(jq -r '.dependencies | keys[]' "$PACKAGE_JSON")

    # Output npm dependency analysis
    echo "NPM Package Dependencies Analysis Report:"
    echo "---------------------------------------"
    for dependency in $dependencies; do
        echo "Dependency: $dependency"
        grep -r -q -e "require('$dependency')" "$REPO_ROOT" && echo "  - Used in require calls" 
        grep -r -q -e "import.*$dependency" "$REPO_ROOT" && echo "  - Used in import statements" 
    done

    echo "Npm dependency analysis completed."
}

# Main function
main() {
    echo "Starting npm dependency analysis process..."
    analyze_npm_dependencies
    echo "Npm dependency analysis process completed."
}

# Run main function
main
