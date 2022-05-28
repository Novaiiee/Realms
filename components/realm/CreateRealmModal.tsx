/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Input {
	name: string;
	description: string;
}

export default function CreateRealmModal() {
	const [submitErrors, setSubmitErrors] = useState<string[]>([]);
	
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<Input>({
		defaultValues: {
			description: "",
			name: "",
		},
	});

	const onSubmit = async (body: Input) => {
		const res = await fetch("/api/realm/create", {
			method: "POST",
			body: JSON.stringify({ ...body }),
		});

		const data = (await res.json()) as {
			errors: string[];
			realmId: string;
		};

		if (data.errors.length === 0) {
			window.location.href = `/realms/${data.realmId}`;
		}

		setSubmitErrors(data.errors);
	};

	return (
		<div>
			<label htmlFor="my-modal-4" className="btn modal-button w-full">
				Create Realm
			</label>
			<input type="checkbox" id="my-modal-4" className="modal-toggle" />
			<label htmlFor="my-modal-4" className="modal cursor-pointer">
				<label className="modal-box relative">
					<h1 className="text-3xl font-semibold mb-8">Create a Realm</h1>
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
						<input
							placeholder="Name"
							{...register("name", {
								minLength: 2,
								maxLength: 30,
								required: true,
							})}
							className="input input-bordered"
						/>
						{errors.name?.type === "maxLength" && (
							<span className="text-red-500 font-medium">Maximum 40 Characters</span>
						)}
						{errors.name?.type === "required" && <span className="text-red-500 font-medium">*Required</span>}
						{errors.name?.type === "minLength" && (
							<span className="text-red-500 font-medium">Minimum 2 Characters</span>
						)}
						<textarea
							placeholder="Realm Description"
							{...register("description", {
								maxLength: 800,
							})}
							className="textarea textarea-bordered resize-y"
						/>
						{errors.description?.type === "maxLength" && (
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
