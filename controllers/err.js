console.log(req.query)
const qNew = req.query.new;
const qCategory = req.query.category;
const {limit,color} = req.query;
const filter={color:color}
console.log(filter)
try {
    let products;
    if (qNew) {
        products = await Product.find(filter).sort({ createdAt: -1 }).limit(limit);
    } else if (qCategory) {
        products = await Product.find({
            categories: {
                $in: [qCategory],
            },
        });
    } else {
        products = await Product.find();
    }
    if(products.length===0){
        res.status(200).json("商品未查到！")
    }else{
        res.status(200).json(products)
    }
     
} catch (err) {
    res.status(500).json(err);
}





