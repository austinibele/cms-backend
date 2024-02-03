FROM python:3.11.7-slim-bullseye

# Set environment variables to ensure Python runs in unbuffered mode (recommended for Docker)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory
WORKDIR /app

COPY cms-backend /app

RUN pip install --no-cache-dir -r requirements.txt

# Create a non-root user and switch to it
RUN useradd -m cmsuser
RUN chown -R cmsuser:cmsuser /app
USER cmsuser

# Expose the port the app runs on
EXPOSE 8080

CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8080"]
