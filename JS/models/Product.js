export default class Product {
  constructor({ id, title, description, price, category, thumbnail, rating, stock, brand, discountPercentage }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
    this.thumbnail = thumbnail;
    this.rating = rating;
    this.stock = stock;
    this.brand = brand;
    this.discountPercentage = discountPercentage;
  }

  static createProductObj(data) {
    return data.map(
      ({ id, title, description, price, category, thumbnail, rating = 0, stock = 0, brand = "Unknown", discountPercentage = 0 }) =>
        new Product({
          id,
          title,
          description,
          price: Number(price.toFixed(2)),
          category,
          thumbnail,
          rating,
          stock,
          brand,
          discountPercentage,
        }),
    );
  }
}
