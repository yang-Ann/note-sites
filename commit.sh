#!/bin/base

now=$(date "+%Y-%m-%d %H:%M:%S")

git add .
git commit -m "${now} commit"
git push origin master
exit