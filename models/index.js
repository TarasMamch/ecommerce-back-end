const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Product.belongsTo(Category, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false
  }
})

Category.hasMany(Product)

Product.belongsToMany(Tag, { through: ProductTag })

Tag.belongsToMany(Product, { through: ProductTag }, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false
  }
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
