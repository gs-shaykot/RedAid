# 🩸 Blood Donation Application
---
# [🩸 Blood Application's Server: ](https://github.com/gs-shaykot/RedAid-Server) 
---
---

## **Objective**
The purpose of the Blood Donation Application is to create a user-friendly platform that facilitates blood donation activities. It will connect donors with those in need of blood, promoting a seamless and efficient donation process.

The application will be developed using the **MERN stack** (MongoDB, Express.js, React, Node.js) and will include features for:
- Donor registration
- Blood donation requests
- Donor and content management
- Role-based access control
 
## **User Roles and Permissions**

### **Roles**
1. **Admin 🌐**: Full access, including user management, donation requests, and content management.
2. **Donor 🩸**: Can register, view, and respond to donation requests.
3. **Volunteer 🤝**: Can create and manage donation requests.
 

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
 


## ⚙️ Technologies Used
- **React.js** for building the user interface.
- **Firebase Authentication** for managing user login and registration.
- **Firebase Hosting** and **Vercel** for deployment.
- **MongoDB** for database management.
- **Node.js** and **Express.js** for API creation and backend logic.
- **React Hooks** (`useState`, `useEffect`, `useContext`, `useNavigate`, `useLocation`) for managing state and side effects.
- **React-Router** for routing.
- **Sweet Alert** for toast notifications.
- **DaisyUI** and **Tailwind CSS** for styling.
- **Swiper** for implementing dynamic sliders.
- Additional libraries for animations: **Lottie React**, **React Awesome Reveal**, **React Super Responsive Table**.
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
