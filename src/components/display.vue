<template>
  <div>
    <h2>NFT查询</h2>

    <!-- 获取所有 NFT -->
    <div>
      <h3>获取所有 NFT</h3>
      <button @click="getNFTAll">获取所有 NFT</button>
      <p>{{ nftAllData }}</p>
    </div>

    <!-- 获取可铸造的 FT -->
    <div>
      <h3>获取可铸造的 FT</h3>
      <button @click="getFTCanMint">获取可铸造的 FT</button>
      <p>{{ ftCanMintData }}</p>
    </div>

    <!-- 获取所有 FT -->
    <div>
      <h3>获取所有 FT</h3>
      <button @click="getFTAll">获取所有 FT</button>
      <p>{{ ftAllData }}</p>
    </div>

    <!-- 通过 ft_tick 获取 FT -->
    <div>
      <h3>通过 ft_tick 获取 FT</h3>
      <input v-model="ftTick" placeholder="输入 ft_tick" />
      <button @click="getFTByTick">获取 FT</button>
      <p>{{ ftByTickData }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tokenPingData: "",
      nftAllData: "",
      ftCanMintData: "",
      ftAllData: "",
      ftTick: "",
      ftByTickData: "",
    };
  },
  methods: {
    async getTokenPing() {
      const response = await this.$axios.get("/token/ping");
      this.tokenPingData = response.data;
    },
    async getNFTAll() {
      const response = await this.$axios.get("/token/nft/all");
      this.nftAllData = response.data;
    },
    async getFTCanMint() {
      const response = await this.$axios.get("/token/ft/can_mint");
      this.ftCanMintData = response.data;
    },
    async getFTAll() {
      const response = await this.$axios.get("/token/ft/all");
      this.ftAllData = response.data;
    },
    async getFTByTick() {
      const response = await this.$axios.get(`/token/ft/${this.ftTick}`);
      this.ftByTickData = response.data;
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
