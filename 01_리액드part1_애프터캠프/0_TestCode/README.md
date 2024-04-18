## 폴더 구조

```
- src_01: 무엇을 테스트해야 하나요? (실습)
- src: 테스트 코드도 깔끔하게 정리
```

## 테스트 코드가 필요한 이유

- 수정 사항 시, 오류 사항에 대해서 빠르게 알 수 있다.
- 복잡한 코드를 문서화할 수 있다. (테스트를 통해서 어떤 동작을 예측한다라는 것을 명세화하기 때문에)
- 새로고침을 하지 않고, 코드를 테스트할 수 있다.

## Test code 작성법

- render() 이후, action과 어떤 결과를 원하는지에 대한 작성 필요
- property 등 수정이 되었을 때, test 코드를 최소화하기 위해서는 테스트 코드의 중복을 최소화하여야 함. 중복으로 사용하는 코드는 공통으로 사용할 수 있도록 작성 필요

### 설명

- `screen.getByText('{name}')` : 화면에 `{name}` 이 존재하는지 확인하는 함수. 만약에 화면에 존재하지 않으면 에러를 발생시킴
- `/next/i`: next를 대소문자 상관없이 존재하는지 확인하게 됨.
- `getAllByTestId('{id}')`: id에 해당하는 모든 element를 가져오게 됨.
- `expect(A).toHaveTextContent(B)`: A에 B가 존재하는지 확인하는 함수
- `test.skip()`: skip이 붙은 test는 test 확인 당시 넘어가게 됨.

### 실행법

```
npm run test
```

참고: https://www.inflearn.com/course/%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%95%8C%EB%A0%A4%EC%A3%BC%EC%A7%80%EC%95%8A%EB%8A%94%EA%B2%83%EB%93%A4-%EB%A6%AC%EC%95%A1%ED%8A%B8-part1
