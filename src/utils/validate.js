/**
 *   全局公用方法 
 *  export输出的意思
 *  import进口的意思
 * 
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
    
    // if (path.indexOf('/') != -1) {
    //     return true;
    // }
    
}
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
