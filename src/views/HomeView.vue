<template>
  <l-map ref="map" v-model:zoom="zoom" :crs="crs" :center="[height / 2, width / 2]" :maxZoom="5" :minZoom="-5">
    <l-image-overlay :url="imageOverlayUrl" :bounds="bounds"></l-image-overlay>

    <l-marker v-for="(marker, idx) in markers" :key="idx" :lat-lng="marker.coordinates">
      <l-popup>
        <img :src="marker.picture">
        {{ marker.skater }}
        {{ marker.trick }}
        {{ marker.description }}
      </l-popup>
    </l-marker>
  </l-map>
</template>
<script>
import { ref, computed } from "vue";
import { LMap, LImageOverlay, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { CRS } from "leaflet/dist/leaflet-src.esm";
import historicalChallenges from '../../data/historical-challenges.json'

export default {
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPopup,
  },
  setup() {
    const imageOverlayUrl = ref(
      "/nyc-map.png"
    );
    const width = ref(1920);
    const height = ref(1080);
    const zoom = ref(1);
    const markers = ref(historicalChallenges);
    const bounds = computed(() => [
      [0, 0],
      [height.value, width.value],
    ]);
    console.log(markers);
    const crs = CRS.Simple;
    return {
      imageOverlayUrl,
      width,
      height,
      zoom,
      markers,
      bounds,
      crs,
    };
  },
};
</script>

<style>
</style>