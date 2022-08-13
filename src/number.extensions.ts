interface Number {
    toDisplay(): string;
  }
  
  Number.prototype.toDisplay = function () {
    var thisNumber: number = Number(this);
    if (thisNumber == null || thisNumber == 0)
      return "";
    return (Math.round(thisNumber * 100) / 100).toFixed(2).toString();
  };
