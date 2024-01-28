<script setup>
import { ref } from 'vue';
import Web3 from 'web3';
import { contractABI } from './contractABI';
// import.meta.env.PRIVATE_KEY
const accountAddress = ref('');
const dataToInscribe = ref('');
const transactionHash = ref('');
const isButtonDisabled = ref(false);
const loading = ref(false);

// 定义合约地址和ABI
const contractAddress = '0x6cc328b0cd930baf74258c571bf67b8814ee9027';
// 初始化Web3
const web3 = new Web3('https://sepolia.infura.io/v3/7f3c9965f1c84f53a5b3239cacdd7b03');
const contract = new web3.eth.Contract(contractABI, contractAddress);

// 用于检测给定的字符串是否为有效的以太坊地址和十六进制字符串
function validateEthereumInputs(address) {
    const isAddressValid = /^0x[a-fA-F0-9]{40}$/.test(address);
    return isAddressValid;
}

// 假设的硬编码私钥
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
// public key : 0x5Fe11B415052D6c58195bEB1546E4AF642CC0784


// 调用合约的方法
const inscribeData = async () => {
  if (isButtonDisabled.value) {
    alert('Don\'t click it! transaction has been pending');
    return; // 如果按钮已被禁用，不执行任何操作
  }

  isButtonDisabled.value = true; // 开始异步操作时禁用按钮
  if (!(accountAddress.value && dataToInscribe.value)) {
    alert('Please fill in all fields.');
    return;
  }
  if (!validateEthereumInputs(accountAddress.value)) {
    alert('Invalid accountAddress or dataToInscribe.');
    return;
  }

  try {
    loading.value = true;
    const data = contract.methods.inscribe(web3.utils.asciiToHex(dataToInscribe.value)).encodeABI();
    const gas = await web3.eth.estimateGas({ from: accountAddress.value, to: contractAddress, data: data });
    // const gasPrice = await web3.eth.getGasPrice();  // 可以根据网络情况调整或移除
    const nonce = await web3.eth.getTransactionCount(accountAddress.value);

    // 设置 EIP-1559 交易的费用参数
    const maxPriorityFeePerGas = web3.utils.toWei('2', 'gwei'); // 例如 2 Gwei
    const maxFeePerGas = web3.utils.toWei('100', 'gwei'); // 根据网络条件调整

    const rawTransaction = {
      from: accountAddress.value,
      to: contractAddress,
      data: data,
      gasLimit: web3.utils.toHex(gas),
      // gasPrice: web3.utils.toHex(gasPrice),
      nonce: web3.utils.toHex(nonce),
      
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      maxFeePerGas: maxFeePerGas,
      // 可选: 如果合约需要ETH，可以设置value字段
      // value: '0x0'
    };

    // 签名交易
    const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);

    // 发送已签名的交易
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log(receipt)
    transactionHash.value = receipt.transactionHash;

  } catch (error) {
    alert('Error: ' + error.message);
  }finally {
    loading.value = false;
    isButtonDisabled.value = false; // 重新启用按钮
  }
};

</script>
<template>
    
    <div class="contract-interaction">
        <input v-model.trim="accountAddress" placeholder="Enter your account address" />
        <input v-model.trim="dataToInscribe" placeholder="Enter data to inscribe" />
        <button @click="inscribeData" :disabled="isButtonDisabled">Inscribe Data</button>
        <p v-if="loading">pending...</p>
        <h2 v-if="transactionHash">Transaction successful</h2>
        <p v-if="transactionHash">transactionHash {{ transactionHash }}</p>
        <p v-if="accountAddress">accountAddress: {{ accountAddress }}</p>
        <p v-if="dataToInscribe">dataToInscribe: {{ dataToInscribe }}</p>
      </div>
</template>
  

  
<style scoped>

</style>
  