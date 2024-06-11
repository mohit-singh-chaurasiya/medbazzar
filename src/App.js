import { Category, Css, PieChart } from "@mui/icons-material";

import AdminLogin from "./screen/admins/AdminLogin";
import AdminDashboard from "./screen/admins/AdminDashboard";
import SubCategories from "./screen/admins/SubCategory";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom" ;
import ProductDetails from "./screen/admins/ProductDetails";
import Home from "./screen/userinterface/Home";
import ProductDetailsComponent from "./screen/userinterface/ProductDetailsComponent";
import  FilterLists  from "./components/userinterface/FilterList";
import FilterDetails from "./screen/userinterface/FilterDetails";
import ShowCart from "./components/userinterface/ShowCart";
import ProductShowComponent from "./components/userinterface/ProductShowComponent";
import PaymentDetails from "./components/userinterface/PaymentDetails";
import Cart from "./screen/userinterface/Cart";
import LoginScreen from "./screen/userinterface/LoginScreen";
import UserLoginPage from "./components/userinterface/UserLoginPage";
import DisplayAllCategory from "./screen/admins/DisplayAllCategory";
import ShowCartProducts from "./components/userinterface/ShowCartProducts";
import UserDetails from "./components/userinterface/UserDetails";
import Address from "./components/userinterface/Address";
import DisplayOrders from "./components/userinterface/DisplayOrders";
// import FilterDetails from "./screen/userinterface/FilterDetails";
import FilterProducts from "./components/userinterface/FilterProducts";
import MultiAddress from "./components/userinterface/MultiAddress";
import UserHeader from "./components/userinterface/UserHeader";
import DisplayUsers from "./screen/admins/DisplayUsers";
import AdminRegistration from "./screen/admins/AdminRegistration";
import userDataDetail from "./components/userinterface/UserDataDetail";
import Dashboard from "./screen/admins/Dashboard";
import BarChart from "./screen/admins/Charts/BarChart";

function App() {
  return (
    <div>
    
  <Router>
    <Routes>
      
    <Route element={ < AdminLogin /> } path={'/adminlogin'}></Route>
      <Route element={ <AdminRegistration />} path={'/register'}></Route>
      <Route element={ <AdminDashboard />} path={'/admindashboard/*'} ></Route>
      <Route element={ < ProductDetails /> } path={'/productdetails'}></Route>
      <Route element={ <Home />} path={'/home'}></Route>    
      <Route element={ <ProductDetailsComponent />} path={'/productdetailscomponent'}></Route>    
    
      <Route element={ <ProductShowComponent />} path={'/showcomponent'} ></Route>    
      <Route element={ <ProductDetailsComponent />} path={'/detailscomponent'} ></Route>    
      <Route element={ <ShowCart />} path={'/showcart'} ></Route>    
      <Route element={ <PaymentDetails />} path={'/payment'} ></Route>    
      <Route element={ <Cart />} path={'/cart'} ></Route>    
      <Route element={ <DisplayAllCategory />} path={'/displayallcategory'} ></Route>    
      <Route element={ <ShowCartProducts/>} path={'/show'}></Route>
      <Route element={ <UserLoginPage />} path={'/userloginpage'} ></Route> 
      <Route element={ <UserDetails />} path={'/userdetails'}></Route> 
      <Route element={ <LoginScreen />} path={'/loginscreen'}></Route>
      <Route element={ <Address />} path={'/address'}></Route>
      <Route element={ <DisplayOrders />} path={'/order'}></Route>
      <Route element={ <FilterProducts />} path={'/filterproduct'}></Route>
      <Route element={ <MultiAddress />} path={'/multi'}></Route>
      <Route element={ <UserHeader />} path={'/userheader'}></Route>
      <Route element={ <FilterDetails />} path={'/filterdetails/:pattern'} ></Route>  


     
      <Route element={ <DisplayUsers />} path={'/users'} ></Route>    
      <Route element={ <userDataDetail />} path={'/userdata'} ></Route>  

        <Route element={<Dashboard />} path={'/dashboard'} />
        <Route element={<AdminRegistration />} path={'/register'} />
     
   {/* <Route element={<PieChart/>} path={'/bar'}/> */}
   
      
      {/* <Route element={ <PaymentDetails/>} path={'/pb'}></Route> */}
     

    </Routes>
  </Router>
   
       </div>
  );
}

export default App;
