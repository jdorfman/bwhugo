#!/usr/bin/env bash

source $(which shml) # https://shml.xyz

echo $(bgcolor green) "Deploying updates to GitHub..." $(bgcolor end)

# Build the project.
hugo

# Add changes to git.
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master
git subtree push --prefix=public git@github.com:jdorfman/bwhugo.git gh-pages

# Purge CDN
echo $(color green) "Purging CDN Cache" $(color end)
python /Users/jdorfman/bh_purge_script.py
echo $(color green) "Done" $(color end) $(emoji check)
