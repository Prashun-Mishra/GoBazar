import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const vegFruitImages = [
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702463308432-3",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702734004998-8",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1712577388325-3",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702734004998-3",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/278_1678705041060.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/395_1668582176947.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/157_1643443974388.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/66acfb51-c5fe-4718-a200-61efaf773556.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1452_1617891490134.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/928_1658840270707.png",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1719920085745-3",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1725615169295-3"
];

const vegFruitSubcats = [
    'fresh-vegetables',
    'fruits',
    'mangoes-melons',
    'seasonal',
    'exotics',
    'freshly-cut-sprouts',
    'frozen-veg',
    'leafies-herbs',
    'flowers-leaves',
    'combo-recipes',
    'all-fruits-vegetables',
    'apples-pears'
];

const dairyBreakfastImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/922_1643384380004.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/953_1657599742631.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1200_1657599895699.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/954_1680251634382.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/614_1680251576771.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/584_1680251645977.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/923_1643384369257.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/123_1643384414434.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/952_1657599773117.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/2253_1694001802103.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1092_1643384330629.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1295_1643445863467.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/644_1690196367179.png", // Updated Peanut Butter
    "", // Placeholder for Energy Bars
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/644_1690196367179.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/996fd78d-c7b6-453a-9e1b-79dc9372dba7.png",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1700735371138-2",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1184_1661407202472.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1612_1666261789562.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/609_1695366756108.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1388_1643446601197.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1425_1643613254262.png"
];

const dairyBreakfastSubcats = [
    'milk',
    'bread-pav',
    'eggs',
    'flakes-kids-cereals',
    'muesli-granola',
    'oats',
    'paneer-tofu',
    'curd-yogurt',
    'butter-more',
    'cheese',
    'cream-condensed-milk',
    'vermicelli-poha-daliya',
    'peanut-butter',
    'energy-bars',
    'lassi-shakes-more',
    'breakfast-mixes',
    'honey-chyawanprash',
    'sausage-salami-ham',
    'batter',
    'vermicelli',
    'poha',
    'daliya-other-grains'
];

const munchiesImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/940_1643445382163.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/107_1643445091063.png",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1700735371138-2",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/316_1643445356931.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1178_1643445391732.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/156_1643445347481.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/29_1647516811054.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/816_1643616595725.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/80_1643446014772.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/613_1680251590747.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/a10dccab-6301-4e0c-b49e-a221b0edb0d5.png",
    "" // Placeholder for Munchies Gift Packs
];

const munchiesSubcats = [
    'chips-crisps',
    'rusks-wafers',
    'munchies-energy-bars',
    'nachos',
    'bhujia-mixtures',
    'popcorn',
    'namkeen-snacks',
    'makhana-more',
    'papad-fryums',
    'imported-snacks',
    'granola',
    'munchies-gift-packs'
];

const coldDrinksImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1323_1692947258191.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1102_1649432926740.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/955_1643385414974.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1108_1684311412858.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1318_1684311395298.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/109_1677842362578.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1109_1643445639946.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/91_1684226377332.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1594_1680180957343.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1184_1661407202472.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/270_1643385402833.png",
    "https://cdn.grofers.com/app/images/category/cms_images/e810aed5-48d9-4a36-be2b-025c70926d9a.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1599_1643385438589.png"
];

const coldDrinksSubcats = [
    'beverages-gift-packs',
    'soft-drinks',
    'fruit-juice',
    'mango-drinks',
    'pure-juices',
    'concentrates-syrups',
    'herbal-drinks',
    'energy-drinks',
    'coconut-water',
    'cold-lassi-shakes-more',
    'water-ice-cubes',
    'cold-coffee-ice-tea',
    'soda-mixers'
];

const teaCoffeeImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/957_1643445598079.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1322_1643445664338.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/960_1689245796579.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1605_1665749364430.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/90_1671788896369.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1495_1669619344934.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/2463_1697721043661.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/2363_1696422749091.png"
];

const bakeryImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/2380_1696572534396.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/28_1643445056245.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/105_1668515747141.png",
    "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/c292c07b-c9a7-57b4-be24-ac3cbb3120f5/f1463100-01cd-556f-b839-1b494974cd2c.jpg",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/209_1643445123315.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/938_1681720325311.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/108_1669984636578.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/971_1643445162896.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/144_1643445112222.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1959_1687773864346.png"
];

const sweetToothImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/943_1643444719353.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/2379_1696572513174.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/183_1643444706263.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1173_1673243796859.png",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702881050194-3",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1930_1643444770081.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1289_1643444757757.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1933_1643446123003.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/106_1643444691848.png"
];

const paanCornerImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1948_1660715272304.png",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1715069589495-3",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1982_1649674540853.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/290_1643962132067.png",
    "https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6e61f9e4af2852bdb3d2233a8228b16b0e76e458e1aea17624623e0c33ccc13b5cf0ade8d89ba9b33f419120e8a123d6db",
    "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/4495146c-35b7-5d98-a44b-47b97fffa2c1/cf386fa8-b728-5ee3-8675-52ac85773962.jpg",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/2518_1699269042011.png"
];

const breakfastImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/962_1643384795557.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1413_1643385202902.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1412_1643385216342.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/968_1669884568341.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/965_1669884524375.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/964_1656662125900.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1294_1669884460269.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/970_1683113586178.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1968_1643446137546.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/2361_1696422809429.png"
];

const attaRiceDalImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1165_1643445834987.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1161_1643445823265.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/10e2287b-b293-43c4-8570-ff9eb409b1eb.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/2b58bf62-315b-4bf2-92b6-d1f4c608bfd4.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/8a23d0c4-46b8-4024-8382-858b7656c296.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/c2760781-1709-4eb4-82b3-7ebbda91fcbc.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/48_1643445780397.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1573_1680264271827.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/8db26e11-2d4b-4239-8ca3-f8817197edbb.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/505_1680264256295.png"
];

const masalaOilImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/917_1643446040818.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1160_1666181942563.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1158_1666181985308.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/930_1643446053384.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/50_1643446001120.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/815_1643446027679.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/933_1643446066738.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/3d31f4ac-0d5a-43ee-a5b3-599769448b12.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1602_1692184714796.png"
];

const saucesSpreadsImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/277_1680267087473.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1045_1681106573269.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/625_1695367018332.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/974_1695366722134.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1126_1643619122884.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/89_1695366791010.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1132_1695367005258.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/929_1695366900409.png",
    "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/1a43abdc-691f-5627-bf3d-7e356faf8448/78b7eb7a-896e-57ff-b047-c69590dd28e7.jpg"
];

const chickenMeatImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1201_1679661889565.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1362_1643713574748.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1363_1643446589058.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1361_1643446562291.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1388_1643446601197.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/dccea74c-b339-4c63-b6e7-b7d3bb0f3006.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/67_1656658706335.png"
];

const organicHealthyImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/799_1643446814802.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/801_1643446838759.png",
    "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/eb316a7b-525b-561c-aa8f-628b7cd97cb3/594dd933-586b-5f47-a120-80cec0c8f64d.jpg",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1937_1643446905991.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/800_1643446826192.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1128_1643637211527.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/803_1643447020863.png",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1704171754865-3",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/b7207f9d-b3da-44c1-8270-34e5127f3518.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1044_1689233785398.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1935_1643446881050.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/939_1689233799027.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1563_1668760600467.png"
];

const babyCareImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1000_1685686698390.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1001_1643447265532.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/996_1676379098477.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1590_1643447293757.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1002_1643447281696.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/169_1643447211741.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/998_1643447239357.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/597_1676379033591.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/88da2974-1dc0-4e90-b8c3-1d989c9b49c2.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/85_1643447197842.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1967_1643447304766.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/997_1643447226919.png",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707980337522-11",
    "https://cdn.grofers.com/app/images/category/cms_images/504de542-2433-426b-8c5b-ae71fc830534.png"
];

const pharmaWellnessImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/741_1697295733939.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/629_1643447524816.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/293_1681475109894.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/308_1681837991970.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1826_1643447577409.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1135_1643884256823.png",
    "https://cdn.grofers.com/app/images/category/cms_images/9854af59-ffea-4134-9fb5-c4af6131827d.png",
    "https://cdn.grofers.com/app/images/category/cms_images/0a3a4700-5dae-4ec7-8cc1-f81a08753a6a.png",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1710432257090-3"
];

const cleaningEssentialsImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/985_1643619456246.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/51_1643448131477.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/987_1643448205529.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1085_1643449326937.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/983_1650998917566.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1078_1643448428592.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1082_1649682880372.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/988_1643448222273.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1784_1647947661998.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/986_1643448183854.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/57_1643448143523.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1833_1659532044957.png",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1718363303715-3",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/926_1667393677551.png"
];

const homeOfficeImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1048_1695386579497.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/126_1659006681746.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1433_1665503561691.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1674_1694425010896.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1075_1684503858321.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1014_1649683071299.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1992_1649683473312.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1415_1656663457382.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1025_1672316027384.png",
    "https://cdn.grofers.com/app/images/category/cms_images/a5791a9f-0ec2-46db-89e4-d8b5c27f641c.png",
    "https://cdn.grofers.com/app/images/category/cms_images/99291f72-4da0-49dc-9166-3b5bd27a0e0a.png",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1699620257931-2"
];

const personalCareImages = [
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/693165e8-9ceb-4911-bdf3-545bcd299c0b.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/710_1657624970651.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/a067417d-bc60-4f19-943d-1274f2460031.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/722_1678103275835.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/699_1690463809258.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/bd71de76-9d23-4ee0-b2ec-d5ba0943ed1d.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/0a833903-5b45-4cef-8c35-9ec19fbb197e.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/752_1678186670525.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/6bac0c2b-ad50-4c20-8663-bfac798c8940.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1115_1682877762642.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1893_1672039851769.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/697_1690899482688.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/696_1690463781378.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/164_1655204698070.png",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/981_1690463765922.png",
    "https://cdn.grofers.com/app/images/category/cms_images/fa987078-2a0c-45d5-819a-16f8f290f8b9.png"
];

const petCareImages = [
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1716287986266-3",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1717067945707-3",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1717072632680-3",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1717137798882-3",
    "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1717146479043-3"
];

