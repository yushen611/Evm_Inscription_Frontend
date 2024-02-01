<script setup>
import { ref } from 'vue';
import Web3 from 'web3'
import { contractABI } from '../contractABI';

const accountAddress = ref('');
const dataToInscribe = ref('');
const inscribeHash = ref('');
const selectedNetwork = ref('');
const hashedData = ref('')
//测试网rpc或者

//初始化web3
const web3 = new Web3('https://sepolia.infura.io/v3/7f3c9965f1c84f53a5b3239cacdd7b03');
const contract = new web3.eth.Contract(contractABI, contractAddress);

const contractAddress = '0x6cc328b0cd930baf74258c571bf67b8814ee9027';

// 示例调用
async function connectWallet() {
  const connectedAddress = await checkMetamaskConnection();

  if (connectedAddress) {
    accountAddress.value = connectedAddress; // 更新账户地址
    console.log('已连接的地址：', connectedAddress);

    // 在这里调用合约方法并发送交易
    sendTransaction();
  }
}

async function sendTransaction(){
    if (validateEthereumInputs(accountAddress.value)) {
    // 使用 Web3.js 连接到以太坊节点
    const web3 = new Web3(window.ethereum);

    // 创建合约实例
    const data = contract.methods.inscribe(web3.utils.asciiToHex(dataToInscribe.value)).encodeABI();
    const gas = await web3.eth.estimateGas({ from: accountAddress.value, to: contractAddress, data: data });
    const nonce = await web3.eth.getTransactionCount(accountAddress.value);

    // 准备交易参数
    const transactionParams = {
      from: accountAddress.value,
      to: contractAddress,
      gas: '200000', // 根据合约和网络调整 gas 限额
      data: data// 调用合约的方法
    };

    // 发送交易
    window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParams],
    }).then((transactionHash) => {
      console.log('交易已发送，交易哈希:', transactionHash);
      inscribeHash.value = transactionHash;
      
    }).catch((error) => {
      console.error('发送交易时发生错误:', error);
    });
  } else {
    console.log('地址或数据无效');
  }
}

// 用于检测给定的字符串是否为有效的以太坊地址和十六进制字符串
function validateEthereumInputs(address) {
  const isAddressValid = /^0x[a-fA-F0-9]{40}$/.test(address);
  return isAddressValid;
}

function handleNetworkChange() {
  // 在这里可以触发一些处理网络变化的操作
  //rpc = 'https://sepolia.infura.io/v3/7f3c9965f1c84f53a5b3239cacdd7b03';
  console.log('选择的网络：', selectedNetwork.value);
}

async function checkMetamaskConnection() {
  // 检测是否安装了Metamask
  if (window.ethereum) {
    try {
      // 请求账户信息
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length > 0) {
        // 返回当前连接的地址

        return accounts[0];
      } else {
        // 用户未连接Metamask
        console.log('Metamask未连接');
        alert('请先连接Metamask钱包');
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    // 用户未安装Metamask
    console.log('未安装Metamask');
    alert('请安装Metamask插件');
    return null;
  }
}

// async function fetchDataFromBackend() {
//   try {
//     // 获取前端输入数据，这里可以根据实际情况获取
//     const frontendInput = dataToInscribe;

//     // 发送异步请求到后端
//     const response = await fetch('http://127.0.0.1:8000/api', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ frontendInput }),
//     });

//     if (response.ok) {
//       // 解析并显示从后端获取的数据
//       hashedData.value = await response.json();
//       console.log(hashedData);
//       // 处理从后端获取的数据
//     } else {
//       console.error('从后端获取数据时出错:', response.statusText);
//     }
//   } catch (error) {
//     console.error('发生错误:', error);
//   }
// }



</script>
<template>
    <div class="container">
      <div class="title">
        <h1>铭刻中心</h1>
        <h2>支持在以太坊上的铭文铸造</h2>
      </div>
  
      <div class="input-section">
        <div class="selectNetwork">
          <label for="network">选择网络：</label>
          <select v-model="selectedNetwork" @change="handleNetworkChange">
            <option value="testnet">以太坊测试网</option>
            <option value="mainnet">以太坊主网</option>
          </select>
          <p>你选择的网络是: {{ selectedNetwork }}</p>
        </div>
  
        <div class="inputData">
          <label for="dataInput">输入数据：</label>
          <input type="text" id="dataInput" v-model="dataToInscribe" class="fixedInput">
          <p>数据转码: {{ web3.utils.asciiToHex(dataToInscribe) }}</p>
        </div>
  
        <!-- <div class="fetchData">
          <h3>从后端获取的数据：</h3>
          <input type="text" v-model="responseData" readonly class="fixedInput">
          <button @click="fetchDataFromBackend">获取后端数据</button>
        </div> -->
      </div>
  
      <div class="connect">
        <button @click="connectWallet">连接钱包</button>
        <div v-if="inscribeHash" class="inputData">
        </div>
        <p>交易哈希: {{ inscribeHash }}</p>
      </div>
    </div>
  </template>
  
  <style>


  .container {
    
    display: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh; /* 设置最小高度，确保内容撑开整个视口 */
  }
  
  /* .title {
    text-align: center;
    margin-bottom: 20px;
  } */
  
  h1 {
    color: #0a0909;
    text-align: center;
    font-size: 32px;
    margin-bottom: 10px;
  }
  
  h2 {
    color: #333;
    text-align: center;
    font-size: 18px;
  }
  
  .input-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .selectNetwork,
  .inputData,
  .outputData,
  .fetchData {
    margin-bottom: 20px;
    text-align: center;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  select,
  input.fixedInput {
    width: 300px;
    height: 40px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  p {
    max-width: 300px; /* 设置框的最大宽度 */
    margin: 20px auto; /* 居中并设置上下边距 */
    padding: 10px; /* 设置内边距 */
    border: 1px solid #ccc; /* 添加边框 */
    box-sizing: border-box; 
    word-wrap: break-word; /* 或使用 overflow-wrap: break-word; */
    white-space: pre-wrap; /* 保留空格并允许换行 */
  }
  
  button {
    margin-top: 10px; /* 上方间距 */
    margin-bottom: 10px; /* 下方间距 */
    padding: 10px;
    width: 300px;
    height: 40px;
    font-size: 16px;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
  }
  </style>
  