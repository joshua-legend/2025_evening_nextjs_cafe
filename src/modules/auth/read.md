# 정리

## 클라이언트

Access Token: Authorization: Bearer <token> 헤더
Refresh Token: httpOnly 쿠키(refreshToken)

## 전략(Strategy)

jwt.strategy.ts → Header 에서 Access Token 추출·검증
jwt-refresh.strategy.ts → Cookie 에서 Refresh Token 추출·검증

## 가드(Guard)

@UseGuards(JwtAuthGuard) → Access 보호
@UseGuards(JwtRefreshGuard) → Refresh 엔드포인트 보호

## 결론

Strategies: “토큰을 어떻게 뽑아서, 어떻게 검증할지”
Guards: “그 전략을 언제(어떤 라우트에서) 실행할지”
