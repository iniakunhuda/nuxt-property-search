# Property Search Application

A modern real estate search application built with Nuxt.js and Leaflet, featuring interactive map-based property searching and filtering capabilities.

![Property Search Application](image.gif)

## Features

- 🗺️ Interactive map with drawing tools
- 🏠 Property filtering by:
  - Custom drawn areas on map
  - Price range
  - Property type
  - Number of bedrooms
- 📱 Responsive design
- 🔍 Real-time property filtering
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/iniakunhuda/nuxt-property-search
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
property-search/
├── components/           # Vue components
│   ├── FilterSection.vue
│   ├── MapSelector.vue
│   └── PropertyCard.vue
├── pages/               # Application pages
│   └── index.vue
├── plugins/             # Nuxt.js plugins
│   └── leaflet.client.js
├── store/               # Vuex store files
│   └── index.js
├── utils/              # Utility functions
│   ├── constants.js
│   ├── geometry.js
│   └── dummyData.js
└── nuxt.config.js
```

## Dependencies

Main dependencies used in this project:

- Nuxt.js - Vue.js Framework
- Leaflet - Interactive maps
- Leaflet Draw - Drawing tools for Leaflet
- Tailwind CSS - Utility-first CSS framework

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build application for production
- `npm run start` - Start production server
- `npm run generate` - Generate static project

## Core Features Details

### Map Drawing Tools

The application uses Leaflet Draw to enable users to:
- Draw polygons on the map
- Edit existing drawn areas
- Delete drawn areas
- Filter properties within drawn areas

### Property Filtering

Users can filter properties by:
- Custom drawn areas on the map
- Price range (minimum and maximum)
- Property type (Villa, Apartment, House)
- Minimum number of bedrooms
- All filters can be combined

### Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Configuration

### Map Settings

Default map configuration can be modified in `utils/constants.js`:

```javascript
export const SPAIN_CENTER = [40.4168, -3.7038]
export const DEFAULT_ZOOM = 6
```

### Property Types

Available property types can be modified in `utils/constants.js`:

```javascript
export const PROPERTY_TYPES = [
  'All Types',
  'Villa',
  'Apartment',
  'House'
]
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the LICENSE file for details

## Acknowledgments

- Leaflet - For the amazing mapping library
- OpenStreetMap - For providing the map tiles
- Tailwind CSS - For the utility-first CSS framework

## Support

For support, please open an issue in the repository.
