import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { verify_token } from "../../utils/verify-token";

const ViewSellerAccounts = ({ location }) => {
    const history = useHistory();
    let token = verify_token(history);
    const config = {
        headers: {
            "auth-token": token,
        },
    };
    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(
                    location.state.request_url,
                    config
                );
                setAccounts(response.data.seller_accounts);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setMessage(err.response.data.msg);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const redirect = (redirect_url, request_url, data) => {
        history.push(redirect_url, {
            request_url,
            data,
        });
    };

    return loading === true ? (
        <div className="d-flex">Loading....</div>
    ) : (
        <div className="d-flex">
            {accounts.length === 0 ? (
                <div>
                    <p>No Customers have been added</p>
                    <br />
                    <br />
                    <br />
                    <Link to="/user">Home</Link>
                </div>
            ) : (
                <div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Count</th>
                                <th>Customer</th>
                                <th>Seller Account</th>
                                <th>View Sales</th>
                                <th>Sales Analysis</th>
                                <th>Add Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((element, i) => {
                                return (
                                    <tr key={element._id}>
                                        <td>{i + 1}</td>
                                        <td>{element.customer_name}</td>
                                        <td>{element.seller_account}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    redirect(
                                                        "/user/seller-account/sales/view",
                                                        element.requests.GET,
                                                        {
                                                            seller_account:
                                                                element._id,
                                                            customer:
                                                                element.customer_id,
                                                        }
                                                    );
                                                }}
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    redirect(
                                                        "/user/seller-account/sales-analysis/view",
                                                        "",
                                                        {
                                                            seller_account:
                                                                element._id,
                                                            customer:
                                                                element.customer_id,
                                                        }
                                                    );
                                                }}
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    redirect(
                                                        "/user/seller-account/sales/add",
                                                        element.requests.MAP,
                                                        {
                                                            seller_account:
                                                                element._id,
                                                            customer:
                                                                element.customer_id,
                                                        }
                                                    );
                                                }}
                                            >
                                                Add
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <br />
                    <br />
                    {message !== "" && <p>{message}</p>}
                    <br />
                    <br />
                    <Link to="/user/customer/view-customers">Home</Link>
                </div>
            )}
        </div>
    );
};

export default ViewSellerAccounts;
