import React from 'react'
import { ethers } from "ethers";
import { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar";

import './ShowAuction.css'

export const shortenAddress = (address) => {
     return `${address.substring(0, 5)}...${address.substring(
     address.length - 4,
     address.length
     )}`;
}

const ShowAuction = ({state,id}) => {
     const {contract}= state;
     // console.log(id);
     // console.log(contract);
     const [data, setdata] = useState([]);
     const [auctionStarter, setAuctionStarter] = useState(null);
     const [about,setAbout] = useState("");
     const [startBidPrice, setStartBidPrice] = useState(null);
     const [highestBidder, setHighestBidder] = useState(null);
     const [highestBid, setHighestBid] = useState(null);
     const [startTime, setStartTime] = useState(null);
     const [auctionActive, setAuctionActive] = useState(null);
     const [owner, setOwner] = useState(null);
     const [hash1, setHash1] = useState("");
     const [events, setEvents] = useState(null);

     const changeToInt=(_x)=>{
          const x= ethers.utils.formatEther(_x)*(10**18);
          return x;
     }
     
     useEffect(()=>{
          const getData=async()=>{
               const data=await contract.auctions(id);
               setdata(data);
               setAuctionStarter(data.auctionStarter);
               setAbout((data.about));
               setStartBidPrice(changeToInt (data.startBidPrice));
               setHighestBidder(data.highestBidder);
               setHighestBid(changeToInt(data.highestBid));
               setStartTime(changeToInt (data.startTime));
               setAuctionActive(data.auctionActive);
               setOwner(data.owner);
               setHash1(data.hash);
               const allEvents=await contract.showEvents(id);
               setEvents(allEvents);
          }
          contract && getData();
     },[contract])

     const getData=async()=>{
          const data=await contract.auctions(id);
          setdata(data);
          setAuctionStarter(data.auctionStarter);
          setAbout((data.about));
          setStartBidPrice(changeToInt (data.startBidPrice));
          setHighestBidder(data.highestBidder);
          setHighestBid(changeToInt(data.highestBid));
          setStartTime(changeToInt (data.startTime));
          setAuctionActive(data.auctionActive);
          setOwner(data.owner);
          setHash1(data.hash);
          const allEvents=await contract.showEvents(id);
          setEvents(allEvents);
     }

     const bid=async()=>{
          // e.preventDefault();
          const bidValue=document.getElementById("bid1").value;
          console.log(bidValue);
          try{
               const tx=await contract.bid(id,bidValue);
               await tx.wait();
               console.log("Bid placed");
               alert("Bid Placed");
               // window.location.reload();
          }
          catch{
               console.log("Bid Failed");
          }
     }

     const buyBid=async()=>{
          try{
               console.log("Buy Bid");
               const tx=await contract.PayToBuy(id,{value:highestBid});
               await tx.wait();
               console.log("Bid Bought");
               alert("Bid Bought")
          }catch{
               alert("Cant buy bid");
          }
     }

     const endAuction=async()=>{
          try{
               const tx=await contract.endBid(id);
               await tx.wait();
               console.log("Auction ended");
               alert("Auction Ended");
               // window.location.reload();
          }catch{
               alert("U cant end Auction");
          }
     }

     const showEvents=async()=>{
          const allEvents=await contract.showEvents(id);
               setEvents(allEvents);
          // console.log(events);
     }

     

     useEffect(()=>{
          showEvents();
          getData();
     })

  return (
     <>


<Sidebar />
    <div className='showAuctionContainer'>
         
      <div className="showDetail">
      <div className="showDetailImg">
      <img
          src={`https://gateway.pinata.cloud/ipfs/${hash1.substring(6)}`}
          alt="new"
      ></img>
     
      </div>
      <hr />
      <div className="showDetailContainer">
      <ul >
       
       <li>ID:{id}</li>
       <li>Auction Started By:{auctionStarter}</li>
       <li>Description: {about}</li>
       <li>Start Price: {startBidPrice}</li>
       <li>Highest Bidder till Now:{highestBidder}</li>
       <li>Highest Bid:{highestBid}</li>
       <li>
         Date of starting of auction:
         {new Date(startTime * 1000).toLocaleString()}
       </li>
       <li>Status:{auctionActive ? "Auction Active" : "Auction Closed"}</li>
       <li>Present Owner:{owner}</li>
     </ul>
      </div>
      </div>
      
      <div>
        <input type="text" id="bid1" placeholder="Bid Value" />
        <button onClick={() => bid()}>Place bid</button>
        <br />
      </div>
      <div>
        (Only by creator of the auction)
        <button onClick={() => endAuction()}>End Auction</button>
      </div>
      <div>
        <button onClick={() => buyBid()}>Buy Bid</button>
      </div>
      {/* <div>
        <button onClick={() => showEvents()}>Show Events</button>
      </div> */}
      <div>
        <h2>Details of the Auction</h2>
        {events &&
          events
            .slice(0)
            .reverse()
            .map((event) => {
              return (
                <div>
                  <table key={event.Time} className="showAuctionTable">
                    <tr>
                      <td className="etherData"><div className="etherId">{shortenAddress(event.Bidder)}</div></td>

                      <td>{changeToInt(event.price)}</td>
                      
                      <td>
                        {new Date(
                          changeToInt(event.Time) * 1000
                        ).toLocaleString()}
                      </td>
                      <td>
                        {event.about == "bid" ? "bid done" : event.about}
                      </td>
                    </tr>
                  </table>
                </div>
              );
            })}
      </div>
    </div>
    </>
  );
}

export default ShowAuction
