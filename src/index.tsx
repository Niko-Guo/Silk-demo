import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthContextProvider } from './store/auth-context';
import en_US from 'antd/es/locale/en_US';
import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<BrowserRouter>
				<ConfigProvider locale={en_US}>
					<App />
				</ConfigProvider>
			</BrowserRouter>
		</AuthContextProvider>
	</React.StrictMode>
);
