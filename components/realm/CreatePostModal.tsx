/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RealmWithPosts } from "../../lib/types";

interface Input {
	title: string;
	content: string;
}

interface Props {
	realm: RealmWithPosts;
}

export default function CreatePostModal({ realm }: Props) {
	const [submitErrors, setSubmitErrors] = useState<string[]>([]);
	const { data: session } = useSession();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<Input>({
		defaultValues: {
			content: "",
			title: "",
		},
	});

	const onSubmit = async (body: Input) => {
		const res = await fetch("/api/realm/post/create", {
			method: "POST",
			body: JSON.stringify({ ...body, realmId: realm?.id, userId: session?.userId }),
		});

		const data = (await res.json()) as {
			errors: string[];
		};

		if (data.errors.length === 0) {
			window.location.reload();
			return;
		}

		setSubmitErrors(data.errors);
	};

	return (
		<div>
			<label htmlFor="my-modal-4" className="btn modal-button">
				Create Post
			</label>
			<input type="checkbox" id="my-modal-4" className="modal-toggle" />
			<label htmlFor="my-modal-4" className="modal cursor-pointer">
				<label className="modal-box relative">
					<h1 className="text-3xl font-semibold mb-8">Create a Post</h1>
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
						<input
							placeholder="Title"
							{...register("title", {
								minLength: 2,
								maxLength: 40,
								required: true,
							})}
							className="input input-bordered"
						/>
						{errors.title?.type === "maxLength" && (
							<span className="text-red-500 font-medium">Maximum 40 Characters</span>
						)}
						{errors.title?.type === "required" && <span className="text-red-500 font-medium">*Required</span>}
						{errors.title?.type === "minLength" && (
							<span className="text-red-500 font-medium">Minimum 2 Characters</span>
						)}
						<textarea
							placeholder="Post Content"
							{...register("content", {
								maxLength: 800,
							})}
							className="textarea textarea-bordered resize-y"
						/>
						{errors.content?.type === "maxLength" && (
							<span className="text-red-500 font-medium">Maximum 800 Characters</span>
						)}
						{submitErrors.map((e) => (
							<span className="text-red-500 font-medium">{e}</span>
						))}
						<button type="submit" className="btn btn-secondary">
							Create
						</button>
					</form>
				</label>
			</label>
		</div>
	);
}
