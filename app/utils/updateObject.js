/**
 * @param oldObject {Object}
 * @param newObject {Object}
 * @returns {Object}
 */
export default function updateObject(oldObject, newObject) {
  return Object.assign(oldObject, newObject);
}
