import { Button, Col, List, Modal, Row, message } from 'antd';
import { useLocalStorage } from 'usehooks-ts';

import './select-page.scss';
import { useEffect, useState } from 'react';
import { ListModal } from '@components';

export const SelectPage = () => {
	const [sabiwazaPool, setSabiwazaPool] = useState([]);
	const [songPool, setSongPool] = useState([]);
	const [sabiwaza] = useLocalStorage('sabiwaza', []);
	const [song] = useLocalStorage('song', []);
	const [selectList, setSelectList] = useState<string[]>([]);
	const [sabiwazaPoolModal, setSabiwazaPoolModal] = useState(false);
	const [songPoolModal, setSongPoolModal] = useState(false);

	const getRandom = (total: number) => {
		return Math.floor(Math.random() * total)
	}

	useEffect(() => {
		setSabiwazaPool(sabiwaza);
	}, [sabiwaza]);

	useEffect(() => {
		setSongPool(song);
	}, [song]);

	useEffect(() => {
		// console.log(sabiwazaPool);
		if (sabiwazaPool.length === 0) {
			setSabiwazaPool([...sabiwaza]);
		}
	}, [sabiwazaPool]);


	useEffect(() => {
		// console.log(songPool);
		if (songPool.length === 0) {
			setSongPool([...song]);
		}
	}, [songPool]);

	const onSelect = () => {
		if (sabiwazaPool.length !== 0 && songPool.length !== 0) {
			const randomSabiwazaNum = getRandom(sabiwazaPool.length);
			const randomSongNum = getRandom(songPool.length);
			console.log(sabiwazaPool[randomSabiwazaNum]);
			setSelectList([...selectList, `${sabiwazaPool[randomSabiwazaNum]} ${songPool[randomSongNum]}`])
	
	
			setSabiwazaPool(sabiwazaPool.filter((item,index) => index !== randomSabiwazaNum));
			setSongPool(songPool.filter((item,index) => index !== randomSongNum));
		} else {
			message.error('技或者歌不能为空')
		}
	}

	return (
		<div>
			<Row gutter={8} justify='center'>
				<Col xs={20} sm={16} md={12} lg={12} xl={12} xxl={8}>
					<div className='select-main'>
						<div
							style={{
								marginBottom: '16px',
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Button
								style={{ width: '50%', marginRight: '8px' }}
								size={'large'}
								onClick={() => setSabiwazaPoolModal(true)}
							>技池剩余：{sabiwazaPool.length}</Button>
							<Button
								style={{ width: '50%' }}
								size={'large'}
								onClick={() => setSongPoolModal(true)}
							>歌池剩余：{songPool.length}</Button>
							<ListModal
								title={'剩余技'}
								open={sabiwazaPoolModal}
								onCancel={() => setSabiwazaPoolModal(false)}
								footer={null}
								dataSource={sabiwazaPool}
								renderItem={(item) => (
									<List.Item>
										{item}
									</List.Item>
								)}
							></ListModal>
							<ListModal
								title={'剩余歌'}
								open={songPoolModal}
								onCancel={() => setSongPoolModal(false)}
								footer={null}
								dataSource={songPool}
								renderItem={(item) => (
									<List.Item>
										{item}
									</List.Item>
								)}
							></ListModal>
						</div>
						<Button
							style={{
								width: '100%',
								marginBottom: '16px',
							}}
							size={'large'}
							onClick={onSelect}
						>抽一个</Button>
						<List
							renderItem={(item) => (
								<List.Item>
									{item}
								</List.Item>
							)}
							bordered
							dataSource={selectList}
						></List>
					</div>
				</Col>
			</Row>
		</div>
	)
};