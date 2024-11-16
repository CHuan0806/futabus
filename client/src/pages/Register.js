import React from "react";
import { Form, message, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async(values)=>{
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/users/register", values);
            dispatch(HideLoading());
            if (response.status === 200) {
                message.success(response.data.message);
                navigate('/login');
            } else {
                message.error(response.data.message);
            }

        } catch (error) {
            dispatch(HideLoading());
            console.error("Error during registration:", error);

        }

    };

    return (
        <div className="h-screen d-flex justify-content-center align-items-center ">
            <div className="w-400 card p-3 ">
                <h1 className="text-lg">Tạo tài khoản</h1>
                <hr />
                <Form layout='vertical' onFinish={onFinish} >
                    <Form.Item label='Tên đăng nhập' name="name">
                        
                        <Input type="text" placeholder="Nhập tên tài khoản" />
                    </Form.Item>
                    <Form.Item label='Email' name="email">
                        <Input type="text" placeholder="Nhập email của bạn" />
                    </Form.Item>
                    <Form.Item label='Mật khẩu' name="password">
                        <Input type="password" placeholder="Nhập mật khẩu" />
                    </Form.Item> 
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/login" >Quay lại trang đăng nhập</Link>

                    <button className="secondary-btn" type="submit">Tiếp tục</button>
                </div>
                </Form>
            </div>
        </div>
    )

}
export default Register