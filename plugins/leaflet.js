import Vue from 'vue'
import * as L from 'leaflet'
import 'leaflet-draw'

if (process.client) {
  window.L = L
}

// utils/constants.js
export const PROPERTY_TYPES = [
  'All Types',
  'Villa',
  'Apartment',
  'House'
]

export const SPAIN_CENTER = [40.4168, -3.7038]
export const DEFAULT_ZOOM = 6
