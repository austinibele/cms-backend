# /bin/start.sh
#!/bin/bash

export DATABASE_DIR="database"
uvicorn src.api.main:app --host localhost --port 8080
