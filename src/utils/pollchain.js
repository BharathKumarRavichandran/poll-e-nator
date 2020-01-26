const axios = require('axios');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

const getUserContract = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/build/contracts/UserManager.json');
    let userContractAddress = '0xFD9aFBe646e6173360067fa32F485b1693fc9345';
    let userContractJSON = response.data;
    var contractABI = userContractJSON.abi;
    var userContract = new web3.eth.Contract(contractABI, userContractAddress);
    return userContract;
  } catch (error) {
    console.error(error);
  }
}

const createUser = async (name) => {
  try {
    let fromAddress = localStorage.getItem('PollenatorUser');
    var contract = await getUserContract();

    let isLocked = await checkIsAccountLocked();
    if(isLocked){
      return;
    }
    var transfer = await contract.methods.createUser(name).send({from: fromAddress});
    console.log(transfer);
    return;
    /*
    web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
      var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
        
      tran.on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation: ' + confirmationNumber);
      });
        
      tran.on('transactionHash', hash => {
        console.log('hash');
        console.log(hash);
      });
        
      tran.on('receipt', receipt => {
        console.log('reciept');
        console.log(receipt);
      });
        
      tran.on('error', console.error);
    });
    /*
        await web3.eth.personal.unlockAccount(address, password, 60000);
        const decryptedAccount = web3.eth.accounts.decrypt(keystore, 'PASSWORD');
        const rawTransaction = {
        "from": fromAddress,
        "to": contractAddress,
        "value": web3.utils.toHex(web3.utils.toWei("0.001", "ether")),
        "gas": 2000,
        "chainId": 3
        };
        decryptedAccount.signTransaction(rawTransaction)
        .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
        .then(receipt => console.log("Transaction receipt: ", receipt))
        .catch(err => console.error(err));
        // Or sign using private key from decrypted keystore file
        /*
        web3.eth.accounts.signTransaction(rawTransaction, decryptedAccount.privateKey)
        .then(console.log);
        */
  } catch(err) {
    console.log(err.toString());
  }
};

const registerUser = async (name, password) => {
  try {
    let response = await web3.eth.personal.newAccount(password);
    if(response.address){
      localStorage.setItem('PollenatorUser', response.address);
      console.log(localStorage.getItem('PollenatorUser'));
      await createUser(name);
    }
    console.log(response);
    return response;
  } catch(err) {
    console.error(err.toString());
  }
};

const loginUser = async (address,password) => {
  try {
    let response = await web3.eth.personal.unlockAccount(address, password, 600000);
    if(response){
      localStorage.setItem('PollenatorUser', address);
    }
    console.log(response);
    return response;
  } catch(err) {
    console.log(err.toString());
  }
};

const registerPoll = async (address) => {
  try {
    if(await checkIsAccountLocked()){
      return;
    }

    let fromAddress = localStorage.getItem('PollenatorUser');
    let userContract = await getUserContract();
    let transfer = await userContract.methods.registerForPoll(address).send({from: fromAddress});
    if (transfer) {
      // Successfully registered for poll, update list details
      // Registered poll address = address
    }
  } catch (err) {
    console.log(err.toString());
  }
}

const createPoll = async (pollName, shortDesc, longDesc, eligibility, startTime, endTime, revealTime, candidates) => {
  try {
    if(await checkIsAccountLocked()){
      return;
    }
    let fromAddress = localStorage.getItem('PollenatorUser');
    let userContract = await getUserContract();
    await userContract.methods.createNewPoll(pollName, shortDesc, longDesc, eligibility, candidates[0]).send({from: fromAddress});
    var newPollCreatedEvent = userContract.createdNewPoll();
    newPollCreatedEvent.watch( async (error, result) => {
      if (!error)
      {
        let ballotContract = await getBallotContract();
        let contract = ballotContract.at(result.args.poll);
        await contract.methods.setTimes(startTime, endTime, revealTime).send({from: fromAddress});
        // Successfully created poll, update list details 
        // Created poll address = result.args.poll
      } 
      else {
        console.log(error);
      }
    }) 
  } catch (err) {
    console.log(err.toString());
  }
}

const getBallotContract = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/build/contracts/Ballot.json');
    let ballotContractJSON = response.data;
    var contractABI = ballotContractJSON.abi;
    var ballotContract = new web3.eth.Contract(contractABI);
    return ballotContract;
  } catch (error) {
    console.error(error);
  }
}

const getAllPolls = async () => {
  try {
    if(await checkIsAccountLocked()){
      return;
    }
    let fromAddress = localStorage.getItem('PollenatorUser');
    let userContract = await getUserContract();
    let addresses = await userContract.methods.getAllPolls().call({from: fromAddress});
    let ballotContract = await getBallotContract();

    let allPollDetails = [];

    addresses.map( async (address) => {
      allPollDetails.push(getPollDetailsFromAddress(address, ballotContract));
    });
    return allPollDetails;
  } catch (err) {
    console.log(err.toString());
  }
}

