---
layout: postlayout
title: Git Commands - Quick and Dirty
labels: [git,git commands,github,bash]
thumbnail: https://peteretelej.github.io/images/logos/git-logo.png
---
<p>Git is a popular open source Version Control System that allows decentralized management of project repositories.</p>
<p>Here's a <i>quick and dirty</i> guide to common git commands:</p>
<p style='padding:5px; margin:0;'><b>Jump to Section:</b></p>
<div class='jumplist'>
<a href='#git-config' class='inlink'>Configure Git</a> <a href='#git-init' class='inlink'>Initiliaze Git</a> <a href='#git-reset' class='inlink'>Git Reset</a> <a href='#git-branch' class='inlink'>Manage Branches</a> <a href='#git-merge' class='inlink'>Git Merge</a> <a href='#git-rebase' class='inlink'>Rewriting Git History</a> <a href='#git-remote' class='inlink'>Git Remotes</a> <a href='#git-stash' class='inlink'>Git Stash</a> <a href='#git-useful-commands' class='inlink'>Useful Git Commands</a> <a href='#git-files' class='inlink'>Git Special Files</a> <a href='#git-guides' class='inlink'>Git Guides and Tutorials</a>
</div>
<p>This is <b style='text-transform:uppercase'>not a tutorial</b> on how to use git. It's meant as a quick way to look up git commands. Please do not use these commands if you're just learning to use git; kindly <a href='#git-guides'>follow these links</a> at the bottom of this post to get Git guides and tutorials.</p>

<h2>Git Quick Commands Listing</h2>
<section id='git-config'>
<h3>Git Configuration:</h3>
{% highlight sh lineos %}
git config --global user.name "Your Name"
git config --global user.email you@youremaildomain.com
# Add email to github/bitbucket if you plan to use them

# Listing all configs set
git config --list
{% endhighlight %}
<p>Adding colors</p>
{% highlight sh lineos %}
git config --global color.diff auto
git config --global color.status auto
git config --global color.branch auto
{% endhighlight %}

<p>Other useful configurations</p>
{% highlight sh lineos %}
# only push the current branch (instead of pushing all matching)
git config --global push.default simple
# Automatically rebase pulls
git config --global branch.autosetuprebase always
{% endhighlight %}
</section>
<section id='git-init'>
<h3>Initialize git:</h3>
{% highlight sh lineos %}
git init

# Git Clone
git clone git://github.com/USERNAME/REPOSITORYNAME.git

# Add all files (new, modified,deletions) to index (stage)
git add -A # perfoms git add .; git add -u
# Add files to staging area
git add filename.txt

# List tracked files
git ls-files;

# List all untracked files
git ls-files --others  # add --directory for directories

# Unstage a file but preserve it's contents
git reset filename

# Remove files from index, stage it's deletion from HEAD
git rm filename

# Quick Commit - add all modified files and commit
git commit -am "The commit message here"

# Status of files in index vs Working directory
git status
{% endhighlight %}
<p>To ignore files in repository directory: Add to file or directory to <code>.gitignore</code> file (each file/directory on a new line)</p>
</section>
<section id='git-reset'>
<h3>Resetting and Reverting Repo</h3>
<p><b>Revert</b> to previous commit (<i>graceful</i> - does not delete history)</p>
{% highlight sh lineos %}
git revert HEAD
# git revert [SHA-1]
{% endhighlight %}
<p><b>Reset</b> to previous state: <b>Do not use</b> if already commited to shared remote</p>
{% highlight sh lineos %}
git reset --hard HEAD
# git reset --hard [SHA-1] # Reset completely delete history and staged

git reset --soft HEAD
# git reset --soft [SHA-1] # does not touch staging area or working tree
{% endhighlight %}

<p><b>Re-clone</b> from a remote repository; will loose changes not in the remote. (e.g if local git corrupt)</p>
{% highlight sh lineos %}
rm -fr .git
git init
git remote add origin [your-git-remote-url]
git fetch
git reset --mixed origin/master
git branch --set-upstream-to=origin/master master  
{% endhighlight %}

</section>
<section id='git-branch'>
<h3>Git Branches</h3>
{% highlight sh lineos %}
# Create local branch
git branch branchname

# Move/switch to a branch
git checkout branchname

# Create and switch to branch
git checkout -b branchname

# Fetch file from another branch
git checkout branchtwo -- path/to/file

# Push to a new remote branch, e.g. if remote name is origin
git push -u origin branchname

