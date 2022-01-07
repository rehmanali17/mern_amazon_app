const Customer = require("../../models/customer/customer");
const SellerAccount = require("../../models/seller-account/seller-account");
const Sales = require("../../models/sales/sales");
const { validationResult } = require("express-validator");
const config = require("config");
const mongoose = require("mongoose");

const AddCustomer = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
        } else {
            const { name, jurisdiction, url } = req.body;
            let extCustomer = await Customer.find({ name, jurisdiction, url });
            if (extCustomer.length > 0) {
                res.status(400).json([
                    { msg: "Customer has been already added" },
                ]);
            } else {
                let newCustomer = new Customer({
                    name,
                    jurisdiction,
                    url,
                });
                newCustomer
                    .save()
                    .then((customer) => {
                        res.status(201).json([
                            { msg: "Customer successfully added", customer },
                        ]);
                    })
                    .catch((err) => {
                        res.status(400).json([
                            { msg: "Customer addition error", error: err },
                        ]);
                    });
            }
        }
    } catch (error) {
        res.status(400).json([
            {
                msg: "Customer addition error",
                error: error.message,
            },
        ]);
    }
};

const GetCustomers = async (req, res) => {
    try {
        let docs = await Customer.find().select("-__v");
        if (docs.length > 0) {
            let customers = docs.map((doc) => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    jurisdiction: doc.jurisdiction,
                    url: doc.url,
                    requests: {
                        ADD:
                            config.get("prodBaseURL") +
                            "/seller/add-seller-account?id=" +
                            doc._id +
                            "&name=" +
                            doc.name,
                        GET:
                            config.get("prodBaseURL") +
                            "/seller/get-seller-accounts?id=" +
                            doc._id +
                            "&name=" +
                            doc.name,
                    },
                };
            });
            res.status(200).json({ customers });
        } else {
            res.status(400).json({
                msg: "No customers have been added",
            });
        }
    } catch (error) {
        res.status(400).json({
            msg: "Error retreiving the customers",
            error: error.message,
        });
    }
};

const deleteCustomer = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        const { id } = req.params;
        if (mongoose.Types.ObjectId.isValid(id)) {
            session.startTransaction();
            await Customer.findByIdAndDelete(id, { session });
            await SellerAccount.deleteMany({ "customer.id": id }, { session });
            await Sales.deleteMany(
                { "account_holder.customer": id },
                { session }
            );
            await session.commitTransaction();
            res.status(200).json({ msg: "Customer deleted successfully" });
        } else {
            res.status(300).json({ message: "Invalid customer id" });
        }
    } catch (error) {
        res.status(400).json({
            msg: "Error deleting the customer",
        });
    }
};

module.exports = { AddCustomer, GetCustomers, deleteCustomer };