async function main() {
    console.log('🚀 Starting subcategory image update...');

    // Update Vegetables & Fruits
    console.log('🥦 Updating Vegetables & Fruits subcategories...');
    for (let i = 0; i < vegFruitSubcats.length; i++) {
        const slug = vegFruitSubcats[i];
        const image = vegFruitImages[i];

        if (image) {
            await prisma.subCategory.update({
                where: { slug },
                data: { image }
            });
            console.log(`✅ Updated ${slug}`);
        } else {
            console.log(`⚠️ No image for ${slug}`);
        }
    }

    // Update Dairy & Breakfast
    console.log('🥛 Updating Dairy & Breakfast subcategories...');
    for (let i = 0; i < dairyBreakfastSubcats.length; i++) {
        const slug = dairyBreakfastSubcats[i];
        const image = dairyBreakfastImages[i];

        if (image) {
            await prisma.subCategory.update({
                where: { slug },
                data: { image }
            });
            console.log(`✅ Updated ${slug}`);
        } else {
            console.log(`⚠️ No image for ${slug}`);
        }
    }

    // Update Munchies
    console.log('🍿 Updating Munchies subcategories...');
    for (let i = 0; i < munchiesSubcats.length; i++) {
        const slug = munchiesSubcats[i];
        const image = munchiesImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { slug }, data: { image } });
            console.log(`✅ Updated ${slug}`);
        }
    }

    // Update Cold Drinks
    console.log('🥤 Updating Cold Drinks subcategories...');
    for (let i = 0; i < coldDrinksSubcats.length; i++) {
        const slug = coldDrinksSubcats[i];
        const image = coldDrinksImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { slug }, data: { image } });
            console.log(`✅ Updated ${slug}`);
        }
    }

    // Fetch and Update Tea & Coffee
    const teaCoffeeSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'tea-coffee-health-drinks' } },
        orderBy: { order: 'asc' }
    });
    console.log('☕ Updating Tea & Coffee subcategories...');
    for (let i = 0; i < teaCoffeeSubcats.length; i++) {
        const subcat = teaCoffeeSubcats[i];
        const image = teaCoffeeImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Bakery
    const bakerySubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'bakery-biscuits' } },
        orderBy: { order: 'asc' }
    });
    console.log('🍞 Updating Bakery subcategories...');
    for (let i = 0; i < bakerySubcats.length; i++) {
        const subcat = bakerySubcats[i];
        const image = bakeryImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Sweet Tooth
    const sweetToothSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'sweet-tooth' } },
        orderBy: { order: 'asc' }
    });
    console.log('🍬 Updating Sweet Tooth subcategories...');
    for (let i = 0; i < sweetToothSubcats.length; i++) {
        const subcat = sweetToothSubcats[i];
        const image = sweetToothImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Paan Corner
    const paanCornerSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'paan-corner' } },
        orderBy: { order: 'asc' }
    });
    console.log('🍃 Updating Paan Corner subcategories...');
    for (let i = 0; i < paanCornerSubcats.length; i++) {
        const subcat = paanCornerSubcats[i];
        const image = paanCornerImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Breakfast
    const breakfastSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'breakfast-instant-food' } },
        orderBy: { order: 'asc' }
    });
    console.log('🥣 Updating Breakfast subcategories...');
    for (let i = 0; i < breakfastSubcats.length; i++) {
        const subcat = breakfastSubcats[i];
        const image = breakfastImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Atta, Rice & Dal
    const attaSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'atta-rice-dal' } },
        orderBy: { order: 'asc' }
    });
    console.log('🍚 Updating Atta, Rice & Dal subcategories...');
    for (let i = 0; i < attaSubcats.length; i++) {
        const subcat = attaSubcats[i];
        const image = attaRiceDalImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Masala, Oil & More
    const masalaOilSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'masala-oil-more' } },
        orderBy: { order: 'asc' }
    });
    console.log('🌶️ Updating Masala, Oil & More subcategories...');
    for (let i = 0; i < masalaOilSubcats.length; i++) {
        const subcat = masalaOilSubcats[i];
        const image = masalaOilImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Sauces & Spreads
    const saucesSpreadsSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'sauces-spreads' } },
        orderBy: { order: 'asc' }
    });
    console.log('🍯 Updating Sauces & Spreads subcategories...');
    for (let i = 0; i < saucesSpreadsSubcats.length; i++) {
        const subcat = saucesSpreadsSubcats[i];
        const image = saucesSpreadsImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Chicken, Meat & Fish
    const chickenMeatSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'chicken-meat-fish' } },
        orderBy: { order: 'asc' }
    });
    console.log('🍗 Updating Chicken, Meat & Fish subcategories...');
    for (let i = 0; i < chickenMeatSubcats.length; i++) {
        const subcat = chickenMeatSubcats[i];
        const image = chickenMeatImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Organic & Healthy Living
    const organicHealthySubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'organic-healthy-living' } },
        orderBy: { order: 'asc' }
    });
    console.log('🌱 Updating Organic & Healthy Living subcategories...');
    for (let i = 0; i < organicHealthySubcats.length; i++) {
        const subcat = organicHealthySubcats[i];
        const image = organicHealthyImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Baby Care
    const babyCareSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'baby-care' } },
        orderBy: { order: 'asc' }
    });
    console.log('👶 Updating Baby Care subcategories...');
    for (let i = 0; i < babyCareSubcats.length; i++) {
        const subcat = babyCareSubcats[i];
        const image = babyCareImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Pharma & Wellness
    const pharmaWellnessSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'pharma-wellness' } },
        orderBy: { order: 'asc' }
    });
    console.log('💊 Updating Pharma & Wellness subcategories...');
    for (let i = 0; i < pharmaWellnessSubcats.length; i++) {
        const subcat = pharmaWellnessSubcats[i];
        const image = pharmaWellnessImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Cleaning Essentials
    const cleaningEssentialsSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'cleaning-essentials' } },
        orderBy: { order: 'asc' }
    });
    console.log('🧹 Updating Cleaning Essentials subcategories...');
    for (let i = 0; i < cleaningEssentialsSubcats.length; i++) {
        const subcat = cleaningEssentialsSubcats[i];
        const image = cleaningEssentialsImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Home & Office
    const homeOfficeSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'home-office' } },
        orderBy: { order: 'asc' }
    });
    console.log('🏠 Updating Home & Office subcategories...');
    for (let i = 0; i < homeOfficeSubcats.length; i++) {
        const subcat = homeOfficeSubcats[i];
        const image = homeOfficeImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Personal Care
    const personalCareSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'personal-care' } },
        orderBy: { order: 'asc' }
    });
    console.log('💅 Updating Personal Care subcategories...');
    for (let i = 0; i < personalCareSubcats.length; i++) {
        const subcat = personalCareSubcats[i];
        const image = personalCareImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    // Fetch and Update Pet Care
    const petCareSubcats = await prisma.subCategory.findMany({
        where: { category: { slug: 'pet-care' } },
        orderBy: { order: 'asc' }
    });
    console.log('🐾 Updating Pet Care subcategories...');
    for (let i = 0; i < petCareSubcats.length; i++) {
        const subcat = petCareSubcats[i];
        const image = petCareImages[i];
        if (image) {
            await prisma.subCategory.update({ where: { id: subcat.id }, data: { image } });
            console.log(`✅ Updated ${subcat.slug}`);
        }
    }

    console.log('✨ All updates completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
