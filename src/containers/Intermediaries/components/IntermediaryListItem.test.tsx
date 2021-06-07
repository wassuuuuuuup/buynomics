import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import IntermediaryListItemComponent from './IntermediaryListItem';
import {intermediariesStub} from '../../../stubs';

test('Should render IntermediaryListItem component', function () {
	const item = intermediariesStub[0];
	const onDelete = jest.fn();
	render(<IntermediaryListItemComponent item={item} onDelete={onDelete} />);

	expect(screen.getByText(item.name));
	// TODO check all necessary data

	// TODO better to use data-attribute instead
	fireEvent.click(screen.getByText('Delete'));

	expect(onDelete).toHaveBeenCalledWith(item);
});
