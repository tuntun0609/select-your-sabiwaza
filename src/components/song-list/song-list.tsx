import { Button, Input, List, message } from 'antd';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const SongList = () => {
	const [input, setInput] = useState('');
	const [song, setSong] = useLocalStorage<string[]>('song', []);

	const onInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setInput(e.target.value);
	};

	const onAdd = () => {
		if (!input) {
			message.error('输入不能为空');
			return;
		}
		if (!song.includes(input)) {
			setSong([...song, input]);
			setInput('');
		} else {
			message.error('已经存在该项');
		}
	};

	const onDelete = (songItem: string) => {
		setSong(song.filter(item => item !== songItem));
	};

	return (
		<div>
			<div style={{ marginBottom: '16px' }}>
				<Input
					value={input}
					onChange={onInput}
					style={{
						width: 'calc(100% - 96px)',
						marginRight: '8px'
					}}
				></Input>
				<Button onClick={onAdd}>添加新曲</Button>
			</div>
			<List
				renderItem={(item) => (
					<List.Item extra={
						<Button
							onClick={() => onDelete(item)}
						>删除</Button>
					}>
						{item}
					</List.Item>
				)}
				bordered
				dataSource={song}
				style={{
					marginBottom: '16px'
				}}
			>
			</List>
		</div>
	);
};
