#!/bin/base

git filter-branch --force --index-filter "git rm --cached --ignore-unmatch ./gitee-active/src/config/index.ts" --prune-empty --tag-name-filter cat -- --all
# git add .
# git commit -m "clear config"
# git push origin master --force --tags