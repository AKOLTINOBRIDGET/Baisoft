
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# MMPlaza
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


