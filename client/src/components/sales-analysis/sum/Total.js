import React, { useState, useEffect, useRef, Fragment } from "react";
import { useHistory } from "react-router";
import { verify_token } from "../../../utils/verify-token";
import { baseURL } from "../../../utils/urls";
import axios from "axios";
import exportData from "../../../utils/export-table-data";

const Total = ({ location }) => {
    const history = useHistory();
    let token = verify_token(history);
    let years = location.state.years;
    const table = useRef(null);
    let [request_year, setRequest_Year] = useState(years[0]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [response_data, setResponse_data] = useState({
        skus: [],
        mappedSales: {},
        months: [],
    });

    const changeYear = (year) => {
        setRequest_Year(year);
    };

    const handleExportClick = () => {
        exportData(table.current, "Total", `total-${request_year}.xlsx`);
    };

    useEffect(() => {
        (async () => {
            const config = {
                headers: {
                    "auth-token": token,
                },
                params: {
                    customer: location.state.data.customer,
                    seller_account: location.state.data.seller_account,
                    year: request_year,
                    type: location.state.param,
                },
            };
            try {
                setLoading(true);
                let response = await axios.get(
                    `${baseURL}/sales/get-sum-sales`,
                    config
                );
                setResponse_data({
                    skus: response.data.skus,
                    mappedSales: response.data.mappedSales,
                    months: response.data.months,
                });
                setMessage("");
                setLoading(false);
            } catch (err) {
                setResponse_data({
                    skus: [],
                    mappedSales: {},
                    months: [],
                });
                setMessage(err.response.data.msg);
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request_year]);
    return (
        <div>
            <div className="center mt-4">
                {years.map((year, i) => (
                    <p
                        onClick={() => changeYear(year)}
                        className="year-btn"
                        key={i}
                    >
                        {" "}
                        {year}{" "}
                    </p>
                ))}
            </div>
            {loading === true ? (
                <div className="modified-d-flex mt-4">Loading</div>
            ) : (
                <div className="mt-4 mb-4">
                    {message !== "" && <div>{message}</div>}
                    <br />
                    <br />
                    {response_data.skus.length > 0 && (
                        <Fragment>
                            <button
                                onClick={handleExportClick}
                                className="btn btn-primary my-2"
                            >
                                Export
                            </button>
                            <table
                                className="w-100 m-auto"
                                ref={table}
                                border="1"
                            >
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th
                                            colSpan={
                                                response_data.months.length
                                            }
                                        >
                                            {request_year}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Count</th>
                                        <th>SKU</th>
                                        {response_data.months.map(
                                            (month, i) => {
                                                return <td key={i}>{month}</td>;
                                            }
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {response_data.skus.map((element, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{element}</td>
                                                {response_data.months.map(
                                                    (month, j) => {
                                                        return (
                                                            <td key={j}>
                                                                {
                                                                    response_data
                                                                        .mappedSales[
                                                                        `${element}-${month}`
                                                                    ]
                                                                }
                                                            </td>
                                                        );
                                                    }
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Fragment>
                    )}
                </div>
            )}
        </div>
    );
};

export default Total;
