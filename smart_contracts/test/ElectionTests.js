const { ethers } = require("hardhat");
const {expect} = require("chai");

describe("Tests for election",()=>{
    let election
    let owner,addr1,addr2,addr3;
    beforeEach(async ()=>{
        election = await ethers.getContractFactory("Election");
        [onwer] = await ethers.getSigners();
        electionDeploy = await election.deploy();
        await electionDeploy.deployed(); 
    });

    describe("Checking Functions",()=>{
        it("Checks for creating a new campaign",async ()=>{
            await electionDeploy.createElection("Captain","Choose your captain","addr1","addr2","addr3",1);
            let num = await electionDeploy.s_electionId();
            //console.log(num);
            let a = await electionDeploy.Elections(0);
            //console.log(a);
            //console.log(num);
            //expect(await electionDeploy.Elections(0)).to.equal(1);
            expect(await electionDeploy.s_electionId()).to.equal(1);
        })

    })

})