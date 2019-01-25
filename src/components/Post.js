import React from 'react';


const Post = (props) => (
	<li>
		{props.text}
		<span>{getFullDate()}</span>
	</li>
);
export default Post;