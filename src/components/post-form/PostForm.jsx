import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, setValue, getValues, control, watch, reset } = useForm({
        defaultValues: {
            author: post?.author || "",
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
            description: post?.description || "",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    React.useEffect(() => {
        if (userData?.name) {
            setValue("author", userData.name);
        }
    }, [userData, setValue]);

    const submit = async (data) => {

        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                await appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;

                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
    }, []);

    React.useEffect(() => {
        watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
    }, [watch, slugTransform, setValue]);

    // Populate the form with the current post data when editing
    React.useEffect(() => {
        if (post) {
            reset({
                author: post.author || "",
                title: post.title || "",
                slug: post.slug || "",
                content: post.content || "",
                status: post.status || "active",
                description: post?.description || "",
            });
        }
    }, [post, reset]);

    const title = watch("title");
    const description = watch("description");
    const content = watch("content");

    // Check if the fields exceed their character limits
    React.useEffect(() => {
        if (title && title.length > 500) {
            alert("Title cannot exceed 500 characters!");
        }
        if (content && content.length > 8000) {
            alert("Content cannot exceed 8000 characters!");
        }
        if (description && description.length > 50) {
            alert("Description cannot exceed 50 characters!");
        }
    }, [title, content, description]);


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-6 p-6 bg-cyan-900 rounded-lg shadow-md">
            <div className="w-full md:w-2/3 space-y-6">
                <Input
                    label="Title"
                    placeholder="Enter the title of your post (limit: 500 characters)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("title", { required: true, maxLength: 500 })}
                />
                <Input
                    label="Slug"
                    placeholder="Enter a slug for your post"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <Input
                    label="Description"
                    placeholder="Enter a brief description (limit: 50 characters)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("description", { required: true, maxLength: 50 })}
                />
                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    maxLength={8000}
                    className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="w-full md:w-1/3 space-y-6">
                <Input
                    label="Featured Image"
                    type="file"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept="image/png, image/jpg, image/jpeg"
                    {...register("image", { required: !post })}
                />

                {post && (
                    <div className="w-full">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-auto rounded-lg shadow-sm"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-400"}
                    className="w-full p-3 text-white font-semibold rounded-lg transition duration-300"
                >
                    {post ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}