# Delete Local Branch
git branch -d branchname

# Delete remote branch
git push origin :branchname

# Forcefully delete from both local and remote
git branch -D branchname

# Update local database of remote branches (prune deleted)
git fetch -p

# Checkout branches with latest commits #esp for cleaning old branches
git for-each-ref --sort=-committerdate --format='%(refname:short) %(committerdate:short)'
{% endhighlight %}
</section>
<section id='git-merge'>
<h3>Git merge</h3>
<p>Before merging, checkout to branch you want to merge to:</p>
{% highlight sh lineos %}
git checkout master

# Merge local branch
git merge branchname

# Always generate merge commit even on fast-forward
git merge --no-ff branchname

# List branches that have been merged to current branch (e.g master)
git branch --merged

git branch --no-merged  #list branches that haven't been merged to current

# Delete merged branches
git branch --merged | xargs git branch -d
{% endhighlight %}
<p>Merge remote branch</p>
{% highlight sh lineos %}
# Update the remote
git fetch origin
# Merge remote branch
git merge origin/br# Danchname

# SHORTCUT - Fetch and merge tracked branch
git pull
{% endhighlight %}
</section>
<section id='git-rebase'>
<h3>Rewriting Git History</h3>
<p><b>NOTE:</b> Do not rewrite public commits/history</p>

{% highlight sh lineos %}
# Updates staged changes to previous commit message.(i.e replaces the previous commit)
git commit --amend
{% endhighlight %}
<h4>Git Rebase</h4>
<p>Moving a branch to a new base commit (an ID, a branch name, a tag, or a relative reference to HEAD)</p>
{% highlight sh lineos %}
git rebase v0.2.2
# NOTE - all commits v0.2.2..HEAD will be rewritten
{% endhighlight %}
<h4>Interactive Rebasing</h4>
<p>Changing multiple commit messages. <code>git rebase -i 9fceb02</code> <i>(9fceb02 is an example ID)</i>
provides an interactive text editor for modifying all commits after the base specified (eg 9fceb02)</p>
{% highlight sh lineos %}
git rebase -i HEAD~3
# Modify all commits after base specified (HEAD~3)

# Replace 'pick' command with rebasing command e.g
pick 6fceb02 Added this thing
squash 9fabb3a Awesome Featured added
squash a3a44as I changed stuff
# All squashed commit will be combined into the single 'picked' commit
# Note: Another text editor for combined commit messages opens
{% endhighlight %}
<p>Other Interactive Rebase Commands:</p>
<ul>
<li><code>p, pick</code> - use commit</li>
<li><code>r, reword</code> - use commit, but edit the commit message</li>
<li><code>e, edit</code> - use commit, but stop for amending</li>
<li><code>s, squash</code> - use commit, but meld into previous commit</li>
<li><code>f, fixup</code> - like "squash", but discard this commit's log message</li>
<li><code>x, exec</code> - run command (the rest of the line) using shell</li>
</ul>
<p><b>Interactive Rebasing Tips</b></p>
    <p>To reorder commits, reorder the lines; they are executed from top to bottom.<br/>If you remove a line, THAT COMMIT WILL BE LOST<br/>However, if you remove everything, the rebase will be aborted.<br/>Empty commits are commented out</p>
</section>
<section id='git-remote'>
<h3>Working with Remotes</h3>
<p>Adding remote - Connecting local repo with a remote repo (for example a repo on github)</p>
{% highlight sh lineos %}
git remote add origin https://github.com/USERNAME/REPOSITORY.git
#git remote add [name] [repourl]

# Verify remotes - List existing remotes
git remote -v

# List all remote branches
git branch -r

# Remove remote
git remote remove origin

# Replace remote url
git remote set-url origin https://github.com/USERNAME/REPOSITORY2.git

# To check out commits on an upstream master
git log --oneline master..origin/master

# Merge remote branch eg upstream master into current branch
git merge origin/master

# Rebase (fetch remote branch and merge)
git pull --rebase remote

# Fetch all remotes
git fetch --all #git fetch [remotename] #to fetch single remote

#push to a new remote branch
git push -u origin branchname
{% endhighlight %}
</section>
<section id='git-stash'>
<h3>Stashing</h3>
<p><b>Stash</b> - Store modified tracked files and staged changes on a stach for reapplying later</p>
{% highlight sh lineos %}
#push stash onto stack
git stash

# Store stash with message
git stash save 'A custom message'

