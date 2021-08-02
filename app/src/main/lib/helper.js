exports.uniqueArray = (data) => {
  return data.filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t.time === thing.time && t.deviceId === thing.deviceId
    ))
  );;
}