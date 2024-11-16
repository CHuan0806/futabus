import React from "react";
import { Form, message, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/users/login", values);
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                window.location.href= "/" ;
            } else {
                message.error(response.data.message);
            }

        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);

        }

    };
    return (
        <div className="h-screen d-flex justify-content-center align-items-center ">
            <div className="w-400 card p-3 ">
                <h1 className="text-lg">Đăng nhập tài khoản</h1>
                <hr />
                <Form layout='vertical' onFinish={onFinish} >
                    <Form.Item label='Tên đăng nhập' name="email">
                        <Input type="text" placeholder="Nhập tên tài khoản" />
                    </Form.Item>
                    <Form.Item label='Mật khẩu' name="password">
                        <Input type="password" placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/register">Quay lại trang đăng kí</Link>
                        <button className="secondary-btn" type="submit">Đăng nhập</button>
                    </div>
                </Form>


            </div>
        </div>
    )

}
export default Login