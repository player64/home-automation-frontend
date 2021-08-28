const factories = {
    createDevice: () => {
      return {
          pk: 1,
          name: "Sensor",
          type: "sensor",
          firmware: "tasmota",
          updated_at: "2021-08-25T01:15:00+01:00",
          device_host_id: "t1",
          gpio: null,
          sensor_type: "am2301",
          workspace: null,
          logs: logs,
          workspaces: []
      }
    },
    createLog: () => {

    }
}