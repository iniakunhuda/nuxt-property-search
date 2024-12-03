<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="relative h-48">
      <img
        :src="property.image"
        :alt="property.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded">
        {{ property.type }}
      </div>
    </div>

    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ property.title }}</h3>
      <p class="text-2xl font-bold text-purple-600 mb-2">
        €{{ property.price.toLocaleString() }}
      </p>

      <div class="flex items-center gap-4 text-gray-600 mb-3">
        <span>{{ property.bedrooms }} beds</span>
        <span>{{ property.bathrooms }} baths</span>
        <span>{{ property.area }}m²</span>
      </div>

      <p class="text-gray-600 mb-3">{{ property.description }}</p>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="feature in property.features"
          :key="feature"
          class="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm"
        >
          {{ feature }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    property: {
      type: Object,
      required: true
    }
  }
}
</script>
