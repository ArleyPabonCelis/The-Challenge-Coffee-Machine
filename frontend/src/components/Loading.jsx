import React from 'react';
import ImgLoading from '../img/loading_logo.png'
import '../css/loading.css'


function Loading() {
    return (
        <>
        <div className='bg_black'>
            <div className='divDad'>
                <div className='divSon'>
                    <img className='size_img' src={ImgLoading} alt='logo load coffee machine'/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Loading;