# TODO: Implement Role-Based Assignment Filtering

## Tasks

- [x] Modify `getAssignments` function in `assignmentController.js` to filter assignments based on user role:
  - If user is "Teacher", show only assignments where `teacher` matches user's `_id`.
  - If user is "Student" or other, show all assignments.

## Followup Steps

- [ ] Test the application by logging in as a teacher (should see only their assignments).
- [ ] Test by logging in as a student (should see all assignments).
- [ ] Verify dashboard updates correctly without errors.
