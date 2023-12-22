---
layout: default
title:  Required Platform Setup For Linux
parent: Jekyll-GitPage
grand_parent: Dev-Log
nav_order: 1
---

## **ISSUE**
Jekyll을 사용해서 Github page에 새로운 웹사이트를 제작하고 Deploy를 시도하였습니다. 
Just-the-docs라는 theme을 사용하였고, Gemfile을 통해 셋업되었습니다.

재대로된 Action셋업을 Github 설정을 통해 진행하였으나, 빌드 단계에서 특정 애러 메시지와 함께 동작하지 않았습니다.

## **KEYWORDS**
`Gem` `Github Actions` `x86-64-linux` `Jekyll` <br>
`Git-page` `Deploy`

## **ERROR MESSAGE**

```
`bundle lock --add-platform x86_64-linux` and try again. 
The process '/opt/hostedtoolcache/Ruby/3.1.4/x64/bin/bundle' failed with exit code 16
```
이 오류 메시지는 GitHub Actions의 Ruby 환경에서 bundle 명령어 실행 중 특정 플랫폼 관련 문제가 발생했음을 나타냅니다.

## **RESOLVE**

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