import mongoose from 'mongoose';

const product_schema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    picture: { data: Buffer, contentType: String }
});

// this is needed to create the URL for getting the picture
product_schema.virtual('picture_url').get(function() {
    return this._id + '/picture';
});

const Product = mongoose.model('Product', product_schema);

export default Product;
