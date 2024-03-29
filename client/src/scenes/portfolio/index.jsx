import { Box, useTheme, IconButton, useMediaQuery, Typography } from "@mui/material";
import Navbar from "../navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';


const Portfolio = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const { user } = useParams();
  const [socket] = useState(() => io());
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();


  const reloadCrypto = () => {
    let listToSend = cryptoList[0].cryptoName
    let arrayToSend = [cryptoList[0].cryptoName]
    for(let i = 1; i < cryptoList.length; i++) {
        listToSend = listToSend + "," + cryptoList[i].cryptoName
        arrayToSend = [...arrayToSend, cryptoList[i].cryptoName]
    }
    

    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=' + listToSend + '&vs_currencies=usd')
    .then((res) => {
        const priceList = res.data
        console.log(res)
        for(var i = 0; i < cryptoList.length; i++){
            let cryptoPriceToGet = arrayToSend[i]
            let cryptoPrice = priceList[cryptoPriceToGet].usd
            axios.put(`/api/cryptowatcher/${cryptoList[i]._id}`, {
                cryptoPrice
            }).then(res => {
                console.log(res.data);
                getUserData()
              }
              )
            .catch(err => {console.log("Error on submission", err)});
            }
        setTimeout(1200)
    }).catch( err => console.log(err, "Error in reloading Prices"))

};

  const deleteCrypto = (cryptoID) => {
    axios.delete('/api/cryptowatcher/' + cryptoID)
    .then((res) => {
        const newCryptos = cryptoList.filter( (crypto) => crypto._id !== cryptoID);
        setCryptoList(newCryptos)
        
    }).catch(err => {console.log(err)});

    socket.emit('deleteCrypto', cryptoID)
};

const getUserData = async() => {
    axios.get(`/api/crypto-by-user/${user}`, {withCredentials: true})
        .then((res) => {
            setCryptoList(res.data.CryptoWatchers);
        }).catch(err => console.log(err));

  };



socket.on('cryptoDeleted', (deletedCrypto) => {
  setCryptoList(cryptoList.filter((crypto) => crypto._id !== deletedCrypto))
});



  useEffect(() => {
    socket.on('connection', ()=> {
      console.log('Connected to socket')
  });
    getUserData();
    return () => socket.disconnect(true);

}, []);// eslint-disable-line 


 
  return (
    <Box>
      <Navbar/>
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <>
          <Box display="flex" m="4em 0 0 0" justifyContent="center" fontSize="1.5em">
            
            <IconButton onClick={(e) => reloadCrypto()}>
            <Typography 
            variant="h5"
            fontWeight="500"
            sx={{
              margin: "0 1em"
            }}>
              Reload Prices
            </Typography>
              <ReplayOutlinedIcon />
            </IconButton>
          </Box>
          
          <Box display="flex" m="4em 0" justifyContent="center" fontSize="1.5em">
          
          <table style={{
            borderSpacing: "2em"
          }}>
                <tr >
                    <th style={{
            borderBottom: `1px solid ${palette.grey[600]}`,
            borderSpacing: "2em"
          }}>Crypto</th>
                    <th style={{
            borderBottom: `1px solid ${palette.grey[600]}`,
            borderSpacing: "2em"
          }}>Price</th>
           {isNonMobileScreens &&
           <th style={{
            borderBottom: `1px solid ${palette.grey[600]}`,
            borderSpacing: "2em"
          }}>Owned</th>
           }
                    
                    <th style={{
            borderBottom: `1px solid ${palette.grey[600]}`,
            borderSpacing: "2em"
          }}>Actions</th>
                    
                </tr>
                {cryptoList.map((crypto) => {
                  let price = 0;
                  if (crypto.cryptoPrice > 0.05){
                    price = crypto.cryptoPrice.toFixed(2)
                  } else { price = crypto.cryptoPrice.toFixed(3) }
                    return(
                        // eslint-disable-next-line react/jsx-key
                        <tr key = {crypto.cryptoName}>
                            <td>{crypto.cryptoName.toUpperCase()}</td>
                            <td>$ {price} </td>
                            {isNonMobileScreens && 
                            <td>$ {(crypto.cryptoQuantity * crypto.cryptoPrice).toFixed(2)}</td>
                            }
                            <td>
                              <Box
        display="flex"
        justifyContent= "space-between"
        alignItems= "center"
        >
          <IconButton onClick={() => deleteCrypto(crypto._id)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
          <IconButton onClick={() => navigate(`/edit/${user}/${crypto._id}`)}>
            <BorderColorOutlinedIcon />
          </IconButton>
        </Box>
                            </td>                            
                        </tr>
                    )
                })}
            </table>
          </Box>
          </>
      </Box>
      
    </Box>
  )
}

export default Portfolio;