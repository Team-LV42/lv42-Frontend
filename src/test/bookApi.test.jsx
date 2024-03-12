import { RecoilObserver } from "./testUtils.test";
import {
	booksState,
	booksRecordTestQuery,
} from "../api/bookApi";
import { render, screen } from '@testing-library/react';


// function Book() {
// 	const books = useRecoilValue(booksState);

// 	booksRecordTestQuery();
	
// 	return (
// 		<div>
// 			<ul>
// 				{books.map((record) => {
// 					return (
// 					<li data-testid="li-test">
// 						<div>
// 							<h>{record.user_id}</h>
// 							<p>{record._id}</p>
// 							<p>{record.date}</p>
// 						</div>
// 					</li>
// 					);
// 				})}
// 			</ul>
// 		</div>
// 	)
// }



// test('1', () => {
// 	render (
// 		<>
// 			<RecoilRoot>
// 				<RecoilObserver node={booksState} />
// 				<Book />
// 			</RecoilRoot>
// 		</>
// 	);
// 	const component = screen.getByTestId('li-test');
// 	expect(component).toBeInTheDocument;
// });