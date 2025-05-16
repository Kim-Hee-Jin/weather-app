# Weather App

> **Next.js + GraphQL + OpenWeatherMap 기반의 도시별 날씨 정보 웹앱**

---

## 주요 기능
- 도시별 현재 날씨 및 5일 예보 확인
- 풍속, 습도, 체감온도 등 상세 정보 표시
- 반응형 UI (PC/태블릿/모바일 지원)
- 깔끔하고 직관적인 디자인

---

## 설치 및 실행 방법 (누구나 따라할 수 있음)

1. **프로젝트 다운로드**
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```
2. **필수 패키지 설치**
   ```bash
   npm install
   ```
3. **환경변수 파일(.env.local) 만들기**
   - 프로젝트 루트(최상위)에 `.env.local` 파일을 새로 만듭니다.
   - 아래처럼 작성하세요:
     ```env
     WEATHER_API_KEY=여기에_본인_API키_입력
     ```
   - `WEATHER_API_KEY`만 있으면 됩니다! (다른 변수는 필요 없음)
4. **OpenWeatherMap API 키 발급**
   - [OpenWeatherMap 회원가입](https://home.openweathermap.org/users/sign_up)
   - 로그인 후 [API Keys](https://home.openweathermap.org/api_keys)에서 키 복사
   - 무료 플랜으로도 충분히 테스트 가능
5. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   - 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 폴더 구조 (주요 파일 설명)

```
weather-app/
├── public/            # 정적 리소스 (favicon 등)
├── src/
│   ├── components/    # 리액트 컴포넌트들
│   ├── graphql/       # GraphQL 스키마, 쿼리, 리졸버
│   ├── lib/           # Apollo 클라이언트 설정
│   ├── pages/         # Next.js 라우팅/페이지
│   └── styles/        # CSS 모듈
├── .env.local         # (직접 생성, 절대 업로드 금지)
├── package.json
└── ...
```
