function UserView(props) {
	let styleName = "user";
	if (props.type === "modal")
		styleName = "user modal";
	return (
		<div className={styleName}>
			<h>{props.object.name}</h>
			<p>{props.object.id}</p>
			/* profile img*/
		</div>
	);
}

export default UserView;