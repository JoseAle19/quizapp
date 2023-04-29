    
export const custom_hook_jsons = () => {
      // funcion para parsear el json, cualquier tipo de json
  const parseJson = (json) => {
    try {
      return JSON.parse(json);
    } catch (error) {
      return json;
    }
  };

  // funcion para obtener datos de localstorage
  const getStorage = (key) => {
    return localStorage.getItem(key);
  };
  return {
    parseJson,
    getStorage,
  }
}