const getRegisteredPolls = async () => {
  try {
    if(await checkIsAccountLocked()){
      return;
    }
    let fromAddress = localStorage.getItem('PollenatorUser');
    let userContract = await getUserContract();
    let addresses = await userContract.methods.getUserRegisteredPolls().call({from: fromAddress});
    let ballotContract = await getBallotContract();

    let registeredPollDetails = [];

    addresses.map( async (address) => {
      registeredPollDetails.push(getPollDetailsFromAddress(address, ballotContract));
    });

    return registeredPollDetails;
  } catch (err) {
    console.log(err.toString());
  }
}

const getMyPolls = async () => {
  try {
    if(await checkIsAccountLocked()){
      return;
    }
    let fromAddress = localStorage.getItem('PollenatorUser');
    let userContract = await getUserContract();
    let addresses = await userContract.methods.getUserCreatedPolls().call({from: fromAddress});
    let ballotContract = await getBallotContract();

    let createdPollDetails = [];

    addresses.map( async (address) => {
      createdPollDetails.push(getPollDetailsFromAddress(address, ballotContract));
    });

    return createdPollDetails;
  } catch (err) {
    console.log(err.toString());
  }
}

const getVotedPolls = async () => {
  try {
    if(await checkIsAccountLocked()){
      return;
    }
    let fromAddress = localStorage.getItem('PollenatorUser');
    let userContract = await getUserContract();
    let addresses = await userContract.methods.getUserVotedPolls().call({from: fromAddress});
    let ballotContract = await getBallotContract();

    let votedPollDetails = [];

    addresses.map( async (address) => {
      votedPollDetails.push(getPollDetailsFromAddress(address, ballotContract));
    });

    return votedPollDetails;
  } catch (err) {
    console.log(err.toString());
  }
}

const getPollDetailsFromAddress = async (address, ballotContract) => {
  let fromAddress = localStorage.getItem('PollenatorUser');
  let contract = ballotContract.at(address);
  let details = await contract.methods.getPollDetails().call({from: fromAddress});
  let detailsArr = details.split(';');
  return {
    creatorName: detailsArr[0],
    pollName: detailsArr[1],
    shortDesc: detailsArr[2],
    longDesc: detailsArr[3],
    eligibility: detailsArr[4],
    startTime: detailsArr[5],
    endTime: detailsArr[6],
    revealTime: detailsArr[7],
    candidate: [detailsArr[8], detailsArr[9]],
  };
}

const getTxnForPoll = async (address) => {
  try {
    if(await checkIsAccountLocked()){
      return;
    }
    let fromAddress = localStorage.getItem('PollenatorUser');
    let userContract = await getUserContract();
    let transfer = await userContract.methods.getTxnHashForPoll(address).call({from: fromAddress});
    // transfer contains the txnhash
  } catch (err) {
    console.log(err.toString());
  }
}

const updateTxnForPoll = async (address, hash) => {
  try {
    if(await checkIsAccountLocked()){
      return;
    }
    let fromAddress = localStorage.getItem('PollenatorUser');
    let userContract = await getUserContract();
    let transfer = await userContract.methods.updateTxnHashForPoll(address, hash).send({from: fromAddress});
    if (transfer){
      // succesfully updated hash
    }
  } catch (err) {
    console.log(err.toString());
  }
}

const voteForPoll = async (candidate, token, poll) => {
  try {
    if(await checkIsAccountLocked()){
      return;
    }
    let fromAddress = localStorage.getItem('PollenatorUser');
    let ballotContract = await getBallotContract();
    let contract = ballotContract.at(poll);
    let transfer = await contract.methods.voteToPoll(token, candidate).send({from: fromAddress})
      .on('transactionHash', (hash) => {
        updateTxnForPoll(poll, hash);
      })
    if (transfer){
      // Successfully updated txn hash for poll
    }
  } catch (err) {
    console.log(err.toString());
  }
}

const verifyVoteFromHash = async (hash) => {

}

const checkIsAccountLocked = async () => {
  try {
    let fromAddress = localStorage.getItem('PollenatorUser');
    console.log(fromAddress);
    /*
    await web3.eth.sendTransaction({
      from: fromAddress,
      to: fromAddress,
      value: 0
    });
    */
    return false;
  } catch (err) {
    console.log(err.toString());
    //localStorage.removeItem('PollenatorUser');
    return (err.message == 'authentication needed: password or unlock');
  }
}

export { 
  createPoll,
  createUser,
  getAllPolls,
  getBallotContract,
  getPollDetailsFromAddress,
  getRegisteredPolls,
  getMyPolls,
  getVotedPolls,
  getTxnForPoll,
  loginUser,
  checkIsAccountLocked,
  registerUser,
  registerPoll,
  updateTxnForPoll,
  voteForPoll
};