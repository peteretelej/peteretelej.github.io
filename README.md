# Etelej on Github

A simple [github.io blog](https://peteretelej.github.io) talking code and projects I'm currently working on.

## Forking this blog (simple guide to working with your copy)

Requirements

* git. [Install here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* docker. [Install here](https://docs.docker.com/engine/installation/)

1. Fork the repo.
2. Then __assuming__ your new repo is at https://github.com/peteretelej/peteretelej.github.io, follow the steps below to start working with your repo

```
# cd into a folder to work in

git clone git@github.com:peteretelej/peteretelej.github.io.git
# clone your repo (replace name git@github.com:yourgithubname/your.repo.name.io.git)

cd peteretelej.github.io # cd into the created directory directory

```

3. Launch a local dev server for your githubpage site. Run the `devserver.sh` script
```
./devserver.sh
```
What the script does:
```
docker run --rm -it -p 4000:4000 -v "$PWD":/app -w /app etelej/jekyll:latest
# Starts HTTP server serving your copy of blog on :4000
```

Access your githubpages site locally at localhost:4000. Changes you make will reflect automatically, on refresh.


~ [@peteretelej](http://twitter.com/peteretelej), **[etelej.com](http://etelej.com)**
