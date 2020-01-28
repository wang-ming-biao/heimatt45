// 封装操作 localstorage 的方法
// 增&改
function setLocal (key, value) {
  // 将value 转为一个字符串存到 localstorage
  window.localStorage.setItem(key, JSON.stringify(value))
}

// 删除
function remLocal (key) {
  window.localStorage.removeItem(key)
}

// 查询
function getLocal (key) {
  return JSON.parse(window.localStorage.getItem(key))
}

// 暴露方法
export {
  setLocal,
  getLocal,
  remLocal
}
