const axios = require('axios');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

const getUserContract = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/build/contracts/UserManager.json');
    let userContractAddress = '0x0b778080ADD925759794e1b98F7a3cA59F387b9b';
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
    const fromAddress = localStorage.getItem('PollenatorUser');
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
      localStorage.setItem('PollenatorUser',response.address);
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
    let response = await web3.eth.personal.unlockAccount(address, password, 600);
    if(response){
      localStorage.setItem('PollenatorUser', address);
    }
    console.log(response);
    return response;
  } catch(err) {
    console.log(err.toString());
  }
};

const registerPoll = async () => {
  try {
    let account = localStorage.getItem('PollenatorUser');
    await web3.eth.sendTransaction({
      from: account,
      to: account,
      value: 0
    });
    return false;
  } catch (err) {
    console.log(err.toString());
    localStorage.removeItem('PollenatorUser');
    return (err.message == 'authentication needed: password or unlock');
  }
}

const createPoll = async () => {
  try {
    
  } catch (err) {
    console.log(err.toString());
  }
}

const getBallotContract = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/build/contracts/Ballot.json');
    let ballotContractJSON = response.data;
    var contractABI = ballotContractJSON.abi;
    var ballotContract = new web3.eth.contract(contractABI);
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
    const fromAddress = localStorage.getItem('PollenatorUser');
    let userContract = await getUserContract();
    let addresses = await userContract.methods.getAllPolls().call({from: fromAddress});
    let ballotContract = await getBallotContract();

    let allPollDetails = [];

    addresses.map( async (address) => {
      let contract = ballotContract.at(address);
      let details = await contract.methods.getPollDetails().call();
      let detailsArr = details.split(';');
      allPollDetails.push({
        creatorName: detailsArr[0],
        pollName: detailsArr[1],
        shortDesc: detailsArr[2],
        longDesc: detailsArr[3],
        eligibility: detailsArr[4],
        startTime: detailsArr[5],
        endTime: detailsArr[6],
        revealTime: detailsArr[7],
        candidate: [detailsArr[8], detailsArr[9]],
      });
    });

    return allPollDetails;
  } catch (err) {
    console.log(err.toString());
  }
}

const getRegisteredPolls = async () => {
  try {
    
  } catch (err) {
    console.log(err.toString());
  }
}

const getPollDetailsFromAddress = async () => {
  try {
    
  } catch (err) {
    console.log(err.toString());
  }
}

const getVotedPolls = async () => {
  try {
    
  } catch (err) {
    console.log(err.toString());
  }
}

const getTxnForPoll = async () => {
  try {
    
  } catch (err) {
    console.log(err.toString());
  }
}

const updateTxnForPoll = async () => {
  try {
    
  } catch (err) {
    console.log(err.toString());
  }
}

const checkIsAccountLocked = async () => {
  try {
    let account = localStorage.getItem('PollenatorUser');
    await web3.eth.sendTransaction({
      from: account,
      to: account,
      value: 0
    });
    return false;
  } catch (err) {
    console.log(err.toString());
    localStorage.removeItem('PollenatorUser');
    return (err.message == 'authentication needed: password or unlock');
  }
}

export { 
  createPoll,
  createUser,
  getAllPolls,
  getRegisteredPolls,
  getVotedPolls,
  getPollDetailsFromAddress,
  getTxnForPoll,
  loginUser,
  checkIsAccountLocked,
  registerUser,
  registerPoll,
  updateTxnForPoll
};