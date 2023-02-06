import { Button, Input, List, message } from 'antd';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const SabiwazaList = () => {
	const [input, setInput] = useState('');
	const [sabiwaza, setSabiwaza] = useLocalStorage<string[]>('sabiwaza', []);

	const onInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setInput(e.target.value);
	};

	const onAdd = () => {
		if (!input) {
			message.error('输入不能为空');
			return;
		}
		if (sabiwaza.indexOf(input) === -1) {
			setSabiwaza([...sabiwaza, input]);
			setInput('');
		} else {
			message.error('已经存在该项');
		}
	};

	const onDelete = (sabiwazaItem: string) => {
		setSabiwaza(sabiwaza.filter(item => item !== sabiwazaItem));
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
				<Button onClick={onAdd}>添加新技</Button>
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
				dataSource={sabiwaza}
				style={{
					marginBottom: '16px'
				}}
			>
			</List>
		</div>
	);
};
