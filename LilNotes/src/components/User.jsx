import { FaUserAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import server from "./server";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const User = (props) => 
{
    const [showUser, setShowUser] = useState(false);
    const [user, setUser] = useState('root');
    const [password, setPassword] = useState('root');

    function login(usr,pass)
    {
        server.login(usr?usr:user, pass?pass:password).then((res) =>
        {
            toast.success(`loged as ${usr?usr:user} with pass ${pass?pass:password}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            props.setLogedIn(true);
            setShowUser(false);

            if(!usr && !pass)
            {
                localStorage.setItem('user', usr?usr:user);
                localStorage.setItem('password', pass?pass:password);
            }
        }).catch((err) =>
        {
            console.log(err);
            toast.warn('Wrong Credentials', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
    }
    
    useEffect(() =>
    {
        if(localStorage.getItem('user') && localStorage.getItem('password'))
        {
            const usr = localStorage.getItem('user');
            const pass = localStorage.getItem('password');

            setUser(usr);
            setPassword(pass);
            login(usr,pass)
        }
        else 
        {
            setShowUser(true);
        }
    },[])

    return (
        <div 
        style={{
            position: 'absolute',
            right: '4rem',
            top: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <motion.div 
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
            onClick={() => setShowUser(!showUser)}
            style={{
                cursor: 'pointer',
                backgroundColor: 'blue',
                borderRadius: '500rem',
                width: '3vw',
                height: '3vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <FaUserAlt size='1.4vw' color='white'/>
            </motion.div>
            
            <motion.div 
            initial={false}
            animate={{
                
                clipPath: showUser ? 'circle(100% at 50% 50%)' : 'circle(0% at 50% 50%)',
            }}
            style={{
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                //border: '4px solid black',
                backgroundColor: '#f5f5f5',
                height: '10vw',
                borderRadius: '1vw',
                width: '15vw',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '3px 6px 10px rgba(0, 0, 0, 1)',
            }}>
                <div style={{
                    display: 'flex',
                 
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <p style={{ fontSize: '1.5vw', }}>User:&nbsp;[</p>
                    <p 
                    suppressContentEditableWarning
                    style={{
                        maxWidth: '80%',
                        fontSize: '1.5vw',
                        cursor: 'pointer',
                    }}
                    contentEditable 
                    onBlur={(e)=>setUser(e.currentTarget.innerText)}
                    >
                        {user}
                    </p>
                    <p style={{ fontSize: '1.5vw', }}>]</p>

                </div>
                
                <div style={{
                    display: 'flex',
                    
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <p style={{ fontSize: '1.5vw', }}>Pass:&nbsp;[</p>
                    <p 
                    suppressContentEditableWarning
                    style={{
                        maxWidth: '80%',
                        fontSize: '1.5vw',
                        cursor: 'pointer',
                    }}
                    contentEditable 
                      onBlur={(e)=>setPassword(e.currentTarget.innerText)}
                    >
                        {password}
                    </p>
                    <p style={{ fontSize: '1.5vw', }}>]</p>
                </div>
                
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    width: '100%',

                }}>
                    <motion.div
                    whileTap={{scale:0.9}} 
                    onClick={() => localStorage.clear()}
                    style={{
                        marginTop: '1rem',
                        cursor: 'pointer',
                        backgroundColor: 'red',
                        borderRadius: '0.8rem',
                        width: '6vw',
                        height: '3vw',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                    }}>
                        <p style={{
                            color: 'white',
                            fontSize: '1.1vw',
                        }}>Reset</p>
                    </motion.div>

                    <motion.div
                    whileTap={{scale:0.9}} 
                    onClick={() => login()}
                    style={{
                        marginTop: '1rem',
                        cursor: 'pointer',
                        backgroundColor: 'blue',
                        borderRadius: '0.8rem',
                        width: '6vw',
                        height: '3vw',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     
                    }}>
                        <p style={{
                            color: 'white',
                            fontSize: '1.1vw',
                        }}>Confirm</p>
                </motion.div>
                </div>
                

            </motion.div>

            <ToastContainer />
        </div>
    );
};

export default User;