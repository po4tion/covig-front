/* eslint-disable no-undef */
import { useEffect } from 'react';
import { Topic, OfferingData, CovidCard } from './index';
import { Box, Flex } from '@chakra-ui/react';
import { FaVirus } from 'react-icons/fa';
import { GiDeadWood } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { getCovidBasicInfo } from '../../modules/covid';
import { calculateDate } from '../../lib';

function Body() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.covid.covidBasicInfo);

	useEffect(() => {
		dispatch(getCovidBasicInfo());
	}, []);

	const card = (type) => {
		const store = data[0];
		const covidData = store[calculateDate()];

		if (type === 'decide') {
			return (
				<CovidCard
					title="전체 누적 확진자"
					total={+covidData.decideCnt}
					addition={+covidData.DiffDecideCnt}
					icon={FaVirus}
				/>
			);
		} else {
			return (
				<CovidCard
					title="전체 누적 사망자"
					total={+covidData.deathCnt}
					addition={+covidData.DiffDeathCnt}
					icon={GiDeadWood}
				/>
			);
		}
	};

	return (
		<Box border="1px" borderColor="gray.200" m={4}>
			<Topic />
			<OfferingData />
			<Flex justify="space-between">
				{data && (
					<>
						{card('decide')}
						{card('death')}
					</>
				)}
			</Flex>
		</Box>
	);
}

export default Body;
