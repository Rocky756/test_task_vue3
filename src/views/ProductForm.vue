<!-- eslint-disable max-len -->
<template>
  <div class="form-container">
    <h1 v-if="isCurrent" class="title-add">{{formState.name}}</h1>
    <h1 v-else class="title-add">Add product</h1>
    <div class="size">
      <li>Name*</li>
      <a-input v-model:value="InputValue" placeholder="Name" class='border-radius size margin-bottom' v-bind:class="{ danger: errors.inputError && errors.inputNotAfterRender }" />
      <span class="error-span">{{ inputError }}</span>
      <li>{{fields.maxSupply}}*</li>
      <a-input-number id="inputNumber" v-model:value="supplyValue" class='border-radius size margin-bottom' v-bind:class="{ danger: errors.supplyError && errors.supplyNotAfterRender > 0 }" />
      <span class="error-span">{{ supplyError }}</span>
      <li>{{fields.category}}*</li>
      <a-select
      ref="select"
      v-model:value="categoryValue"
      class="border-radius size margin-bottom text-align"
      :options="categories"
      @change="handleChange"
      >
      </a-select>
      <li>{{fields.visibility}}*</li>
      <div class="radio-container">
        <a-radio-group v-model:value="formState.visibility" class="margin-bottom text-align">
          <a-radio :value="true">Visible</a-radio>
          <a-radio :value="false">Hidden</a-radio>
        </a-radio-group>
      </div>
      <li>Special features</li>
      <div class="radio-container">
        <a-checkbox v-model:checked="formState.fragile">{{fields.fragile}}</a-checkbox>
      </div>
      <div class="radio-container">
        <a-checkbox v-model:checked="formState.perishable">{{fields.perishable}}</a-checkbox>
      </div>
      <div class="radio-container margin-bottom">
        <a-checkbox v-model:checked="formState.heavyWeight">{{fields.heavyWeight}}</a-checkbox>
      </div>
    </div>
    <div class="size">
      <div v-if="isCurrent" class="btn-container">
        <a-button class='border-radius size-2-btn blue-border' @click='cancelHandle'>Cancel</a-button>
        <a-button class='border-radius size-2-btn' type="primary" @click='handleClick' v-bind:disabled="checkErrors">Save</a-button>
      </div>
      <div v-else class="btn-container">
        <a-button class='add-btn back-btn size-2-btn margin-left-zero' @click='backHandler'>Back</a-button>
        <a-button class="border-radius size-2-btn" type="primary" @click='handleClick' v-bind:disabled="checkErrors" >ADD PRODUCT</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {
 defineComponent, computed, ref,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useField } from 'vee-validate';
