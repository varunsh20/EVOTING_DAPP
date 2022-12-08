import { Link } from "react-router-dom";
import { createContext, useState } from 'react';
import Election from '../artifacts/contracts/Election.sol/Election.json'
import {TailSpin} from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FormState = createContext();
const ethers = require("ethers")

export default function ElectionPage(){

    let s,e
    const [form,setForm] = useState({
        name:"",
        description:"",
        candidate1:"",
        candidate2:"",
        candidate3:"",
        time:"",
    })
    const [loading,setLoading] = useState(false);
    const [address,setAddress] = useState("");
    const [err, setError] = useState(false);


    const FormHandler = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
   
    const startCampaign = async(e)=>{
        if(typeof window.ethereum=="undefined"){
            setError(true);
            console.log("MetaMask is not installed.")
        }
        else{
            e.preventDefault();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const providers = new ethers.providers.JsonRpcProvider(
                process.env.REACT_APP_RPC_URL
            );


            if(form.name === "") {
                toast.warn("Name Field Is Empty");
            } 
            else if(form.description === "" ) {
                toast.warn("Description Field Is Empty");
            } 
            else if(form.candidate1 === "") {
                toast.warn("Candidate number One Field Is Empty");
            } 
            else if(form.candidate2 === "") {
                toast.warn("Candidate number Two Field Is Empty");
            } 
            else if(form.candidate3 === "") {
                toast.warn("Candidate number Three Field Is Empty");
            } 
            else if(form.time === "") {
                toast.warn("Days field Is Empty")
            }

            else {  
                setLoading(true);

                const contract = new ethers.Contract(
                    process.env.REACT_APP_ELECTION_ADDRESS,
                    Election.abi,
                    signer
                );
                const contracts = new ethers.Contract(
                    process.env.REACT_APP_ELECTION_ADDRESS,
                    Election.abi,
                    providers
                );

                const campaignData = await contract.createElection(
                    form.name,
                    form.description,
                    form.candidate1,
                    form.candidate2,
                    form.candidate3,
                    form.time
                );

                await campaignData.wait();
                s = await contracts.s_electionId();
                console.log(s.toNumber());
                e = await contracts.Elections(s.toNumber()-1);
                console.log(e);
                setAddress(e);
            }
        }
    }

    if(loading===true && address==="") {
    return(
        <div className="header">
            <div className="spinner">
                <TailSpin height={60}></TailSpin>
            </div>
        </div>
        );
    }
    else if(loading===true && address!==""){
        return(
        <div className="success">
            <h2>Campaign Started Successfully!</h2>
            <h3>{address}</h3>
                <button className="cbutton">
                <Link to = "/vote">Go To Campaign</Link>
                </button>
        </div>
        );
    }
    else{
        return(
        <FormState.Provider value = {{form,setForm,FormHandler,startCampaign}}>
        <div className="header">
            <div className="cont">
                <h3><u> Please fill out the following details to start a new campaign</u></h3>
            </div>
        </div><div className="content">
                <form action="#">
                    <div className="field">
                        <span className="fa fa-user"></span>
                        <input  type="text" onChange={FormHandler} value = {form.name} required="required"  placeholder="Election Title" name="name" />
                    </div>
                    <div className="field space">
                        <span className="fa fa-lock"></span>
                        <input type="text" onChange={FormHandler} value = {form.description} className="pass-key" required placeholder="Election Description" name="description"/>
                    </div>

                    <div className="field space">
                        <span className="fa fa-lock"></span>
                        <input onChange={FormHandler} value = {form.candidate1} required placeholder="First Candidate's Name" name="candidate1" />
                    </div>
                    <div className="field space">
                        <span className="fa fa-lock"></span>
                        <input type="text" onChange={FormHandler} value = {form.candidate2} required placeholder="Second Candidate's Name" name="candidate2" />
                    </div>
                    <div className="field space">
                        <span className="fa fa-lock"></span>
                        <input type="text" onChange={FormHandler} value = {form.candidate3} required placeholder="Third Candidate's Name" name="candidate3" />
                    </div>
                    <div className="field space">
                        <span className="fa fa-lock"></span>
                        <input type="number" onChange={FormHandler} value = {form.time} required placeholder="Deadline (in days)" name="time"/>
                    </div>
                    <button className="sbmt" onClick={startCampaign}>SUBMIT</button>
                </form>
            </div>
            <ToastContainer/>
            </FormState.Provider>
    );
    }
}