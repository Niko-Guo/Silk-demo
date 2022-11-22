import React, { useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';
import { RESET_PASSWORD } from '../../../constants/index';
const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 200px;
`;

const ResetPassword: React.FC = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const onFinish = (value: { password: string }) => {
		fetch(RESET_PASSWORD, {
			method: 'POST',
			body: JSON.stringify({
				idToken: authCtx.token,
				password: value.password,
				returnSecureToken: false,
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

						throw new Error(errorMessage);
					});
				}
			})
			.then((data) => {
        authCtx.logout();
        navigate('/login');
				message.success('Reset password successfully!');
			})
			.catch((err: any) => message.error(err.message));
	};

	return (
		<Wrapper>
			<Form
				form={form}
				name="Reset your password"
				onFinish={onFinish}
				style={{
					width: 400,
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
					borderRadius: 6,
					padding: 20,
				}}
			>
				<Form.Item
					name="password"
					label="New Password"
					rules={[
						{
							required: true,
							message: 'Please input your new password!',
							min: 6,
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{ position: 'absolute', right: 0, bottom: 0 }}
					>
						Reset
					</Button>
				</Form.Item>
			</Form>
		</Wrapper>
	);
};

export default ResetPassword;
