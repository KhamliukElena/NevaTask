<template>
  <div class="schedule">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10"><TripCalculator/></div>
        <div class="col-md-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TripCalculator from '@/components/TripCalculator.vue'

export default {
  name: "ShipShedule",
  components: {
    TripCalculator
  }
}
</script>

<style>
.schedule {
  padding: 3%;
}
</style>
