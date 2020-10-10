export const determinePoint = async (popArray: number[]) => {
    switch (popArray.length) {
      case 3:
        return 10;
      case 4:
        return 20;
      case 5:
        return 50;
      default:
        return 100;
    }
  }