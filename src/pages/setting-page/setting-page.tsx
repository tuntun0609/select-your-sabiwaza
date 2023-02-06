import { Button, Col, Row, Tabs, TabsProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import { SabiwazaList, SongList } from '@components';

import './setting-page.scss';

export const SettingPage = () => {
	const navigate = useNavigate();

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: '技池',
			children: <SabiwazaList />,
		},
		{
			key: '2',
			label: '歌池',
			children: <SongList />,
		},
	];

	const onSelect = () => {
		navigate('/select');
	};

	return (
		<div>
			<Row gutter={8} justify='center'>
				<Col xs={20} sm={16} md={12} lg={12} xl={12} xxl={8}>
					<div className='setting-main'>
						<Button
							style={{
								width: '100%',
								marginBottom: '8px',
							}}
							size={'large'}
							onClick={onSelect}
						>开抽</Button>
						<Tabs
							defaultActiveKey="1"
							items={items}
						/>
					</div>
				</Col>
			</Row>
		</div>
	);
};
