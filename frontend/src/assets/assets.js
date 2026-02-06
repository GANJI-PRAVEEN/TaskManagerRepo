import Logo from './logo.png';
import background from "./bg-image.jpg";
import Logo2 from './logo-2.png';
import profile from './profile_photo.png';
import deleteIcon from './deleteIcon.png';
const assets = {
    Logo,
    background,
    Logo2,
    profile,
    deleteIcon
    
    
};


export const sampleTasksData = [
  {
    id: 1,
    task: "UI/UX Development",
    status: "pending",
    date: "10-Jan-2026",
  },
  {
    id: 2,
    task: "API Integration",
    status: "completed",
    date: "08-Jan-2026",
  },
  {
    id: 3,
    task: "Database Design",
    status: "progress",
    date: "09-Jan-2026",
  },
  {
    id: 4,
    task: "Bug Fixing",
    status: "pending",
    date: "11-Jan-2026",
  },
  {
    id: 5,
    task: "Testing & QA",
    status: "completed",
    date: "07-Jan-2026",
  },

];

export const sampleemployeeData = [
  {
    id: 1,
    employeeName: "Praveen",
    employeeMail: "ganjipraveen@gmail.com",
    employeePassword: "1234",
    employeeTasksCompleted: 6,
    employeePerformanceScore: 7
  },
  {
    id: 2,
    employeeName: "Ravi",
    employeeMail: "ravi@gmail.com",
    employeePassword: "ravi@123",
    employeeTasksCompleted: 12,
    employeePerformanceScore: 9
  },
  {
    id: 3,
    employeeName: "Suresh",
    employeeMail: "suresh@gmail.com",
    employeePassword: "suresh@456",
    employeeTasksCompleted: 4,
    employeePerformanceScore: 5
  },
  {
    id: 4,
    employeeName: "Anjali",
    employeeMail: "anjali@gmail.com",
    employeePassword: "anjali@789",
    employeeTasksCompleted: 15,
    employeePerformanceScore: 10
  }
];
export const sampleAdminData = [
  {
    id: 1,
    adminName: "Admin Praveen",
    adminMail: "adminpraveen@gmail.com",
    adminPassword: "admin@123",
    adminTasksCreated: 28,
    adminPerformanceScore: 9
  },
  {
    id: 2,
    adminName: "Admin Ravi",
    adminMail: "adminravi@gmail.com",
    adminPassword: "ravi@admin",
    adminTasksCreated: 15,
    adminPerformanceScore: 7
  },
  {
    id: 3,
    adminName: "Admin Anjali",
    adminMail: "adminanjali@gmail.com",
    adminPassword: "anjali@admin",
    adminTasksCreated: 40,
    adminPerformanceScore: 10
  }
];
export const guestLabels = [
  { id: "guestName", label: "Name" },
  { id: "guestMail", label: "Email" },
  { id: "guestAccessLevel", label: "Access Level" },
  { id: "guestSessionsUsed", label: "Sessions Used" },
  { id: "guestExpiresOn", label: "Access Expires On" }
];



export default assets;