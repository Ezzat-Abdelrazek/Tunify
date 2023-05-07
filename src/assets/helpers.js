export function convertObject(obj) {
  const data = obj.data[0].attributes;
  const convertedObject = {
    layout: "5",
    type: "MUSIC",
    key: data.playParams.id,
    images: {
      coverart: data.artwork.url.replace("{w}", "500").replace("{h}", "500"),
    },
    title: data.name,
    subtitle: data.artistName,
    artists: [{ adamid: obj.data[0].relationships.artists.data[0].id }],
    hub: {
      actions: [{}, { uri: data.previews[0].url }],
    },
    hasLyrics: data.hasLyrics,
  };

  return convertedObject;
}
