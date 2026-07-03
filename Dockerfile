# ====== BUILD STAGE ======
FROM node:24-slim AS builder

# Enable corepack and activate pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Skip husky install hook (no .git in Docker)
ENV HUSKY=0

# Install system dependencies for build
RUN apt update && apt install -y openssl

# Copy package, lock file & prisma folder
COPY package.json pnpm-lock.yaml .npmrc pnpm-workspace.yaml ./
COPY prisma.config.ts ./
COPY prisma ./prisma

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of the project files
COPY . .

# Regenerate Prisma client so dist/ compiles against the current version
# (COPY . . may overwrite prisma/generated with a stale local copy)
RUN npx prisma generate

# Build the app (NestJS -> dist/)
RUN pnpm build

# ====== PRODUCTION STAGE ======
FROM node:24-slim AS production

# Enable corepack and activate pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Skip husky install hook (no .git in Docker)
ENV HUSKY=0

# Install system dependencies needed at runtime
RUN apt update && apt install -y openssl curl

# Copy necessary files from builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.npmrc ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/prisma ./prisma

# Install dependencies
RUN pnpm install --frozen-lockfile

# Expose the port
EXPOSE 5000

# Run the app
CMD ["pnpm", "start"]
