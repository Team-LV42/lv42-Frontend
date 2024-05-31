## Commit Rules
 커밋 메세지 구조
```
타입(스코프): 주제(제목)
=====================================================
|타입 이름  |내용                                       
-----------------------------------------------------
|feat     |새로운 기능에 대한 커밋                         
|fix      |버그 수정에 대한 커밋
|build    |빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋
|chore    |그 외 자잘한 수정에 대한 커밋
|docs     |문서 수정에 대한 커밋
|style    |코드 스타일 혹은 포맷 등에 관한 커밋
|refactor |코드 리팩토링에 대한 커밋
|test     |테스트 코드 수정에 대한 커밋
|perf     |성능 개선에 대한 커밋
=====================================================
``` 

## Git Branch Rules
+ ### master branch, develop branch
master와 develop 브랜치는 본래 이름 그대로 사용.

+ ### feature branch
master, develop, release-..., hotfix-... 제외 전부 가능. <br/>
```
feature/기능요약
ex) feature/login
```
+ ### release branch
```
release-...
ex) release-1.0
```
+ ### hotfix branch
```
hotfix-...
ex) hotfix-1.2.1
```
