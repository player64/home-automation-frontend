<template>
  <div>
    <loader v-if="loading" text="Loading device ..."/>
    <div v-else-if="device">
      <v-tabs v-model="tab">
        <v-tabs-slider/>
        <v-tab v-for="(item, key) in tabs" :key="key" v-html="item.name"/>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, key) in tabs" :key="key">
          <v-card flat class="mt-5">
            <component :is="item.component" :data="device"></component>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

    </div>
  </div>
</template>

<script>
// <v-card-text v-text="item.name"></v-card-text>
import util from "@/services/util";
import Loader from '../components/ui/Loader'

export default {
  name: "DeviceSingle",
  components: {
    Loader,
    DeviceInfo: () => import('../components/devices/DeviceInfo'),
    DeviceLogs: () => import('../components/devices/DeviceLogs'),
    DeviceEvents: () => import('../components/devices/DeviceEvents'),
    DeviceEdit: () => import('../components/devices/DeviceEdit'),
  },
  data() {
    return {
      device: null,
      loading: true,
      tab: 0, // open third tab (edit) on edit
    }
  },
  computed: {
    deviceId() {
      return this.$route.params.id
    },

    tabs() {
      const out = [
        {name: 'Info', component: 'DeviceInfo',},
        {name: 'Logs', component: 'DeviceLogs',},
        {name: 'Edit', component: 'DeviceEdit',},
      ]

      if (this.device.type === 'relay') {
        out.push({name: 'Events', component: 'DeviceEvents',})
      }
      return out
    }
  },
  methods: {
    getDeviceDetails() {
      this.axios.get(`${util.apiUrl}/devices/single/${this.deviceId}/`)
          .then((response) => {
            this.$store.commit('setTitle', `Device - ${response.data.name}`)
            this.device = response.data
          })
          .catch((e) => {
            if (e.response.status === 404) {
              this.$router.replace({path: '/not-found'})
              return
            }
            this.$store.commit('setMessage', {
              status: 'error',
              content: util.convertDjangoErrorToString(e.response.data)
            })
          })
          .finally(() => {
            this.loading = false
          })
    }
  },
  mounted() {
    // open tab based on route param
    switch (this.$route.params.tab) {
      case 'info':
        this.tab = 0
        break
      case 'logs':
        this.tab = 1
        break
      case 'edit':
        this.tab = 2
        break
      case 'event':
        this.tab = 3
        break
      default:
        this.tab = 0
    }


    this.$store.commit('setTitle', "Device")
    if (isNaN(this.deviceId)) {
      this.$router.replace({path: '/not-found'})
      return
    }

    this.getDeviceDetails()
  }
}
</script>

<style scoped>

</style>