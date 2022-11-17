import { Form, Input, Modal, message } from 'antd';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGN_UP_URL } from '../../constants/index';
import axios from 'axios';
import AuthContext from '../../store/auth-context';

interface RegisterFormModalProps {
	open: boolean;
	onCancel: () => void;
}

const RegisterFormModal: React.FC<RegisterFormModalProps> = ({
	open,
	onCancel,
}) => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const onFinish = () => {
		form
			.validateFields()
			.then(async (values) => {
				form.resetFields();

				const res = await axios.request({
					url: SIGN_UP_URL,
					method: 'POST',
					params: {
						email: values.email,
						password: values.password,
						returnSecureToken: true,
					},
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (res.status === 200) {
					const expirationTime = new Date(
						new Date().getTime() + res.data.expiresIn * 1000
					);
					authCtx.login(res.data.idToken, expirationTime);
					navigate('/');
					message.success('Log in successfully!');
				} else {
					let errorMessage = 'Authentication failed!';
					if (res.data && res.data.error && res.data.error.message) {
						errorMessage = res.data.error.message;
					}
					message.error(errorMessage);
				}
			})
			.catch((info) => {
				message.error(info.message);
				console.log('Validate Failed:', info);
			});
	};
	return (
		<Modal
			open={open}
			title="Register"
			okText="Create"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={onFinish}
		>
			<Form
				form={form}
				layout="vertical"
				name="form_in_modal"
				initialValues={{ modifier: 'public' }}
			>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							required: true,
							message: 'Please input your email address!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					rules={[
						{
							required: true,
							min: 6,
							message: 'The length of your password should greater than 6!',
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="confirm"
					label="Confirm Password"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							min: 6,
							message: 'Please confirm your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('The two passwords that you entered do not match!')
								);
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default RegisterFormModal;
