import {useState,useEffect} from 'react';
import './App.css';
import abi from "././contracts/auction.json";
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Auctions from './components/Auctions';
import CreateAuction from './components/CreateAuction';
import ShowAuction from './components/ShowAuction';
const {ethers} = require('ethers');

function App() {

  const [state,setState] = useState({
    provider:null,
    signer:null,
    contract:null,
  })

  const [account,setAccount] = useState('None');
  const [id,setId]=useState(0);


  useEffect(()=>{
    const connectWallet=async()=>{
      const contractAddress = "0xf49D6D7FB43B3702ed8cc7aa5A0f96446dA24C66";
      const contractABI=abi.abi;
      try{
        const {ethereum}=window;
        if(ethereum){
          const accounts=await ethereum.request({method:"eth_requestAccounts"});

          window.ethereum.on("chainChanged",()=>{
            // window.location.reload();
          })

          window.ethereum.on("accountsChanged",()=>{
            // window.location.reload();
            connectWallet();
          })
        
          const provider=new ethers.providers.Web3Provider(window.ethereum);
          const signer=provider.getSigner();
          const contract=new ethers.Contract(contractAddress,contractABI,signer);
          console.log(accounts[0]);
          setAccount(accounts[0]);
          setState({provider,signer,contract});
          console.log(state);
        }else{
          alert("please install metamask")
        }
      }
      catch{
        console.log("error");
      }
    };
    connectWallet();
  },[])
  console.log(state);


  function setIdfunc(_id){
    setId(_id);
  }



  return (
    
    <div className="App">
      <Navbar state={state} account={account}/>
      <div className='blur' style={{backgroud:"blue"}}></div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateAuction state={state} />} />
          <Route path="/auctions" element={<Auctions state={state} setid={setIdfunc}/>} />
          <Route path="/show" element={<ShowAuction state={state} id={id}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;