function UserView(props) {
	if (!props.object)
		console.error('UserView passed object is undefined');
	return (
		<div> 
			<img src={props.object.profile_img} />
			<h1>{props.object.name}</h1>
			<p>{props.object.id}</p>
		</div>
	);
}

export default UserView;