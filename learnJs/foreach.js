var as = [[1],[2],[3]];

as.forEach((a, i) => {
  if (i>0) {
    a[0] = as[i-1][0];    
  }
})

console.log(as);
