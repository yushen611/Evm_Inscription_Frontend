<script setup>
import { ref } from 'vue';
import Web3 from 'web3';

// 定义响应式数据
const transactionHash = ref('');
const eventLog = ref({ data: '', id: '' }); // 修改为一个响应式对象
const loading = ref(false);




// 连接到以太坊节点
const web3 = new Web3('https://sepolia.infura.io/v3/7f3c9965f1c84f53a5b3239cacdd7b03');

// 查询事件日志的方法
const fetchEventLogs = async () => {
  if (!transactionHash.value) {
    alert('No input for transaction Hash');
    return;
  }
  
  loading.value = true;
  eventLog.value.data = '';
  eventLog.value.id = '';

  try {
    const receipt = await web3.eth.getTransactionReceipt(transactionHash.value);
    if (receipt && receipt.logs && receipt.logs.length > 0) {
      console.log(receipt.logs);
      const elog = receipt.logs[0]; // 选第一个，因此预期只有一个
      eventLog.value.data = web3.utils.hexToAscii(elog.data);
      eventLog.value.id = elog.topics[1]; // 根据返回值来的
    } else {
      eventLog.value.data = 'No logs found';
      alert('No logs found');
    }
  } catch (error) {
    alert('Error fetching logs: ' + error.message);
    eventLog.value.data = '';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="greetings">
    <input v-model="transactionHash" placeholder="Enter transaction hash" />
    <button @click="fetchEventLogs" :disabled="loading">查询Event Log</button>
    <p v-if="loading">Loading...</p>
    <div v-if="eventLog.data">
      <h3>Data in Event Log:</h3>
      <pre>{{ eventLog.data }}</pre>
    </div>
    <div v-if="eventLog.id">
      <h3>Data ID in Event Log:</h3>
      <pre>{{ eventLog.id }}</pre>
    </div>
  </div>
</template>

<style scoped>
/* 你可以在这里添加样式 */
</style>
