export function map(arr, fn) {
  let res = []
  for(let i=0; i<arr.length; i++) {
    res.push(fn(arr[i], i))
  }
  return res
}

export function reduce(arr, fn, initialValue) {
  for(let i=0; i< arr.length; i++){
    initialValue = fn(arr[i], initialValue)
  }
  return initialValue
}

export function filter() {

}

export function find() {

}

export function findIndex() {

}

export function every() {

}

export function some() {

}

export function unique1() {
  
}

export function unique2() {

}

export function unique3() {

}

export function concat() {

}

export function slice() {

}