FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api apps/api
ENV CI=true
RUN pnpm install --frozen-lockfile  
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN cd apps/api && pnpm exec prisma generate
RUN cd apps/api && pnpm exec nest build
RUN pnpm --filter training-api... deploy --prod --legacy /prod/api

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy deployed prod package (includes package.json, prod node_modules)
COPY --from=builder /prod/api /app
# Copy build output and prisma schema
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma

# Regenerate Prisma Client for deployment environment
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npx --yes prisma@6.19.2 generate --schema=./prisma/schema.prisma

USER nestjs

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "dist/src/main.js"]
