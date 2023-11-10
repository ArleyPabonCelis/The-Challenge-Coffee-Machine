import React, { useState, useEffect } from 'react';
import ImgLoading2 from '../img/logo_coffeeMachine.png'
import '../css/orderlist.css'
import CheckOrder from './CheckOrder';

function OrderList({orders, handleBack, handleDeleteOrder}) {
    const [additionOrder, setAdditionOrder] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const [message, setMessage] = useState(null);
    const [classMessageList, setClassMessageList] = useState('');
    const [isValidationCorrect, setIsValidationCorrect] = useState(false);
    const [showCheckOrder, setShowCheckOrder] = useState(false);

    useEffect(() => {
        let totalCost = 0;
        orders.forEach(order => {
            totalCost += order.money;
        });
        setAdditionOrder(totalCost);
    }, [orders]);

    const handlePrepare = () => {
        const inputValueNumber = parseFloat(inputValue);
        
        if (isNaN(inputValueNumber)) {
            setMessage("Enter a valid value in the field");
            setClassMessageList('wrong');
            setIsValidationCorrect(false);
            return;
        }

        if (inputValueNumber < additionOrder) {
            setMessage("Not enough money");
            setClassMessageList('wrong')
            setIsValidationCorrect(false);
        } else {
            const change = inputValueNumber - additionOrder;
            setMessage(`Your order has been accepted. His change is: ${change.toFixed(1)}`);
            setClassMessageList('right')
            setIsValidationCorrect(true);
        }

    };

    useEffect(() => {
        let timeout;

        if (isValidationCorrect) {
            timeout = setTimeout(() => {
                setShowCheckOrder(true);
            }, 4000);
        } else {
            timeout = setTimeout(() => {
                setMessage(null);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [isValidationCorrect]);

    return (
        <div className='dad_form' >
            <div className='bg_form'>
                <div className='title_form'>
                    <img className='size_title' src={ImgLoading2} alt='logo coffee machine'/>
                    <h1>MAKE YOUR ORDER</h1>
                    <img className='size_title' src={ImgLoading2} alt='logo coffee machine'/>
                </div>
                <div className='content_list'>
                    <div className='body_list'>
                        {orders.map(order => (
                            <div key={order.id} className='card'>
                                <button 
                                type='button' 
                                className='del_card'
                                onClick={() => handleDeleteOrder(order.id)}
                                >
                                    x
                                </button>
                                <h3>{order.drinkType}</h3>
                                <p>Extrahot: {order.extrahot}</p>
                                <p>Sugars: {order.sugars}</p>
                            </div>
                        ))}
                    </div>
                    <div className='foot_list'>
                        <div className='input_money'>
                            <label>Money that comes in</label>
                            <input
                                type="number"
                                inputMode="decimal"
                                step="any"
                                style={{
                                    appearance: "textfield"
                                }}
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                            />
                        </div>        

                        <div className='btn_list'>
                            <button className='btn_prepare' type="button" onClick={handlePrepare}>Prepare</button>
                        </div>

                        <div className='message_trans'></div>

                        <button className='btn_back' type="button" onClick={handleBack}>Back</button>
                        <div className='message_list '>
                            {message && <p className={`messages_p ${classMessageList}`} >{message}</p>}
                        </div>
                    </div>
                    <div className='total_cost'>
                        <p>The cost your order is: {additionOrder.toFixed(1)}</p>
                    </div>
                    
                </div>
            </div>
            {showCheckOrder && <CheckOrder/>}
        </div>
    );
  }

export default OrderList;