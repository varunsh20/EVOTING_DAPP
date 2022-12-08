const {expect} = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Tests for Voting Contract",()=>{
    let voting;
    let owner,addr1,addr2,addr3;
    
    beforeEach(async ()=>{
        voting = await ethers.getContractFactory("Voting");
        [owner,addr1,addr2,addr3,addr4] =  await ethers.getSigners();
        votingDeploy = await voting.deploy("Captain","Choose your captain","addr1","addr2","addr3",2);
        await votingDeploy.deployed();
    });

    describe("Checking functions",()=>{
        it("Checke for the right owner",async ()=>{
            expect(await votingDeploy.i_owner()).to.equal(owner.address);
        })  

        it("Checks whether vote has been casted",async()=>{
            await votingDeploy.connect(addr4).vote(1);
            expect(await votingDeploy.voters(addr4.address)).to.equal(true);
        })

        it("Checks for the winner",async ()=>{
            await votingDeploy.connect(addr4).vote(1);
            const unlock = (await time.latest()) + 48*60*60;
            //Increases the current block time to time after two days
            await time.increaseTo(unlock);
            const [id,name] = await votingDeploy.winner();
            //console.log(id.toNumber());
            expect(id.toNumber()).to.equal(1);
        })

    })


})