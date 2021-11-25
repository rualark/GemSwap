export function swap(arr, first, last){
  var temp = arr[first];    
  arr[first] = arr[last];
  arr[last] = temp;
}

export function swapStr(str, first, last){
  var arr = str.split('');
  swap(arr, first, last); // Your swap function
  return arr.join('');
}

