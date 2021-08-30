<template>
  <div>
    <v-row v-for="item in items" :key="item.pk" align="center">
      <v-col cols="12" md="6">
        {{ item.name }}
      </v-col>
      <v-col cols="12" md="6">
        <v-btn-toggle>
          <v-btn color="success" to="/device/4/edit">Edit</v-btn>
          <v-btn color="error">Delete</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ItemsList",
  props: {
    items: Array
  }
}
</script>

<style scoped>

</style>