<br> 
# Environment Setup 
### <br>
##### this doc is including how to setup *cmder*, *git* and *git pr*.<br>
-----
<br><br>
### Prerequisites<br><br>
- Should be installed [Chocolatey](https://chocolatey.org/install) <br>

<br><br>
### Git Setup
<br>
##### Installation <br><br>
1. Open up a Powershell (or cmd) as an administrator.
2. Type `choco install git`.
3. Then press `Y`.
<br>
<br>

When it's done it will have installed Git to `C:\program Files\Git`.

<br><br>
### Cmder Setup
<br>
##### Installation <br><br>
1. Open up a Powershell (or cmd) as an administrator.
2. Type `choco install cmder`.
3. Then press `Y` to all questions it asks.
<br>
<br>

When it's done it will have installed Cmder to `C:\tools\cmder`.

<br><br>
### Git PR Setup
<br>
##### Installation <br><br>
1. Open up a Powershell (or cmd) as an administrator.
2. Type `choco install rube`. 
    - git_pr will be installed via **gem** that is Ruby package manager.
3. Then press `Y` to all questions it asks. the, it will have installed Cmder to `C:\tools\ruby25`.
4. Open up *Cmder*.
5. Type `gem install git_pr`.

<br>
##### Update for Windows
<br>
- *Important* - git_pr should be updated thorugh replacing *the file* might be in `C:\tools\ruby25\lib\ruby\gems\2.5.0\gems\git_pr-0.0.14\lib\git_pr\merge.rb` (your path my vary) to [this modified version](https://raw.githubusercontent.com/jasonreisman/git_pr/5b705ad9e557e81b90cfbd8e8849d0542512a28a/lib/git_pr/merge.rb). Because git_pr was written on a Mac, we'll need to make it work on Windows. 

<br>
<br>
