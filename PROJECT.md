# Technical Product Requirements Document (PRD)

## Project Title

Presbyterian Church Management System (PCMS) – Web Platform

## Target Users

Presbyterian Church in Ghana (single congregation initially, multi-congregation ready)

---

## 1. Product Objectives

* Digitize church administration and governance
* Provide accurate membership, attendance, and financial records
* Support Presbyterian governance structures
* Enable transparent reporting and auditing
* Operate reliably under intermittent connectivity

---

## 2. Functional Requirements

### 2.1 Authentication & Authorization

* Secure login (email + password)
* Role-based access control (RBAC)
* Permission-based API authorization via Laravel Policies
* Login activity logging

Roles:

* Super Admin
* Church Admin
* Minister
* Elder
* Deacon
* Treasurer
* Secretary
* Department Head
* Member

---

### 2.2 Member Management

* CRUD member records
* Family grouping
* Membership lifecycle states
* Baptism and confirmation tracking
* Profile photos
* Advanced search and filtering
* Export (PDF, Excel)

Key Data:

* Full name
* Gender
* DOB
* Phone
* Occupation
* Hometown
* Membership status

---

### 2.3 Church Governance

* Elders and deacons registry
* Committees and sessions
* Leadership terms
* Meeting minutes
* Resolutions and voting records

---

### 2.4 Departments & Groups

* Create departments
* Assign leaders
* Member enrollment
* Attendance per department
* Department activity logs

---

### 2.5 Attendance Management

* Sunday service attendance
* Midweek service attendance
* Department attendance
* Bulk marking
* Attendance analytics

---

### 2.6 Financial Management

* Tithes
* Offerings
* Pledges
* Donations
* Expenses
* Budget tracking
* Approval workflows
* Financial reports

Payment Types:

* Cash
* Mobile Money
* Bank transfer

---

### 2.7 Events & Calendar

* Church events
* Service programs
* Special events
* Event attendance
* Event finances

---

### 2.8 Communication

* Bulk SMS
* Email notifications
* Role-based announcements
* Department messages

---

### 2.9 Reports & Analytics

* Membership growth
* Attendance trends
* Financial summaries
* Department statistics

---

## 3. Non-Functional Requirements

* Secure (OWASP-compliant)
* Auditable financial data
* Scalable architecture
* Offline-tolerant UI patterns
* Daily backups

---

# React Dashboard Design

## 6. Application Layout

### Global Layout

* Sidebar navigation (role-aware)
* Top bar (notifications, profile)
* Main content area

---

## 7. Dashboard Pages

### Admin Dashboard

Widgets:

* Total members
* Attendance this month
* Total income (month)
* Pending approvals

Charts:

* Membership growth (line)
* Income vs expenses (bar)

---

### Treasurer Dashboard

Widgets:

* Monthly income
* Monthly expenses
* Outstanding pledges

Tables:

* Recent transactions
* Expense approvals

---

### Department Head Dashboard

Widgets:

* Department members count
* Attendance trend

Tables:

* Member list
* Recent activities

---

## 8. React Component Structure

```
/src
  /components
    /layout
      Sidebar.tsx
      Topbar.tsx
    /dashboard
      StatCard.tsx
      ChartCard.tsx
  /pages
    Dashboard.tsx
    Members.tsx
    Finance.tsx
    Attendance.tsx
```

---

## 9. Security & Permissions (Frontend)

* Route guards per role
* Permission-aware UI rendering
* Token-based API access

---

## 10. Future Enhancements

* Multi-congregation support
* Mobile app integration
* Biometric attendance
* Deep analytics

---

**End of Document**