# List stored stashes
git stash list

# Reapply most recent stash
git stash apply
#for older stashes pick from list e.g git stash apply stash@{1}

# Remove stash from stack
git stash drop stash@{0}
#drops stash reference or if no parameter drops latest stash

# Clear all stashes
git stash clear

# Apply latest stash and remove from stack
git stash pop
{% endhighlight %}
</section>
<section id='git-useful-commands'>
<h3>Useful Commands</h3>
<p><b>History</b> - Checkout the history of your commits</p>
{% highlight sh lineos %}
git log --oneline --graph --decorate --all --color

# Filter logs
git log --author=author
git log --after="MMM DD YYYY"
git log --before="MMM DD YYYY"
git log --grep REGEXP  # Commits with matches to regular expression

#list history of file
git log --follow filename

# Show changes to file
git whatchanged file

# Show author of each line in file
git blame file

# Search through repo history
git rev-list --all | xargs git grep -F 'searchstring'
#git rev-list --all | xargs git grep 'REGEX' #to search for regular expression
{% endhighlight %}
<p><b>Diff</b> - Compare states</p>
{% highlight sh lineos %}
# Compare two commits
git diff master..upstream/branchname
#git diff HEAD~2..HEAD~1

# Compare staged changes to your last commit
git diff --cached

# Compare working directory to your last commit
git diff HEAD
{% endhighlight %}
<p><b>Tagging</b></p>
{% highlight sh lineos %}
#annotated tag
git tag -a v1.5 -m 'Message Here'

#lightweight tag
git tag v1.5.2
#to create lightweight tag; don’t supply the -a, -s, or -m option

#list tags
git tag

#show tag and related commit
git show v1.2

# Tag older commit
git tag -a v2 9fceb02 -m "Message here"
# git tag -a v1.2 [SHA-1] -m "[your message]"


# Rename tag
git tag newtag oldtag
git tag -d oldtag
git push origin :refs/tags/oldtag
git push --tags

# Adding a message to an existing tag
git tag tagname tagname -f -m "the message"
    # creates a tag of the same name with a message and overwrites old tag

# Push referenced tags along with branches
git push --follow-tags
{% endhighlight %}
<p><b>Cleaning</b></p>
{% highlight sh lineos %}
# Perform clean dry-run - show files to delete
git clean -n

# Remove all untracked files from working copy
git clean -f

# Remove all untracked and ignored files and directories from working copy
git clean -fxd

# Cleanup unnecessary files and optimize the local repository
git gc #calls git prune with prunes loose objects older than 2wks

git gc --prune=all #prunes all loose objects
{% endhighlight %}
</section>
<section id='git-files'>
<h4>Useful Git Files</h4>
<ul>
<li>.gitignore</li>
<li>.gitattributes</li>
<li>.mailmap</li>
<li>.gitmodules</li>
<li>*.keep </li>
</ul>
</section>
<section id='git-guides'>
<h4>Guides and Tutorials on Git</h4>
<ul>
    <li><a href='http://rogerdudler.github.io/git-guide/'>Git - the <b>simple guide</b> - no deep shit</a></li>
   	<li><a href='https://blog.udemy.com/git-tutorial-a-comprehensive-guide/'>Git Tutorial: A <b>Comprehensive Guide</b> by Udemy</a></li>
   	<li><a href='https://www.atlassian.com/git/tutorials/'><b>Git Tutorials</b> by Atlassian <i>( ~ bitbucket)</i></a></li>
    <li><a href='https://try.github.io/levels/1/challenges/1'>Github's Git Training: <b>Try Git</b></a></li>
    <li><a href='http://git-scm.com/doc'>Official <b>Git Documentation</b></a></li>
</ul>
<h4>Git Cheat Sheets (Printable)</h4>
<ul>
<li><a href='https://training.github.com/kit/downloads/github-git-cheat-sheet.pdf'><b>Github</b> Git Cheat Sheet <i>[PDF]</i></a></li>
<li><a href='https://www.git-tower.com/blog/git-cheat-sheet/'><b>Git Tower</b> Cheat Sheet</a></li>	
<li><a href='http://zeroturnaround.com/rebellabs/git-commands-and-best-practices-cheat-sheet/'><b>Rebellabs</b> Git Cheat Sheet</a></li>
</ul>
</secion>
<p>This post is meant to increase productivity while working with git, for <b>comments and suggestions</b>, leave a comment below.</p>