import categories from '../utils/categories';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const { currentRoute } = router;
    const currentId = currentRoute.value.params.id;
    const currentProduct = computed(() => store.getters.getCurrentProductById(currentId));
    const f = localStorage.getItem('fields');
    const fields: any = computed(() => (f !== null ? JSON.parse(f) : {}));
    const isCurrent = computed(() => currentProduct.value.name !== '');
    const formState = ref({
      name: currentProduct.value.name,
      maxSupply: currentProduct.value.maxSupply,
      category: currentProduct.value.category,
      visibility: currentProduct.value.visibility,
      fragile: currentProduct.value.fragile,
      perishable: currentProduct.value.perishable,
      heavyWeight: currentProduct.value.heavyWeight,
      id: currentProduct.value.id,
    });

    const errors: any = ref({
      inputError: !isCurrent.value,
      inputNotAfterRender: false,
      supplyError: !isCurrent.value,
      supplyNotAfterRender: 0,
      categoryError: !isCurrent.value,
      categoryNotAfterRender: false,
    });

    function validateName(value: string) {
      if (!value && !value.trim()) {
        errors.value.inputError = true;
        errors.value.inputNotAfterRender = true;
        return 'Name is required';
      }
      if (value.length < 2 || value.length > 50) {
        errors.value.inputError = true;
        errors.value.inputNotAfterRender = true;
        return 'The name must contain at least 2 and no more than 50 characters';
      }
      errors.value.inputError = false;
      errors.value.inputNotAfterRender = false;
      return true;
    }

    const {
      errorMessage: inputError,
      value: InputValue,
    } = useField(formState.value.name, validateName);

    if (isCurrent.value) {
      InputValue.value = currentProduct.value.name;
    }

    function validateSupply(value: number) {
      errors.value.supplyNotAfterRender += 1;
      if (!value && errors.value.supplyNotAfterRender > 1) {
        errors.value.supplyError = true;
        return 'Max supply is required';
      }
      errors.value.supplyError = false;
      return true;
    }

    const {
      errorMessage: supplyError,
      value: supplyValue,
    } = useField(formState.value.maxSupply, validateSupply);

    if (isCurrent.value) {
      supplyValue.value = currentProduct.value.maxSupply;
    };

    function validateCategory(value: string) {
      if (!value && !value.trim()) {
        errors.value.categoryError = true;
        errors.value.categoryNotAfterRender = true;
        return 'Category is required';
      }
      errors.value.categoryError = false;
      errors.value.categoryNotAfterRender = false;
      return true;
    };

    const {
      errorMessage: categoryError,
      value: categoryValue,
    } = useField(formState.value.category, validateCategory);

    if (isCurrent.value) {
      categoryValue.value = currentProduct.value.category;
    };

    const checkErrors = computed(() => {
      const values = Object.values(errors.value);
      const filter = values.filter((item) => item === true);
      if (filter.length > 0) {
        return true;
      };
      if (isCurrent.value) {
        const result = {
          name: InputValue.value,
          maxSupply: supplyValue.value,
          category: categoryValue.value,
          visibility: formState.value.visibility,
          fragile: formState.value.fragile,
          perishable: formState.value.perishable,
          heavyWeight: formState.value.heavyWeight,
          id: formState.value.id,
        };
        if (JSON.stringify(result) === JSON.stringify(currentProduct.value)) {
          return true;
        }
      }
      return false;
    });

    const handleChange = (value: string) => {
      formState.value.category = value;
    };

    const clearFormState = () => {
      formState.value.name = '';
      InputValue.value = '';
      formState.value.maxSupply = 0;
      supplyValue.value = 0;
      formState.value.category = '';
      categoryValue.value = '';
      formState.value.visibility = false;
      formState.value.fragile = false;
      formState.value.perishable = false;
      formState.value.heavyWeight = false;
      formState.value.id = '';
    }

    const handleClick = () => {
      const result = ref({
        name: InputValue.value,
        maxSupply: supplyValue.value,
        category: categoryValue.value,
        visibility: formState.value.visibility,
        fragile: formState.value.fragile,
        perishable: formState.value.perishable,
        heavyWeight: formState.value.heavyWeight,
        id: isCurrent.value ? currentProduct.value.id : store.getters.getNewProductId,
      });
      if (isCurrent.value) {
        store.commit('updateProduct', { product: result.value, id: currentProduct.value.id });
      } else {
        store.commit('addProduct', result.value);
      }
      clearFormState();
      router.push('/');
    }

    const cancelHandle = () => {
      clearFormState();
      router.push({ name: 'product', params: { id: currentRoute.value.params.id } });
    }

    const backHandler = () => {
      router.push('/');
    }

    return {
      formState,
      fields,
      isCurrent,
      categories,
      handleClick,
      handleChange,
      cancelHandle,
      backHandler,
      InputValue,
      inputError,
      supplyValue,
      supplyError,
      categoryValue,
      checkErrors,
      errors,
    };
  },
})
</script>
<style lang='scss'>
  .form-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .border-radius{
    border-radius: 6px !important;
  }
  .size{
    width: 300px;
  }
  .size-2-btn{
    width: 140px;
  }
  .title-add{
    margin-top: 40px;
    margin-bottom: 20px;
    font-weight: 700;
  }
  .text-align{
    text-align: start;
  }
  .radio-container{
    // width: 200px;
    display: flex;
    justify-content: left;
  }
  .btn-container{
    display: flex;
    justify-content: space-between;
  }
  .margin-left-zero {
    margin-left: 0px;
  }
  .blue-border{
    border: 1px solid #40a9ff;
    color: #40a9ff;
  }
  .gray{
    color: rgb(38, 38, 38) !important;
    background-color: rgb(222, 221, 221);
    border: 1px solid black;
    cursor: default !important;
  }
  .gray:hover{
    background-color: rgb(222, 221, 221);
    border: 1px solid rgb(38, 38, 38);
  }
  .error-span{
    margin-bottom: 20px !important;
    color: red;
  }
  .danger{
    border: 1px solid red;
  }
</style>
