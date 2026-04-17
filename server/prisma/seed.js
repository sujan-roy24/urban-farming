require("dotenv").config();
const bcrypt = require("bcrypt");
const prisma = require("../src/config/prisma");

async function main() {
  console.log("Seeding started...");

  const hashedPassword = await bcrypt.hash("Pass1234", 10);

  // Make repeated seeding safe
  await prisma.communityPost.deleteMany();
  await prisma.order.deleteMany();
  await prisma.rentalSpace.deleteMany();
  await prisma.product.deleteMany();
  await prisma.sustainabilityCert.deleteMany();
  await prisma.vendorProfile.deleteMany();
  await prisma.user.deleteMany();

  // 3 roles
  const admin = await prisma.user.create({
    data: {
      name: "System Admin",
      email: "admin@urbanfarming.com",
      password: hashedPassword,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Main Customer",
      email: "customer@urbanfarming.com",
      password: hashedPassword,
      role: "CUSTOMER",
      status: "ACTIVE",
    },
  });

  // 10 vendors
  const vendors = [];

  for (let i = 1; i <= 10; i++) {
    const vendorUser = await prisma.user.create({
      data: {
        name: `Vendor User ${i}`,
        email: `vendor${i}@urbanfarming.com`,
        password: hashedPassword,
        role: "VENDOR",
        status: "ACTIVE",
      },
    });

    const vendorProfile = await prisma.vendorProfile.create({
      data: {
        userId: vendorUser.id,
        farmName: `Green Farm ${i}`,
        farmLocation: `Dhaka Zone ${i}`,
        certificationStatus: i % 2 === 0 ? "APPROVED" : "PENDING",
      },
    });

    await prisma.sustainabilityCert.create({
      data: {
        vendorId: vendorProfile.id,
        certifyingAgency: `Certification Agency ${i}`,
        certificationDate: new Date(2026, 0, i),
        status: i % 2 === 0 ? "APPROVED" : "PENDING",
      },
    });

    await prisma.rentalSpace.create({
      data: {
        vendorId: vendorProfile.id,
        location: `Farm Area ${i}, Dhaka`,
        size: `${1000 + i * 100} sq ft`,
        price: 10000 + i * 500,
        availability: true,
      },
    });

    vendors.push({
      user: vendorUser,
      profile: vendorProfile,
    });
  }

  // 100 products => 10 products per vendor
  const productCategories = [
    "Vegetables",
    "Fruits",
    "Herbs",
    "Seeds",
    "Compost",
  ];

  const productNames = [
    "Organic Tomato",
    "Fresh Lettuce",
    "Spinach Bundle",
    "Mint Leaves",
    "Basil Pack",
    "Strawberry Box",
    "Cucumber Basket",
    "Carrot Pack",
    "Chili Pack",
    "Organic Compost",
  ];

  const createdProducts = [];

  for (let i = 0; i < vendors.length; i++) {
    const vendor = vendors[i];

    for (let j = 1; j <= 10; j++) {
      const productIndex = (j - 1) % productNames.length;
      const categoryIndex = (j - 1) % productCategories.length;

      const product = await prisma.product.create({
        data: {
          vendorId: vendor.profile.id,
          name: `${productNames[productIndex]} ${i + 1}-${j}`,
          description: `High quality ${productNames[productIndex].toLowerCase()} from ${vendor.profile.farmName}.`,
          price: 50 + j * 10 + i * 5,
          category: productCategories[categoryIndex],
          certificationStatus: j % 2 === 0 ? "APPROVED" : "PENDING",
          availableQuantity: 20 + j * 3,
        },
      });

      createdProducts.push(product);
    }
  }

  // Some sample orders
  for (let i = 0; i < 10; i++) {
    await prisma.order.create({
      data: {
        userId: customer.id,
        productId: createdProducts[i].id,
        vendorId: vendors[i % vendors.length].profile.id,
        status: "PENDING",
      },
    });
  }

  // Some sample community posts
  for (let i = 1; i <= 5; i++) {
    await prisma.communityPost.create({
      data: {
        userId: customer.id,
        postContent: `Community post ${i}: Looking for fresh organic produce this week.`,
      },
    });
  }

  console.log("Seeding completed successfully.");
  console.log({
    adminEmail: admin.email,
    customerEmail: customer.email,
    vendorCount: vendors.length,
    productCount: createdProducts.length,
  });
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });