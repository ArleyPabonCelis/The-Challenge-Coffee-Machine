import React, {useState, useEffect} from 'react';
import Loading from './components/Loading.jsx';
import './App.css';
import Loading2 from './components/Loading2.jsx';
import OrderForm from './components/Orderform.jsx';

function App() {
  const [loading, setLoading] = useState(true);
  const [showLoading2, setShowLoading2] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setShowLoading2(true);

      setTimeout(() => {
        setShowLoading2(false);
      }, 2000);
    }, 2000);
  }, []);

  if(loading){
    return (
    <Loading/>
    )
  }

  if (showLoading2) {
    return (
      <Loading2/>
    );
  }

  return (
    <>
      <OrderForm/>
    </>
  );
}

export default App;
