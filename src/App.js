import './App.css';
import Header from './Header'
import Home from './Home'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Checkout from './Checkout'
import Login from './Login'
import {useEffect} from "react";
import {auth,db} from './firebase'
import {useStateValue} from './StateProvider'
import Payment from './Payment'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const promise=loadStripe("pk_test_51N97NVSCofcf6uFT6wIjdJM0BzyTfjQL20YrbL2INHXCEiOGLzA4PhjneLjF0IWmCux2AXTSjfwnFLYY5eDNDckU00TGp0ctyg");

function App() {
  const [{},dispatch]=useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log("The user is ",authUser);
      if(authUser){
        dispatch({
          type:"SET_USER",
          user:authUser
        })
      }else{
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    })
  },[])
  return (
    <Router>
    <div className="app">
      <Routes>
        <Route path="/" element={[<Header/>,<Home/>]}/>
        <Route path="/checkout" element={[<Header/>,<Checkout/>]}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/payment" element={[<Header/>,<Elements stripe={promise}><Payment/></Elements>]}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
