## 1.) Project Title
**MalariaScope:** An Interactive Global Malaria Dashboard

## 2.) Project Description
The objective of this project is to build a single-page web application that visualizes global malaria data. The dashboard will allow users to explore the historical burden of the disease, compare regional impacts across continents, and analyze the progress of malaria elimination efforts. The goal is to transform complex epidemiological data into an intuitive, interactive visual experience that highlights the global fight against one of the world's deadliest infectious diseases.

## 3.) Data Source and Usage

**Primary Source:** Custom JSON datasets based on global health estimates (modeled after WHO and Our World in Data statistics).

**Usage:** The data is split into two external files:

* 📄 **`malariaData.json`**: Contains historical case numbers, continental breakdowns, and eradication statuses.
* 🗺️ **`countries.geo.json`**: Contains the geographic boundary shapes for every country, which is used to render the interactive map.

The React application uses the `fetch()` API to pull this data asynchronously and render it dynamically.

## 4.) Proposed Visualizations and Interactivity
The application is built with React as the base library. For visualizations, the project uses Recharts (a React wrapper for D3.js) for charting and Leaflet.js for mapping.

**Interactive Choropleth Map (Leaflet.js):** A world map where countries are color-coded based on malaria severity (High, Mild, Small, or Eradicated). Users can hover over and click countries to see exact case numbers via popups. The background is kept clean and white to ensure the severity colors stand out.

**Continental Bar Charts (Recharts):** Users can click tabs to switch between continents (Africa, Asia, South America, etc.) to view a bar chart comparing the case numbers of specific affected countries within that region.

**Eradication Status Highlights:** The UI clearly displays a success message for continents like Europe and North America where malaria has been eradicated.

**View Toggling:** Users can seamlessly switch between the "Interactive Map" view and the "Continental Data" chart view using React state management (useState).

## 5.) Timeline for Completion (3 Weeks)
**Week 1 (Setup & Data):** Initialize the React/Vite project, install Leaflet and Recharts, and structure the external JSON data files. Implement the fetch() logic to load the data.

**Week 2 (Core Visualizations):** Build the interactive world map using GeoJSON and Leaflet. Develop the continental bar charts using Recharts and implement the state logic to toggle between views and continents.

**Week 3 (Interactivity, Styling & Deployment):** Add map popups, hover effects, and a custom color legend. Finalize the CSS styling for a clean, user-friendly interface. Test for bugs and deploy the final application to GitHub.
