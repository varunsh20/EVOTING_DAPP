import Election from '../artifacts/contracts/Election.sol/Election.json'
import Voting from '../artifacts/contracts/Voting.sol/Voting.json'
import {TailSpin} from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState,useEffect} from 'react';
const ethers = require("ethers")


export default function Vote(){

    const [Contents,setContents] = useState([]);
    const [tme,setTme] = useState();
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        async function getStats(){
            const provider = new ethers.providers.JsonRpcProvider(
                process.env.REACT_APP_RPC_URL
            );
          
            const contract = new ethers.Contract(
                process.env.REACT_APP_ELECTION_ADDRESS,
                Election.abi,
                provider
            );

            setTme((await provider.getBlock("latest")).timestamp);
            const getAllCampaigns = contract.filters.campaignCreated();
            const AllCampaigns = await contract.queryFilter(getAllCampaigns);
            const AllData = AllCampaigns.reverse();
            const Content = AllData.map((e) => {
              return {
                name: e.args.cname,
                description: e.args.cdescription,
                c1: e.args.ccandidate1,
                c2: e.args.ccandidate2,
                c3: e.args.ccandidate3,
                life: e.args.ttime.toNumber()
              }
            });
            setContents(Content);
            setLoading(false);
              
        }  
        getStats();
    },[])
    const Vote = async (ind,cand) => {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if(accounts.length==0){
            toast.error("Please Connect Your Wallet", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else{
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          const providers = new ethers.providers.JsonRpcProvider(
            process.env.REACT_APP_RPC_URL
        );
          
        const contract = new ethers.Contract(
            process.env.REACT_APP_ELECTION_ADDRESS,
            Election.abi,
            providers
        );

        const len = await contract.s_electionId();  
        const add = await contract.Elections(len-(ind+1));
          const Vote_Contract = new ethers.Contract(
            add, 
            Voting.abi, 
            signer);
          
          const transaction = await Vote_Contract.vote(cand);
          await transaction.wait();
          toast.success("Voted Successfully!");
        }
      } catch (error) {
          toast.warn("You have already Voted on this campaign.");
        }
        
      }
      
      const winners = async(ind) =>{

        try {
            const provider = new ethers.providers.JsonRpcProvider(
                process.env.REACT_APP_RPC_URL
            );
                
            const contract = new ethers.Contract(
                process.env.REACT_APP_ELECTION_ADDRESS,
                Election.abi,
                provider
            );
      
            const len = await contract.s_electionId();  
            const add = await contract.Elections(len-(ind+1));
                
            const Vote_Contract = new ethers.Contract(
                add, 
                Voting.abi, 
                provider);

            const transaction = await Vote_Contract.winner();
            const c = transaction[0].toNumber();
            const i = transaction[1];
            toast(<div>The Winner of this Campaign is "{i}" with ID - {c}.</div>);
        }
        catch(error){ 
            console.log(error);
        }
    }
    return(
            <div className="header">
                <div className="cont">
                    <h2> <u>Cast Your Vote </u></h2>
                </div>
                <h4><u> (Note - You Can Only Vote Once On a Particular Campaign) </u></h4>
                {loading? <div className="spinner">
                <TailSpin height={60}></TailSpin>
            </div>:
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Vote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Contents.map((e,index) =>{
                            return(
                        <tr>
                            <td>{index+1}</td>
                            <td>{e.name}</td>
                            <td>{e.description}</td>
                            <td>
                                {tme>=e.life?
                                   <button className="wbtn" onClick={e=>winners(index)}>
                                    See Winner
                                    </button>
                                :(<>
                                    <div className="radio">
                                        <label><input type="radio"  value="0" onChange={e=>Vote(index,e.target.value)}/>{ e.c1}</label>
                                    </div>
                                    <div className="radio">
                                        <label><input type="radio" value="1" onChange={e=>Vote(index,e.target.value)}/>{ e.c2}</label>
                                    </div>
                                    <div className="radio">
                                        <label><input type="radio" value="2" onChange={e=>Vote(index,e.target.value)}/>{ e.c3}</label>
                                    </div>
                                    </>
                                )}
                            </td>
                        </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                }
                <ToastContainer/>
            </div>
        );
}

   


