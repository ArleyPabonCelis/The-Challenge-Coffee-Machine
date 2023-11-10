import React, { useState, useEffect } from 'react';
import '../css/orderform.css';
import ImgLoading2 from '../img/logo_coffeeMachine.png'
import Validations from './Validations.jsx';
import OrderList from './OrderList.jsx';
import CheckOrder from './CheckOrder';

function OrderForm() {
    const [drinkOptions, setDrinkOptions] = useState([]);
    const [prices, setPrices] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState('');
    const [sugarAmount, setSugarAmount] = useState(0);
    const [isExtraHot, setIsExtraHot] = useState(false);
    const [money, setMoney] = useState();
    const [validationMessage, setValidationMessage] = useState(null);
    const [classMessage, setClassMessage] = useState('');
    const [orderResult, setOrderResult] = useState(null);
    const [addOrder, setAddOrder] = useState([]);
    const [showOrderList, setShowOrderList] = useState(false);
    const [lastOrderId, setLastOrderId] = useState(-1);
    const [isValidationCorrect, setIsValidationCorrect] = useState(false);
    const [showCheckOrder, setShowCheckOrder] = useState(false);
  
    useEffect(() => {
        fetch('http://localhost:8080/CoffeeMachine/allDrinks')
          .then(response => response.json())
          .then(data => {
            const options = data.map(drink => ({
              id: drink._id,
              label: drink.drink,
              cost: drink.cost,
            }));
            setDrinkOptions(options);
    
            const priceList = data.map(drink => ({
              drinkType: drink.drink,
              cost: drink.cost,
            }));
            setPrices(priceList);
          })
          .catch(error => console.error('Error fetching data:', error));
    }, []);

    const prepareOrder = () => {
        const order = {
            drinkType: selectedDrink,
            money: money || 0,
            extrahot: isExtraHot,
            sugars: sugarAmount,
        };
        console.log(order);
        setOrderResult(order);
        
        let validationMessage = null;
        let className = "";     

        if (order.drinkType === 'drinkList' || order.drinkType === '') {
            validationMessage = 'The drink type should be tea, coffee, or chocolate.';
            className = 'wrong';
        }else if(order.drinkType === '65456d2a7862b5f02a8aa505' && order.money < 0.4){
            validationMessage = 'The cost of Tea is 0.4';
            className = 'wrong';
        }else if(order.drinkType === '65456d2a7862b5f02a8aa506' && order.money < 0.5){
            validationMessage = 'The cost of Coffee is 0.5';
            className = 'wrong';
        }else if(order.drinkType === '65456d2a7862b5f02a8aa507' && order.money < 0.6){
            validationMessage = 'The cost of Chocolate is 0.6'; 
            className = 'wrong';
        }else if(order.sugars < 0 || order.sugars > 2){
            validationMessage = 'The number of sugars should be between 0 and 2.';
            className = 'wrong';
        }else{          
            if(order.sugars === 0 && order.extrahot === false){
                if(order.drinkType === '65456d2a7862b5f02a8aa505'){
                    validationMessage = `You have ordered a Tea`;
                }else if(order.drinkType === '65456d2a7862b5f02a8aa506'){
                    validationMessage = `You have ordered a Coffee`;
                }else if(order.drinkType === '65456d2a7862b5f02a8aa507'){
                    validationMessage = `You have ordered a Chocolate`;
                }
            }else if(order.sugars > 0 && order.extrahot === false){
                if(order.drinkType === '65456d2a7862b5f02a8aa505'){
                    validationMessage = `You have ordered a Tea with ${order.sugars} sugars`;
                }else if(order.drinkType === '65456d2a7862b5f02a8aa506'){
                    validationMessage = `You have ordered a Coffee with ${order.sugars} sugars`;
                }else if(order.drinkType === '65456d2a7862b5f02a8aa507'){
                    validationMessage = `You have ordered a Chocolate with ${order.sugars} sugars`;
                }
            }else if(order.sugars > 0 && order.extrahot === true){
                if(order.drinkType === '65456d2a7862b5f02a8aa505'){
                    validationMessage = `You have ordered a Tea extra hot with ${order.sugars} sugars`;
                }else if(order.drinkType === '65456d2a7862b5f02a8aa506'){
                    validationMessage = `You have ordered a Coffee extra hot with ${order.sugars} sugars`;
                }else if(order.drinkType === '65456d2a7862b5f02a8aa507'){
                    validationMessage = `You have ordered a Chocolate extra hot with ${order.sugars} sugars`;
                }
            }  
            
            className = 'right';

            fetch('http://localhost:8080/CoffeeMachine/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta de la API:', data);
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
            });

        }
        
        setValidationMessage(validationMessage);
        setClassMessage(className);
        setIsValidationCorrect(className === 'right');

        if(validationMessage){
            setTimeout(() => {
                setValidationMessage(null);
                if (className === 'right') {
                    setShowCheckOrder(true);
                }
            }, 3000)
        }
    };

    const addListOrder = () => {
        const selectedOption = drinkOptions.find(option => option.id === selectedDrink)
        const orderList = {
            id : lastOrderId + 1,
            drinkType: selectedOption ? selectedOption.label : 'drinkList',
            sugars: sugarAmount,
            extrahot: isExtraHot ? 'Yes' : 'No',
            money: money || (selectedOption ? selectedOption.cost : 0), 
        };
        console.log(orderList);
        setLastOrderId(lastOrderId + 1)

        let validationMessage = null;
        let className = "";     

        if (orderList.drinkType === 'drinkList' || orderList.drinkType === '') {
            validationMessage = 'The drink type should be tea, coffee, or chocolate.';
            className = 'wrong';
        }else if(orderList.drinkType === 'Tea' && orderList.money < 0.4){
            validationMessage = 'The cost of Tea is 0.4';
            className = 'wrong';
        }else if(orderList.drinkType === 'Coffee' && orderList.money < 0.5){
            validationMessage = 'The cost of Coffee is 0.5';
            className = 'wrong';
        }else if(orderList.drinkType === 'Chocolate' && orderList.money < 0.6){
            validationMessage = 'The cost of Chocolate is 0.6'; 
            className = 'wrong';
        }else if(orderList.sugars < 0 || orderList.sugars > 2){
            validationMessage = 'The number of sugars should be between 0 and 2.';
            className = 'wrong';
        }else if(addOrder.length === 8){
            validationMessage = 'No more orders can be added. Limit reached';
            className = 'wrong';
        }        else{          
            if(orderList.sugars === 0 && orderList.extrahot === false){
                if(orderList.drinkType === 'Tea'){
                    validationMessage = `You have ordered a Tea`;
                }else if(orderList.drinkType === 'Coffee'){
                    validationMessage = `You have ordered a Coffee`;
                }else if(orderList.drinkType === 'Chocolate'){
                    validationMessage = `You have ordered a Chocolate`;
                }
            }else if(orderList.sugars > 0 && orderList.extrahot === false){
                if(orderList.drinkType === 'Tea'){
                    validationMessage = `You have ordered a Tea with ${orderList.sugars} sugars`;
                }else if(orderList.drinkType === 'Coffee'){
                    validationMessage = `You have ordered a Coffee with ${orderList.sugars} sugars`;
                }else if(orderList.drinkType === 'Chocolate'){
                    validationMessage = `You have ordered a Chocolate with ${orderList.sugars} sugars`;
                }
            }else if(orderList.sugars > 0 && orderList.extrahot === true){
                if(orderList.drinkType === 'Tea'){
                    validationMessage = `You have ordered a Tea extra hot with ${orderList.sugars} sugars`;
                }else if(orderList.drinkType === 'Coffee'){
                    validationMessage = `You have ordered a Coffee extra hot with ${orderList.sugars} sugars`;
                }else if(orderList.drinkType === 'Chocolate'){
                    validationMessage = `You have ordered a Chocolate extra hot with ${orderList.sugars} sugars`;
                }
            }  
            setAddOrder([...addOrder, orderList])
            className = 'right';
        }
        
        setValidationMessage(validationMessage);
        setClassMessage(className)

        if(validationMessage){
            setTimeout(() => {
                setValidationMessage(null)
            }, 3000)
        }
    }

    const handleClean = () => {
        setSelectedDrink('');
        setSugarAmount(0);
        setIsExtraHot(false);
        setMoney('');
        setOrderResult(null);
    };

    const showListOrder = () => {
        setShowOrderList(true);
    };

    const handleBack = () => {
        setShowOrderList(false);
    };

    const handleDeleteOrder = (orderId) => {
        const updatedOrders = addOrder.filter(order => order.id !== orderId);
        setAddOrder(updatedOrders);
      };


    return (
        <>
        <div className='dad_form' >
            <div className='bg_form'>
                <div className='title_form'>
                    <img className='size_title' src={ImgLoading2} alt='logo coffee machine'/>
                    <h1>MAKE YOUR ORDER</h1>
                    <img className='size_title' src={ImgLoading2} alt='logo coffee machine'/>
                </div>
                <div className='content'>
                    <div className='body_form'>
                        <form action="" className='form_coffee'>
                        <div className='choose_drink'>
                            <label>Choose your drink</label>
                            <select
                                className='option_drink'
                                value={selectedDrink}
                                onChange={e => setSelectedDrink(e.target.value)}
                            >
                                <option value="drinkList">Drinks list</option>
                                {drinkOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                                ))}
                            </select>
                        </div>

                            <div className='choose_sugar'>
                                <div className='option_sugar'>
                                    <label>Amount of sugar</label>
                                    <input 
                                        type="number" 
                                        value={sugarAmount}
                                        onChange={e => setSugarAmount(parseInt(e.target.value))}
                                    />
                                </div>
                                <div className='option_extrahot'>
                                    <label>Extrahot</label>
                                    <select 
                                        className='yes_no'
                                        value={isExtraHot}
                                        onChange={e => setIsExtraHot(e.target.value === "true")}
                                    >
                                        <option value="false" selected>No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                            </div>

                            <div className='enter_money'>
                                <div className='input_money'>
                                    <label>Money that comes in</label>
                                    <input 
                                        type="number" 
                                        inputMode="decimal" 
                                        step="any" 
                                        style={{
                                            appearance: "textfield"
                                        }}
                                        value={money || 0}
                                        onChange={e => setMoney(parseFloat(e.target.value))}
                                    />
                                </div>
                                <div className='btn_clean'>
                                    <button type="button" onClick={handleClean}>Clean</button>
                                </div>
                            </div>

                            <div className='dad_btn'>
                            {showOrderList ? (
                                <OrderList handleBack={handleBack} orders={addOrder} handleDeleteOrder={handleDeleteOrder}/>
                            ) : (
                                    <div className='btn_submit'>
                                        <button type="button" onClick={addListOrder}>Add</button>
                                        <button type="button" onClick={showListOrder}>Show Order</button>
                                        <button type="button" onClick={prepareOrder}>Prepare</button>
                                    </div>
                             )}
                             {showCheckOrder && <CheckOrder/>}
                             </div>
            
                        </form>
                    </div>
                    <div className='body_body'>
                        <div className='body_chart'>
                            <h2>List of prices</h2>
                            <ul>
                            {prices.map(price => (
                                <li key={price.drinkId}>
                                {price.drinkType}: {price.cost}
                                </li>
                            ))}
                            </ul>
                            <p>Choose your favorite</p>
                        </div>
                        {validationMessage && <Validations message={validationMessage} classMg={classMessage}  />}        
                    </div>


                </div>
            </div>
        </div>
        {orderResult && (
            <div className='object_post'>
            <h2>Order Result:</h2>
            <pre>{JSON.stringify(orderResult, null, 2)}</pre>
            </div>
        )}

        {addOrder.length > 0 && (
            <div className='object_post'>
                <h2>Order Result:</h2>
                <pre>{JSON.stringify(addOrder, null, 2)}</pre>
            </div>
        )}

        
        </>
    );
}

export default OrderForm;