<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-6">Filters</h2>

    <div class="space-y-6">
      <!-- Price Range -->
      <div>
        <label class="block mb-2 font-medium">Price Range</label>
        <div class="flex gap-3">
          <input
            type="number"
            v-model.number="filters.priceMin"
            placeholder="Min"
            class="w-full p-2 border rounded"
          />
          <input
            type="number"
            v-model.number="filters.priceMax"
            placeholder="Max"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <!-- Property Type -->
      <div>
        <label class="block mb-2 font-medium">Property Type</label>
        <select
          v-model="filters.propertyType"
          class="w-full p-2 border rounded"
        >
          <option
            v-for="type in PROPERTY_TYPES"
            :key="type"
            :value="type"
          >
            {{ type }}
          </option>
        </select>
      </div>

      <!-- Bedrooms -->
      <div>
        <label class="block mb-2 font-medium">Minimum Bedrooms</label>
        <select
          v-model.number="filters.bedrooms"
          class="w-full p-2 border rounded"
        >
          <option :value="null">Any</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}+</option>
        </select>
      </div>

      <!-- Apply Filters Button -->
      <button
        @click="applyFilters"
        class="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
      >
        Apply Filters
      </button>
    </div>
  </div>
</template>

<script>
import { PROPERTY_TYPES } from '~/utils/constants'

export default {
  data() {
    return {
      PROPERTY_TYPES,
      filters: {
        priceMin: null,
        priceMax: null,
        propertyType: 'All Types',
        bedrooms: null
      }
    }
  },

  methods: {
    applyFilters() {
      this.$store.commit('SET_FILTERS', this.filters)
    }
  }
}
</script>
