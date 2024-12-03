<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900">Find Properties in Spain</h1>

        <p class="text-gray-600 mt-2">
          Draw areas on the map or use filters to find your perfect property
        </p>
      </header>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters -->
        <div class="lg:col-span-1">
          <FilterSection />
        </div>

        <!-- Map and Properties -->
        <div class="lg:col-span-3">
          <MapSelector class="mb-8" />

          <!-- Results Count -->
          <div class="mb-6 flex justify-between items-center">
            <h2 class="text-xl font-semibold">
              {{ filteredProperties.length }} Properties Found
            </h2>
            <button
              v-if="selectedAreas.length"
              @click="clearAreas"
              class="text-purple-600 hover:text-purple-700"
            >
              Clear Drawn Areas
            </button>
          </div>

          <!-- Properties Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PropertyCard
              v-for="property in filteredProperties"
              :key="property.id"
              :property="property"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    filteredProperties() {
      return this.$store.getters.filteredProperties
    },
    selectedAreas() {
      return this.$store.state.selectedAreas
    }
  },

  methods: {
    clearAreas() {
      this.$store.commit('CLEAR_AREAS')
    }
  }
}
</script>
