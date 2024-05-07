export interface CreatePostForm {
	content: string;
	imageUrl: string;
	authorId: string;
}

export interface UpdatePostForm {
	content: string;
	imageUrl: string;
}

export interface CreateCommentForm {
	content: string;
	userId: string;
	postId: string;
}

export interface Like {
	id: string;
	userId: string;
	postId: string;
	createdAt: Date;
}

export interface Comment {
	id: string;
	content: string;
	userId: string;
	postId: string;
	createdAt: Date;
}

export interface Post {
	id: string;
	content: string;
	imageUrl: string;
	authorId: string;
	likes: Like[];
	comments: Comment[];
	createdAt: Date;
}