import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { CitiesContextProvider } from "./contexts/CitiesContext";
import {AuthProvider} from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

import { Suspense, lazy } from "react";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing"
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
// dist/index.html                   0.49 kB │ gzip:   0.32 kB
// dist/assets/index-573d60c7.css   30.32 kB │ gzip:   5.06 kB
// dist/assets/index-61a6c35d.js   524.84 kB │ gzip: 148.72 kB
const Homepage = lazy(()=>import("./pages/Homepage"));
const Product = lazy(()=>import("./pages/Product"));
const Pricing = lazy(()=>import("./pages/Pricing"));
const PageNotFound = lazy(()=>import("./pages/PageNotFound"));
const AppLayout = lazy(()=>import("./pages/AppLayout"));
const Login = lazy(()=>import("./pages/Login"));



function App() {
   
  return (
    
    <CitiesContextProvider>
    <AuthProvider>
   <BrowserRouter>
     <Suspense  fallback ={<SpinnerFullPage />}>
     <Routes>
       <Route index element={<Homepage />} />
       <Route path="product" element={<Product />} />
       <Route path="pricing" element={<Pricing />}/> 
       <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Navigate replace to="cities"   />} />
        <Route path="cities" element={<CityList  />} />
          <Route path="cities/:id" element={<City />}/>
          <Route path="country" element={<CountryList />}/>
          <Route path="form" element={<Form />} />
        </Route>
       <Route/> 
       <Route path="*" element={<PageNotFound />} />
       <Route path="login" element={<Login />} />
     </Routes>
     </Suspense>
   </BrowserRouter>
   </AuthProvider>
   </CitiesContextProvider>
 
  )
}

export default App