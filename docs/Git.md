<br> 
# Git
### <br>
-----
<br><br>

### How to reduce commit lines <br><br>
before <br>
<img src="./../res/md/multicommits.png"> <br>
after  <br>
<img src="./../res/md/singlecommits.png"> <br>

```
git merge-base targetBranch currentBranch
```
this command will return some value like : `60e7283cbd3459c2eeb0436683acc76.........`
```
git reset `60e7283cbd3459c2eeb0436683acc76.........`

git add -A

git commit -m "commit message"

git push -f
```


