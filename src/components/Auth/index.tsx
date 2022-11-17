import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Spin } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LoginValue } from './interface';
import RegisterFormModal from './RegisterFormModal';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 200px;
`;

const AuthForm: React.FC = () => {
	const authCtx = useContext(AuthContext);

	const [isOpen, setIsOpen] = useState(false);
	const [logInLoading, setLogInLoading] = useState(true);

	const navigate = useNavigate();

	const onFinish = (values: LoginValue) => {
		const logInUrl =
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwKSCzYReCHtsBB42lVr9hSFKb6RZlbpY';

		fetch(logInUrl, {
			method: 'POST',
			body: JSON.stringify({
				email: values.email,
				password: values.password,
				returnSecureToken: true,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return res.json().then((data) => {
						let errorMessage = 'Authentication failed!';

						if (data && data.error && data.error.message) {
							errorMessage = data.error.message;
						}
						message.error(errorMessage);
					});
				}
			})
			.then((data) => {
				const expirationTime = new Date(
					new Date().getTime() + data.expiresIn * 1000
				);
				authCtx.login(data.idToken, expirationTime);
				navigate('/');
				message.success('Log in successfully!');
			})
			.catch((err: any) => message.error(err.message));
	};

	useEffect(() => {
		setTimeout(() => {
			setLogInLoading(false);
		}, 1000);
	}, []);

	return (
		<Spin size="large" spinning={logInLoading}>
			<Wrapper>
				<Form
					name="normal_login"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					style={{ width: 300 }}
				>
					<Form.Item
						name="email"
						rules={[
							{ required: true, message: 'Please input your email address!' },
						]}
					>
						<Input
							prefix={<MailOutlined className="site-form-item-icon" />}
							placeholder="Email"
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your Password!' }]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item>
						<Form.Item name="remember" valuePropName="checked" noStyle>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>
					</Form.Item>

					<Form.Item>
						<>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
								style={{ marginRight: 8 }}
							>
								Log in
							</Button>
							Or{' '}
							<Button
								style={{ padding: 4 }}
								type="link"
								onClick={() => setIsOpen(true)}
							>
								register now!
							</Button>
						</>
					</Form.Item>
				</Form>
			</Wrapper>
			<RegisterFormModal
				open={isOpen}
				onCancel={() => {
					setIsOpen(false);
				}}
			/>
		</Spin>
	);
};

export default AuthForm;
