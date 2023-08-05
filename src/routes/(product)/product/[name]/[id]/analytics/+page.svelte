<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import Chart from "chart.js/auto";
  import map from "$lib/world-atlas/countries-50m.json";
  import {
    ChoroplethChart,
    topojson,
    ChoroplethController,
    GeoFeature,
    ColorScale,
    ProjectionScale,
  } from "chartjs-chart-geo";
  import { onMount } from "svelte";

  export let data: PageData;

  export let analyticsData = {};

  onMount(async (promise) => {
    analyticsData = data.analyticsData;

    console.log("Analytics Data: ", analyticsData);

    const countries = topojson.feature(map, map.objects.countries).features;

    // For testing
    //    let mapData = countries.map((d) => ({feature: d, value: Math.floor(Math.random() * 1000)}));

    let mapData = countries.map((d) => ({
      feature: d,
      value: analyticsData.has(d.properties.name)
        ? analyticsData.get(d.properties.name)
        : 0,
    }));

    const chart = new ChoroplethChart(
      document.getElementById("canvas").getContext("2d"),
      {
        type: "choropleth",
        data: {
          labels: countries.map((d) => d.properties.name),
          datasets: [
            {
              label: "Countries",
              data: mapData,
            },
          ],
        },
        options: {
          showOutline: true,
          showGraticule: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            projection: {
              axis: "x",
              projection: "equalEarth",
            },
          },
        },
      }
    );
  });
</script>

<div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full lg:max-w-[680px] max-w-xl">
    <h1 class="text-5xl font-bold text-center">
      Analytics for {$page.params.name}
    </h1>
    <canvas id="canvas" class="mt-10" />
  </div>
</div>
