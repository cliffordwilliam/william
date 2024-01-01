const Helper = require("../helper.js");
const Utils = require("../utils.js");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = class ScrapperController {
  static async getAmazon(req, res, next) {
    // 27/12/2023 - working
    try {
      // get params
      let { search } = req.query; // .../?limit=10&page=1&
      // options
      const username = String(process.env.BRIGHT_DATA_USERNAME);
      const password = String(process.env.BRIGHT_DATA_PASSWORD);
      const port = 22225;
      const session_id = (1000000 * Math.random()) | 0;
      // GET
      const response = await axios.get(search, {
        options: {
          auth: {
            username: `${username}-session-${session_id}`,
            password,
          },
          host: "brd.superproxy.io",
          port,
          rejectUnauthorized: false,
        },
      });
      // html page -> title, price, other scrapped data
      const $ = cheerio.load(response.data);
      const title = $("#productTitle").text().trim();
      const currentPrice = Helper.extractPrice(
        $(".priceToPay span.a-price-whole"),
        $(".a.size.base.a-color-price"),
        $(".a-button-selected .a-color-base")
      );
      const originalPrice = Helper.extractPrice(
        $("#priceblock_ourprice"),
        $(".a-price.a-text-price span.a-offscreen"),
        $("#listPrice"),
        $("#priceblock_dealprice"),
        $(".a-size-base.a-color-price")
      );
      const outOfStock =
        $("#availability span").text().trim().toLowerCase() ===
        "currently unavailable";
      const images =
        $("#imgBlkFront").attr("data-a-dynamic-image") ||
        $("#landingImage").attr("data-a-dynamic-image") ||
        "{}";
      const imageUrls = Object.keys(JSON.parse(images));
      const currency = Helper.extractCurrency($(".a-price-symbol"));
      const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");
      const description = Helper.extractDescription($);
      let stars = $(
        "a.a-popover-trigger.a-declarative span.a-size-base.a-color-base"
      )
        .text()
        .trim();
      stars = Helper.extractStars(stars);
      // res
      res.status(200).json({
        message: "Amazon successfully scrapped.",
        obj: {
          search,
          currency: currency || "$",
          image: imageUrls[0],
          title,
          currentPrice: Number(currentPrice) || Number(originalPrice),
          originalPrice: Number(originalPrice) || Number(currentPrice),
          discountRate: Number(discountRate),
          stars: stars,
          isOutOfStock: outOfStock,
          description,
          lowestPrice: Number(currentPrice) || Number(originalPrice),
          highestPrice: Number(originalPrice) || Number(currentPrice),
          averagePrice: Number(currentPrice) || Number(originalPrice),
        },
      });
    } catch (error) {
      next(error);
    }
  }
};
