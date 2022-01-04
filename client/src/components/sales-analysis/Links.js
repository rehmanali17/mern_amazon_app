import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { verify_token } from "../../utils/verify-token";
import { useHistory } from "react-router";
import axios from "axios";
import { baseURL } from "../../utils/urls";

const Links = ({ location }) => {
    const history = useHistory();
    let token = verify_token(history);
    const [years, setYears] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const config = {
                headers: {
                    "auth-token": token,
                },
            };
            try {
                let response = await axios.get(
                    `${baseURL}/sales/get-distinct-years`,
                    config
                );
                setYears([...response.data.years, 2022]);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setMessage("Error fetching the data. Please reload the page");
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="d-flex">
            {loading === true ? (
                <div>Loading...</div>
            ) : message !== "" ? (
                <p>{message}</p>
            ) : (
                <div>
                    <Link
                        to={{
                            pathname:
                                "/user/seller-account/sales-analysis/sum/quantity",
                            state: {
                                data: location.state.data,
                                param: "quantity",
                                years,
                            },
                        }}
                    >
                        Sum of Quantity by month
                    </Link>
                    <br />
                    <br />

                    <Link
                        to={{
                            pathname:
                                "/user/seller-account/sales-analysis/sum/product-sales",
                            state: {
                                data: location.state.data,
                                param: "product-sales",
                                years,
                            },
                        }}
                    >
                        Sum of Product Sales by month
                    </Link>
                    <br />
                    <br />
                    <Link
                        to={{
                            pathname:
                                "/user/seller-account/sales-analysis/sum/total",
                            state: {
                                data: location.state.data,
                                param: "total",
                                years,
                            },
                        }}
                    >
                        Sum of Total by month
                    </Link>
                    <br />
                    <br />
                    <Link
                        to={{
                            pathname:
                                "/user/seller-account/sales-analysis/volume-weighted/product-sales",
                            state: {
                                data: location.state.data,
                                param: "product-sales",
                                years,
                            },
                        }}
                    >
                        Volume Weighted Product Sales Price by month
                    </Link>
                    <br />
                    <br />
                    <Link
                        to={{
                            pathname:
                                "/user/seller-account/sales-analysis/volume-weighted/total",
                            state: {
                                data: location.state.data,
                                param: "total",
                                years,
                            },
                        }}
                    >
                        Volume Weighted Total Price by month
                    </Link>
                    <br />
                    <br />
                    <Link
                        to={{
                            pathname:
                                "/user/seller-account/sales-analysis/rolling-average/product-sales",
                            state: {
                                data: location.state.data,
                                param: "product-sales",
                                years,
                            },
                        }}
                    >
                        Annual Rolling Average Product Sales by month
                    </Link>
                    <br />
                    <br />
                    <Link
                        to={{
                            pathname:
                                "/user/seller-account/sales-analysis/rolling-average/total",
                            state: {
                                data: location.state.data,
                                param: "total",
                                years,
                            },
                        }}
                    >
                        Annual Rolling Average Total by month
                    </Link>
                    <br />
                    <br />
                </div>
            )}
        </div>
    );
};

export default Links;
