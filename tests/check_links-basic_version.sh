#!/bin/bash

# Function to check links in Nestec HTML files
check_links() {
    local html_file=$1
    local content=$(<$html_file)

    # Regex pattern to find URLs in HTML
    local urls=$(echo "$content" | grep -oP '(?<=href=["'"'"'])([^"'"'"']+)(?=["'"'"'])')

    if [ -z "$urls" ]; then
        echo "No links found in $html_file"
        return
    fi

    for url in $urls; do
        # Check if URL is a relative path
        if [[ $url == /* ]]; then
            full_url="https://bshongwe.github.io/Nestec_farm-app$url"
        else
            full_url=$url
        fi

        # Send HTTP request
        if curl --head --silent --fail "$full_url" >/dev/null; then
            echo "OK: $full_url"
        else
            echo "ERROR: $full_url"
        fi
    done
}

# Main function
main() {
    html_files=(
        "index.html"           # Check links in index.html
        "400.html"             # Check links in 400.html
        "500.html"             # Check links in 500.html
        "public"               # Check links in HTML files in the public directory
        "public/ai-models"     # Check links in HTML files in the ai-models subdirectory of public
    )

    for file in "${html_files[@]}"; do
        if [ -e "$file" ]; then
            if [ -d "$file" ]; then
                # Iterate over HTML files in directories
                for inner_file in "$file"/*.html; do
                    if [ -f "$inner_file" ]; then
                        echo "Checking links in: $inner_file"
                        check_links "$inner_file"
                    fi
                done
            elif [ "${file: -5}" == ".html" ]; then
                # Check links in individual HTML files
                echo "Checking links in: $file"
                check_links "$file"
            fi
        fi
    done
}

# Run main function
main
