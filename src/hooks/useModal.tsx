import { useState } from 'react';

export const useModal = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggleModal= () => setIsOpen(!isOpen);
	return {
		isOpen,
		toggleModal,
	};
};