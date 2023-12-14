# /bin/start_mock.sh

#!/bin/bash
export USE_MOCK_SERVICES=true
uvicorn src.api.main:app --host localhost --port 8080