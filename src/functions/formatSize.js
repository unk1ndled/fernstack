// formatSize.worker.js
export const formatSize = (size) => {
  let divs = 0;
  let val = size;
  while (val / 1024 >= 1) {
    val = val / 1024;
    divs++;
  }
  switch (divs) {
    case 1:
      return Math.floor(val) + " KB";
    case 2:
      return Math.floor(val) + " MB";
    default:
      return val + " bytes";
  }
};
