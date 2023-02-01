import { List, Modal, ModalProps } from 'antd';

interface ListModalProps extends ModalProps {
	dataSource?: any[],
	renderItem?: (item: any, index: number) => React.ReactNode
}

export const ListModal = (props: ListModalProps) => (
	<Modal
		{...props}
	>
		<List
			bordered
			renderItem={props.renderItem}
			dataSource={props.dataSource}
		></List>
	</Modal>
);