import { Button, Col, List, Row, message, InputNumber } from 'antd';
import { useLocalStorage } from 'usehooks-ts';

import './select-page.scss';
import { useEffect, useState } from 'react';
import { ListModal } from '@components';

export const SelectPage = () => {
	const DEFAULT_SABIWAZA_NUM = 2;
	const [sabiwazaPool, setSabiwazaPool] = useState([]);
	const [songPool, setSongPool] = useState([]);
	const [sabiwaza] = useLocalStorage('sabiwaza', []);
	const [song] = useLocalStorage('song', []);
	const [selectList, setSelectList] = useState<string[]>([]);
	const [sabiwazaPoolModal, setSabiwazaPoolModal] = useState(false);
	const [songPoolModal, setSongPoolModal] = useState(false);
	const [sabiwazaNum, setSabiwazaNum] = useState(DEFAULT_SABIWAZA_NUM);

	const getRandom = (total: number) => {
		return Math.floor(Math.random() * total)
	};

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

	const selectSabiwaza = (nums: number) => {
		let tempSabiwaza = [...sabiwazaPool];
		if (nums >= sabiwaza.length) {
			return tempSabiwaza;
		}
		let n = nums;
		const sabiwazaes: string[] = [];
		while(n > 0) {
			let randomSabiwazaNum = getRandom(tempSabiwaza.length);
			let randomSabiwaza = tempSabiwaza[randomSabiwazaNum];
			while (sabiwazaes.indexOf(randomSabiwaza) !== -1) {
				randomSabiwazaNum = getRandom(tempSabiwaza.length);
				randomSabiwaza = tempSabiwaza[randomSabiwazaNum];
			}
			tempSabiwaza.splice(randomSabiwazaNum, 1);
			sabiwazaes.push(randomSabiwaza);
			if (tempSabiwaza.length === 0) {
				tempSabiwaza = [...sabiwaza];
			}
			n--;
		}
		setSabiwazaPool(tempSabiwaza);
		return sabiwazaes;
	};

	const onSelect = () => {
		if (sabiwazaPool.length !== 0 && songPool.length !== 0) {
			const selectedSabiwaza = selectSabiwaza(sabiwazaNum ?? DEFAULT_SABIWAZA_NUM);

			const randomSongNum = getRandom(songPool.length);
			const selectedSong = songPool[randomSongNum];
			setSongPool(songPool.filter((item,index) => index !== randomSongNum));
			
			setSelectList([...selectList, `${selectedSabiwaza.join(' ')} | ${selectedSong}`]);
		} else {
			message.error('????????????????????????')
		}
	};

	const onSabiwazaNumChange = (num: any) => {
		setSabiwazaNum(num);
		setSabiwazaPool(sabiwaza);
		setSongPool(song);
		setSelectList([]);
	};

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
							>???????????????{sabiwazaPool.length}</Button>
							<Button
								style={{ width: '50%' }}
								size={'large'}
								onClick={() => setSongPoolModal(true)}
							>???????????????{songPool.length}</Button>
							<ListModal
								title={'?????????'}
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
								title={'?????????'}
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
						<Row
							wrap={false}
							style={{
								display: 'flex',
								alignItems: 'center',
								marginBottom: '16px',
							}}
						>
							<Col style={{ fontSize: '16px', whiteSpace: 'nowrap' }}>
								????????????????????????
							</Col>
							<Col flex="auto">
								<InputNumber
									min={1}
									placeholder={'?????????2 ?????????1'}
									defaultValue={DEFAULT_SABIWAZA_NUM}
									onChange={onSabiwazaNumChange}
									style={{
										width: '100%',
									}}
								/>
							</Col>
						</Row>
						<Button
							style={{
								width: '100%',
								marginBottom: '16px',
							}}
							size={'large'}
							onClick={onSelect}
						>?????????</Button>
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
