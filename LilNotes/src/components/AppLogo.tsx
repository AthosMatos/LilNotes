import React from 'react';

const AppLogo = () => 
{
    return (
        <div 
        style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '2.8rem',
        }}>
            <p 
            style={{
                fontSize: '2.8vw',
            }}>{`Lil' Notes`}</p>
            <div 
            style= {{
                display: 'flex',
                alignSelf: 'flex-end',
                fontSize:'1.3vw' 
            }}>
                <p>by&nbsp;</p>
                <p style={{ color: '#FF0099'}}>Athos</p>
            </div>
        </div>
    );
};

export default AppLogo;