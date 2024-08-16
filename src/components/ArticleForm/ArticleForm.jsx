import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import articleService from "../../appwrite/config";
import { Button, Input, RealTimeEditor, Select } from "../index";
import useArticleService from "../../hooks/useArticleService";

export default function ArticleForm({ article }) {
  const { submitArticle, updateArticle } = useArticleService();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: article?.title || "",
        slug: article?.$id || "",
        description: article?.description || "",
        status: article?.status || "active",
      },
    });

  const handleArticleAction = (data) => {
    if (article) {
      updateArticle(article, data);
    } else {
      submitArticle(data);
    }
  };

  const transformSlug = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", transformSlug(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, transformSlug, setValue]);

  return (
    <section className="p-8 md:p-12 lg:p-16 xl:p-24">
      <form
        onSubmit={handleSubmit(handleArticleAction)}
        className="flex flex-col lg:flex-row gap-4 lg:gap-8"
      >
        <div className="lg:w-2/3">
          <Input
            label="Title:"
            placeholder="Title"
            className="w-full rounded"
            {...register("title", { required: true })}
          />

          <Input
            label="Slug:"
            placeholder="Slug"
            className="w-full rounded"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", transformSlug(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          <RealTimeEditor
            label="Description:"
            name="description"
            control={control}
            defaultValue={getValues("description")}
            className="mt-2"
          />
        </div>

        <div className="flex flex-col lg:w-1/3 gap-4">
          <Input
            label="Featured Image:"
            type="file"
            accept="image/png image/jpg image/jpeg image/gif"
            {...register("featuredImage", { required: !article })}
          />

          {article && (
            <div>
              <img
                src={articleService.getFilePreview(article.featuredImage)}
                alt={article.title}
              />
            </div>
          )}

          <Select
            label="Status"
            options={["active", "inactive"]}
            {...register("status", { required: true })}
          />

          <Button type="submit" className="ml-auto">
            {article ? "Update Article" : "Submit Article"}
          </Button>
        </div>
      </form>
    </section>
  );
}
