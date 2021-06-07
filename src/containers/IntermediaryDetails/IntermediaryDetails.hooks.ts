import {useSelector} from 'react-redux';
import {intermediariesEntitiesSelector} from '../Intermediaries/Intermediaries.selectors';
import {Intermediary} from '../Intermediaries/Intermediaries.types';

export function useIntermediaryById(id: string): Intermediary | undefined {
	const intermediaries = useSelector(intermediariesEntitiesSelector);
	return intermediaries.find((intermediary) => intermediary.id === id);
}