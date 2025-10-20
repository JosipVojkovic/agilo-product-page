import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  createUsersWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService = container.resolve(Modules.STORE);

  const countries = ["gb", "de", "dk", "se", "fr", "es", "it"];

  logger.info("Seeding store data...");
  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    // create the default sales channel
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [
          {
            currency_code: "eur",
            is_default: true,
          },
          {
            currency_code: "usd",
          },
        ],
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });
  logger.info("Seeding region data...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Europe",
          currency_code: "eur",
          countries,
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });
  const region = regionResult[0];
  logger.info("Finished seeding regions.");

  logger.info("Seeding tax regions...");
  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  });
  logger.info("Finished seeding tax regions.");

  logger.info("Seeding stock location data...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "European Warehouse",
          address: {
            city: "Copenhagen",
            country_code: "DK",
            address_1: "",
          },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_location_id: stockLocation.id,
      },
    },
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  });

  logger.info("Seeding fulfillment data...");
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  });
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null;

  if (!shippingProfile) {
    const { result: shippingProfileResult } =
      await createShippingProfilesWorkflow(container).run({
        input: {
          data: [
            {
              name: "Default Shipping Profile",
              type: "default",
            },
          ],
        },
      });
    shippingProfile = shippingProfileResult[0];
  }

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "European Warehouse delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Europe",
        geo_zones: [
          {
            country_code: "gb",
            type: "country",
          },
          {
            country_code: "de",
            type: "country",
          },
          {
            country_code: "dk",
            type: "country",
          },
          {
            country_code: "se",
            type: "country",
          },
          {
            country_code: "fr",
            type: "country",
          },
          {
            country_code: "es",
            type: "country",
          },
          {
            country_code: "it",
            type: "country",
          },
        ],
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Ship in 2-3 days.",
          code: "standard",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "eur",
            amount: 10,
          },
          {
            region_id: region.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
      {
        name: "Express Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Express",
          description: "Ship in 24 hours.",
          code: "express",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "eur",
            amount: 10,
          },
          {
            region_id: region.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
    ],
  });
  logger.info("Finished seeding fulfillment data.");

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding stock location data.");

  logger.info("Seeding publishable API key data...");
  const { result: publishableApiKeyResult } = await createApiKeysWorkflow(
    container
  ).run({
    input: {
      api_keys: [
        {
          title: "Webshop",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });
  const publishableApiKey = publishableApiKeyResult[0];

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding publishable API key data.");

  logger.info("Seeding product data...");

  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        {
          name: "Shirts",
          is_active: true,
        },
        {
          name: "Sweatshirts",
          is_active: true,
        },
        {
          name: "Pants",
          is_active: true,
        },
        {
          name: "Merch",
          is_active: true,
        },
        {
          name: "Sofas",
          is_active: true,
        },
      ],
    },
  });

  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Paloma Haven 4",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Sofas")!.id,
          ],
          description:
            "Minimalistic designs, neutral colors, and high-quality textures. Perfect for those who seek comfort with a clean and understated aesthetic. This collection brings the essence of Scandinavian elegance to your living room.",
          handle: "paloma-haven-4",
          weight: 400,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "http://localhost:9000/static/1760446178782-Image.svg",
            },
            {
              url: "http://localhost:9000/static/1760446178785-Image02.svg",
            },
            {
              url: "http://localhost:9000/static/1760446593172-Image02.svg",
            },
          ],
          options: [
            {
              title: "Material",
              values: ["Linen"],
            },
            {
              title: "Color",
              values: ["Red", "Blue", "Green"],
            },
          ],
          variants: [
            {
              title: "Linen / Red",
              sku: "PALOMA-HAVEN-4-LINEN-RED",
              options: {
                Material: "Linen",
                Color: "Red",
              },
              prices: [
                {
                  amount: 10000,
                  currency_code: "eur",
                },
                {
                  amount: 15000,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Linen / Blue",
              sku: "PALOMA-HAVEN-4-LINEN-LIGHT-BLUE",
              options: {
                Material: "Linen",
                Color: "Blue",
              },
              prices: [
                {
                  amount: 11000,
                  currency_code: "eur",
                },
                {
                  amount: 16000,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Linen / Green",
              sku: "PALOMA-HAVEN-4-BOUCLE-GREEN",
              options: {
                Material: "Linen",
                Color: "Green",
              },
              prices: [
                {
                  amount: 13000,
                  currency_code: "eur",
                },
                {
                  amount: 17000,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Paloma Haven 3",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Sofas")!.id,
          ],
          description:
            "Minimalistic designs, neutral colors, and high-quality textures. Perfect for those who seek comfort with a clean and understated aesthetic. This collection brings the essence of Scandinavian elegance to your living room.",
          handle: "paloma-haven-3",
          weight: 400,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "http://localhost:9000/static/1760446178785-Image02.svg",
            },
            {
              url: "http://localhost:9000/static/1760446178785-Image02.svg",
            },
          ],
          options: [
            {
              title: "Material",
              values: ["Linen", "Boucle"],
            },
            {
              title: "Color",
              values: ["Gray", "Light Gray"],
            },
          ],
          variants: [
            {
              title: "Linen / Gray",
              sku: "PALOMA-HAVEN-3-LINEN-GRAY",
              options: {
                Material: "Linen",
                Color: "Gray",
              },
              prices: [
                {
                  amount: 10000,
                  currency_code: "eur",
                },
                {
                  amount: 15000,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Linen / Light Gray",
              sku: "PALOMA-HAVEN-3-LINEN-LIGHT-GRAY",
              options: {
                Material: "Linen",
                Color: "Light Gray",
              },
              prices: [
                {
                  amount: 11000,
                  currency_code: "eur",
                },
                {
                  amount: 16000,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Boucle / Gray",
              sku: "PALOMA-HAVEN-3-BOUCLE-GRAY",
              options: {
                Material: "Boucle",
                Color: "Gray",
              },
              prices: [
                {
                  amount: 13000,
                  currency_code: "eur",
                },
                {
                  amount: 17000,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Boucle / Light Gray",
              sku: "PALOMA-HAVEN-3-BOUCLE-LIGHT-GRAY",
              options: {
                Material: "Boucle",
                Color: "Light Gray",
              },
              prices: [
                {
                  amount: 14000,
                  currency_code: "eur",
                },
                {
                  amount: 18000,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Paloma Haven 2",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Sofas")!.id,
          ],
          description:
            "Minimalistic designs, neutral colors, and high-quality textures. Perfect for those who seek comfort with a clean and understated aesthetic. This collection brings the essence of Scandinavian elegance to your living room.",
          handle: "paloma-haven-2",
          weight: 400,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "http://localhost:9000/static/1760560978108-6620ea897d26d568997efa34abc517d9177df473%20(1).jpg",
            },
            {
              url: "http://localhost:9000/static/1760446178785-Image02.svg",
            },
            {
              url: "http://localhost:9000/static/1760740407012-Image.svg",
            },
            {
              url: "http://localhost:9000/static/1760560944398-Image%20(1).svg",
            },
          ],
          options: [
            {
              title: "Material",
              values: ["Linen"],
            },
            {
              title: "Color",
              values: ["Red", "Blue", "Green"],
            },
          ],
          variants: [
            {
              title: "Linen / Red",
              sku: "PALOMA-HAVEN-2-LINEN-RED",
              options: {
                Material: "Linen",
                Color: "Red",
              },
              prices: [
                {
                  amount: 10000,
                  currency_code: "eur",
                },
                {
                  amount: 15000,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Linen / Blue",
              sku: "PALOMA-HAVEN-2-LINEN-LIGHT-BLUE",
              options: {
                Material: "Linen",
                Color: "Blue",
              },
              prices: [
                {
                  amount: 11000,
                  currency_code: "eur",
                },
                {
                  amount: 16000,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Linen / Green",
              sku: "PALOMA-HAVEN-2-BOUCLE-GREEN",
              options: {
                Material: "Linen",
                Color: "Green",
              },
              prices: [
                {
                  amount: 13000,
                  currency_code: "eur",
                },
                {
                  amount: 17000,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Paloma Haven",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Sofas")!.id,
          ],
          description:
            "Minimalistic designs, neutral colors, and high-quality textures. Perfect for those who seek comfort with a clean and understated aesthetic. This collection brings the essence of Scandinavian elegance to your living room.",
          handle: "paloma-haven",
          weight: 400,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "http://localhost:9000/static/1760560978108-6620ea897d26d568997efa34abc517d9177df473%20(1).jpg",
            },
            {
              url: "http://localhost:9000/static/1760446178785-Image02.svg",
            },
          ],
          options: [
            {
              title: "Material",
              values: ["Linen", "Boucle"],
            },
            {
              title: "Color",
              values: ["Gray", "Light Gray"],
            },
          ],
          variants: [
            {
              title: "Linen / Gray",
              sku: "PALOMA-HAVEN-LINEN-GRAY",
              options: {
                Material: "Linen",
                Color: "Gray",
              },
              prices: [
                {
                  amount: 10000,
                  currency_code: "eur",
                },
                {
                  amount: 15000,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Linen / Light Gray",
              sku: "PALOMA-HAVEN-LINEN-LIGHT-GRAY",
              options: {
                Material: "Linen",
                Color: "Light Gray",
              },
              prices: [
                {
                  amount: 11000,
                  currency_code: "eur",
                },
                {
                  amount: 16000,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Boucle / Gray",
              sku: "PALOMA-HAVEN-BOUCLE-GRAY",
              options: {
                Material: "Boucle",
                Color: "Gray",
              },
              prices: [
                {
                  amount: 13000,
                  currency_code: "eur",
                },
                {
                  amount: 17000,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Boucle / Light Gray",
              sku: "PALOMA-HAVEN-BOUCLE-LIGHT-GRAY",
              options: {
                Material: "Boucle",
                Color: "Light Gray",
              },
              prices: [
                {
                  amount: 14000,
                  currency_code: "eur",
                },
                {
                  amount: 18000,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
      ],
    },
  });
  logger.info("Finished seeding product data.");

  logger.info("Seeding inventory levels.");

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  const inventoryLevels: CreateInventoryLevelInput[] = [];
  for (const inventoryItem of inventoryItems) {
    const inventoryLevel = {
      location_id: stockLocation.id,
      stocked_quantity: 1000000,
      inventory_item_id: inventoryItem.id,
    };
    inventoryLevels.push(inventoryLevel);
  }

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryLevels,
    },
  });

  console.log(publishableApiKey.token);

  logger.info("Finished seeding inventory levels data.");
}
