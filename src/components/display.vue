<template>
  <div class="container">
    <h1>NFT查询</h1>

    <!-- 获取所有 NFT -->
    <div>
        <h3>获取所有 NFT</h3>
      <button @click="getNFTAll">获取所有 NFT</button>
      <div v-if="nftAllData.length > 0">
      <ul>
        <li v-for="(nft, index) in nftAllData" :key="index">
          <h4>{{ nft.p }}</h4>
          <p>{{ nft.description }}</p>
          <img :src="nft.image" alt="NFT Image" text-align="center">
          <p>Owner: {{ nft.owner }}</p>
          <!-- Add other properties as needed -->
        </li>
      </ul>
    </div>
      </div>

    <!-- 获取可铸造的 FT -->
    <div>
        <h3>获取可铸造的 FT</h3>
          <button @click="getFTCanMint">获取所有可铸造 FT</button>
          <div v-if="Object.keys(ftCanMintData).length > 0">
      <ul>
        <li v-for="(ft, tick) in ftCanMintData" :key="tick">
          <h4>{{ ft.p }}</h4>
          <p>操作数: {{ ft.op }}</p>
          <p>最大值: {{ ft.max }}</p>
          <p>限制: {{ ft.lim }}</p>
          <p>减值: {{ ft.dec }}</p>
        </li>
      </ul>
    </div>

        </div>

    <!-- 获取所有 FT -->
    <div>
      <h3>获取所有 FT</h3>
      <button @click="getFTAll">获取所有 FT</button>
      <div v-if="ftAllData && Object.keys(ftAllData).length > 0">
      <ul>
        <li v-for="(addresses, tick) in ftAllData" :key="tick">
          <h4>{{ tick }}</h4>
          <p v-for="(amount, address) in addresses" :key="address">{{ address }}: {{ amount }}</p>
        </li>
      </ul>
    </div>
    </div>

    <!-- 通过 ft_tick 获取 FT -->
    <div class="inputData">
      <h3>通过 ft_tick 获取 FT</h3>
      <input v-model="ftTick" placeholder="输入 ft_tick" class="fixedInput"/>
      <button @click="getFTByTick">获取 FT</button>
      <div v-if="ftByTickData && Object.keys(ftByTickData).length > 0" >
      <ul>
        <li v-for="(amount, address) in ftByTickData" :key="address">
          <h4>{{ address }}</h4>
          <p>Amount: {{ amount }}</p>
          <!-- Add other properties as needed -->
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      nftAllData: "",
      ftCanMintData: "",
      ftAllData: "",
      ftTick: "",
      ftByTickData: "",
    };
  },
  methods: {
    async getNFTAll() {
      try {
        const response = await axios.get("/api/token/nft/all"); // 修改请求路径
        this.nftAllData = response.data.data;
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    },
    async getFTCanMint() {
      try {
        const response = await axios.get("/api/token/ft/can_mint"); // 修改请求路径
        this.ftCanMintData = response.data.data;
      } catch (error) {
        console.error("Error fetching FT can mint data:", error);
      }
    },
    async getFTAll() {
      try {
        const response = await axios.get("/api/token/ft/all"); // 修改请求路径
        this.ftAllData = response.data.data;
      } catch (error) {
        console.error("Error fetching FT data:", error);
      }
    },
    async getFTByTick() {
      try {
        const response = await axios.get(`/api/token/ft/${this.ftTick}`); // 修改请求路径
        this.ftByTickData = response.data.data;
      } catch (error) {
        console.error("Error fetching FT by tick data:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */

h1 {
  color: #0a0909;
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
}

.inputData {
  margin-bottom: 20px;
  text-align: center;
}

input.fixedInput {
  width: 300px;
  height: 40px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}
ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
    }
    li {
      width: 80%; /* Make each element take up 30% width of the parent container */
      margin: 10px;
      border: 1px solid #ddd; /* Optional: Border style */
      padding: 10px;
    }
</style>
