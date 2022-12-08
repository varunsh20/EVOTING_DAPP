import { Link } from "react-router-dom";

export default function Body(){
    return(
        <div className="header">
            <div className="txt">
                 <h2> <u>Welcome To EVOTING DAPP...A Decentralized Approach!! </u></h2>
            </div>

           <div className="box">
            <div className="crd">
                    <h3 className="h-secondary center"><Link to = "/election">Add a New Campaign</Link></h3>
                    <p className="center">Create a new election campaign on a completely decentralized platform
                    and let the audience decide the winner fairly.</p>
        
            </div>
            <div className="crd">
                    <h3 className="h-secondary center"><Link to = "/vote">Cast Your Vote</Link></h3>
                    <p className="center">Cast your vote in any of the ongoing election campaigns and help in the process of electing an
                    appropriate candidate.</p>
            </div>
           </div>
           </div>
    );
}
