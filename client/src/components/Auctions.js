import { useState,useEffect } from "react";
import { ethers } from "ethers";
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar";

import './Auction.css'

export const shortenAddress = (address) => {
  return `${address.substring(0, 5)}...${address.substring(
  address.length - 4,
  address.length
  )}`;
}

const Auctions = ({state,setid}) => {
     const [auctions,setAuctions]=useState([]);
     const {contract}= state;
     // const [data,setData]=useState("");

     useEffect(()=>{
          const showAuc=async()=>{
               const auctions=await contract.showAuctions();
               setAuctions(auctions);
               console.log(auctions);
          }
          contract && showAuc();
     },[contract])

     const clicked=()=>{
          console.log("hue");
     }

     const changeToInt=(_x)=>{
          const x= ethers.utils.formatEther(_x)*(10**18);
          return x;
     }


  return (
    <div>
      <Sidebar/>
      <h1>Auctions</h1>
      <div className="auctionsContainer">
      {
          auctions
               .slice(0)
               .reverse()
               .map((auction)=>{
               return(
                    <div>
                    
                    <table key={auction.AuctionId}>
                    <tbody>
                    <tr>
                    
                        <div className="auctionImgContainer">
                         <div className="auctionImg">
                         <img 
                              src={`https://gateway.pinata.cloud/ipfs/${auction.hash.substring(6)}`}
                              alt="new"
                         />
                         </div>
                        
                          <Link to="/show">
                         <button onClick={()=>{setid(changeToInt(auction.AuctionId))}}>
                   
                              View
                   
                    </button>
                    </Link>
                         </div> 
                         <hr/>
                        <div className="auctionDataContainer">
                        <td className="etherData"><div className="etherId">{shortenAddress(auction.auctionStarter)}</div></td>
                        <td className="bidPrice">$ {Math.round(ethers.utils.formatEther(auction.startBidPrice)*(10**18))}</td><br/>
                         
                         <td className="auctionAbout">{auction.about}</td><br/>
                         <td className="etherData"><div className="etherId">{shortenAddress(auction.highestBidder)}</div></td>
                        
                         <td className="buyPrice">$ {Math.round(ethers.utils.formatEther(auction.highestBid)*(10**18))}</td><br/>
                         <td >
                              {new Date(auction.startTime*1000).toLocaleString()}
                         </td><br/>
                         {/* <Link to={/Auction} state={"hello"}> */}
                         <td className="auctionStatus" style={auction.auctionActive ? {color:"rgb(0, 255, 60)"} : {color:"red"} }>{auction.auctionActive ? "ongoing" : "ended "}</td>
                         {/* </Link> */}
                         {/* <td className="etherData"><div className="etherId">{auction.owner}</div></td> */}

                        </div>
                        
                    </tr>
                    </tbody>
                    </table>
                    </div>
               )
          }
          )
      }
      </div>
      
    </div>
  )
}

export default Auctions
