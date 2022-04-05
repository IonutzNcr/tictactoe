function getCount(str) {
    var vowelsCount = 0;
    for(let i = 0;i<str.length;i++){
        console.log(str[i])
      if(str[i].includes("a"||"e"||"i"||"o"||"u")){
        vowelsCount++;
      }
    }
    
    
    return vowelsCount;
  }