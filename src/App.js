import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute'; // Import PublicRoute component
import Spinner from './components/Spinner';
import ApplyFitnessConsultant from './pages/ApplyFitnessConsultant';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import FitnessConsultants from './pages/admin/FitnessConsultants';
import Profile from './pages/fitnessConsultant/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';


function App() {
   const { loading } = useSelector((state) => state.alerts);

   return (
      <BrowserRouter>
         {loading ? (
            <Spinner />
         ) : (
            <Routes>
               <Route
                  path="/"
                  element={
                     <ProtectedRoute>
                        <HomePage />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/apply-fitness-consultant"
                  element={
                     <ProtectedRoute>
                        <ApplyFitnessConsultant />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/notification"
                  element={
                     <ProtectedRoute>
                        <NotificationPage />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/admin/users"
                  element={
                     <ProtectedRoute>
                        <Users />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/admin/fitness-consultants"
                  element={
                     <ProtectedRoute>
                        <FitnessConsultants />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/fitness-consultant/profile/:id"
                  element={
                     <ProtectedRoute>
                        <Profile />
                     </ProtectedRoute>
                  }
               />

               <Route
                  path="/fitness-consultant/book-appointment/:fitnessConsultantId"
                  element={
                     <ProtectedRoute>
                        <BookingPage />
                     </ProtectedRoute>
                  }
               />

                  


               <Route
                  path="/login"
                  element={
                     <PublicRoute>
                        <Login />
                     </PublicRoute>
                  }
               />
               <Route
                  path="/register"
                  element={
                     <PublicRoute>
                        <Register />
                     </PublicRoute>
                  }
               />

               <Route
                  path="/appointments"
                  element={
                     <ProtectedRoute>
                        <Appointments/>
                     </ProtectedRoute>
                        
                  
                  }
               />
            </Routes>
         )}
      </BrowserRouter>
   );
}

export default App;
