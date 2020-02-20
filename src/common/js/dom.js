export function hasClass (el, className) {
  let reg = new RegExp('(^|\\S)' + className + '(\\s|$)')
  return reg.test(el.className)
}
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClassName = el.className.split(' ')
  newClassName.push(className)
  el.className = newClassName.join(' ')
}
