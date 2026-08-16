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

The first release focuses on an autonomous club event publishing platform, dynamic form registration, UPI payment verification, and high-speed QR check-ins with automated AICTE points ledger.

### 3.1 Authentication and accounts

- Student sign-in strictly via Google OAuth restricted to `@rvce.edu.in`.
- First-time student profile capture for USN (`^1RV\d{2}[A-Z]{2}\d{3}$`), department, and graduation year.
- Dedicated Club Account credentials provisioned by Super Admins with club self-service password reset.
- Event-specific Volunteer Scanner credentials for door ushers at `/scanner`.
- Role-based authorization: Student Attendee, Club Account, Door Scanner, Faculty Counselor, Super Admin.

### 3.2 Event management & direct publishing

- Direct publishing by authorized clubs (no admin/faculty approval bottleneck required).
- Event details: title, description, cover image, category, venue, start/end timestamps, registration windows, and capacity limits.
- AICTE Activity Points configuration (points value, category); enabling AICTE points automatically activates and locks attendance tracking.
- Paid event setup: UPI QR code image upload, UPI ID, and fee amount.
- Event volunteer scanner password configuration.
- Event lifecycle: Draft, Published, Cancelled, Completed.

### 3.3 Dynamic registration forms & payments

- Pre-seeded default fields: Full Name, USN, Email Address (prefilled from student profile; removable by organizers).
- Google Forms-like custom field builder: Short Text, Long Text, Dropdown, Radio Options, Checkboxes, File Upload.
- UPI QR code display during registration and payment screenshot upload field.
- Organizer attendee dashboard with payment screenshot verification queue (Verify / Reject).

### 3.4 Event discovery

- Public event directory with search and filtering by AICTE points, category, date, and fee.
- Responsive shareable event pages with dynamic OpenGraph cards.
- 1-click Add-to-Calendar (`.ics`).

### 3.5 High-speed door check-in & volunteer scanner

- Mobile-optimized Volunteer Scanner portal (`/scanner`) authenticated via event-specific password.
- High-speed in-browser camera QR code scanner (< 500ms scan latency).
- Duplicate check-in prevention and manual USN search fallback.
- Live real-time attendance counter for organizers.

### 3.6 AICTE Activity Points automated ledger

- Automated point credit to student ledger immediately upon verified attendance check-in.
- Student AICTE portfolio tracking progress toward the 100-point graduation requirement.
- Digitally signed and QR-verifiable AICTE activity transcript (PDF) for Faculty Counselor review.
- Faculty Counselor / Proctor portal for 1-click verification and semester clearance.
- 1-click official AICTE compliance report export for club organizers and HODs.

### 3.7 Notifications

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
