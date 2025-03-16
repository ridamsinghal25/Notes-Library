export function useDebounce(fn, delay) {
  let myId;
  return function (...args) {
    clearTimeout(myId);
    myId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
