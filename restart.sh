docker buildx build -f ./Dockerfile ./ --tag can-i-cook-it:latest --platform=linux/amd64

docker compose down -v
docker compose up -d  