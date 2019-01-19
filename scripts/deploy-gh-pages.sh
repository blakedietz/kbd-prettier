#!/bin/sh

# abort the script if there is a non-zero error
set -e

git config --global user.name circleci

# build docs and put the in the docs dir
npm run docs

# clone existing gh-pages branch into gh-pages dir
git clone https://${GH_TOKEN}@github.com/blakedietz/kbd-prettier.git --branch=gh-pages ./gh-pages

# copy contents of docs dir into a versioned dir inside gh-pages dir
cp -r docs gh-pages/$1/

# jump into gh-pages
cd gh-pages

# stage any changes and new files
git add -A
git commit --allow-empty -m "docs for v$1"
# and push, but send any output to /dev/null to hide anything sensitive
git push --force --quiet origin gh-pages

# go back to where we started and remove the gh-pages git repo we made and used
cd ..

rm -rf gh-pages

echo "Finished deployment of gh-pages"