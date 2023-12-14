# /bin/start_mock.sh

#!/bin/bash
export DATABASE_DIR="mock_database"
uvicorn src.api.main:app --host localhost --port 8080