# Smart Parking Lot System

This is a React-based Smart Parking Lot System developed as part of a technical assignment.  
The application helps in managing parking slots and automatically allocates the nearest suitable slot based on vehicle requirements such as EV charging and covered parking.

The main goal of this project is to demonstrate frontend development skills, logical problem-solving, and clean UI design using React.

---

## Live Demo

 https://smart-parking-lot-system-ten.vercel.app/ 


---

## Demo Video

https://drive.google.com/file/d/1FL0lnXbgAGnwybeUOlGWHBO6vbloMaTZ/view?usp=drive_link  


---

## Features

- Add parking slots with options for:
  - EV Charging
  - Covered Parking
- View all parking slots with real-time status
- Automatically allocate the nearest available slot
- Remove parked vehicles from slots
- Display parking statistics such as:
  - Total slots
  - Occupied slots
  - Available slots
  - EV-enabled slots
  - Covered slots
- Clean and responsive user interface

---

##  Allocation Logic (Overview)

The parking slot allocation works as follows:
1. Only free (non-occupied) slots are considered
2. EV charging requirement is checked if selected
3. Covered parking requirement is checked if selected
4. The nearest available slot (lowest slot number) is assigned
5. If no slot matches the requirements, a message is shown

This logic is implemented completely on the frontend using JavaScript.

---

##  Technology Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Inline CSS
- **State Management**: React Hooks (`useState`)
- **Icons**: Lucide React

---

## Installation & Setup

Follow these steps to run the project locally:

1. Clone the repository:
```bash
git clone https://github.com/nishant6485/smart-parking-lot-system
cd smart-parking-lot-system
