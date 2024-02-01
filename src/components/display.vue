<template>
  <div class="container">
    <h1>NFT查询</h1>

    <!-- 获取所有 NFT -->
    <div>
      <h3>获取所有 NFT</h3>
      <button @click="getNFTAll">获取所有 NFT</button>
      <div v-if="loading.nftAll" class="loading">加载中...</div>
      <div v-else-if="nftAllData.length > 0">
        <ul class="nft-list">
          <li v-for="(nft, index) in nftAllData" :key="index" class="nft-item">
            <h4>{{ nft.p }}</h4>
            <p>{{ nft.description }}</p>
            <img :src="nft.image" alt="NFT Image" class="nft-image">
            <p>Owner: {{ nft.owner }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 获取可铸造的 FT -->
    <div>
      <h3>获取可铸造的 FT</h3>
      <button @click="getFTCanMint">获取所有可铸造 FT</button>
      <div v-if="loading.ftCanMint" class="loading">加载中...</div>
      <div v-if="Object.keys(ftCanMintData).length > 0">
        <ul class="ft-can-mint-list">
          <li v-for="(ft, tick) in ftCanMintData" :key="tick" class="ft-can-mint-item">
            <h4>{{ ft.p }}</h4>
            <p>执行操作: {{ ft.op }}</p>
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
      <div v-if="loading.ftAll" class="loading">加载中...</div>
      <div v-if="ftAllData && Object.keys(ftAllData).length > 0">
        <ul class="ft-all-list">
          <li v-for="(addresses, tick) in ftAllData" :key="tick" class="ft-all-item">
            <h4>{{ tick }}</h4>
            <p v-for="(amount, address) in addresses" :key="address">{{ address }}: {{ amount }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 通过 ft_tick 获取 FT -->
    <div class="inputData">
      <h3>通过 ft_tick 获取 FT</h3>
      <input v-model="ftTick" placeholder="输入 ft_tick" class="fixedInput" />
      <div v-if="loading.ftByTick" class="loading">加载中...</div>
      <button @click="getFTByTick">获取 FT</button>
      <div v-if="ftByTickData && Object.keys(ftByTickData).length > 0" class="ft-by-tick-list">
        <ul>
          <li v-for="(amount, address) in ftByTickData" :key="address" class="ft-by-tick-item">
            <h4>{{ address }}</h4>
            <p>Amount: {{ amount }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

import axios from 'axios';

export default {
  setup() {
    // const loading = ref(false);
    const loading = reactive({
      nftAll: false,
      ftCanMint: false,
      ftAll: false,
      ftByTick: false,
    });
    const nftAllData = ref([]);
    const ftCanMintData = ref({});
    const ftAllData = ref({});
    const ftTick = ref('');
    const ftByTickData = ref({});

    //设置loading
    const setLoading = (action, value) => {
      loading[action] = value;
    }

    const getNFTAll = async () => {
      try {
        setLoading('nftAll', true);
        const response = await axios.get("/api/token/nft/all");
        nftAllData.value = response.data.data;
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      } finally {
        setLoading('nftAll', false);
      }
    };

    const getFTCanMint = async () => {
      try {
        setLoading('ftCanMint', true);
        const response = await axios.get("/api/token/ft/can_mint");
        ftCanMintData.value = response.data.data;
      } catch (error) {
        console.error("Error fetching FT can mint data:", error);
      }finally{
        setLoading('ftCanMint', false);
      }
    };

    const getFTAll = async () => {
      try {
        setLoading('ftAll', true);
        const response = await axios.get("/api/token/ft/all");
        ftAllData.value = response.data.data;
      } catch (error) {
        console.error("Error fetching FT data:", error);
      }finally{
        setLoading('ftAll', false);
      }
    };

    const getFTByTick = async () => {
      try {
        setLoading('ftByTick', true);
        const response = await axios.get(`/api/token/ft/${ftTick.value}`);
        ftByTickData.value = response.data.data;
      } catch (error) {
        console.error("Error fetching FT by tick data:", error);
      }finally{
        setLoading('ftByTick', false);
      }
    };

    return {
      loading,
      nftAllData,
      ftCanMintData,
      ftAllData,
      ftTick,
      ftByTickData,
      getNFTAll,
      getFTCanMint,
      getFTAll,
      getFTByTick,
    };
  },
};
</script>

<style scoped>
/* Add your component styles here */

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #0a0909;
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
}

.loading {
  text-align: center;
  color: #666;
  margin-top: 10px;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

li {
  width: 80%;
  margin: 10px;
  border: 1px solid #ddd;
  padding: 10px;
}

.nft-image {
  max-width: 100%;
}

/* Add styles for other lists as needed */
</style>
