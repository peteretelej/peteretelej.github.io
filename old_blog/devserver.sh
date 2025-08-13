docker stop jekyllserver ||true
docker run --rm --name jekyllserver -it -p "4000:4000" -v "$PWD":/app -w /app etelej/jekyll:latest
