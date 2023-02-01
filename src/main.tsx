import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';

import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';
import zhCN from '@locale/zh_CN';
import './reset.css';

import { SelectPage, SettingPage } from './pages'

dayjs.locale('zh-cn');

const router = createBrowserRouter([
	{
		path: '/',
		element: <SettingPage />,
	},
	{
		path: '/select',
		element: <SelectPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
			theme={{
				token: {
					// colorPrimary: '#fb7299',
				},
			}}
			locale={zhCN}
		>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
)
