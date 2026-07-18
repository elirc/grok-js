# Phase 2: Feature Proposals & Implementation Roadmap

**Project:** grokbuildc# (ASP.NET Core + React)
**Audience:** Junior SWE upskilling
**Goal:** Progress from basic CRUD to a more production-ready fullstack application while learning .NET-specific patterns, security, and modern frontend practices.

This document proposes new features and provides a detailed, educational implementation plan. Each feature includes why it matters for a junior developer, a step-by-step plan, learning objectives, and common pitfalls.

---

## 1. User Authentication & Authorization (JWT + Role-based)

### Why This Feature?
Real applications require users to authenticate. This is one of the highest-leverage skills for a junior — it touches security, state management, middleware, and database design.

### Learning Objectives
- JWT authentication flow in ASP.NET Core
- ASP.NET Core Identity vs custom JWT (why we might choose one)
- Policy-based authorization
- Managing auth state in React
- Protecting API endpoints and frontend routes

### Detailed Implementation Plan

#### Backend (ASP.NET Core)
1. **Database & Models**
   - Add `ApplicationUser` (or use IdentityUser)
   - Add `Role` enum or ASP.NET Identity roles
   - Add `UserId` foreign key to `TaskItem`

2. **Authentication Setup**
   - Add JWT Bearer authentication in `Program.cs`
   - Create `AuthService` with `RegisterAsync` and `LoginAsync`
   - Use `Microsoft.AspNetCore.Identity` or a lightweight custom implementation with `BCrypt.Net`
   - Generate and validate JWT tokens

3. **Authorization**
   - Use `[Authorize]` attribute on controllers/endpoints
   - Create policies for roles (e.g., `[Authorize(Policy = "AdminOnly")]`)
   - Use `IAuthorizationHandler` for more complex rules

4. **Endpoints**
   - `POST /api/auth/register`
   - `POST /api/auth/login`
   - `GET /api/auth/me`
   - Update all task endpoints to require authentication and scope data to the current user

#### Frontend (React)
1. **API Client**
   - Add auth-related functions in `src/api/auth.ts`
   - Automatically attach `Authorization: Bearer <token>` header (using interceptors or a custom fetch wrapper)

2. **Auth State Management**
   - Create `AuthContext` or use a lightweight state solution (Zustand recommended over Redux for juniors)
   - Store token in `localStorage` (with notes about security trade-offs)
   - Create a protected route component

3. **UI Updates**
   - Login/Register pages
   - Show current user info in header
   - Redirect unauthenticated users

#### Cross-cutting
- Update task creation to associate tasks with the logged-in user
- Allow admins to see all tasks (demonstrate role-based data filtering)

### Phased Approach
**Phase A:** Fake auth (hard-coded user)
**Phase B:** Real JWT + password hashing
**Phase C:** Role-based access + user-scoped data

---

## 2. Pagination, Filtering & Search

### Why This Feature?
Returning thousands of records is never acceptable in production. This feature teaches API design, performance, and good UX patterns.

### Learning Objectives
- Efficient database querying with EF Core
- Building flexible query objects
- Managing complex filter state in the frontend
- Using URL parameters for shareable filtered views

### Detailed Implementation Plan

#### Backend
1. Create a `TaskFilterDto` or query parameters:
   - `page`, `pageSize`
   - `searchTerm`
   - `isCompleted`
   - `sortBy`, `sortDirection`

2. Use EF Core `Skip` + `Take` (or better, keyset pagination for large datasets)
3. Return a paged result object:
   ```csharp
   public record PagedResult<T>(IReadOnlyList<T> Items, int TotalCount, int Page, int PageSize);
   ```

#### Frontend
1. Add UI controls for filters (search input, status select, sorting)
2. Sync filter state with URL using `useSearchParams`
3. Use TanStack Query with dynamic `queryKey` based on filters
4. Implement proper debouncing for the search input
5. Display pagination controls and total count

### Recommended Learning Order
Start with client-side filtering, then move to server-side. This contrast is very educational.

---

## 3. Real-time Updates

### Why This Feature?
Users expect apps to feel alive. Adding real-time teaches a completely different communication paradigm.

### Learning Objectives
- WebSockets vs REST
- Using SignalR (the .NET standard)
- Updating React Query cache from external events
- Handling connection lifecycle

### Detailed Implementation Plan

#### Backend
- Add SignalR (`Microsoft.AspNetCore.SignalR`)
- Create a `TaskHub`
- On create/update/delete operations, send messages to connected clients:
  - `TaskCreated`
  - `TaskUpdated`
  - `TaskDeleted`

#### Frontend
- Install `@microsoft/signalr`
- Create a `useSignalR` hook
- On receiving events, use `queryClient.setQueryData` or `invalidateQueries`
- Show connection status in the UI (connected / reconnecting)

### Trade-offs to Explore
- When is polling actually better?
- Scaling SignalR (Redis backplane)
- Security considerations with WebSockets

---

## 4. File Attachments

### Why This Feature?
Most real business apps need to handle documents or images. This introduces new concerns around storage, security, and async processing.

### Learning Objectives
- Handling file uploads in ASP.NET Core
- Storing file metadata vs actual files
- Streaming vs buffering
- Frontend file upload UX with progress

### Detailed Implementation Plan

#### Backend
1. Add `TaskAttachment` entity (linked to `Task`)
2. Create an endpoint `POST /api/tasks/{id}/attachments`
3. Use `IFormFile` and stream the file to disk or cloud storage
4. Return metadata (filename, size, url)

#### Frontend
- Add file input in the task form or a dedicated attachments section
- Upload using `FormData`
- Show upload progress
- List and allow deletion of attachments

### Recommended Approach
Start with local file storage (`wwwroot/uploads`). Later discuss moving to Azure Blob Storage or S3.

---

## 5. Comprehensive Testing

### Why This Feature?
Juniors often treat testing as an afterthought. This forces testing into the development process.

### Proposed Scope
- **Backend**: Unit tests for services + integration tests using `WebApplicationFactory`
- **Frontend**: Component tests with React Testing Library + Vitest
- **E2E**: Basic Playwright tests for the happy path

### Implementation Plan
1. Set up test project with in-memory database (SQLite or EF Core InMemory)
2. Write service-layer tests first
3. Add API integration tests
4. Add frontend component tests for the task list and form
5. Add one E2E test covering create → complete → delete

---

## Suggested Phased Roadmap

| Phase     | Feature                          | Duration     | Primary Skills Gained                     |
|-----------|----------------------------------|--------------|-------------------------------------------|
| 2.1       | Authentication & Authorization   | 1.5–2 weeks  | Security, state, middleware               |
| 2.2       | Pagination + Filtering           | 1 week       | API design, performance, state in URLs    |
| 2.3       | Real-time (SignalR)              | 1–1.5 weeks  | Event-driven architecture                 |
| 2.4       | File Attachments                 | 1 week       | Async file handling, storage concerns     |
| 2.5       | Testing Strategy                 | Ongoing      | Confidence and maintainability            |

## Additional Valuable Additions (Stretch Goals)
- Soft deletes
- Audit logging (who changed what and when)
- Basic admin dashboard
- Dark mode + accessibility improvements
- Proper error handling and ProblemDetails
- CI/CD pipeline (GitHub Actions)

## Success Criteria

After completing Phase 2, a junior developer should be able to:
- Explain the full end-to-end flow of an authenticated request
- Make reasonable architecture decisions with awareness of trade-offs
- Add new features without fear of breaking existing functionality
- Understand how different parts of a fullstack app influence each other

This phase is designed to simulate the kind of work a junior would do on a real product team in their first 6–12 months.
