const { Product } = require("../models");
const asyncHandler = require('../middleware/async');
const { default: product } = require("../../ecormerce-front-end/services/product");
// 创建产品
exports.searchOne = asyncHandler(async (req, res, next) => {
    try {
        if (req.query.title) {
          let results;
          if (req.query.title.includes(",") || req.query.city.includes(" ")) {
            results = await product
              .aggregate([
                {
                  $search: {
                    index: "autocomplete",
                    autocomplete: {
                      query: req.query.city,
                      path: "searchName",
                      fuzzy: {
                        maxEdits: 1,
                      },
                      tokenOrder: "sequential",
                    },
                  },
                },
                {
                  $project: {
                    searchName: 1,
                    _id: 1,
                    city: 1,
                    country: 1,
                    adminCode: 1,
                    countryCode: 1,
                    fullName: 1,
                    score: { $meta: "searchScore" },
                  },
                },
                {
                  $limit: 10,
                },
              ])
              .toArray();
    
            return res.send(results);
          }
    
          result = await Product
            .aggregate([
              {
                $search: {
                  index: "autocomplete",
                  autocomplete: {
                    query: req.query.title,
                    path: "title",
                    fuzzy: {
                      maxEdits: 1,
                    },
                    tokenOrder: "sequential",
                  },
                },
              },
              {
                $project: {
                  searchName: 1,
                  _id: 1,
                  city: 1,
                  country: 1,
                  adminCode: 1,
                  countryCode: 1,
                  fullName: 1,
                  score: { $meta: "searchScore" },
                },
              },
              {
                $limit: 10,
              },
            ])
            .toArray();
    
          return res.send(result);
        }
        res.send([]);
      } catch (error) {
        console.error(error);
        res.send([]);
      }
})
// 更新产品
exports.searchTwo = asyncHandler(async (req, res, next) => {
    try {
        if (req.query.city) {
          let results;
          if (req.query.city.includes(",") || req.query.city.includes(" ")) {
              results = await client
                .db("location")
                .collection("cities")
                .aggregate([
                  {
                    $search: {
                      index: "default",
                      compound: {
                        must: [
                          {
                            text: {
                              query: req.query.city,
                              path: "searchName",
                              fuzzy: {
                                maxEdits: 1,
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                  {
                    $limit: 10,
                  },
                  {
                    $project: {
                      searchName: 1,
                      _id: 1,
                      city: 1,
                      country: 1,
                      adminCode: 1,
                      countryCode: 1,
                      fullName: 1,
                      score: { $meta: "searchScore" },
                    },
                  },
                ])
                .toArray();
                
              return res.send(results);
          }
    
           results = await client
             .db("location")
             .collection("cities")
             .aggregate([
               {
                 $search: {
                   index: "default",
                   compound: {
                     must: [
                       {
                         text: {
                           query: req.query.city,
                           path: "city",
                           fuzzy: {
                             maxEdits: 1,
                           },
                         },
                       },
                     ],
                   },
                 },
               },
               {
                 $limit: 10,
               },
               {
                 $project: {
                   searchName: 1,
                   _id: 1,
                   city: 1,
                   country: 1,
                   adminCode: 1,
                   countryCode: 1,
                   fullName: 1,
                   score: { $meta: "searchScore" },
                 },
               },
             ])
             .toArray();
    
           return res.send(results);
        }
        res.send([]);
      } catch (error) {
        console.error(error);
        res.send([]);
      }
})
