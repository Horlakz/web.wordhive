"use client";

import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import InputGroup from "@/components/common/InputGroup";
import Button from "@/components/common/Button";
import { BlogCommentService } from "@/services/blog/comment";
import { useForm } from "@/hooks/useForm";

const blogCommentService = new BlogCommentService();

function PostComment({ slug }: { slug: string }) {
  const { form, handleChange } = useForm({ fullname: "", message: "" });
  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    () => blogCommentService.createBlogComment(slug, form),
    {
      onSuccess: () => {
        handleChange({
          target: { name: "message", value: "" },
        } as React.ChangeEvent<HTMLTextAreaElement>);
        toast.success("Comment posted");
        router.refresh();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "An Error Occured while sending message"
        );
      },
    }
  );

  return (
    <form className="space-y-4">
      <InputGroup.Input
        label="Your Name"
        name="fullname"
        placeholder="Enter your name"
        value={form.fullname}
        onChange={handleChange}
      />
      <InputGroup.TextArea
        label="Message"
        value={form.message}
        onChange={handleChange}
      />
      <Button onClick={() => mutate()} isLoading={isLoading}>
        Post Comment
      </Button>
    </form>
  );
}

export default PostComment;
