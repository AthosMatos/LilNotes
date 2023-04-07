import AppLogo from './components/AppLogo';
import React, {useEffect} from 'react';
import Notes2 from './components/Notes2';
import User from './components/User';

function App() 
{
  const [logedIn, setLogedIn] = React.useState<boolean>(false);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        marginTop: '2.8rem',
        marginBottom: '3rem',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <AppLogo/>

        <User logedIn = {logedIn} setLogedIn={setLogedIn}/>

      </div>

      <Notes2 logedIn = {logedIn}/>
    </div>
  );
}

export default App;
