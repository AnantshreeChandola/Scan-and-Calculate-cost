import {Checkout} from '../Scan-and-Calculate-cost/Scan_and_Calculate_totalCost'

describe('Scan and Calculate cost of items', () => {
  let checkoutObject;
  beforeEach(() => {
    checkoutObject = new Checkout(pricingRules)
  })
  describe('Scan', () => {
    describe('read', () => {
      it('should scan cost of item', () => {
        // items to be scanned
        for (let i = 0; i < items.length, i+=1;){
            checkoutObject.scan(items[i]);
        }
        expect(checkoutObject.objectQuantityMap).toEqual(outputMap);
      })
    })
  })
  describe('Calculate', () => {
    describe('calculate cost', () => {
      it('should calcuate corect cost of all items', () => {
        checkoutObject.total();
        expect(checkoutObject.totalAmount).toEqual(outputAmount);
      })
    })
  })
})


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

//Mock data
const items = ["mbp", "atv", "atv", "atv", "ipd", "ipd", "ipd", "ipd"]
//Mock data
const outputMap = {
  "mbp": 1,
  "atv": 3,
  "ipd": 4
}
//Mockdata
const outputAmount = 3818.95;