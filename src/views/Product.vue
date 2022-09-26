<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<template>
  <div class="container">
    <div>
      <ul>
        <li class="weight">Name</li>
        <li class="margin-bottom">{{currentProduct.name}}</li>
        <li class="weight">{{fields.maxSupply}}</li>
        <li class="margin-bottom">{{currentProduct.maxSupply}}</li>
        <li class="weight">{{fields.visibility}}</li>
        <li class="margin-bottom">{{`${currentProduct.visibility === true ? 'Visible' : 'Hidden'}`}}</li>
        <li class="weight">{{fields.fragile}}</li>
        <li class="margin-bottom">{{`${currentProduct.fragile === true ? 'Yes' : 'No'}`}}</li>
        <li class="weight">{{fields.perishable}}</li>
        <li class="margin-bottom">{{`${currentProduct.perishable === true ? 'Yes' : 'No'}`}}</li>
        <li class="weight">{{fields.heavyWeight}}</li>
        <li class="margin-bottom">{{`${currentProduct.heavyWeight === true ? 'Yes' : 'No'}`}}</li>
      </ul>
    </div>
    <div class="buttons-container">
      <a-button class='add-btn back-btn mb-20' @click='backHandler'>BACK</a-button>
      <a-button class='add-btn mb-20' danger @click='deleteHandler'>DELETE</a-button>
      <a-button class='add-btn' type="primary" @click='openUpdateProduct'>EDIT</a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import {
 defineComponent, computed,
} from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  export default defineComponent({
      setup() {
      const store = useStore();
      const router = useRouter();
      const { currentRoute } = router;
      const currentId = currentRoute.value.params.id;
      const currentProduct = computed(() => store.getters.getCurrentProductById(currentId));
      const f = localStorage.getItem('fields');
      const fields: any = computed(() => (f !== null ? JSON.parse(f) : {}));

      const openUpdateProduct = () => {
        router.push({ name: 'update', params: { id: currentRoute.value.params.id } });
      }

      const backHandler = () => {
        router.push('/');
      }

      const deleteHandler = () => {
        store.commit('deleteProduct', currentProduct.value.id);
        router.push('/');
      }

      return {
        currentProduct,
        fields,
        openUpdateProduct,
        backHandler,
        deleteHandler,
      }
    },
  })
</script>
<style lang="scss">
</style>
