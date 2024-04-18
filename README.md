# study_React

코드잇의 React 부분을 공부하면서 정리하는 Repository

## 폴더 구조

```
./ : 기본 React 공부 정리 내용
./01_리액트part1_애프터 캠프: https://www.inflearn.com/course/부트캠프-알려주지않는것들-리액트-part1/dashboard 강의 내용

```


## 목차

- React 시작하기
- React란?
- 코드펜
- JSX

### Start

0. 다운

- npm 다운
- yarn 다운
  - https://classic.yarnpkg.com/en/docs/install#windows-stable

1. 설정

```
npx create-react-app <프로젝트명>
cd <프로젝트명>
```

2. 서버 띄우기

```
yarn start
```

### React란?

- UI를 효과적으로 구축하기 위해 사용하는 자바스크립트 기반의 라이브러리이다.
- 리액트 이벤트는 카멜 케이스(Camel Case) 네이밍 규칙을 사용한다.
- MIT 라이센스를 이용한다는 점에서 자유롭게 사용이 가능하다.
- 단순히 웹 환경에서 돌릴 수 있다는 점에서 굳이 로컬 컴퓨터에 개발 환겨을 구축하지 않아도 온라인 상에서 소스코드를 테스트 하는 것이 가능하다.
  - [https://codepen.io/pen/]
- Props란!?
  - Props는 속성(Property)의 약자
  - Props를 이용해서 리액트는 계층적으로 구성되기 때문에 사용자가 보는 화면는 웹 페이지 화면을 효과적으로 볼 수 있다.
  - 고정적인 데이터를 전달 할 때 사용한다.
  - 함수형 컨포넌트를 사용한다.
  - 부모에서 자식으로 데이터를 전달할 때 사용한다.
- State란?
  - 고정적인 데이터가 아닌 변경될 수 있는 데이터를 처리할 때 효율적을 사용가능하다.
  - 이 값을 변경해서 화면이 변경되면 render() 함수가 다시 실행되어 실제 화면에 적용해 준다.
  - 클래스형 컨포넌트를 사용한다.
- 특징은?
  - 선언적이다: 대화형 UI를 작성하기가 유리하다. 데이터가 변경되었을 때 효율적으로 렌더링을 수행할 수 있도록 함.
  - 컴포넌트 기반이다.: 캡슐화된 컨포넌트가 상태를 관리하고 UI를 효과적으로 구성할 수 있음.
- 장단점은?
  - 클라이언트 렌더링(웹 사이트에서 그때 그때 데이터를 받아오는 방식) 뿐만 아니라 서버 사이드 렌더링(필요한 데이터를 미리 받아 놓은 방식)도 지원함. 그래서 Ajax 등과 같은 비동기 방식과 비교했을 때 검색 엔진 최적화 등에 있어서 유리한 형태로 스스코드 작성하는 것이 가능.
    - 왜냐하면 자바스크립트를 검색엔진이 지원하지 않는 경우도 있기 때문에 서버 사이드 렌더링의 형태도 대비를 해놓아하는데 리액트는 서버 사이드 렌더링 또한 지원.

### 코드펜 [https://codepen.io/trending]

- 프로트 엔드 개발에 있어서 유용한 사이트
- 로컬 컴퓨터에 개발 환경을 구축하지 않아도 빠르고 효과적으로 웹 사이트 상에서 소스코드를 작성하여 테스트 가능.
- React를 작성해보기 위해 다음과 같이 설정이 필요

  `<img src = "./image/react2-1.PNG" width = "500" height = "250" alt = "React">`

  - JavaScript Preprocessor: Babel
  - Add External Scripts/Pens: react, react-Dom

### JSX!?

- 자바스크립트 문법의 확장판
- 리액트에서의 Element를 제공
- Component는 항상 렌더링을 수행하기 때문에 render() 함수로 이를 구현
  - 클래스로도 볼 수 이지만 자바스크립트 함수와 흡사
  - Props를 입력으로 받아 리액트 요소를 반환하는 형태로 동작
- 자바스크립트와 HTML을 한 번에 합쳐 놓은 것과 같은 문법
- JS에서 render()안에 들어가는 `<h1>`와 같은 것 들이 JSX를 이용해서 작성한 것
- 사용할 때 `<main>`, `<div>` 등등이 감싸줘서 이용해야 에러가 않음.

### 마운팅(Mounting)

- 과정
  1) contructor() : 초기화
  2) componentWillMount() : mount 불러짐.
  3) render() : 화면이 구성
  4) componentDidMount() : API호출을 수행
- componentDidMount()에 render가 들어 있다.
- 마운팅 해제 될 때 수행되는 함수는 componentWillUnmount()이다.
  - componentWillUnmount() : Component의 동작을 위해 사용되었던 메소드들의 리소스를 제거
- API 호출을 연습하고자 할 때는 Fake API호출 사이트를 이용하면 된다. [https://jsonplaceholder.typicode.com/]

### 데이터 변경

- 화면에 특정한 객체를 랜더링하기 위해서 props 혹은 state를 사용해야 한다.
  -과정
  1) shouldComponentUpdate() : 수행할 지 여부에 대한 처리
  2) componentWillUpdate()
  3) render() : 화면이 구성
  4) componentDidUpdate() : component가 완전히 구성되었다는 확인하는 의미로 불림.
- shouldComponentUpdate()는 보통 true 반환
- componentDidUpdate()는 state를 통해 화면의 구성을 변경하고자 할 때 사용한다.

### Redux

- 상태 관리 라이브러리이다.
- State를 관리해주는 Tool이다.
- Redux 데이터 흐름

  - 한 방향으로만 흐른다.
    `<img src = "./image/react3.png"  alt = "React data flow">`
- Action: 무엇이 일어났늕 설명하는 객체이다.

  - Example

  `<img src = "./image/react4.PNG"  alt = "React data flow">`

  - article 42을 좋아요를 했다.
  - id와 name이 다음과 같은 user를 성공적으로 가져왔다.
  - text가 다음과 같은 것을 todo list에 추가했다.
- Reducer: Action을 함으로써 상위였던 State가 action을 함으로서 nextState로 변했다는 것을 설명해주는 곳이다.

  - 이전 State과 action 객체를 받은 후에 next state를 return 하는 것이다.
- Store: redux store 안에 모든 state를 관리하게 된다.
  -action으로부터 promise나 function 혹은 객체 형식으로 오는데 store는 객체만 관리할 수 있기 때문에 이것을 받아드릴 수 있게 도와주는 모듈들이 필요하다.
  `<img src = "./image/react5.PNG"  alt = "React data flow">`
- Setting up redux

  - Download modules

  ```
  npm install redux react-redux redux-promise redux-thunk --save
  ```
- class component

  - 많은 기능을 사용할 수 있다.
  - 코드가 길어지고 복잡해 진다.
  - 성능이 느려진다.
- functional component

  - 기능이 제한적이다.
  - 코드가 짧고 간결하다.
  - 성능이 빠르다.
  - class component에서 사용할 수 있지만 functional에서 가능한 기능을 react=hook에서 가능하게 한다.

#### 주의사항

- 원하는 대로 뜨지 않을 때 console 창 확인해야 한다.
- fetch(): 클라이언트 상에서 어떠한 서버에 접속하고자 할 때 사용한다.
- then: 응답을 처리하고자 할 때 사용한다.

#### 참고사이트

- goorm.edu의 'React와 Node.js를 활용한 고객 관리 시스템 개발' 강의
