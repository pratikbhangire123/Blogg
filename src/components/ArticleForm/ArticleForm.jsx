import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import articleService from "../../appwrite/config";
import { Button, Input, RealTimeEditor, Select } from "../index";

function ArticleForm({ article }) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: article?.title || "",
        slug: article?.$id || "",
        featuredImage: article?.featuredImage || "",
        description: article?.description || "",
        status: article?.status || "active",
      },
    });

  const submitArticle = async (data) => {
    if (article) {
      const imageFile = data.featuredImage[0]
        ? await articleService.uploadFile(data.featuredImage[0])
        : null;

      if (imageFile) {
        await articleService.deleteFile(article.featuredImage);
      }

      const updatedArticle = await articleService.updateArticle(article.$id, {
        ...data,
        featuredImage: imageFile ? imageFile.$id : undefined,
      });

      if (updatedArticle) {
        navigate(`/article/${updatedArticle.$id}`);
      }
    } else {
      const imageFile = await articleService.uploadFile(data.featuredImage[0]);

      if (imageFile) {
        const imageFileId = imageFile.$id;
        data.featuredImage = imageFileId;

        console.log({ ...data });

        const newArticle = await articleService.createArticle({
          ...data,
          userId: userData.$id,
        });

        console.log(newArticle);

        if (newArticle) {
          navigate(`/article/${newArticle.$id}`);
        }
      }
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
        onSubmit={handleSubmit(submitArticle)}
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

export default ArticleForm;
