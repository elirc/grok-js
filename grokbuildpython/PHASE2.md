# Phase 2: Feature Proposals & Implementation Roadmap

**Project:** grokbuildpython (FastAPI + React)
**Audience:** Junior SWE upskilling
**Goal:** Advance from a basic CRUD application to something closer to a real startup product, while learning modern Python backend patterns and fullstack thinking.

This document proposes meaningful new features and provides a detailed, educational implementation plan for each. The focus is on concepts that help a junior developer grow into someone who can contribute meaningfully on a real team.

---

## 1. User Authentication & Authorization (JWT + Role-based)

### Why This Feature?
Almost every real application requires users to log in. Authentication touches security, HTTP, state management, and database design — core skills for any junior engineer.

### Learning Objectives
- JWT authentication flow
- Dependency injection and authentication dependencies in FastAPI
- Password hashing with proper libraries
- Role-based access control
- Managing auth state on the frontend

### Detailed Implementation Plan

#### Backend (FastAPI)
1. **Database Changes**
   - Add `User` model with `email`, `hashed_password`, and `role`
   - Add `user_id` foreign key to the `Task` model

2. **Authentication Layer**
   - Use `passlib` + `bcrypt` for password hashing
   - Create Pydantic schemas for login/register
   - Implement token creation and validation using `python-jose` (or `authlib`)
   - Create a dependency `get_current_user` that decodes the JWT

3. **Authorization**
   - Use FastAPI dependencies for role checking
   - Example: `Depends(get_current_active_user)` and role-specific dependencies

4. **New Endpoints**
   - `POST /api/auth/register`
   - `POST /api/auth/login`
   - `GET /api/auth/me`
   - Protect task routes and filter data by user (or allow admins to see everything)

#### Frontend
1. **Auth API**
   - Add login/register functions
   - Store JWT (with discussion about httpOnly cookies vs localStorage)

2. **State Management**
   - Create an auth context or hook
   - Protect routes using React Router

3. **UI**
   - Login and registration forms
   - Display current user
   - Logout functionality

### Recommended Learning Path
Start with a mock user, then implement real JWT, then add roles and data scoping.

---

## 2. Pagination, Filtering & Search

### Why This Feature?
Returning all records at once does not scale. This feature teaches API design, performance awareness, and clean state management.

### Learning Objectives
- Building query parameters and filtering logic
- Efficient database queries with SQLAlchemy
- Managing complex filter state in React
- Proper use of TanStack Query with dynamic keys

### Detailed Implementation Plan

#### Backend
1. Accept query parameters on `GET /api/tasks`:
   - `page`, `page_size`
   - `search`
   - `completed`
   - `sort_by`, `sort_order`

2. Use SQLAlchemy `limit` + `offset` (or keyset pagination for advanced learning)
3. Return structured response:
   ```json
   {
     "data": [...],
     "meta": { "total": 143, "page": 2, "page_size": 10 }
   }
   ```

#### Frontend
1. Build filter UI (search, status, sorting)
2. Sync filters with URL using `useSearchParams`
3. Use `useQuery` with a composite query key
4. Add debouncing for search
5. Implement pagination UI

### Suggested Progression
Implement client-side filtering first, then move the logic to the backend. The contrast is very educational.

---

## 3. Real-time Updates

### Why This Feature?
Users expect modern applications to update live. This introduces a new communication model.

### Learning Objectives
- WebSockets vs REST
- Using FastAPI's WebSocket support
- Broadcasting updates from the backend
- Integrating real-time events with TanStack Query

### Detailed Implementation Plan

#### Backend
- Add WebSocket endpoint (e.g., `/ws/tasks`)
- On task create/update/delete, broadcast messages to connected clients
- Use `ConnectionManager` pattern (standard FastAPI example)
- Consider user-specific rooms once auth is implemented

#### Frontend
- Create a WebSocket hook
- Listen for events and update React Query cache using `setQueryData` or `invalidateQueries`
- Show connection status

### Trade-offs to Discuss
- Complexity vs benefit
- When polling is actually fine
- Scaling considerations

---

## 4. File Attachments

### Why This Feature?
Many real applications need to handle documents or images attached to entities.

### Learning Objectives
- Handling file uploads in FastAPI
- File validation and security
- Storing metadata vs actual files
- Progress feedback on the frontend

### Detailed Implementation Plan

#### Backend
1. Add `TaskAttachment` model or store file references on the Task
2. Create upload endpoint using `UploadFile`
3. Validate file type and size
4. Store files locally during development (with comments on moving to S3 later)
5. Return file metadata to the client

#### Frontend
- Add file input to task forms or a dedicated attachments section
- Upload using `FormData`
- Display attached files with ability to remove them
- Show upload progress

---

## 5. Testing Strategy

### Why This Feature?
Testing is often deprioritized by juniors until it becomes painful. Making testing part of Phase 2 is very valuable.

### Proposed Scope
- Backend: Pytest for unit tests on services + integration tests with TestClient
- Frontend: Vitest + React Testing Library for components and hooks
- E2E: Basic Playwright tests for core flows

### Implementation Plan
1. Set up pytest with a test database (use SQLite in memory for speed)
2. Write service-layer tests first
3. Add API integration tests using FastAPI's TestClient
4. Add frontend component tests
5. Write 1–2 E2E tests covering create and complete flows

---

## Suggested Phased Roadmap

| Phase     | Focus                              | Duration      | Key Skills                              |
|-----------|------------------------------------|---------------|-----------------------------------------|
| 2.1       | Authentication & Authorization     | 1.5–2 weeks   | Security, state, API protection         |
| 2.2       | Pagination, Filtering & Search     | 1 week        | Performance, API design, URL state      |
| 2.3       | Real-time Updates                  | 1–1.5 weeks   | WebSockets, event-driven updates        |
| 2.4       | File Attachments                   | 1 week        | Async file handling, storage concerns   |
| 2.5       | Testing                            | Ongoing       | Maintainability and confidence          |

## Additional Recommended Improvements
- Structured error responses using FastAPI exception handlers
- Proper logging (structlog or standard logging with correlation IDs)
- Input validation and rate limiting
- Soft deletes
- Basic admin functionality
- Environment configuration using Pydantic Settings
- OpenAPI security schemes

## Success Criteria

After completing Phase 2, a junior developer should be able to:
- Explain how authentication flows through the entire stack
- Make reasonable decisions about when to do work on the client vs server
- Add new features with awareness of security and performance implications
- Understand the differences (and similarities) between different backend frameworks

This phase is meant to simulate the kind of incremental product development a junior would experience on a real team.
