<template>
  <div class="space-y-4">
    <div ref="mapContainer" class="h-[600px] relative rounded-lg overflow-hidden border"></div>
    <!-- <div v-if="selectedAreas.length" class="flex justify-between items-center bg-white p-4 rounded-lg shadow">
      <span class="text-sm text-gray-600">
        {{ filteredProperties.length }} properties found in selected areas
      </span>
      <button
        @click="clearAreas"
        class="text-sm text-purple-600 hover:text-purple-800"
      >
        Clear drawn areas
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      drawControl: null,
      drawnItems: null,
      center: [40.4168, -3.7038],
      zoom: 6,
      markers: []
    }
  },

  computed: {
    properties() {
      return this.$store.state.properties
    },
    filteredProperties() {
      return this.$store.getters.filteredProperties
    },
    selectedAreas() {
      return this.$store.state.selectedAreas
    }
  },

  watch: {
    filteredProperties: {
      handler(newProperties) {
        this.updateMarkers(newProperties)
      },
      deep: true
    }
  },

  mounted() {
    this.initMap()
  },

  methods: {
    initMap() {
      // Initialize map
      this.map = this.$L.map(this.$refs.mapContainer).setView(this.center, this.zoom)

      // Add tile layer
      this.$L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map)

      // Initialize feature group for drawn items
      this.drawnItems = new this.$L.FeatureGroup()
      this.map.addLayer(this.drawnItems)

      // Initialize draw control
      const drawOptions = {
        draw: {
          polygon: {
            allowIntersection: false,
            drawError: {
              color: '#e1e4e8',
              message: 'Draw valid area'
            },
            shapeOptions: {
              color: 'purple',
              fillOpacity: 0.2
            }
          },
          rectangle: false,
          circle: false,
          circlemarker: false,
          marker: false,
          polyline: false
        },
        edit: {
          featureGroup: this.drawnItems,
          remove: true
        }
      }

      this.drawControl = new this.$L.Control.Draw(drawOptions)
      this.map.addControl(this.drawControl)

      // Add event listeners
      this.map.on(this.$L.Draw.Event.CREATED, (e) => {
        const layer = e.layer
        const coordinates = layer.getLatLngs()[0].map(point => [
          point.lat,
          point.lng
        ])
        this.$store.commit('ADD_AREA', { coordinates })
        this.drawnItems.addLayer(layer)
      })

      // Handle deleted areas
      this.map.on(this.$L.Draw.Event.DELETED, (e) => {
        const layers = e.layers
        layers.eachLayer((layer) => {
          const index = this.findAreaIndex(layer)
          if (index !== -1) {
            this.$store.commit('REMOVE_AREA', index)
          }
        })
      })

      // Add initial property markers
      this.updateMarkers(this.properties)
    },

    updateMarkers(properties) {
      // Clear existing markers
      this.markers.forEach(marker => this.map.removeLayer(marker))
      this.markers = []

      // Add new markers
      properties.forEach(property => {
        const marker = this.$L.marker(property.coordinates)
          .bindPopup(`
            <div class="p-2">
              <h3 class="font-semibold">${property.title}</h3>
              <p class="text-purple-600">€${property.price.toLocaleString()}</p>
            </div>
          `)
        marker.addTo(this.map)
        this.markers.push(marker)
      })
    },

    findAreaIndex(layer) {
      const coords = layer.getLatLngs()[0].map(point => [point.lat, point.lng])
      return this.selectedAreas.findIndex(area =>
        JSON.stringify(area.coordinates) === JSON.stringify(coords)
      )
    },

    clearAreas() {
      this.drawnItems.clearLayers()
      this.$store.commit('CLEAR_AREAS')
    }
  },

  beforeDestroy() {
    if (this.map) {
      this.map.remove()
    }
  }
}
</script>
