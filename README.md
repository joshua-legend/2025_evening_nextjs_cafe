├── modules
│ ├── auth
│ │ ├── controllers
│ │ │ └── auth.controller.ts
│ │ ├── dto
│ │ │ ├── login.dto.ts
│ │ │ └── signup.dto.ts
│ │ ├── entities
│ │ │ └── refresh-token.entity.ts
│ │ ├── strategies
│ │ │ ├── jwt.strategy.ts
│ │ │ └── jwt-refresh.strategy.ts
│ │ ├── services
│ │ │ ├── auth.service.ts
│ │ │ └── token.service.ts
│ │ └── auth.module.ts
│ │
│ └── users
│ ├── dto
│ │ └── create-user.dto.ts
│ ├── entities
│ │ └── user.entity.ts
│ ├── services
│ │ └── users.service.ts
│ └── users.module.ts

# 인증·인가 핵심

npm install @nestjs/passport passport passport-jwt @nestjs/jwt

# 비밀번호 해싱

npm install bcrypt
npm install -D @types/bcrypt

# DTO 검증

npm install class-validator class-transformer

# .env 관리

npm install @nestjs/config

# 쿠키 처리

npm install cookie-parser
npm install -D @types/cookie-parser
