import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css'

const CryptoForm = ({user, setUser}) => {

    const [cryptoName, setCryptoName] = useState('');
    const [cryptoQuantity, setcryptoQuantity] = useState(0);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [cryptoList, setCryptoList] = useState([])

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true')
        .then((res) => {
            const list = []
            res.data.map((crypto) => list.push(crypto.id))
            setCryptoList(list)
        }).catch(err => console.log(err, "error in getting cryptos"));
    }, []);


    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:8000/api/cryptowatcher', {
            cryptoName,
            cryptoQuantity
        }, {withCredentials: true}).then(res => {
            console.log(res, "response");
            console.log(res.data, "response data")
            navigate(`/list/:${user.username}`)})
            .catch((err) => {
                console.log(err)
            });

    };

  return (
    <form onSubmit={onSubmitHandler}>
        <h1 className='stuff'>Crypto Add Form</h1>
        <p>
            <label className='stuff'>Crypto Name</label>
            <select className='input' value={cryptoName} name = "cryptoName" onChange={(e) => setCryptoName(e.target.value)}>
                {cryptoList.map((name) => {
                    return(
                        <option>{name}</option>
                    )
                })}
            </select>
        </p>
        <p>
            <label className='stuff'>Crypto Amount</label>
            <input className='input' type= 'number' step= '0.00000001' onChange = {(e)=>setcryptoQuantity(parseInt(e.target.value))}/>
        </p>
        <p>
        <button>Add Crypto</button>
        </p>
    </form>
  )
}

export default CryptoForm;
