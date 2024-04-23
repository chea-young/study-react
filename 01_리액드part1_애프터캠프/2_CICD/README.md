## CI(Continuous integration)

- CI 제공하는 서비스
  - circle CI
  - github action
    - yaml이라는 확장자를 가진 파일을 생성하면 `.github/workflows`에 존재하는 yaml 파일을 자동을 인식하여 수행
    - npm ci와 npm install이 비슷하기는 하지만, npm ci는 package.json에 명시된 패키지를 install을 하기 전에 package-lock.json를 비교하는 과정이 추가됨.
  - Travis CI
- 개발된 코드를 핵심 브랜치에 merge하기 이전에 CI단계를 추가하여 테스트, 보안검사를 수행하는 것
