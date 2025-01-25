import { IProduct } from "../interfaces/product.interface";

const product_data: IProduct[] = [
  // SMARTPHONES CATEGORY
  {
    id: "641e887d05f9ee1717e1348a",
    sku: "XM-RN12-64",
    isNew: true,
    bgColor: "#E3E3E3",
    img: "https://s03.s3c.es/imag/_v0/770x420/b/3/c/Redmi-Note-9-Pro-3.png",
    name: "Xiaomi Redmi Note 12",
    slug: "xiaomi-redmi-note-12",
    unit: "1pc",
    imageURLs: [
      {
        color: { name: "Sky Blue", clrCode: "#C6E7F5" },
        img: "https://s03.s3c.es/imag/_v0/770x420/b/3/c/Redmi-Note-9-Pro-3.png"
      }
    ],
    category: "Smartphones",
    children: "Xiaomi Phones",
    price: 299,
    discount: 10,
    quantity: 15,
    brand: {
      name: "Xiaomi"
    },
    category: {
      name: "Smartphones"
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    description: "Xiaomi Redmi Note 12 features a 6.67-inch AMOLED display, Snapdragon 685 processor...",
    tags: ["smartphone", "xiaomi", "redmi"],
    additionalInformation: [
      {
        key: "Standing screen display size",
        value: "6.67 Inches"
      },
      {
        key: "Ram Memory Installed Size",
        value: "8 GB"
      },
      {
        key: "Operating System",
        value: "Android 13.0"
      },
      {
        key: "Cellular Technology",
        value: "5G"
      }
    ],
    sellCount: 0
  },
  {
    id: "641e887d05f9ee1717e1348f",
    sku: "APL-IP14P-256",
    isNew: true,
    bgColor: "#E3E3E3",
    img: "https://gallerypng.com/wp-content/uploads/2024/08/iphone-png-series-image.png",
    name: "iPhone 14 Pro",
    slug: "iphone-14-pro",
    unit: "1pc",
    imageURLs: [
      {
        color: { name: "Blue", clrCode: "#F5E5D6" },
        img: "https://gallerypng.com/wp-content/uploads/2024/08/iphone-png-series-image.png"
      },

    ],
    category: "Smartphones",
    children: "Apple Phones",
    price: 999,
    discount: 0,
    quantity: 10,
    brand: {
      name: "Apple"
    },
    category: {
      name: "Smartphones"
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    description: "iPhone 14 Pro features Dynamic Island, 48MP camera, Always-On display...",
    tags: ["smartphone", "apple", "iphone"],
    additionalInformation: [
      {
        key: "Standing screen display size",
        value: "6.1 Inches"
      },
      {
        key: "Ram Memory Installed Size",
        value: "8 GB"
      },
      {
        key: "Operating System",
        value: "iOS 16.0"
      },
      {
        key: "Cellular Technology",
        value: "5G"
      }
    ],
    sellCount: 0
  },
  // SMARTWATCHES CATEGORY
  {
    id: "641e887d05f9ee1717e1349a",
    sku: "APL-WTS8-GPS",
    isNew: true,
    bgColor: "#E3E3E3",
    img: "https://crdms.images.consumerreports.org/prod/products/cr/models/407606-smartwatches-apple-watch-series-8-gps-45mm-10032324.png",
    name: "Apple Watch Series 8",
    slug: "apple-watch-series-8",
    unit: "1pc",
    imageURLs: [
      {
        color: { name: "Midnight", clrCode: "#1D1D1F" },
        img: "https://crdms.images.consumerreports.org/prod/products/cr/models/407606-smartwatches-apple-watch-series-8-gps-45mm-10032324.png"
      },
    ],
    category: "SmartWatches",
    children: "Apple Watch",
    price: 399,
    discount: 5,
    quantity: 8,
    brand: {
      name: "Apple"
    },
    category: {
      name: "SmartWatches"
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    description: "Apple Watch Series 8 features temperature sensing, crash detection...",
    tags: ["smartwatch", "apple", "watch"],
    additionalInformation: [
      {
        key: "Standing screen display size",
        value: "45mm"
      },
      {
        key: "Ram Memory Installed Size",
        value: "16 GB"
      },
      {
        key: "Operating System",
        value: "watchOS 9.0"
      },
      {
        key: "Cellular Technology",
        value: "5G"
      }
    ],
    sellCount: 0
  },
  // AUDIO CATEGORY
  {
    id: "641e887d05f9ee1717e134ad",
    sku: "JBL-FLIP6",
    isNew: false,
    bgColor: "#E3E3E3",
    img: "https://www.jbl.com.pa/on/demandware.static/-/Sites-siteCatalog_JB_PA/default/dw83d4825a/JBL_PARTYBOX_STAGE_320_HERO_2_47988_x3(1).png",
    name: "JBL Flip 6 Portable Speaker",
    slug: "jbl-flip-6-speaker",
    unit: "1pc",
    imageURLs: [
      {
        color: { name: "Green", clrCode: "#000000" },
        img: "https://www.jbl.com.pa/on/demandware.static/-/Sites-siteCatalog_JB_PA/default/dw83d4825a/JBL_PARTYBOX_STAGE_320_HERO_2_47988_x3(1).png"
      },
      {
        color: { name: "Purple", clrCode: "#1E3799" },
        img: "https://www.jbl.com.pa/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw8870fbe0/1_JBL_PARTYBOX_110_HERO_x2.png?sw=537&sfrm=png"
      }
    ],
    category: "Audio",
    children: "Portable Speakers",
    price: 129,
    discount: 0,
    quantity: 12,
    brand: {
      name: "JBL"
    },
    category: {
      name: "Audio"
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    description: "JBL Flip 6 delivers powerful JBL Original Pro Sound with exceptional clarity...",
    tags: ["speaker", "bluetooth", "audio"],
    additionalInformation: [
      {
        key: "Standing screen display size",
        value: "6.5 Inches"
      },
      {
        key: "Ram Memory Installed Size",
        value: "16 GB"
      },
      {
        key: "Operating System",
        value: "Android 13.0"
      },
      {
        key: "Cellular Technology",
        value: "5G"
      }
    ],
    sellCount: 0
  },
  // LAPTOPS CATEGORY
  {
    id: "641e887d05f9ee1717e134cb",
    sku: "LNV-YOGA-7i",
    isNew: true,
    bgColor: "#E3E3E3",
    img: "https://p2-ofp.static.pub/fes/cms/2022/06/08/k21t0mdv56nqm9s7ocf5vgteucg21v444839.png",
    name: "Lenovo Yoga 7i",
    slug: "lenovo-yoga-7i",
    unit: "1pc",
    imageURLs: [
      {
        color: { name: "Storm Grey", clrCode: "#4F4F4F" },
        img: "https://p2-ofp.static.pub/fes/cms/2022/06/08/k21t0mdv56nqm9s7ocf5vgteucg21v444839.png"
      }
    ],
    category: "Laptops",
    children: "2-in-1 Laptops",
    price: 899,
    discount: 12,
    quantity: 5,
    brand: {
      name: "Lenovo"
    },
    category: {
      name: "Laptops"
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    description: "Lenovo Yoga 7i features Intel Core i7, 16GB RAM, 512GB SSD...",
    tags: ["laptop", "lenovo", "2-in-1"],
    additionalInformation: [
      {
        key: "Standing screen display size",
        value: "14 Inches"
      },
      {
        key: "Ram Memory Installed Size",
        value: "16 GB"
      },
      {
        key: "Operating System",
        value: "Windows 11"
      },
      {
        key: "Cellular Technology",
        value: "5G"
      }
    ],
    sellCount: 0
  },
  // CONNECTIVITY CATEGORY
  {
    id: "641e887d05f9ee1717e134b2",
    sku: "TPL-AX3000",
    isNew: false,
    bgColor: "#E3E3E3",
    img: "https://skyteksecurity.hn/cdn/shop/files/TLWR850N-p_480x480.png?v=1696739936",
    name: "TP-Link Archer AX3000",
    slug: "tp-link-archer-ax3000",
    unit: "1pc",
    imageURLs: [
      {
        color: { name: "Black", clrCode: "#000000" },
        img: "https://skyteksecurity.hn/cdn/shop/files/TLWR850N-p_480x480.png?v=1696739936"
      }
    ],
    category: "Connectivity",
    children: "Routers",
    price: 129,
    discount: 0,
    quantity: 15,
    brand: {
      name: "tp-link"
    },
    category: {
      name: "connectivity"
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    description: "TP-Link Archer AX3000 delivers next-gen WiFi 6 speeds up to 3Gbps...",
    tags: ["router", "wifi", "networking"],
    additionalInformation: [
      {
        key: "Standing screen display size",
        value: "1 Inches"
      },
      {
        key: "Ram Memory Installed Size",
        value: "16 GB"
      },
      {
        key: "Operating System",
        value: "Android 13.0"
      },
      {
        key: "Cellular Technology",
        value: "5G"
      }
    ],
    sellCount: 0
  },
  // TABLETS CATEGORY
  {
    id: "641e887d05f9ee1717e134c6",
    sku: "SMS-TABS8",
    isNew: true,
    bgColor: "#E3E3E3",
    img: "https://purepng.com/public/uploads/large/samsung-galaxy-s10-prism-front-6bx.png",
    name: "Samsung Galaxy Tab S8",
    slug: "samsung-galaxy-tab-s8",
    unit: "1pc",
    imageURLs: [
      {
        color: { name: "Graphite", clrCode: "#514F4C" },
        img: "https://purepng.com/public/uploads/large/samsung-galaxy-s10-prism-front-6bx.png"
      },
      {
        color: { name: "Silver", clrCode: "#E6E6E6" },
        img: "https://pngimagesfree.com/wp-content/uploads/Samsung-Galaxy-S24-Purple-PNG@pngimagesfree.png"
      }
    ],
    category: "Tablets",
    children: "Android Tablets",
    price: 699,
    discount: 8,
    quantity: 7,
    brand: {
      name: "Samsung"
    },
    category: {
      name: "Tablets"
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    description: "Samsung Galaxy Tab S8 features 11-inch display, S Pen included...",
    tags: ["tablet", "samsung", "android"],
    additionalInformation: [
      {
        key: "Standing screen display size",
        value: "11 Inches"
      },
      {
        key: "Ram Memory Installed Size",
        value: "8 GB"
      },
      {
        key: "Operating System",
        value: "Android 13.0"
      },
      {
        key: "Cellular Technology",
        value: "5G"
      }
    ],
    sellCount: 0
  },
  // GAMING CATEGORY
  {
    id: "641e887d05f9ee1717e134cf",
    sku: "LNV-LG5-PRO",
    isNew: true,
    bgColor: "#E3E3E3",
    img: "https://p1-ofp.static.pub/fes/cms/2023/05/03/nhhxvkm09yy8lsuyzprsukppz7q5fn701155.png",
    name: "Lenovo Legion 5 Pro",
    slug: "lenovo-legion-5-pro",
    unit: "1pc",
    imageURLs: [
      {
        color: { name: "Storm Grey", clrCode: "#4A4A4A" },
        img: "https://p1-ofp.static.pub/fes/cms/2023/05/03/nhhxvkm09yy8lsuyzprsukppz7q5fn701155.png"
      }
    ],
    category: "Gaming",
    children: "Gaming Laptops",
    price: 1399,
    discount: 10,
    quantity: 4,
    brand: {
      name: "Lenovo"
    },
    category: {
      name: "Gaming"
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    description: "Lenovo Legion 5 Pro features RTX 3070, AMD Ryzen 7, 16GB RAM...",
    tags: ["gaming", "laptop", "lenovo"],
    additionalInformation: [
      {
        key: "Standing screen display size",
        value: "16 Inches"
      },
      {
        key: "Ram Memory Installed Size",
        value: "16 GB"
      },
      {
        key: "Operating System",
        value: "Windows 11"
      },
      {
        key: "Cellular Technology",
        value: "5G"
      }
    ],
    sellCount: 0
  }
];

export default product_data;
