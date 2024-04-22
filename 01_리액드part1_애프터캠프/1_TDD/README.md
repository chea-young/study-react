## TDD (Test driven development)

- Test code를 작성하고, 개발을 시작하는 방법론![1713752432213](image/README/1713752432213.png)
  - RED: Test code는 작성하였지만, 구현되지 않은 상태이기 때문에 에러가 나는 상태를 의미
  - GREEN: 구현을 한 상태
  - REFACTOR: Green 상태에서 코드의 개선을 할 필요가 있다면 Refactor 과정을 거치는 것. 해당 상태에서 수정하였을 때, RED 상태로 갈 수도 있고 GREEN 상태로 갈 수도 있도 있음. 그래서 Refactoring을 한 다음에는 무조건 Test code를 돌려보아야 함.
- 방법
  - Fake it

    - 단순히 테스트 코드만 통과하도록 개발하는 방법
  - Obvious implementation

    - 실제 구현을 할 때, 구현하는 방법

### Red-Green-Refactor

- TDD를 적용할 수 없는 상황에서
