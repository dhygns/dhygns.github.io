---
layout: default
title:  Bad Github Action Option
parent: Jekyll-GitPage
grand_parent: Dev-Log
nav_order: 1
---

## **ISSUE**
Jekyll을 사용해서 Github page에 새로운 웹사이트를 제작하고 Deploy를 시도하였습니다. 
Just-the-docs라는 theme을 사용하였고, Gemfile을 통해 셋업되었습니다.

로컬 호스트에서 Jekyll 및 웹사이트 동작 확인 후, 그대로 Github-Page으로 Pull하였습니다. 하지만, 정상적으로 Deploy되지 않고 Default Github-Page 화면을 보여주었습니다. 이에 확인해본 결과 Action을 실행시키는 동안 재대로 빌드가 되지 않고 Error를 발생시키고 있었습니다.

## **KEYWORDS**
`Gem` `Github Actions` `Jekyll` <br>
`Git-page` `Deploy` `just-the-docs`

## **ERROR MESSAGE**
```
Logging at level: debug Configuration file: /github/workspace/./_config.yml Theme: just-the-docs github-pages 228 | Error: The just-the-docs theme could not be found. 
```
오류는 GitHub Pages 빌드 과정에서 just-the-docs 테마를 찾을 수 없다는 것을 의미합니다. 이 문제는 주로 다음과 같은 몇 가지 이유로 발생할 수 있습니다.


## **RESOLVE**

Gem을 활용하여서 Jekyll의 테마를 사용하는 경우 해당 이슈가 발생할 수 있습니다. 그런 경우에는 아래의 설정 변경을 통해 
빌드 파이프라인을 수정해줘야합니다.
1. See `Settings > Pages > Build and deployment > Source`
2. Change the source value to `GitHub Actions`
