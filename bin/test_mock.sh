#!/bin/bash

# /bin/test_mock.sh

export USE_MOCK_SERVICES=true

# The first argument ($1) is the directory to test. Default to "tests/" if not provided.
DIR=${1:-tests/}

# Shift the positional parameters to the left.
# This makes $2 become $1, $3 become $2, and so on.
shift

# Run pytest with the specified directory and any additional arguments provided.
python3.9 -m pytest "${DIR}" "$@"
