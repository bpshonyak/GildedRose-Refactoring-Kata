class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ITEMS = {
  Aged_Brie: 'Aged Brie',
  Consert_Ticket: 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras: 'Sulfuras, Hand of Ragnaros',
  Conjured: 'Conjured Mana Cake'
}

function consertTicketUpdater(consertTicket) {

  consertTicket.quality = consertTicket.quality + 1;

  if (consertTicket.sellIn < 11) {
    consertTicket.quality = consertTicket.quality + 1;
  }

  if (consertTicket.sellIn < 6) {
    consertTicket.quality = consertTicket.quality + 1;
  }

  if (consertTicket.quality > 50 ) consertTicket.quality = 50;

  consertTicket.sellIn = consertTicket.sellIn - 1;

  if (consertTicket.sellIn < 0) {
    consertTicket.quality = 0;
  }

  return consertTicket;
}

function agedBrieUpdater(agedBrie) {
  var increaseAmount = agedBrie.sellIn < 1 ? 2 : 1;
  agedBrie.quality = agedBrie.quality + increaseAmount;

  if (agedBrie.quality > 50 ) agedBrie.quality = 50;

  agedBrie.sellIn = agedBrie.sellIn - 1;

  return agedBrie;
}

function sulfurasUpdater(sulfuras) {
  return sulfuras;
}

function conjuredUpdater(conjuredItem) {
  var decreaseAmount = conjuredItem.sellIn < 1 ? 4 : 2;
  conjuredItem.quality = conjuredItem.quality - decreaseAmount;

  if (conjuredItem.quality < 0 ) conjuredItem.quality = 0;

  conjuredItem.sellIn = conjuredItem.sellIn - 1;

  return conjuredItem;
}

function defaultUpdater(defaultItem) {
  var decreaseAmount = defaultItem.sellIn < 1 ? 2 : 1;
  defaultItem.quality = defaultItem.quality - decreaseAmount;

  if (defaultItem.quality < 0 ) defaultItem.quality = 0;

  defaultItem.sellIn = defaultItem.sellIn - 1;

  return defaultItem;
}

class Shop {
  constructor(items=[]) {
    this.items = items;
  }
  updateQuality() {

    return this.items.map( item => {
      switch (item.name) {
        case ITEMS.Consert_Ticket:
          return consertTicketUpdater(item);
          break;
        case ITEMS.Aged_Brie:
          return agedBrieUpdater(item);
          break;
        case ITEMS.Sulfuras:
          return sulfurasUpdater(item);
          break;
        case ITEMS.Conjured:
          return conjuredUpdater(item);
          break;
        default:
          return defaultUpdater(item);
          break;
      }
    });

    return this.items;
  }
}
