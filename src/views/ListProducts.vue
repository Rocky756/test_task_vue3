<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
<div class="container">
  <ul id="example-1">
    <li>
      <h1 class='title'>All Products</h1>
    </li>
    <li v-for="product in products" :key="product.name" class="pointer margin-bottom"
    @click="openProduct(product.id)">
    {{ product.name }}
    </li>
  </ul>
  <div>
    <a-button class='add-btn' type='primary' @click='openNewProduct'>ADD PRODUCT</a-button>
  </div>
</div>
</template>
<script lang="ts">
import { defineComponent, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
    setup() {
    const router = useRouter();
    const store = useStore();
    const products = computed(() => store.state.products);

    const openProduct = (id: string) => {
      router.push({ name: 'product', params: { id } });
    }

    const openNewProduct = () => {
      router.push('add');
    }

    onBeforeMount(() => {
      const getFields = async () => {
        if (!localStorage.getItem('fields')) {
          const response = await axios.get('/form.json');
          localStorage.setItem('fields', JSON.stringify(response.data));
        }
      }
      getFields();
    })
    return {
      products,
      openProduct,
      openNewProduct,
    }
  },
})
</script>
<style lang="scss">
  .title {
  margin-top: 0;
  margin-bottom: 20px;
  line-height: 20px;
}
</style>
