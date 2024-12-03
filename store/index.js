// store/index.js
import { properties as dummyProperties } from '~/utils/dummyData'
import { isPointInPolygon } from '~/utils/geometry'

export const state = () => ({
  properties: dummyProperties,
  selectedAreas: [],
  filters: {
    priceMin: null,
    priceMax: null,
    propertyType: 'All Types',
    bedrooms: null
  }
})

export const mutations = {
  ADD_AREA(state, area) {
    state.selectedAreas.push(area)
  },
  REMOVE_AREA(state, index) {
    state.selectedAreas.splice(index, 1)
  },
  SET_FILTERS(state, filters) {
    state.filters = { ...state.filters, ...filters }
  },
  CLEAR_AREAS(state) {
    state.selectedAreas = []
  }
}

export const getters = {
  filteredProperties: (state) => {
    return state.properties.filter(property => {
      // Filter by price
      if (state.filters.priceMin && property.price < state.filters.priceMin) return false
      if (state.filters.priceMax && property.price > state.filters.priceMax) return false

      // Filter by type
      if (state.filters.propertyType !== 'All Types' &&
          property.type !== state.filters.propertyType) return false

      // Filter by bedrooms
      if (state.filters.bedrooms && property.bedrooms < state.filters.bedrooms) return false

      // Filter by drawn areas
      if (state.selectedAreas.length > 0) {
        return state.selectedAreas.some(area =>
          isPointInPolygon(property.coordinates, area.coordinates)
        )
      }

      return true
    })
  }
}
