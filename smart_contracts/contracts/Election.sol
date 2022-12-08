// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;
import './Voting.sol';

contract Election {

    uint public tme;
    event campaignCreated(
        string cname,
        string cdescription,
        string ccandidate1,
        string ccandidate2,
        string ccandidate3,
        uint indexed ttime
    );

    uint public s_electionId = 0;
    mapping (uint => address) public Elections;

    function createElection (string memory _name,string memory _description,string memory _candidate1,string memory _candidate2,string memory _candidate3,uint _time) public {
        Voting campaign = new Voting(_name , _description, _candidate1,_candidate2,_candidate3,_time);
        Elections[s_electionId] = address(campaign);
        s_electionId++;
         tme = block.timestamp + _time*1 days;
        emit campaignCreated(_name,_description,_candidate1,_candidate2,_candidate3,tme);
    }
}




