import React from 'react';
import '../css/orderform.css';
import ImgLoading2 from '../img/logo_coffeeMachine.png'


function OrderForm() {
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
                                <select className='option_drink'>
                                    <option value="coffee" selected>Coffee</option>
                                    <option value="Tea">Tea</option>
                                    <option value="Chocolate">Chocolate</option>
                                </select>
                            </div>

                            <div className='choose_sugar'>
                                <div className='option_sugar'>
                                    <label>Amount of sugar</label>
                                    <input type="number" />
                                </div>
                                <div className='option_extrahot'>
                                    <label>Extrahot</label>
                                    <select className='yes_no'>
                                        <option value="no" selected>No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </div>
                            </div>

                            <div className='enter_money'>
                                <div className='input_money'>
                                    <label>Money that comes in</label>
                                    <input type="text" />
                                </div>
                                <div className='btn_clean'>
                                    <button>Clean</button>
                                </div>
                            </div>

                            <div className='btn_submit'>
                                <button>Prepare</button>
                            </div>
            

                        </form>
                    </div>
                    <div className='body_chart'>
                        <h2>List of prices</h2>
                        <ul>
                            <li>Tea: 0.4</li>
                            <li>Coffee: 0.5</li>
                            <li>Chocolate: 0.6</li>
                        </ul>
                        <p>Choose your favorite</p>
                    </div>

                </div>
            </div>
        </div>
        </>
    );
}

export default OrderForm;