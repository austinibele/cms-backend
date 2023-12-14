# /bin/start.sh
#!/bin/bash

uvicorn src.api.main:app --host localhost --port 8080
