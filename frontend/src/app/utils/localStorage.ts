export function storeObject(key:string, value:any) {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (e) {
      console.warn('Could not store data.' + e);
    }
  }
  
  export function retrieveObject(key:string) {
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.warn('Could not retrieve data.' + e);
    }
  }
  
  export function deleteObject(key:string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Could not delete data.' + e);
    }
  }
  