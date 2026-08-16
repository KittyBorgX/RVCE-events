# API Contracts — Agent Rules

> Extends the root [AGENTS.md](../AGENTS.md). Read the root document first for project-wide rules.

---

## Purpose

This directory is the **single source of truth** for all Protocol Buffer (`.proto`) service and message definitions used across the RVCE Events platform.

---

## Directory Structure

```text
api/
└── proto/
    ├── identity/            ← Identity service contracts
    │   ├── v1/
    │   │   ├── identity_service.proto
    │   │   └── identity_messages.proto
    │   └── ...
    ├── event/               ← Event service contracts
    │   └── v1/
    │       ├── event_service.proto
    │       └── event_messages.proto
    ├── registration/        ← Registration service contracts
    │   └── v1/
    ├── attendance/          ← Attendance service contracts
    │   └── v1/
    ├── notification/        ← Notification service contracts
    │   └── v1/
    └── common/              ← Shared messages (pagination, timestamps, errors)
        └── v1/
```

---

## Rules

### 1. All Protos Live Here
- **Every `.proto` file in the project must be placed under `api/proto/`.** Never place proto definitions inside `backend/services/`, `frontend/`, or any other directory.
- Organize by service domain, then by version (`v1/`, `v2/`, etc.).

### 2. Versioning
- Use directory-based versioning (`v1/`, `v2/`).
- **Never make breaking changes to an existing version.** Instead, create a new version directory.
- Proto package names include the version: `rvce.events.identity.v1`.

### 3. Package Naming Convention
```protobuf
syntax = "proto3";
package rvce.events.<service>.v1;

option java_package = "in.rvce.events.<service>.v1";
option java_outer_classname = "<Service>Proto";
```

### 4. Proto Style
- Use `PascalCase` for message and service names.
- Use `snake_case` for field names.
- Use `SCREAMING_SNAKE_CASE` for enum values.
- Always add field documentation comments above every message and field.
- Reserve field numbers when deprecating fields — never reuse them.

### 5. Shared Messages
- Common types (pagination requests/responses, timestamp wrappers, error details) go in `api/proto/common/v1/`.
- Import shared types — never duplicate message definitions across services.

### 6. No Direct Proto Usage in Frontend
- The frontend **must never** import or use raw generated protobuf types directly.
- Backend services consume protos via generated Kotlin/Java stubs.
- The frontend BFF layer (`frontend/src/bff/clients/`) wraps gRPC calls behind clean TypeScript interfaces.
- Proto → UI model mapping happens in `frontend/src/bff/mappers/`.

### 7. Generated Code
- Generated code from protos is **not committed** to the repository.
- Code generation happens at build time via Gradle protobuf plugin (backend) or a dedicated generation script (frontend BFF).
