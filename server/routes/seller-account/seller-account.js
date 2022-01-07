const router = require("express").Router();
const { check } = require("express-validator");
const {
    AddSellerAccount,
    GetSellerAccounts,
    deleteSellerAccount,
} = require("../../controllers/seller-account/seller-account-controller");
const auth = require("../../middleware/auth/auth");

router.post(
    "/add-seller-account",
    auth,
    [check("seller_account", "Enter a valid seller account").notEmpty()],
    AddSellerAccount
);

router.get("/get-seller-accounts", auth, GetSellerAccounts);

router.delete("/delete-seller-account/:id", auth, deleteSellerAccount);

module.exports = router;
