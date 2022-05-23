/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSession } from "next-auth/react";
import Router from "next/router";
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
			Router.push(`/realm/${realm?.id}`);
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
					<h1 className="text-3xl">Create</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							placeholder="Title"
							{...register("title", {
								minLength: 2,
								maxLength: 40,
								required: true,
							})}
						/>
						{errors.title?.type === "maxLength" && <span>Maximum 40 Characters</span>}
						{errors.title?.type === "required" && <span>*Required</span>}
						{errors.title?.type === "minLength" && <span>Minimum 2 Characters</span>}
						<textarea
							placeholder="Post Content"
							{...register("content", {
								maxLength: 800,
								required: true,
							})}
						/>
						{errors.content?.type === "maxLength" && <span>Maximum 800 Characters</span>}
						{errors.content?.type === "required" && <span>*Required</span>}
						{errors.content?.type === "minLength" && <span>Minimum 2 Characters</span>}
						{submitErrors.map((e) => (
							<span>{e}</span>
						))}
						<button type="submit">Create</button>
					</form>
				</label>
			</label>
		</div>
	);
}
