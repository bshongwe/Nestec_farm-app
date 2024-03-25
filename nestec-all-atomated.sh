#!/bin/bash

# Run npm dependency check
echo "Running npm dependency check..."
./nestec-npm-check.sh

# Check if npm dependency check failed
if [ $? -ne 0 ]; then
    read -p "Npm dependency check failed. Do you want to continue with the deployment process? (yes/no): " continue
    if [ "$continue" != "yes" ]; then
        echo "Aborting deployment."
        exit 1
    fi
fi

# Continue with other deployment processes...
