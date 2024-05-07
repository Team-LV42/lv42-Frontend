const BookSkeleton = () => {
	return (
		<div class="relative w-full max-h-full overflow-y-scroll bg-white animate-pulse">
			{/* <!-- 슬롯 (스켈레톤)--> */}
			{Array(10).map((_, index) => (
				<div class="w-full h-[4.5rem] flex flex-row items-center justify-around px-4 border-b border-[#C1C1C1] slot-full">
					<div class="w-36 h-full flex items-center justify-center text-lg font-bold px-2 font-outfit">
						<span class="w-16 h-6 rounded-xl bg-gray-300"></span>
					</div>
					<div class="grow h-full flex items-center justify-center">
						<span class="w-40 h-6 rounded-xl bg-gray-300"></span>
					</div>
				</div>
			))}
		</div>
	)
}

export default BookSkeleton;