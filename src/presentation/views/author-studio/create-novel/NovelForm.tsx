import { ButtonWithLoading } from "@/presentation/components/button/ButtonWithLoading";
import { CustomCheckbox } from "@/presentation/components/input/CustomCheckbox";
import { CustomTextInput } from "@/presentation/components/input/CustomTextInput";
import { MultiSelect } from "@/presentation/components/input/MultiSelect";
import { useClickOutsideHook } from "@/presentation/hook/useClickOutside.hook";
import type { RootState } from "@/presentation/redux/store";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import { Label } from "@/presentation/shadcn-ui/components/ui/label";
import { Separator } from "@/presentation/shadcn-ui/components/ui/separator";
import { Textarea } from "@/presentation/shadcn-ui/components/ui/textarea";
import { NovelFormViewModel } from "@/presentation/viewmodels/author-studio/NovelForm.viewmodel";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

export const NovelForm = () => {
  const {
    novelId,
    isChangeNovelDetail,
    genresData,
    onChangeTitle,
    onChangeAuthorName,
    onChangeDescription,
    onChangeSelectedGenres,
    onChangeEditMode,
    onSubmitNewNovel,
    onCheckedIsOriginal,
    onUpdateNovel,
    handleSelectAuthor,
    handleClickOutsideAuthorSuggestion,
  } = NovelFormViewModel();

  const {
    title,
    isOriginal,
    authorName,
    description,
    isLoadingSubmitForm,
    isValidTitle,
    titleValidation,
    isValidGenre,
    genreValidation,
    isValidAuthorName,
    authorNameValidation,
    authorSuggestions,
    selectedGenreIds,
  } = useSelector((state: RootState) => state.myNovels.novelFormData);

  const authorSuggestionRef = useRef<HTMLDivElement | null>(null);
  useClickOutsideHook(authorSuggestionRef, handleClickOutsideAuthorSuggestion);

  return (
    <>
      <CustomTextInput
        label="Tiêu đề *"
        id="title"
        isValid={isValidTitle}
        validation={titleValidation}
        value={title}
        onChange={onChangeTitle}
        maxLength={128}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative" ref={authorSuggestionRef}>
          <CustomTextInput
            label="Tác giả *"
            id="author"
            isValid={isValidAuthorName}
            validation={authorNameValidation}
            value={authorName}
            onChange={onChangeAuthorName}
            maxLength={64}
            isDisabled={isOriginal}
          />
          {authorSuggestions.length > 0 && (
            <div className="absolute w-full bg-white rounded-md border z-10 mt-2 shadow-md">
              <div className="p-4">
                <h4 className="mb-4 text-xs leading-none font-bold">
                  Chọn tác giả
                </h4>
                {authorSuggestions.map((author, index) => (
                  <div
                    key={`author-${index}`}
                    onClick={() => handleSelectAuthor(author)}
                  >
                    <p className="text-sm">{author}</p>
                    {index !== authorSuggestions.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <CustomCheckbox
          className={`${
            isValidAuthorName || !authorNameValidation ? "pt-6" : ""
          } shrink-0`}
          id="is-original"
          checked={isOriginal}
          onCheckedChange={onCheckedIsOriginal}
          label="Tự sáng tác"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <Label className="font-semibold mb-2">Thể loại *</Label>
        <p className="text-xs text-gray-500 mb-2">
          Được phép chọn tối đa 3 thể loại truyện.
        </p>
        {genresData.length > 0 && (
          <MultiSelect
            items={genresData}
            placeHolder="Chọn thể loại..."
            onChangeSelected={onChangeSelectedGenres}
            maxSelected={3}
            error={!isValidGenre && !!genreValidation}
            selectedValues={selectedGenreIds}
          />
        )}
        {!isValidGenre && genreValidation && (
          <p className="text-red-500 text-xs transition-all duration-300">
            {genreValidation}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description" className="font-semibold">
          Giới thiệu
        </Label>
        <p className="text-xs text-gray-500 mb-2">
          Không yêu cầu khi lưu bản thảo, nhưng bắt buộc phải thêm trước khi
          xuất bản truyện.
        </p>
        <Textarea
          className="min-h-[120px]"
          id="description"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChangeDescription(event.target.value);
          }}
        />
      </div>

      {novelId ? (
        <div className="flex gap-2">
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => {
              onChangeEditMode(false);
            }}
          >
            Huỷ
          </Button>
          <ButtonWithLoading
            className="flex-1"
            isLoading={isLoadingSubmitForm}
            disabled={
              !isValidTitle ||
              !isValidAuthorName ||
              !isValidGenre ||
              !isChangeNovelDetail
            }
            onClick={onUpdateNovel}
          >
            Lưu thay đổi
          </ButtonWithLoading>
        </div>
      ) : (
        <ButtonWithLoading
          isLoading={isLoadingSubmitForm}
          disabled={!isValidTitle || !isValidAuthorName || !isValidGenre}
          onClick={onSubmitNewNovel}
        >
          Thêm truyện mới
        </ButtonWithLoading>
      )}
    </>
  );
};
