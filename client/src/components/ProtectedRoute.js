import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { loading: isLoading } = useSelector((state) => state.alerts);

    useEffect(() => {
        const validateToken = async () => {
            try {
                dispatch(ShowLoading());
                const response = await axios.post('/api/users/get-user-by-id', {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                dispatch(HideLoading());

                if (response.data.success) {
                    dispatch(SetUser(response.data.data));
                    setLoading(false);
                } else {
                    localStorage.removeItem("token");
                    message.error(response.data.message);
                    navigate('/login');
                }
            } catch (error) {
                dispatch(HideLoading());
                localStorage.removeItem("token");
                message.error(error.response?.data?.message || "An error occurred");
                navigate('/login');
            }
        };

        if (localStorage.getItem("token")) {
            validateToken();
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate]);

    return (
        <div>
            {!loading && <DefaultLayout>{children}</DefaultLayout>}
        </div>
    );
}

export default ProtectedRoute;
