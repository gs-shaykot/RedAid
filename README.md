# 🩸 Blood Donation Application

---

## **Objective**
The purpose of the Blood Donation Application is to create a user-friendly platform that facilitates blood donation activities. It will connect donors with those in need of blood, promoting a seamless and efficient donation process.

The application will be developed using the **MERN stack** (MongoDB, Express.js, React, Node.js) and will include features for:
- Donor registration
- Blood donation requests
- Donor and content management
- Role-based access control

---

## **Key Rules**
1. Include **at least 20 notable GitHub commits** on the client side.
2. Include **at least 12 notable GitHub commits** on the server side.
3. Add a meaningful `README.md` file with:
   - Website name
   - Admin username and password
   - Live site URL
   - A minimum of 10 bullet points to highlight website features.
4. Ensure responsiveness for **mobile, tablet, and desktop views**, including the dashboard layout.
5. Use **environment variables** to hide Firebase config keys and MongoDB credentials.
6. Avoid using any **Lorem Ipsum** text in the website.
7. Implement notifications for all CRUD operations, authentication, and sign-ups using **SweetAlert** or **toast notifications** (avoid browser alerts).
8. Use **TanStack Query** for all data-fetching functionality (GET methods only).
9. After reloading a private route, ensure the user does **not get redirected** to the login page.
10. **Do not implement social login**, email verification, or password reset (optional for post-assignment).

---

## **User Roles and Permissions**

### **Roles**
1. **Admin 🌐**: Full access, including user management, donation requests, and content management.
2. **Donor 🩸**: Can register, view, and respond to donation requests.
3. **Volunteer 🤝**: Can create and manage donation requests.

> 💡 **Make a user admin or volunteer by editing the database.**

---

## **Application Features**

### **Public Features**
1. **Registration**  
   - Input fields: `email`, `name`, `avatar` (uploaded via **ImageBB**), `blood group`, `district`, `upazila`, `password`, and `confirm_password`.
   - Default user role: **Donor**.
   - Default status: **Active**.
   - Blocked users cannot create donation requests.

2. **Login**  
   - Login page for registered users with navigation to the registration page.

### **Dashboard Features**

#### **Common Dashboard Features**
- Sidebar navigation (no top navbar).
- Fully responsive layout.

#### **Donor Dashboard**
1. **Home Page**  
   - Displays a welcome message with the donor’s name.  
   - Shows the 3 most recent donation requests made by the donor.  
   - Allows the donor to **edit, delete, or update** donation requests and view details.  
   - A "View My All Requests" button redirects to a page listing all donation requests (includes pagination and filtering by status).

2. **Profile Page**  
   - Displays user details (editable except email).
   - Save button updates data and returns to the non-editable state.

3. **Create Donation Request**  
   - Form fields include `recipient name`, `recipient location`, `hospital name`, `blood group`, `donation date`, `donation time`, and a `request message`.  
   - Default donation status: **Pending**.  
   - Requests can only be created by active users.

#### **Admin Dashboard**
1. **Home Page**  
   - Displays statistics (e.g., total users, total funding, and total donation requests).  
   - Includes cards with icons, count numbers, and titles.

2. **All Users Page**  
   - Tabular data of all users with pagination and filtering by status (`active` or `blocked`).  
   - Actions include blocking/unblocking users and updating roles (`make admin`, `make volunteer`).

3. **All Donation Requests Page**  
   - Admin can manage all donation requests (edit, delete, update status).

4. **Content Management**  
   - Add, publish/unpublish, edit, or delete blogs.  
   - Use **Jodit-react** for rich text editing.  
   - Pagination and filtering options (`draft` or `published`).

#### **Volunteer Dashboard**
- Similar to the Admin Dashboard but with limited permissions (e.g., cannot delete or publish blogs).

---

## **Home Page Features (Public)**

1. **Navbar**  
   - Includes logo, navigation links (e.g., donation requests), and user login/logout.

2. **Hero Section**  
   - Displays a prominent call to action for donors.

3. **Donation Request Section**  
   - Lists active donation requests.  

4. **Footer**  
   - Includes links to important pages, contact information, and copyright.

---

## **Resources**
- Use provided data for **districts** and **upazilas**.
- Refer to [ImageBB](https://imgbb.com/) for avatar and blog thumbnail uploads.

---

## **Tech Stack**
- **Frontend**: React, TailwindCSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: Firebase (using environment variables)

---

## **Live Site URL**
(https://assignment-12-93b12.web.app)

---

## **Admin Credentials**
- **Username**: [gsshaykot53@gmail.com]  
- **Password**: [Admin@123]  

---

## **Features at a Glance**
1. Fully responsive layout (mobile, tablet, desktop).
2. Role-based dashboards for Admin, Donors, and Volunteers.
3. Comprehensive CRUD operations for donation requests.
4. Blog management for admins and volunteers.
5. Notifications for all CRUD operations and authentication.
6. User-friendly UI with no use of Lorem Ipsum text.
7. Environment variables for sensitive data.
8. Pagination and filtering features for data tables.
9. Private route handling without redirection on reload.
10. Advanced state management with **TanStack Query**.
