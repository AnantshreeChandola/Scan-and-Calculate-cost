class Checkout {
    pricingRules: pricingRulesMap;
    totalAmount: number;
    objectQuantityMap: {[sku: string]: number} //final quantities of all types of objects scanned

    constructor(pricingRules: pricingRulesMap) {
    this.pricingRules = pricingRules;
    this.totalAmount = 0;
    this.objectQuantityMap = {};
    }

    scan(item: string) : void {
        let currentQuantity = this.objectQuantityMap[item]
        if (!currentQuantity){
            currentQuantity = 0
        }
        this.objectQuantityMap[item] = currentQuantity + 1;
    }

    total() : number {
        console.log(this.objectQuantityMap)
        //final unit price of an object type is decided based on it's quantity and pricing rules
        //i.e. if total quantity 't' of an object lies between threshold quantities of 'x' and 'y' such that x < t < y, then unit price is chosen based on 'x'
        for (let item in this.objectQuantityMap){
            let smallestDifference = Infinity;
            let finalPrice = 0;
            this.pricingRules[item].map(object => {
                if ((this.objectQuantityMap[item] - object.thresholdQuantity) <= smallestDifference && 0 <= (this.objectQuantityMap[item] - object.thresholdQuantity)){
                    finalPrice = object.unitPrice * this.objectQuantityMap[item]
                }
            })
            console.log("Total cost of " + this.objectQuantityMap[item] + " " + item + " " + finalPrice)
            this.totalAmount += finalPrice
        }
        return this.totalAmount
    }


}


// Dictionary with format (Threshold qauantity of an object => Unit price)
type unitPriceMap = Array<{
    thresholdQuantity: number,
    unitPrice: number
}>

type pricingRulesMap = {
  [sku: string]: unitPriceMap;
};
// Nested Dictionary with format (SKU of object => unitPriceMap(Threshold qauantity of an object => Unit price))
const pricingRules: pricingRulesMap = {};

pricingRules["ipd"] = [
    {
        thresholdQuantity: 1,
        unitPrice: 549.99
    },
    {
        thresholdQuantity: 5, //the brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4
        unitPrice: 499.99
    }
]
pricingRules["atv"] = [
    {
        thresholdQuantity: 1,
        unitPrice: 109.50
    },
    {
        thresholdQuantity: 3, //we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
        unitPrice: 73
    }
]
pricingRules["mbp"] = [
    {
        thresholdQuantity: 1,
        unitPrice: 1399.99
    }
]
pricingRules["vga"] = [
    {
        thresholdQuantity: 1,
        unitPrice: 30
    }
]

const co = new Checkout(pricingRules);
  co.scan("mbp");
  co.scan("atv");
  co.scan("atv");
  co.scan("atv");
  co.scan("ipd");
  co.scan("ipd");
  co.scan("ipd");
  co.scan("ipd");
  console.log("Total cost of all items" + " " + co.total());