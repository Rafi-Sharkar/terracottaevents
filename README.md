# Shak Bespoke — Backend Server

A production-ready NestJS backend with Prisma ORM, PostgreSQL, Redis, AWS S3, Firebase, and full Docker deployment. Built with security-first principles including pre-commit malware scanning, file integrity checks, and comprehensive authentication.

---

## Core Stack

| Layer | Technology |
|---|---|
| Framework | NestJS (Express) |
| Database | PostgreSQL + Prisma ORM (split schema) |
| Cache / Queue | Redis + BullMQ |
| File Storage | VPS local + AWS S3 |
| Auth | JWT (access + refresh tokens), Firebase, Google OAuth |
| Real-time | Socket.IO WebSocket Gateway |
| Reverse Proxy | Caddy (auto-HTTPS) |
| Language | TypeScript |

---

## Getting Started

### 1. Environment setup

```bash
cp .env.example .env
# Fill in all values in .env before running
```

### 2. Install dependencies

```bash
pnpm install
```

This also runs `husky` to activate the pre-commit security hooks.

### 3. Local development (hybrid — DB in Docker, app local)

```bash
make local-up   # start PostgreSQL + Redis in Docker
pnpm dev        # start NestJS with hot reload
```

Or combined:

```bash
make local
```

### 4. Full Docker development

```bash
make dev-up     # start entire stack with hot reload
make dev-logs   # follow logs
make dev-stop   # stop
```

### 5. Production

```bash
make build      # build Docker image
make start      # start detached
make logs       # follow logs
make stop       # stop
```

---

## Available Scripts

```bash
pnpm dev              # start with hot reload
pnpm build            # compile TypeScript
pnpm start            # migrate + run compiled app
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier check
pnpm format:fix       # Prettier auto-fix
pnpm ci:fix           # format:fix + lint:fix
pnpm commit           # interactive Commitizen prompt
pnpm scan             # malware pattern scan
pnpm integrity:update # re-hash critical config files after intentional changes
pnpm integrity:check  # verify no config files were tampered
pnpm security         # scan + integrity:check + pnpm audit
```

### Database

```bash
pnpm db:migrate       # create + apply migration (dev)
pnpm db:deploy        # apply migrations (production)
pnpm db:push          # push schema without migration
pnpm db:studio        # open Prisma Studio
pnpm db:generate      # regenerate Prisma client
pnpm db:reset         # reset database (dev only)
```

---

## Features

### Authentication & Authorization
- JWT access + refresh tokens with rotation
- HTTPOnly cookie session
- Email OTP verification
- Phone OTP via Twilio
- Google OAuth + Firebase ID token login
- Role-based access control: `SUPER_ADMIN`, `ADMIN`, `USER`
- Bcrypt password hashing (10 rounds)
- Forgot / reset password flow

### File Management
- **VPS uploads** — Multer to local disk, served as static files via `ServeStaticModule`
- **AWS S3 uploads** — multi-file upload, presigned URLs, paginated file listing
- MIME type whitelist (no SVG — prevents stored XSS)
- Path traversal protection on delete
- Both upload controllers require authentication

### Real-time
- Socket.IO WebSocket Gateway
- Private messaging and conversation management
- WebRTC support with coturn TURN server

### Background Jobs
- BullMQ job queues with Redis
- Event-driven architecture (EventEmitter)
- Scheduled tasks (`@nestjs/schedule`)

### Payments
- Stripe payment controller (JWT-protected)

---

## Security

### Pre-commit Hooks (automatic on every `git commit`)

| Check | What it does |
|---|---|
| Malware scan | Detects obfuscated code, `eval`, `new Function`, `require`-hijacking, dense hex escapes, oversized lines in source files |
| Integrity check | SHA-256 hashes `prettier.config.mjs`, `tsconfig.json`, `package.json`, `pnpm-lock.yaml`, `.gitignore`, and other critical config files — blocks commit if any hash mismatches |

**Normal workflow after intentionally editing a config file:**
```bash
pnpm integrity:update
git add .integrity.lock
git commit ...
```

### Hardened application code

| Area | Fix applied |
|---|---|
| Path traversal | `deleteFile()` resolves and validates path stays within `uploadsPath` before `fs.unlink` |
| Auth guards | All upload, S3, Stripe, and feedback mutation endpoints require a valid JWT |
| Stack trace leak | Unhandled exception filter omits `stack` in `NODE_ENV=production` responses |
| Password logging | Logger middleware redacts `password`, `token`, `otp`, `secret`, `pin` before writing to log files |
| SVG XSS | `image/svg+xml` removed from allowed MIME types (SVGs served as static files execute JS in browser) |
| HTTPOnly cookie | Login sets cookie from correct token path (`result?.data?.token?.accessToken`) |

### Dependency security

Transitive vulnerable dependencies are pinned via `pnpm.overrides` in `package.json`:

| Package | Was | Now | CVE |
|---|---|---|---|
| `fast-xml-parser` | 5.2.5 | 5.8.0 | Entity encoding bypass (critical) |
| `protobufjs` | 7.5.4 | 7.6.3 | Arbitrary code execution (critical) |
| `handlebars` | 4.7.8 | 4.7.9 | JS injection via AST (critical) |
| `hono` | 4.11.4 | 4.12.25 | Path traversal (high) |
| `serialize-javascript` | 6.0.2 | 7.x | RCE (high) |
| `nodemailer` | 7.x | 8.0.10 | SMTP command injection (moderate) |

Run `pnpm security` at any time to re-verify the full security posture.

---

## Code Quality

### Pre-commit (Husky)

Every commit automatically runs:
1. Malware scanner (`scripts/scan-malware.mjs`)
2. Config file integrity check (`scripts/integrity-check.mjs`)

### Linting & Formatting

- **ESLint v9** flat config (`eslint.config.mjs`) with `typescript-eslint` + `prettier` integration
- **Prettier** enforced via ESLint rule and `pnpm format`
- **Commitlint** enforces Conventional Commits format
- **Commitizen** (`pnpm commit`) provides an interactive commit prompt

### Commit format

```
type(scope): subject

Types: feat | fix | docs | style | refactor | perf | test | chore
```

---

## CI/CD

GitHub Actions (`.github/workflows/ci-cd.yml`):

| Job | Trigger | Steps |
|---|---|---|
| **CI** | Every push and PR targeting `main` | Format check → Lint → Prisma validate → Build → Malware scan |
| **Docker** | Push to `main` only (after CI passes) | Build multi-stage image → Push to Docker Hub with `latest` + short-SHA tags |

### Required GitHub secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Value |
|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (not your password — create one at hub.docker.com → Account Settings → Security) |

---

## Docker Architecture

### Production (`compose.yaml`)

| Service | Role |
|---|---|
| `server` | NestJS API (multi-stage build) |
| `db` | PostgreSQL 17 |
| `redis-master` | Redis primary |
| `redis-replica` | Redis HA replica |
| `caddy` | Reverse proxy + auto-HTTPS |
| `coturn` | TURN server for WebRTC |

### Development (`compose.dev.yaml`)

`app` (hot reload) + `db` + `redis-master`

---

## API Documentation

Swagger UI: `http://localhost:3000/docs`
