export class DiscountOffers {
  offers: Array<ClassicDiscount|SliceDiscount>;

  constructor(offers?: Array<ClassicDiscount|SliceDiscount>) {
    this.offers = offers || [];
  }
}

export class ClassicDiscount {
  type: string;
  value: number

  constructor(type?: string, value?: number) {
    this.type = type;
    this.value = value;
  }
}

export class SliceDiscount {
  type: string;
  sliceValue: number;
  value: number

  constructor(sliceValue?: number, value?: number) {
    this.type = 'slice';
    this.sliceValue = sliceValue;
    this.value = value;
  }
}
