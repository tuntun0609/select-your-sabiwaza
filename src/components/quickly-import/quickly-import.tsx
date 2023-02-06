import { memo, useState } from 'react';
import { 
	Button as AntButton, ButtonProps,
	Modal, Space, message, Input, Divider,
} from 'antd';
import { useLocalStorage } from 'usehooks-ts';
import { unionWith } from 'lodash';

import { copyTextToClipboard } from '../../utils';

const { TextArea } = Input;

const Button = memo((props: ButtonProps) => {
	return (
		<AntButton
			size={'large'}
			style={{ width: '100%' }}
			{...props}
		>{props.children}</AntButton>
	)
});

type Type = 'song' | 'sabiwaza';

export const QuicklyImport = () => {
	const [song, setSong] = useLocalStorage<string[]>('song', []);
	const [sabiwaza, setSabiwaza] = useLocalStorage<string[]>('sabiwaza', []);
	const [modalOpen, setModalOpen] = useState(false);
	const [input, setInput] = useState('');
	const [type, setType] = useState<Type>();
	
	const exportData = (type: Type) => {
		try {
			if (
				(type === 'song' && song.length !== 0)
				||
				(type === 'sabiwaza' && sabiwaza.length !== 0)
			) {
				copyTextToClipboard(type === 'sabiwaza' ? sabiwaza.join(',') : song.join(','));
				message.success(type === 'sabiwaza' ? '已复制技单至剪贴板' : '已复制歌单至剪贴板');
			} else {
				message.warning(type === 'sabiwaza' ? '技单为空' : '歌单为空');
			}
		} catch (error) {
			message.error(type === 'song' ? '导出歌单错误' : '导出技单错误');
		}
	};

	const importData = (type: Type) => {
		setType(type);
		setModalOpen(true);
	};

	const onModalCancel = () => {
		setModalOpen(false);
		setInput('');
	};

	const onModalOk = () => {
		try {
			const inputArr = input.split(/,|，/);
			if (type === 'sabiwaza') {
				setSabiwaza(unionWith(sabiwaza, inputArr));
			} else {
				setSong(unionWith(song, inputArr));
			}
			setModalOpen(false);
			message.success('导入成功');
			setInput('');
		} catch (error) {
			message.error('导入失败');
		}
	};

	return (
		<Space size={16} direction={'vertical'} style={{ width: '100%' }}>

			<Divider style={{ margin: '8px 0', color: '#1677ff' }}>技单</Divider>
			<Button onClick={() => importData('sabiwaza')}>导入技单</Button>
			<Button onClick={() => exportData('sabiwaza')}>导出技单</Button>

			<Divider style={{ margin: '8px 0', color: '#1677ff' }}>歌单</Divider>
			<Button onClick={() => importData('song')}>导入歌单</Button>
			<Button onClick={() => exportData('song')}>导出歌单</Button>
			<Modal
				title={`导入${type === 'sabiwaza' ? '技单' : '歌单'}`}
				open={modalOpen}
				onCancel={onModalCancel}
				okText={`导入${type === 'sabiwaza' ? '技单' : '歌单'}`}
				onOk={onModalOk}
			>
				<TextArea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					autoSize={{ minRows: 3 }}
					placeholder={`每个${type === 'sabiwaza' ? '技名' : '歌名'}通过中文逗号或者英文逗号分隔`}
				></TextArea>
			</Modal>
		</Space>
	);
};
