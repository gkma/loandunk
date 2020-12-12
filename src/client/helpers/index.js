export function getElement(name) {
  return document.getElementsByClassName(`${name}`)[0];
}

export function format(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function range(from, to, step) {
  return [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => {
    if (from > 1900 && to < 2100) return from + i * step;
    return format(from + i * step);
  });
}
