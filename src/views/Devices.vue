<template>
<div class="mt-5">
  <v-btn class="mb-5" x-large color="success" to="/device/add">Add new device +</v-btn>

  <items-list :items="devices" class="mt-10" />
</div>
</template>

<script>
/**
 *   <dialog-form form-type="DeviceForm" title="Create new device"
 :dialog="openDialog"
 @close="openDialog=false"/>
 */
// import DialogForm from "@/components/ui/DialogForm";
import ItemsList from "@/components/ui/ItemsList";
import axios from "axios";
import util from "@/services/util";

export default {
  name: "Devices",
  components: {
    // DialogForm,
    ItemsList
  },
  data() {
    return {
      openDialog: false,
      devices: []
    }
  },
  mounted() {
    this.$store.commit('setTitle', "Devices")
    axios.get(`${util.apiUrl}/devices/details/`)
        .then((response) => {
          this.devices = response.data
        })
  }
}
</script>

<style scoped>

</style>