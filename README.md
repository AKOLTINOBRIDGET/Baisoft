# Baisoft
technical assignment 
This project implements the Frontend and AI Chatbot sections of the marketplace assignment. It features a multi-tenant dashboard where businesses manage products through a role-based approval workflow.

Technical Implementation
1. Frontend Architecture
Next.js (React): Built with a clean, modular component structure.

Permissions Logic: Implemented a Role-Based Access Control (RBAC) system. The UI dynamically adapts by hiding or disabling actions (Create, Edit, Approve) based on the user's role (super_admin, approver, editor, etc.).

Shell Layout Pattern: Used a DashboardLayout to handle global navigation and a DashboardWrapper to ensure consistent content alignment and max-width across all internal pages.

2.Product Management Workflow
Status Lifecycle: Products move through Draft → Pending Approval → Approved.

Approval System: Only users with approver or super_admin roles can see and trigger the "Approve" action on products.

Multi-Tenancy: The system is designed so that business users only interact with products belonging to their specific business.

3AI Chatbot
Data Integrity: The chatbot is programmed to query the product list but respects the Approval Rule—it only reveals "Approved" products to public queries.

Session History: Implemented a message state that tracks the user/AI dialogue with timestamps.

Tech Stack
Framework: Next.js (React)

Styling: Tailwind CSS (for responsive, utility-first design)

State Management: React Context API (for Auth and Permissions)

Icons/UI: Custom CSS & Radix-style UI patterns


Credentials
 'superadmin@example.com', password: 'admin123', role: 'super_admin', name: 'Super Admin',
   'business@example.com', password: 'business123', role: 'business_admin', name: 'Business Admin', businessId: 'business-1' ,
  'editor@example.com', password: 'editor123', role: 'editor', name: 'Editor User', businessId: 'business-1' ,
   'approver@example.com', password: 'approver123', role: 'approver', name: 'Approver User', businessId: 'business-1' ,
  'viewer@example.com', password: 'viewer123', role: 'viewer', name: 'Viewer User', businessId: 'business-1' 


