describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = createShopWithOneItem(new Item("foo", 0, 0));
    const items = simulateDaysPassing(gildedRose, 1);
    expect(items[0].name).toEqual("foo");
  });

  describe("Regular Item", function () {

    const originalSellIn = 5;
    const originalQuality = 20;
    const itemName = "+5 Dexterity Vest";

    const gildedRose = createShopWithOneItem(new Item(itemName, originalSellIn, originalQuality));

    it("should decrease in quality by 1 every passing day", function() {
      const items = simulateDaysPassing(gildedRose, originalSellIn);

      expect(items[0].quality).toEqual(originalQuality - originalSellIn);
    });

    it("should decrease in quality twice as fast after sell-in date passes", function() {
      const items = simulateDaysPassing(gildedRose, 5);

      expect(items[0].quality).toEqual(5);
    });

    it("should NOT decrease quality bellow 0", function() {
      const items = simulateDaysPassing(gildedRose, 10);

      expect(items[0].quality).toEqual(0);
    });

  });

  describe("Aged Brie", function () {
    const originalSellIn = 5;
    const originalQuality = 20;
    const itemName = "Aged Brie";

    const gildedRose = createShopWithOneItem(new Item(itemName, originalSellIn, originalQuality));

    it("should increase in quality by 1 every passing day", function() {
      const items = simulateDaysPassing(gildedRose, 5);

      expect(items[0].quality).toEqual(originalQuality + 5);
    });

    it("should increase in quality twice as fast after sell-in date passes", function() {
      const items = simulateDaysPassing(gildedRose, 5);

      expect(items[0].quality).toEqual(originalQuality + 15);
    });

    it("should NOT increase quality above 50", function() {
      const items = simulateDaysPassing(gildedRose, 100);

      expect(items[0].quality).toEqual(50);
    });
  });

  describe("Sulfuras", function () {
    const originalSellIn = 0;
    const originalQuality = 80;
    const itemName = "Sulfuras, Hand of Ragnaros";

    const gildedRose = createShopWithOneItem(new Item(itemName, originalSellIn, originalQuality));

    it("should NOT change sell-in or quality", function() {
      const items = simulateDaysPassing(gildedRose, 5);

      expect(items[0].sellIn).toEqual(originalSellIn);
      expect(items[0].quality).toEqual(originalQuality);
    });
  });

  describe("Backstage Passes", function () {
    const originalSellIn = 15;
    const originalQuality = 10;
    const itemName = "Backstage passes to a TAFKAL80ETC concert";

    const gildedRose = createShopWithOneItem(new Item(itemName, originalSellIn, originalQuality));

    it("should increase in quality by 1 every passing day", function() {
      const items = simulateDaysPassing(gildedRose, 5);

      expect(items[0].quality).toEqual(originalQuality + 5);
    });

    it("should increase in quality by 2 when there are 10 days or less", function() {
      const items = simulateDaysPassing(gildedRose, 5);

      expect(items[0].quality).toEqual(originalQuality + 15);
    });

    it("should increase in quality by 3 when there are 5 days or less", function() {
      const items = simulateDaysPassing(gildedRose, 5);

      expect(items[0].quality).toEqual(originalQuality + 30);
    });

    it("should reset quality to 0 after sell-in date", function() {
      const items = simulateDaysPassing(gildedRose, 5);

      expect(items[0].quality).toEqual(0);
    });

    it("should NOT increase quality above 50", function() {
      const gildedRose = createShopWithOneItem(new Item(itemName, originalSellIn, 49));
      const items = simulateDaysPassing(gildedRose, 5);

      expect(items[0].quality).toEqual(50);
    });
  });

  // describe("Conjured Item", function () {
    
  // });
});

function simulateDaysPassing(shop, days) {
  var updatedItems;

  for (var i = 0; i < days; i++) {
    updatedItems = shop.updateQuality();
  }

  return updatedItems;
}

function createShopWithOneItem(item) {
  return new Shop([ item ]);
}
