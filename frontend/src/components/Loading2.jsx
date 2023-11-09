import React from 'react';
import ImgLoading2 from '../img/logo_coffeeMachine.png'
import '../css/loading2.css'

function Loading2() {
    return (
        <>
        <div className='bg_log'>
            <div className=''>
                <div className=''>
                    <img className='size_img_logo' src={ImgLoading2} alt='logo coffee machine'/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Loading2;