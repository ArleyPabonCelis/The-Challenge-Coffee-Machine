import React, { useEffect } from 'react';
import ImgLoading2 from '../img/logo_coffeeMachine.png'


function CheckOrder() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.location.reload();
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

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
                    <h1>SI FUNCIONA</h1>
                </div>
            </div>
        </div>
        </>
    );
}

export default CheckOrder;