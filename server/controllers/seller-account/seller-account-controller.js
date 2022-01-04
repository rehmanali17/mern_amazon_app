const { validationResult } = require("express-validator");
const Seller = require("../../models/seller-account/seller-account");
const config = require("config");

const AddSellerAccount = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
        } else {
            const { seller_account } = req.body;
            const { name, id } = req.query;
            let extAccount = await Seller.find({
                seller_account,
                customer: { id, name },
            });
            if (extAccount.length > 0) {
                res.status(400).json([
                    {
                        msg: "This seller account has been already added for this customer",
                    },
                ]);
            } else {
                let newAccount = new Seller({
                    seller_account,
                    customer: {
                        name,
                        id,
                    },
                });
                newAccount
                    .save()
                    .then((account) => {
                        res.status(201).json([
                            {
                                msg: "Seller account successfully added",
                                account,
                            },
                        ]);
                    })
                    .catch((err) => {
                        res.status(400).json([
                            {
                                msg: "Seller account addition error",
                                error: err,
                            },
                        ]);
                    });
            }
        }
    } catch (error) {
        res.status(400).json([
            {
                msg: "Seller account addition error",
                error: error.message,
            },
        ]);
    }
};

const GetSellerAccounts = async (req, res) => {
    try {
        const { id, name } = req.query;
        let docs = await Seller.find({ customer: { id, name } }).select("-__v");
        if (docs.length > 0) {
            let seller_accounts = docs.map((doc) => {
                return {
                    _id: doc._id,
                    seller_account: doc.seller_account,
                    customer_name: doc.customer.name,
                    customer_id: doc.customer.id,
                    requests: {
                        GET:
                            config.get("prodBaseURL") +
                            "/sales/get-sales/?customer=" +
                            doc.customer.id +
                            "&seller_account=" +
                            doc._id,
                        MAP:
                            config.get("prodBaseURL") +
                            "/sales/map-sales/?customer=" +
                            doc.customer.id +
                            "&seller_account=" +
                            doc._id,
                    },
                };
            });
            res.status(200).json({ seller_accounts });
        } else {
            res.status(400).json({
                msg: "No seller accounts have been added for this customer",
                error: error.message,
            });
        }
    } catch (error) {
        res.status(400).json({
            msg: "Error retreiving the seller accounts",
            error: error.message,
        });
    }
};

module.exports = { AddSellerAccount, GetSellerAccounts };
