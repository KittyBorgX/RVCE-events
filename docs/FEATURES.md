# RVCE Events — Feature Specification

## 1. Product vision

RVCE Events is a self-hosted platform for publishing, discovering, managing, and attending events organized within RVCE.

The platform should give students and visitors a reliable event directory while giving clubs, departments, and administrators tools to manage the complete event lifecycle.

## 2. Users and roles

### Visitor

- Browse published events.
- Search and filter events.
- View event details, schedules, organizers, venue, and registration status.
- Share event links.

### Student / attendee

- Create and manage an account.
- Maintain a basic profile.
- Register for events.
- Cancel a registration where permitted.
- View upcoming and past registrations.
- Receive event updates and reminders.
- Check in to events.
- Submit feedback after attending.

### Organizer

Organizers may represent clubs, departments, teams, or other approved RVCE groups.

- Create event drafts.
- Submit events for approval.
- Edit events according to their approval status.
- Configure registration rules, capacity, deadlines, and eligibility.
- View registrations and attendee information.
- Communicate event updates to registered attendees.
- Manage attendance and check-in.
- View event-level statistics.

### Administrator

- Manage users, roles, and organizer permissions.
- Approve, reject, archive, or feature events.
- Manage event categories, venues, and configurable platform settings.
- View platform-wide registrations, attendance, and activity.
- Handle reported content and operational issues.
- Review audit logs.

## 3. MVP scope

The first release should focus on a dependable event directory and registration workflow.

### 3.1 Authentication and accounts

- User registration and sign-in.
- Sign-out and session management.
- Password reset.
- Basic profile with name, email, student/staff identifier where applicable, department, and year.
- Role-based authorization for attendees, organizers, and administrators.
- Account status management, including active, suspended, and deactivated states.

The exact identity provider or institutional single sign-on integration remains to be decided.

### 3.2 Event management

Events should support:

- Title and description.
- Cover image or poster.
- Organizer and contact information.
- Category, tags, and target audience.
- Venue and optional online meeting information.
- Start and end date/time.
- Registration open and close dates.
- Capacity and waitlist settings.
- Eligibility requirements.
- Event agenda or schedule.
- Rules, terms, and additional instructions.

Event lifecycle:

1. Draft
2. Submitted for approval
3. Approved and published
4. Registration open or closed
5. In progress
6. Completed
7. Cancelled or archived

Organizers can create and manage drafts. Administrators control publication and moderation.

### 3.3 Event discovery

- Public event listing.
- Event detail page with a shareable URL.
- Search by title, description, organizer, or tag.
- Filters for category, date, venue, and registration availability.
- Sorting by date and relevance.
- Separate views for upcoming, ongoing, completed, and cancelled events.
- Featured or highlighted events managed by administrators.

### 3.4 Registration

- Register for an eligible event.
- Prevent duplicate registrations.
- Enforce capacity and registration deadlines.
- Support waitlists when an event is full.
- Registration confirmation.
- Registration cancellation where allowed.
- Attendee view of registration status.
- Organizer view of attendee lists.

The initial registration form can use a standard attendee profile. Custom event-specific form fields should be added after the core workflow is stable.

### 3.5 Attendance and check-in

- Organizer can view the registered attendee list.
- Organizer can mark an attendee as present or absent.
- Attendee check-in using a registration code or QR code.
- Manual check-in fallback.
- Attendance summary for organizers and administrators.

### 3.6 Notifications

- Registration confirmation.
- Registration cancellation or waitlist status change.
- Event approval or rejection notification for organizers.
- Event change and cancellation notifications.
- Reminder before an upcoming registered event.

The first implementation should support email notifications. The notification design should allow additional channels later.

### 3.7 Feedback and reporting

- Attendees can submit a rating and optional feedback after an event.
- Organizers can view feedback for their events.
- Users can report inaccurate, inappropriate, or problematic event content.
- Administrators can review and resolve reports.

### 3.8 Administration

- User and role management.
- Organizer approval and suspension.
- Event moderation queue.
- Category, tag, and venue management.
- Event cancellation and archival tools.
- Basic platform metrics.
- Audit trail for important administrative and event-lifecycle actions.

## 4. Later-phase features

These features are desirable but should not block the MVP:

- Institutional single sign-on.
- Custom registration forms and conditional questions.
- Paid events or payment integration.
- Certificates and participation records.
- Calendar export using iCal/Google Calendar-compatible formats.
- Club and department pages.
- Recurring events.
- Multi-session events and ticket types.
- Event approval workflows with multiple reviewers.
- Bulk attendee import and export.
- Rich analytics and reports.
- Push notifications and SMS notifications.
- Personalized event recommendations.
- Comments, discussions, and social sharing integrations.
- Native mobile applications.

## 5. Important business rules

- Only approved and published events are visible in the public directory.
- Only authorized organizers can create or modify organizer-owned events.
- An event cannot accept registrations after its registration deadline or capacity limit unless waitlisting is enabled.
- Event changes that materially affect date, venue, capacity, or registration requirements should notify registered attendees.
- Cancelled events retain their history and are not hard-deleted by normal user actions.
- Attendance and registration actions should be auditable.
- Users should only access personal information and attendee data permitted by their role.

## 6. Non-functional requirements

- Self-hostable on project-owned infrastructure.
- Responsive and accessible web interface.
- Secure authentication and authorization.
- Server-side validation for all important operations.
- Idempotent registration and notification operations.
- Retryable background jobs.
- Observable failures and operational events.
- Database migrations managed through Liquibase.
- Versioned API contracts using Protocol Buffers.
- Automated unit, integration, browser, and smoke testing.
- Preserve event, registration, attendance, and audit history.

## 7. Initial delivery milestones

### Milestone 1 — Foundation

- Repository structure for backend, frontend, API contracts, and tests.
- Local development setup.
- PostgreSQL integration.
- Liquibase migration setup.
- Authentication and role model.

### Milestone 2 — Event directory

- Event creation and editing.
- Admin approval workflow.
- Public event listing and detail pages.
- Search and filtering.

### Milestone 3 — Registration

- Registration and cancellation.
- Capacity and waitlist handling.
- Organizer attendee management.
- Confirmation notifications.

### Milestone 4 — Attendance and operations

- Check-in.
- Feedback and reporting.
- Event reminders and update notifications.
- Basic administration and audit views.

## 8. Decisions still required

- Whether authentication will use local accounts, institutional SSO, or both.
- Which users may become organizers and how organizer approval works.
- Whether events are public to everyone or restricted to the RVCE community.
- Whether registration requires institutional identity verification.
- Email delivery provider or self-hosted mail relay.
- Exact event categories, venues, and departments.
- Data retention and privacy policies.
