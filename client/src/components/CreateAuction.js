import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Auctions from "./Auctions";
import Sidebar from "./Sidebar";

const CreateAuction = ({ state, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  // const [ImgHash,setImgHash]=useState("");

  const newAuction = async (e) => {
    e.preventDefault();
    const { contract } = state;
    const description = document.getElementById("description").value;
    const startPrice = document.getElementById("startPrice").value;
    console.log(description, startPrice);
    let imh = "";

    if (file) {
      try {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `dd41c64a3d7436504778`,
            pinata_secret_api_key: `27e3fd3d1caff47b2a1c34e445455c19069518b3ff616ad07a303cbe778afeb9`,
            "Content-Type": `multipart/form-data`,
          },
        });
        imh = `ipfs://${resFile.data.IpfsHash}`;
        // setImgHash(imh);
        console.log(imh);

        //   contract.add(account,ImgHash);
        alert("Sucessfully image uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch {
        alert("Unable to upload image to pinata");
      }
    }
    //    console.log(ImgHash);
    const tx = await contract.startAuction(description, startPrice, imh);
    await tx.wait();
    console.log("Auction Created");
    console.log(description, startPrice, imh);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    console.log(data);

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };

    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <>
      <Sidebar />

      <div
        className="min-h-screen py-40"
        style={{
          color: "black",
          backgroundColor: "#282c34",
          // backgroundImage: "linear-gradient(to right top, #282c36, #252943, #2a244e, #371953, #490053)",
        }}
      >
      <div className='blur' style={{backgroud:"blue"}}></div>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overlow-hidden">
            <div
              className="w-full lg:w-1/2
              flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://d32ijn7u0aqfv4.cloudfront.net/wp/wp-content/uploads/raw/bitcoin-cryptocurrency-vault-safelock_SOIN20003_905168316_is_1560x880.jpg)",
              }}
            >
            
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Create New Auction</h2>
              <form onSubmit={newAuction}>
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    id="description"
                    placeholder="Auction Description"
                    className="border border-gray-400 py-1 px-2"
                  />
                  <input
                    type="text"
                    id="startPrice"
                    placeholder="Auction Start Price"
                    className="border border-gray-400 py-1 px-2"
                  />
                </div>
                <br />
                <div>
                  <input
                    disabled={!state}
                    type="file"
                    id="file-upload"
                    name="data"
                    style={{ display: "none" }}
                    onChange={retrieveFile}
                  />
                  <label
                    htmlFor="file-upload"
                    className="choose text-black h-60 w-250 bg-gray-400 text-2xl"
                    disabled={!account}
                  >
                    <i className="material-icons">add_photo_alternate</i>&nbsp;
                    Choose a Image
                  </label>
                  <br />
                </div>
                <div className="mt-5">
                  <input
                    type="checkbox"
                    className="border border-gray-400"
                  ></input>
                  <span>
                    I accept the
                    
                      terms of use
                    
                    and
                   
                      Privacy Policy
                  
                  </span>
                </div>
                <div className="mt-5">
                  <button
                    type="Submit"
                    className="w-full bg-black py-3 text-center text-white"
                    disabled={!state.contract}
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Link to="/auctions">
              <button className="text-black text-3xl mt-12 rounded-md">
                 Show Auctions
              </button>
      </Link>
      </div>
      
    </>
  );
};

export default CreateAuction;
