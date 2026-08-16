# Backend — Agent Rules

> Extends the root [AGENTS.md](../AGENTS.md). Read the root document first for project-wide rules.

---

## Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| **Kotlin** | Latest stable | Language (no Java in new code) |
| **Java** | 21 (Temurin) | JVM runtime |
| **Spring Boot** | 3.x | Application framework |
| **Gradle** | Kotlin DSL | Build system |
| **gRPC + Protobuf** | Latest stable | Inter-service communication |
| **PostgreSQL** | 17 (Alpine) | Primary data store |
| **Liquibase** | Community | Database migrations |
| **JPA / Spring Data** | Via Spring Boot | ORM & data access |

---

## Package Structure

All backend code follows the `in.rvce.events` group prefix:

```text
in.rvce.events.<service-name>/
├── grpc/                ← gRPC service implementations (extend generated stubs)
├── domain/
│   ├── model/           ← Domain entities and value objects
│   ├── repository/      ← Spring Data JPA repositories
│   └── service/         ← Domain service layer (business logic)
├── application/         ← Application services (orchestration, use cases)
├── config/              ← Spring configuration classes
├── exception/           ← Domain-specific exceptions
└── event/               ← Domain event definitions and handlers
```

### Package Naming Examples
- `in.rvce.events.identity` → Identity Service
- `in.rvce.events.event` → Event Service
- `in.rvce.events.registration` → Registration Service
- `in.rvce.events.attendance` → Attendance Service
- `in.rvce.events.notification` → Notification Service

---

## Directory Structure

```text
backend/
├── services/                         ← Individual Spring Boot microservices
│   ├── identity-service/
│   │   ├── build.gradle.kts          ← Service-specific dependencies
│   │   ├── src/main/kotlin/          ← Source code (in.rvce.events.identity.*)
│   │   ├── src/main/resources/       ← application.yml, application-production.yml
│   │   └── Dockerfile                ← Service container build
│   ├── event-service/
│   ├── registration-service/
│   ├── attendance-service/
│   └── notification-service/
│
├── libraries/                        ← Shared JVM libraries
│   ├── auth-context/                 ← Auth/session context propagation across services
│   ├── messaging/                    ← Pub/Sub abstractions, transactional outbox pattern
│   └── persistence/                  ← JPA/Spring Data common configs, Liquibase utils
│
├── database/
│   └── liquibase/                    ← Service-owned database migration changesets
│       ├── identity/                 ← Identity service schema migrations
│       ├── event/                    ← Event service schema migrations
│       ├── registration/             ← Registration service schema migrations
│       ├── attendance/               ← Attendance service schema migrations
│       └── notification/             ← Notification service schema migrations
│
└── README.md
```

---

## Architecture Rules

### Service Boundaries
1. **Each service owns its data.** No service may directly query another service's database tables. All cross-service data access is via gRPC calls or domain events.
2. **Each service owns its schema.** Liquibase changesets for service X go in `backend/database/liquibase/<service-name>/`.
3. **Shared code goes in `libraries/`.** If two or more services need the same utility, extract it to a shared library under `backend/libraries/`.
4. **Services are independently deployable.** Each service has its own `Dockerfile` and can be built, tested, and deployed independently.

### gRPC & Protobuf
1. **All `.proto` files live in `api/proto/`.** Never place proto definitions inside `backend/`.
2. **Service implementations extend generated stubs** from the proto contracts. Place these in `<service>/grpc/`.
3. **Use gRPC status codes consistently:**
   - `NOT_FOUND` for missing resources
   - `ALREADY_EXISTS` for duplicate creation attempts
   - `PERMISSION_DENIED` for authorization failures
   - `INVALID_ARGUMENT` for validation errors
   - `RESOURCE_EXHAUSTED` for capacity limits
   - `INTERNAL` for unexpected server errors
4. **Map domain exceptions to gRPC statuses** via interceptors, not in each RPC method.

### Database & Migrations
1. **All schema changes via Liquibase changesets.** Never apply manual DDL in production.
2. **Changeset ID convention**: `<service>-<sequence>-<description>` (e.g., `identity-001-create-users-table`).
3. **Use JPA/Spring Data** for standard CRUD operations.
4. **Use native SQL** for performance-sensitive queries (batch operations, complex joins, reporting).
5. **Database credentials** are injected via environment variables (`SPRING_DATASOURCE_*`), never hardcoded.

### Messaging & Domain Events
1. **Use the transactional outbox pattern** for publishing domain events. Write events to an outbox table in the same transaction as the business operation.
2. **Domain event naming**: Past tense, descriptive — `EventPublished`, `RegistrationCreated`, `AttendanceRecorded`, `AccountActivated`.
3. **Event handlers must be idempotent.** Design for at-least-once delivery.
4. **Use the `messaging` library** from `backend/libraries/messaging/` for all pub/sub operations. Never use broker-specific APIs directly in service code.

---

## Spring Profiles

| Profile | Usage |
| --- | --- |
| `development` | Local development with Docker Compose |
| `production` | Deployed server environment |

- Profile-specific configuration in `application-{profile}.yml`.
- The `SPRING_PROFILES_ACTIVE` environment variable is set in `deploy/docker-compose.yml`.

---

## Code Style

- **Language**: Kotlin exclusively. No Java in new code.
- **Formatting**: Follow ktlint conventions.
- **Null Safety**: Leverage Kotlin's null safety. Avoid `!!` — prefer `?.let`, `?:`, or explicit null checks.
- **Data Classes**: Use for DTOs, domain value objects, and event payloads.
- **Coroutines**: Prefer coroutines for async operations over reactive streams.
- **Testing**: Write tests in `tests/jvm/` at the repo root. Use JUnit 5, MockK for mocking, Testcontainers for integration tests with PostgreSQL.
