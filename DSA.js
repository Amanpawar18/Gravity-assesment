const valuesSum = (array, target) => {
  let map = new Map();

  for (let i = 0; i < array.length; i++) {
    let remaining =  target - array[i];
    if(map.has(remaining)){
      return [
        map.get(remaining),
        i
      ]
    }
    map.set(array[i], i)
  }
  return []
};

console.log(valuesSum([2, 11, 7, 15], 17));
