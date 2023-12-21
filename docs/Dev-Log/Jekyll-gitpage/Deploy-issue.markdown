---
layout: default
title:  Deploy-issue
parent: Jekyll-GitPage
grand_parent: Dev-Log
nav_order: 1
---

## **ISSUE**
로컬 호스트에서 잘 동작중인 Jekyll 프로젝트를 Github page에 업로드하여 depoly를 하려고 헀으나 잘 되지 않았습니다.

## **KEYWORDS**
`Gem` `Github Actions` `x86-64-linux` `Jekyll` <br>
`Git-page` `Deploy` `just-the-docs` `No index.html`

## **ERROR MESSAGE**

#### **Issue A**
```
Logging at level: debug Configuration file: /github/workspace/./_config.yml Theme: just-the-docs github-pages 228 | Error: The just-the-docs theme could not be found. 
```
오류는 GitHub Pages 빌드 과정에서 just-the-docs 테마를 찾을 수 없다는 것을 의미합니다. 이 문제는 주로 다음과 같은 몇 가지 이유로 발생할 수 있습니다.

#### **Issue B**
```
`bundle lock --add-platform x86_64-linux` and try again. 
The process '/opt/hostedtoolcache/Ruby/3.1.4/x64/bin/bundle' failed with exit code 16
```
이 오류 메시지는 GitHub Actions의 Ruby 환경에서 bundle 명령어 실행 중 특정 플랫폼 관련 문제가 발생했음을 나타냅니다.

## **RESOLVE**

#### **Issue A**
Gem을 활용하여서 Jekyll의 테마를 사용하는 경우 해당 이슈가 발생할 수 있습니다. 그런 경우에는 아래의 설정 변경을 통해 
빌드 파이프라인을 수정해줘야합니다.
1. See `Settings > Pages > Build and deployment > Source`
2. Change the source value to `GitHub Actions`


#### **Issue B**
1. **플랫폼 추가**: 로컬 환경에서 아래 명령어를 실행하여 Gemfile.lock에 x86_64-linux 플랫폼을 추가합니다.
    {% highlight shell %}
bundle lock --add-platform x86_64-linux
{% endhighlight %}

{:style="counter-reset:step-counter 1"}
2. **변경 사항 커밋**: 변경된 Gemfile.lock 파일을 Git에 커밋하고, GitHub repository에 푸시합니다.
    {% highlight shell %}
git add Gemfile.lock
git commit -m "Add x86_64-linux platform to Gemfile.lock"
git push
{% endhighlight %}

{:style="counter-reset:step-counter 2"}
3. **GitHub Actions 재실행**: 변경 사항을 푸시한 후, GitHub Actions 워크플로우를 다시 실행하여 문제가 해결되었는지 확인합니다.